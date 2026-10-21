# CLAUDE.md

Behavioral invariants and harness rules for Claude Code. Bias toward caution over speed; use judgment on trivial one-line fixes.

## 1. Core Coding Principles (Karpathy Invariants)

### 1.1 Think Before Coding
- **No silent assumptions:** State assumptions explicitly before writing code. If requirements are ambiguous or incomplete, stop and ask.
- **Surface tradeoffs:** When multiple valid approaches exist, list the options and tradeoffs in 2–3 bullets instead of picking silently.
- **Push back on complexity:** If the requested approach is overcomplicated or brittle, propose a simpler alternative first.
- **Plan before multi-file edits:** When touching 3+ files or changing architecture, output a brief plan (`Step → Verify command`) before editing.

### 1.2 Simplicity First
- **Minimum viable code:** Write the smallest amount of code that solves the exact requested problem.
- **Zero speculative abstractions:** Do not create wrappers, factories, helpers, or configuration options for single-use logic.
- **Boundary-only validation:** Validate external inputs (API payloads, user input, env vars, file I/O) at system boundaries; do not litter internal calls with defensive checks for impossible states.
- **Rewrite bloat:** If an implementation takes 200 lines and can be written cleanly in 50, rewrite it before presenting.

### 1.3 Surgical Changes
- **Zero drive-by edits:** Never reformat, rename, comment, or refactor adjacent code unrelated to the task.
- **Match local style:** Follow the existing naming, error handling, and directory patterns of the touched file.
- **Orphan cleanup rule:**
  - **DO** remove imports, variables, and helpers made unused by your own changes.
  - **DO NOT** delete pre-existing dead code unless explicitly asked (mention its file:line location instead).
- **Diff traceability:** Every changed line in `git diff` must trace directly to the user's request.

### 1.4 Goal-Driven Execution (Back-Pressure Loop)
Translate every imperative request into a verifiable goal and loop until green:
- **New feature / validation** → Write failing tests for target & invalid inputs first, then implement until passing.
- **Bug fix** → Write or run a reproduction test that fails first, then fix the root cause until passing.
- **Refactoring** → Verify existing typechecks and tests pass both before and after changes.

## 2. Harness Configuration & Context Control

### 2.1 Progressive Context Map (Read On-Demand Only)
Do not pre-load the entire codebase into context. Read reference docs only when the task touches their domain:
- **Architecture & module boundaries:** `@docs/architecture.md`
- **Database schema & migrations:** `@docs/database.md`
- **Testing & fixture conventions:** `@docs/testing.md`
- **Reusable workflows:** `.claude/skills/`

### 2.2 Sub-Agent Context Firewall
- **Isolate noisy exploration:** When searching across many files, tracing cross-service calls, or inspecting large logs, delegate to an `Explore` or task sub-agent so raw search outputs do not pollute the main session context.
- **Return format:** Sub-agents must return only a concise summary with exact `filepath:line` references.

### 2.3 Verification Commands (Evidence Required Before "Done")
Never claim a task is complete without running verification and confirming zero errors:
1. **Static check (Typecheck + Lint):** Run the project check script (e.g., `npm run check` / `pnpm check` / `ruff check . && mypy .`).
2. **Targeted test execution:** Run only the test file(s) covering the modified module (e.g., `pnpm test -- <path>` or `pytest <path>`). Do not dump thousands of passing test lines into context; inspect only failures.

### 2.4 Hard Boundaries (Enforced by `.claude/settings.json` Hooks)
- **Protected paths (Never edit directly):** Build outputs (`dist/`, `build/`, `.next/`), lockfiles, `.env*` secrets, and auto-generated schema/client files (edit the source schema and run codegen instead).
- **Blocked commands:** `rm -rf`, `git reset --hard`, `git push --force`, and destructive SQL/migration commands (`DROP`, `TRUNCATE`).

## 3. Incident & Failure Log (Never Repeat)

Append a 1-line rule below whenever an agent mistake occurs in this repository:
- `[Package Manager]` Use the repository's lockfile-matched package manager exclusively; never mix `npm`, `pnpm`, `yarn`, or `pip`/`uv`.
- `[Design Tokens]` Never hardcode hex/RGB colors or magic spacing values in UI components; use existing theme variables/tokens.
