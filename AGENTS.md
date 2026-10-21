# AGENTS.md

Repository map, behavioral invariants, and verification harness for coding agents (OpenAI Codex, Cursor, GitHub Copilot, Antigravity).

## 1. Behavioral Invariants (Karpathy 4 Principles)

1. **Think Before Coding:**
   - State assumptions explicitly before generating patches. If intent or edge cases are ambiguous, stop and ask instead of guessing.
   - Surface architectural tradeoffs when multiple valid designs exist; push back if a simpler approach solves the problem.
2. **Simplicity First:**
   - Implement the minimum code required to solve the stated task.
   - Do not introduce single-use abstractions, speculative interfaces, or unrequested configurability.
   - Parse and validate data strictly at system boundaries (API inputs, env vars, external I/O); keep internal layers lean.
3. **Surgical Patches (`apply_patch` Discipline):**
   - Touch only lines directly required by the task. Never reformat, rename, or refactor unrelated adjacent code.
   - Remove imports, variables, and helpers orphaned by your own patch; leave pre-existing dead code untouched and report its `filepath:line`.
4. **Goal-Driven Loop (Evidence Over Claims):**
   - Define verifiable success criteria before editing:
     ```text
     1. [Change] → verify: [targeted test / typecheck command]
     ```
   - Loop locally until typechecks, linters, and targeted tests pass. Every completion report must include verification output as evidence.

## 2. Repository System of Record Map

Treat this section as a Table of Contents. Load only the document relevant to your active task:

| Domain | Source of Truth Path | When to Read |
| :--- | :--- | :--- |
| Architecture & Layer Rules | `ARCHITECTURE.md` / `docs/architecture.md` | Adding modules, packages, or cross-layer imports |
| Product Specs & Domain Logic | `docs/product-specs/index.md` | Implementing or modifying business workflows |
| Active Execution Plans | `docs/exec-plans/active/` | Multi-PR features and architectural migrations |
| Testing & Fixtures | `docs/testing.md` | Writing unit, integration, or E2E tests |
| Agent Skills & Playbooks | `.agents/skills/` or `skills/` | Repeating workflows (migrations, PR review, release) |

## 3. Architectural & Taste Invariants

- **Strict Forward Layer Dependencies:** Code within a domain may only depend forward (`Types → Config → Repository → Service → Runtime/UI`). Never import upward across layers.
- **Explicit Cross-Cutting Providers:** Inject auth, telemetry, feature flags, and external connectors through explicit provider interfaces rather than ad-hoc global imports.
- **Structured Observability:** Use the project's structured logger with trace/request context; do not commit raw debug `console.log` or `print` statements.
- **File Size Discipline:** Keep modules focused and cohesive; split files before they become monolithic.

## 4. Back-Pressure & Verification Commands

Run these checks in order before opening a PR or marking a task complete (prefer silent-on-success wrapper scripts so passing output does not flood context):

```bash
# 1. Fast static verification (Typecheck + Linter)
pnpm run check          # Python: uv run ruff check . && uv run mypy .

# 2. Targeted test execution (run only tests covering touched files)
pnpm test -- <pattern>  # Python: uv run pytest <path/to/test_file.py>
```

## 5. Hard Boundaries & Failure Log

- **Generated & Protected Files:** Never hand-edit `dist/`, `build/`, lockfiles, `.env*`, or generated schema/API clients. Edit the source definition and run the generator command.
- **Destructive Actions Require Approval:** Never run `rm -rf`, `git push --force`, `git reset --hard`, or destructive DB migrations without explicit user confirmation.
- **Failure Log (Incident Registry — Do Not Repeat):**
  - `[Tooling]` Always check `package.json` / `pyproject.toml` scripts first before inventing CLI flags.
  - `[Testing]` Never mock the unit under test; mock only external I/O boundaries.
