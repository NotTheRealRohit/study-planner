# Study Planner — Agent Guidance

## Project Status

**In Progress**: Issue #01 (app shell, manual session log, streak calendar)
- Domain tests: **14 passing**
- Current branch: `feature/Issue-#01-phase4`
- GitHub Issue: #2

## Tech Stack

- **Expo + React Native** — cross-platform mobile (iOS/Android)
- **TypeScript** — strict mode
- **NativeWind** (Tailwind for RN) — styling
- **WatermelonDB** — local SQLite, reactive queries, source of truth
- **Zustand** — ephemeral UI state
- **TanStack Query** — server-side calls only (not in Issue #01)
- **Supabase** — Auth, Storage (backup blobs), Edge Functions
- **Expo Router** — file-based navigation

## Issue Structure

Issues are in `issues/` directory, numbered 01–17. Each is a vertical slice.

| Issue | Description |
|-------|-------------|
| #01 | **Tracer bullet** — app shell, manual session log, streak calendar. In progress. |
| #02 | Active session with timestamp-based timer |
| #03 | Onboarding + roadmap creation |
| #04 | URL material ingestion (YouTube, articles) |
| #05 | Email/password auth — all later auth issues depend on this |
| #06 | Apple Sign-In — **HITL** (requires Apple Developer Program) |
| #07 | Google Sign-In |
| #08 | Backup/restore |
| #09 | Notifications |
| #10–17 | Depend on earlier issues — see `issues/README.md` |

## Cross-Cutting Constraints (from PRD)

- No AI branding, no chat UI, no robot icons
- No "AI-powered" labels — intelligence shows in what the app does, not what it's called
- Local SQLite is source of truth; cloud backup is derivative
- API keys (YouTube, OpenAI) live in Edge Functions, never in the mobile binary
- Never silently shift the deadline or re-plan — user always chooses
- Default pace multiplier: 2.0x (video/article duration × 2)

## Development Commands

```bash
# Run tests
npm test

# Start dev server
npx expo start
```

## Testing

- 14 domain tests for Issue #01 (see `plans/01-app-shell-and-streak-calendar-tdd.md`)
- Test file pattern: `src/modules/__tests__/*.test.ts`
- WatermelonDB uses LokiJS in-memory adapter for tests (see `jest.setup.ts`)
- No Jest UI tests — UI validated on device

## Custom Skills

OpenCode skills are in `.opencode/skills/`:
- **tdd/** — TDD methodology with red-green-refactor loops
- **grill-me/** — for stress-testing plans
- **to-prd/** — convert context to PRD
- **to-issues/** — break plans into GitHub issues
- **ubiquitous-language/** — DDD glossary extraction

## Important Files

- `issues/study-tracker-v1-prd.md` — full PRD specification
- `issues/README.md` — issue list with dependencies
- `plans/01-app-shell-and-streak-calendar-tdd.md` — Issue #01 TDD plan
- `src/db/` — WatermelonDB schema and models
- `src/modules/` — Domain logic (ProgressEngine, SessionLifecycle)
- `src/modules/__tests__/` — Domain tests

## Tool Usage Guidelines

### Write Tool

When using the Write tool, the `content` parameter must be a **string**, not an object.

**Correct usage:**
```typescript
content: 'const x = 1;\nconsole.log(x);'
```

**Incorrect usage:**
```typescript
content: {"const x = 1;"}  // ❌ "expected string, received object"
```

If you need to write multi-line content:
1. Use a template literal string with proper escaping
2. Use Bash with `cat > file << 'EOF'` heredoc syntax as fallback

### Edit Tool

The oldString and newString must match exactly as they appear in the file (including indentation). Always Read the file first before editing.