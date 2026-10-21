# GEMINI.md

Workspace-wide invariants and harness configuration for Google Antigravity (`always_on` scope; no YAML frontmatter). Keep this file under 100 lines to preserve the 24 KB per-file and 20,000-token aggregate rules budget.

## 1. Core Behavioral Invariants (Karpathy 4 Principles)

1. **Think Before Coding:**
   - State assumptions explicitly before modifying files. Stop and ask whenever requirements or edge cases are ambiguous.
   - Present options and tradeoffs when multiple interpretations exist; push back when a simpler solution is available.
   - For tasks spanning 3+ files, write a brief execution plan (`Step → Verification check`) before editing.
2. **Simplicity First:**
   - Write the minimum code required to solve the stated problem.
   - Never add speculative features, single-use abstractions, or unrequested configuration layers.
   - Validate untrusted data at system boundaries; avoid redundant defensive checks inside internal functions.
3. **Surgical Changes:**
   - Touch only code directly required by the user's prompt. Do not reformat, rename, or refactor adjacent unrelated code.
   - Clean up imports, variables, and functions made unused by your own edits; do not delete pre-existing dead code unless asked (report its `filepath:line` instead).
4. **Goal-Driven Execution:**
   - Convert every task into a verifiable goal (reproduction test, typecheck, lint, or UI check) and iterate until all checks pass.

## 2. Progressive Context Map (`@` Reference Syntax)

Use Antigravity's native `@` path resolution to load domain context on demand rather than bloating the root prompt:
- **Architecture & dependency boundaries:** `@docs/architecture.md`
- **Testing & fixture standards:** `@docs/testing.md`
- **Database schema & migrations:** `@docs/database.md`
- **Shared coding standards (inline include if needed):** `@[Coding Standards](docs/coding-standards.md)`
- **Modular triggered rules:** `.agents/rules/*.md` (keep rule files flat inside `.agents/rules/` unless registered in `.agents/rules.json`)

## 3. Back-Pressure Verification Loop

Execute these verification steps before completing any task:
1. **Static Analysis (Typecheck + Lint):** Run the workspace check command (`pnpm run check` or `uv run ruff check . && uv run mypy .`) and resolve all errors.
2. **Targeted Tests:** Run only the test suite covering the modified files (`pnpm test -- <path>` or `uv run pytest <path>`) to avoid flooding context with passing logs.
3. **UI & Browser Verification (Frontend changes):** Verify visual rendering and console errors using Antigravity's browser/screenshot artifacts before marking UI work complete.

## 4. Hard Boundaries & Failure Log

- **Protected Paths:** Never manually edit `dist/`, `build/`, lockfiles, `.env*` secrets, or auto-generated schema/client files.
- **Blocked Commands:** Never execute `rm -rf`, `git push --force`, `git reset --hard`, or destructive database commands without explicit user approval.
- **Failure Log (Incident Registry — Do Not Repeat):**
  - `[Rules Syntax]` Every file inside `.agents/rules/*.md` must begin with YAML frontmatter using snake_case `trigger` values (`always_on`, `model_decision`, `glob`, or `manual`) and quoted `globs` patterns (e.g., `globs: "*.ts, *.tsx"`), or Antigravity will silently discard the rule.
  - `[Directory Scanning]` Do not nest subdirectories inside `.agents/rules/` without registering them in `.agents/rules.json`.