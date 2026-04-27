# Plan: Issue #01 — App Shell, Manual Session Log, Streak Calendar (TDD)

## Context

This is the **first code ever written** in the study-planner repo. The repo currently contains only planning docs (PRD, 17 issue specs, TDD methodology). No source code, no package.json, no config files exist.

Issue #01 is the **tracer bullet** — it proves the full architecture end-to-end: Expo Router shell, NativeWind primitives, WatermelonDB schema + reactive queries, domain modules with clean interfaces, and the home screen layout. Every later slice builds on this foundation.

## Approach: TDD with Vertical Slices

Following the project's TDD methodology: one test → one implementation → repeat. Domain logic first, UI wiring last (validated on device, not in Jest).

---

## Phase 0: Project Bootstrap

Set up infrastructure before any tests. No TDD cycles here — this is scaffolding.

### 0.1 Initialize Expo project
```
npx create-expo-app@latest . --template tabs
```
Strip template example screens/components, keep scaffolding.

### 0.2 Install dependencies
- **Core:** `nativewind`, `tailwindcss`, `@nozbe/watermelondb`, `zustand`, `@react-native-community/datetimepicker`
- **Dev/Test:** `jest-expo`, `@testing-library/react-native`, `@babel/plugin-proposal-decorators`
- Do NOT install TanStack Query (no server calls in this slice)

### 0.3 Configuration files
- `tsconfig.json` — strict mode, `experimentalDecorators`, `@/*` path alias to `./src/`
- `tailwind.config.js` — NativeWind preset, streak color tokens (5 levels: `streak-0` through `streak-4`)
- `babel.config.js` — NativeWind preset + decorator plugin
- `jest.config.js` — `jest-expo` preset, path aliases, transform ignore patterns
- `jest.setup.ts` — `createTestDatabase()` helper using WatermelonDB's LokiJS in-memory adapter
- `global.css` — Tailwind directives

### 0.4 WatermelonDB schema & model

**File:** `src/db/schema.ts`
```
sessions table (version 1):
  - duration_minutes: number
  - occurred_on: number (epoch ms, midnight UTC — the date the session happened)
  - resource_label: string
  - roadmap_id: string (optional, null in this slice)
  - is_exceptional: boolean (defaults false, not exposed in UI yet)
  - note: string (optional, not exposed in UI yet)
  - created_at: number
  - updated_at: number
```

**File:** `src/db/models/Session.ts` — WatermelonDB Model class with decorators

### 0.5 Expo Router file structure
```
app/
  _layout.tsx           # Root layout: DatabaseProvider + global.css import
  (tabs)/
    _layout.tsx         # Tab bar (single Home tab)
    index.tsx           # Home screen
  log-session.tsx       # Modal screen
```

---

## Phase 1: ProgressEngine — Streak Computation (5 TDD cycles) ✅ DONE

**File:** `src/modules/progress-engine.ts`
**Tests:** `src/modules/__tests__/progress-engine.test.ts`

### Public interface
```ts
interface DayCell {
  date: Date;
  totalMinutes: number;
  intensity: 0 | 1 | 2 | 3 | 4;  // 0 = no activity, 4 = max
}

interface StreakGrid {
  cells: DayCell[];
  startDate: Date;
  endDate: Date;
}

interface ProgressEngine {
  streakCalendar(startDate: Date, endDate: Date): Promise<StreakGrid>;
  observeStreakCalendar(startDate: Date, endDate: Date): Observable<StreakGrid>;
}

function createProgressEngine(database: Database): ProgressEngine
```

