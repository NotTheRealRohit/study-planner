# Study Planner — Agent Guidance

## Project Status

This repo contains **planning documents only** — no source code yet. The first code implementation starts with Issue #01 (tracer bullet).

## Tech Stack (planned)

- **Expo + React Native** — cross-platform mobile (iOS/Android)
- **TypeScript** — strict mode
- **NativeWind** (Tailwind for RN) — styling
- **WatermelonDB** — local SQLite, reactive queries, source of truth
- **Zustand** — ephemeral UI state
- **TanStack Query** — server-side calls only
- **Supabase** — Auth, Storage (backup blobs), Edge Functions
- **Expo Router** — file-based navigation
- **expo-notifications** — session reminders
- **expo-keep-awake** — prevent screen sleep during sessions

## Issue Structure

Issues are in `issues/` directory, numbered 01–17. Each is a vertical slice.

| Key | |
|---|---|
| Issue #01 | **Tracer bullet** — app shell, manual session log, streak calendar. Must be built first. |
| Issue #02 | Active session with timestamp-based timer |
| Issue #03 | Onboarding + roadmap creation |
| Issue #04 | URL material ingestion (YouTube, articles) |
| Issue #05 | Email/password auth — all later auth issues depend on this |
| Issue #06 | Apple Sign-In — **HITL** (requires Apple Developer Program) |
| Issue #07 | Google Sign-In — ship with #06 on iOS (Apple requirement) |
| Issue #08 | Backup/restore |
| Issue #09 | Notifications |
| Issues #10–17 | Depend on earlier issues — check `issues/README.md` for blocking relationships |

## Cross-Cutting Constraints (from PRD)

- No AI branding, no chat UI, no robot icons
- No "AI-powered" labels — intelligence shows in what the app does, not what it's called
- Local SQLite is source of truth; cloud backup is derivative
- API keys (YouTube, OpenAI) live in Edge Functions, never in the mobile binary
- Never silently shift the deadline or re-plan — user always chooses
- Default pace multiplier: 2.0x (video/article duration × 2)

## Development Commands

```bash
# Bootstrap project (from TDD plan)
npx create-expo-app@latest . --template tabs

# Install core dependencies
npm install nativewind tailwindcss @nozbe/watermelondb zustand

# Install dev/test dependencies
npm install --save-dev jest-expo @testing-library/react-native @babel/plugin-proposal-decorators

# Run tests
npm test

# Start dev server
npx expo start
```

## Testing

- 13 domain tests for Issue #01 (see `plans/01-app-shell-and-streak-calendar-tdd.md`)
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

## OpenCode Settings

Local settings in `.opencode/settings.local.json` allow:
- Running `npx create-expo-app@latest`
- npm and npx commands

## Important Files

- `issues/study-tracker-v1-prd.md` — full PRD specification
- `issues/README.md` — issue list with dependencies
- `plans/01-app-shell-and-streak-calendar-tdd.md` — Issue #01 TDD plan (source of truth for Phase 0 bootstrap commands)

## Tool Usage Guidelines

### Write Tool

When using the Write tool, the `content` parameter must be a **string**, not an object.

**Correct usage:**
```typescript
// Pass content as a string literal
content: 'const x = 1;\nconsole.log(x);'
```

**Incorrect usage (will fail):**
```typescript
// DO NOT pass object/JSON directly
content: {"const x = 1;"}  // ❌ "expected string, received object"
```

If you need to write multi-line content, either:
1. Use a template literal string with proper escaping
2. Use Bash with `cat > file << 'EOF'` heredoc syntax as fallback

### Edit Tool

The oldString and newString must match exactly as they appear in the file (including indentation). Always Read the file first before editing.