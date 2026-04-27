# 11 — Pace calibration learning from completed sessions

**Type:** AFK
**Source:** Study Tracker v1 PRD

## What to build

The `PaceCalibration` module's learning behavior. The pace multiplier starts at 2.0x for new users (this is already what #03 uses for the first roadmap). Each completed session contributes to a rolling estimate that updates the multiplier, so future estimates for not-yet-started sessions reflect the user's actual pace.

Estimates surface to the user with a plain-language explanation — e.g., "30 min based on the video's 20 min and your average pace of 1.5x" — so the number is never a black box.

In this slice, **all sessions feed calibration**. The "exceptional" tag and its exclusion from calibration land in #12, along with the >40%-of-last-10 recalibration prompt. Splitting them keeps each slice small and makes it easy to verify the basic learning loop works before the more complex pattern-detection logic lands on top.

## Acceptance criteria

- [ ] New users start with a 2.0x pace multiplier
- [ ] Each completed session updates a rolling pace estimate that adjusts the multiplier
- [ ] Future not-yet-started session estimates reflect the current calibrated multiplier — re-rendering a roadmap shows updated durations
- [ ] The currently-displayed estimate for a session can be expanded to show the math: raw duration of the material × current multiplier = estimated minutes
- [ ] Calibration state persists across app restarts
- [ ] Calibration state is included in the local SQLite snapshot used by #08 backups (and is correctly restored)
- [ ] Tests cover: multiplier updates from a sequence of session outcomes; the explanation surface returns the right components; boundary cases (zero sessions, one session, many sessions)

## Blocked by

- #02 — Active session with timestamp-based timer
- #03 — Onboarding form + roadmap with manual-entry materials only
