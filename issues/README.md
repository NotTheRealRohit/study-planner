# Study Tracker v1 — Local Issues

17 vertical-slice issues derived from the Study Tracker v1 PRD. Each file in this directory is one issue. There is no parent GitHub issue — these are local files.

## Slice list

| # | Title | Type | Blocked by |
|---|---|---|---|
| 01 | App shell, log a manual session, streak calendar on home | AFK | — |
| 02 | Active session with timestamp-based timer | AFK | #01 |
| 03 | Onboarding form + roadmap with manual-entry materials only | AFK | #01 |
| 04 | URL-based material ingestion (YouTube + articles) | AFK | #03 |
| 05 | Email/password auth | AFK | #01 |
| 06 | Apple Sign-In | HITL | #05 |
| 07 | Google Sign-In | AFK | #05 |
| 08 | Periodic backup blob + explicit restore on new device | AFK | #05 |
| 09 | Session-start reminders + planned-end ping + global notification toggle | AFK | #03 |
| 10 | Deep-link launch of planned-session resources | AFK | #02, #03 |
| 11 | Pace calibration learning from completed sessions | AFK | #02, #03 |
| 12 | Exceptional tagging + >40%-of-last-10 recalibration prompt | AFK | #11 |
| 13 | Mid-session walk-away confirm dialog (>10 min overrun) | AFK | #02 |
| 14 | Weekly progress view (charts, projected finish, mini calendar) | AFK | #03 |
| 15 | Weekly narrative summary via LLM Edge Function | AFK | #14 |
| 16 | Re-plan flow: extend / increase pace / reduce scope | AFK | #11, #14 |
| 17 | Roadmap lifecycle: mark complete/abandoned + archived history | AFK | #03 |

## Notes

- **#01 is the tracer bullet.** It's deliberately tiny — the architecture (Expo + NativeWind primitives + WatermelonDB + reactive `ProgressEngine` query) is exercised end-to-end on day one. Every later slice adds one capability without forcing a re-architecture.
- **#06 (Apple Sign-In) is the only HITL slice.** It depends on Apple Developer Program enrollment and App Store review compliance.
- **#06 and #07 should ship together on iOS.** Apple's review rule requires Sign In with Apple to be offered whenever any other social sign-in is offered. Splitting them keeps the issues clean; coordinate the iOS rollout.
- **Cross-cutting constraints from the PRD** are honored in every slice rather than tracked as separate issues: no AI branding anywhere; no chat UI; never silently shift the schedule; never auto-skip materials; local SQLite is the source of truth; all third-party API keys live in Edge Functions.
