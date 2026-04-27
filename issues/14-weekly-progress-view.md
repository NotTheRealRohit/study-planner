# 14 — Weekly progress view (charts, projected finish, mini calendar)

**Type:** AFK
**Source:** Study Tracker v1 PRD

## What to build

A weekly progress screen reachable from home. Top of the screen shows a 7-day mini streak calendar so the user can connect weekly numbers to which days they actually showed up. The headline metric is the **projected finish date next to the original deadline**, color-coded green (on/ahead) or red (behind) — this is the answer to "am I going to make it?" at a glance. Below: a burn-up line chart (actual progress vs. ideal pace over the goal duration) and a daily-minutes bar chart for the last 7 days.

When the user is behind, the **original plan stays visible and unchanged** — the slip is felt, not silently smoothed away. The projected finish date reflects the calibrated pace from #11. The roadmap is never auto-shifted; re-plan is user-initiated and lands in #16.

This slice covers everything on the weekly view **except** the LLM-generated narrative summary — that's #15.

## Acceptance criteria

- [ ] A weekly progress screen is reachable from home
- [ ] Top of the screen displays a 7-day mini streak calendar
- [ ] Projected finish date is shown adjacent to the original deadline
- [ ] When projected finish ≤ original deadline, the indicator is green; when projected finish > original deadline, the indicator is red
- [ ] A burn-up line chart shows actual cumulative progress vs. an ideal-pace line over the duration of the goal
- [ ] A daily-minutes bar chart shows the last 7 days
- [ ] The original deadline and original plan are never silently shifted, even when projected finish exceeds them
- [ ] All numbers and charts derive from local SQLite via `ProgressEngine` reactive queries — no network call required to view this screen
- [ ] The screen renders correctly when there are zero sessions yet, when the deadline is in the past, and when the user is exactly on pace
- [ ] Property-based tests on `ProgressEngine`: sum of daily minutes equals total logged time; streak grid totals equal sum of session minutes per date; projected finish ≥ today

## Blocked by

- #03 — Onboarding form + roadmap with manual-entry materials only