Factory function accepts the database (dependency injection). Intensity bucketing is dynamic — max minutes in the range defines the top of the scale (like GitHub's contribution graph).

### TDD cycles

1. ✅ **Empty DB → all-zero grid** — proves module construction, DB query path, return shape
2. ✅ **Single session → nonzero cell** — proves aggregation query, single-point bucketing (intensity 4)
3. ✅ **Multiple sessions same date → summed totalMinutes** — proves GROUP BY aggregation
4. ✅ **Varying totals across days → intensity ordering** — asserts `more minutes ≥ higher intensity`, not exact thresholds
5. ✅ **Sessions outside range excluded** — proves WHERE clause on date range

---

## Phase 2: SessionLifecycle — Passive Logging (4 TDD cycles) ✅ DONE

**File:** `src/modules/session-lifecycle.ts`
**Tests:** `src/modules/__tests__/session-lifecycle.test.ts`

### Public interface
```ts
interface PassiveLogInput {
  resourceLabel: string;
  durationMinutes: number;
  occurredOn: Date;
}

interface SessionOutcome {
  id: string;
  resourceLabel: string;
  durationMinutes: number;
  occurredOn: Date;
}

interface SessionLifecycle {
  logPassive(input: PassiveLogInput): Promise<SessionOutcome>;
}

function createSessionLifecycle(database: Database): SessionLifecycle
```

### TDD cycles

6. **logPassive returns correct SessionOutcome** — proves write path
7. **Logged session visible in ProgressEngine** — end-to-end integration through real DB (no mocking)
8. **Session attributed to occurrence date, not today** — proves streak date = occurrence date
9. **Two sessions same date sum in streak calendar** — end-to-end acceptance criterion #6

---

## Phase 3: Validation & Edge Cases (3 TDD cycles) ✅ DONE

10. **Zero/negative duration rejected** — input validation at the boundary
11. **Empty/whitespace resource label rejected** — input validation
12. **Year-long grid returns 365 or 366 cells** — leap year correctness

---

## Phase 4: Reactive Observation (1 TDD cycle)

**Tests:** `src/modules/__tests__/progress-engine-reactive.test.ts`

13. **Observable re-emits when session is written** — proves acceptance criterion #9 (reactive updates without manual refresh). Uses WatermelonDB's `Query.observe()` through ProgressEngine's `observeStreakCalendar()`.

---

## Phase 5: Refactor Pass

After all 13 tests pass:
- Extract test helpers (createTestDatabase, common setup)
- Review module interfaces for unnecessary surface area
- Check for duplication between ProgressEngine and SessionLifecycle implementations

---

## Phase 6: UI Wiring (manual device testing, no Jest UI tests)

### Files to create

| File | Purpose |
|---|---|
| `src/db/database.ts` | Database factory (native SQLite adapter) |
| `src/db/DatabaseProvider.tsx` | React context providing Database instance |
| `src/hooks/useSessionLifecycle.ts` | Hook: DB from context → SessionLifecycle |
| `src/hooks/useProgressEngine.ts` | Hook: DB from context → ProgressEngine |
| `src/hooks/useStreakCalendar.ts` | Hook: subscribes to observeStreakCalendar, returns StreakGrid |
| `src/stores/ui-store.ts` | Zustand: modal visibility |
| `src/components/StreakCalendar.tsx` | GitHub-style year grid, accepts StreakGrid props |
| `src/components/LogSessionForm.tsx` | Duration + date + resource label form |
| `src/components/primitives/Button.tsx` | NativeWind styled button |
| `src/components/primitives/TextInput.tsx` | NativeWind styled text input |
| `src/components/primitives/Card.tsx` | NativeWind styled card |
| `src/components/primitives/ScreenContainer.tsx` | Safe-area wrapper |
| `src/components/primitives/Heading.tsx` | Typography component |
| `src/components/primitives/Body.tsx` | Typography component |
| `app/(tabs)/index.tsx` | Home screen: StreakCalendar + "Log a session" button |
| `app/log-session.tsx` | Modal screen wrapping LogSessionForm |

### Manual verification on device
- Launch on iOS (Expo Go) and Android emulator
- Fresh install shows empty streak calendar (all gray squares)
- Tap "Log a session" → form opens with today's date
- Enter duration + resource label → save
- Today's square lights up immediately (no refresh)
- Log multiple sessions same day → square gets darker
- Kill and relaunch app → data persists

---

## What's NOT in Scope

- No active timer / `start_active` / `end_active` (Issue #02)
- No roadmaps / session planning / onboarding (Issue #03)
- No exceptional tagging UI (Issue #12) — schema has the columns, defaults to false/null
- No auth / sign-in (Issue #05)
- No backup/restore / cloud / network calls (Issue #08)
- No notifications (Issue #09)
- No TanStack Query (no server calls)
- No Jest UI tests — UI validated on device per acceptance criteria

---

## Verification

1. `npm test` — all 13 domain tests pass
2. `npx expo start` — app launches in Expo Go (iOS) and Android emulator
3. Walk through the manual verification checklist above
4. Kill and relaunch to confirm persistence
