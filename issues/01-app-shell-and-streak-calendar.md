# 01 — App shell, log a manual session, streak calendar on home

**Type:** AFK
**Source:** Study Tracker v1 PRD

## What to build

The tracer-bullet slice. After this issue is merged, a user can install the app on iOS and Android, land on a home screen, log a session manually (duration + date + free-text resource label), and see that day's square light up on a GitHub-style year-long streak calendar. Subsequent slices add roadmaps, auth, planning, and AI on top of this foundation — none of that exists yet.

This slice exists to make the architecture real end-to-end: Expo Router shell, NativeWind primitive components, WatermelonDB schema and reactive query, the home screen layout, and the `ProgressEngine.streak_calendar` derivation are all wired in. It is intentionally tiny so that the integration work is exercised on slice #1 instead of slice #16.

## Acceptance criteria

- [ ] App launches and lands on a home screen on both iOS (Expo Go on a physical device is acceptable) and Android (emulator + physical device)
- [ ] Home screen displays a year-long, GitHub-style streak calendar (empty for a brand-new install)
- [ ] A "Log a session" action is reachable from home
- [ ] User can enter a duration in minutes, a date (defaulting to today, editable), and a free-text resource label
- [ ] On save, the corresponding date square reflects the logged minutes via color intensity scaled to total minutes for that date
- [ ] Multiple sessions on the same date sum into that day's square
- [ ] Logged sessions persist across app restarts (local SQLite via WatermelonDB)
- [ ] The flow works fully offline — no network calls anywhere in this slice
- [ ] Streak calendar updates reactively without a manual refresh after a session is logged

## Blocked by

None — can start immediately.
