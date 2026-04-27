# 13 — Mid-session walk-away confirm dialog (>10 min overrun)

**Type:** AFK
**Source:** Study Tracker v1 PRD

## What to build

Detects the case where a user closed the app and walked away during an active session, and on return offers a confirm/adjust dialog so the logged time stays honest. The detection is timestamp arithmetic: when the user returns to an active session, if elapsed time is **more than 10 minutes past the planned end** AND the user **never tapped End**, fire the dialog. Otherwise — including when the user is still in flow within 10 min of planned end, or when they ended cleanly — no dialog appears.

The dialog lets the user either confirm the logged elapsed time as-is or adjust it to a value they enter. It never appears multiple times for the same session, and it never appears for sessions that ended cleanly via the End button.

The PRD is explicit that this dialog should **not** fire on every session — if it did, users would rubber-stamp it and the data would degrade. The 10-minute threshold is a tunable parameter that the PRD flags for review after beta.

## Acceptance criteria

- [ ] When the user returns to the app with an active session running, the app evaluates `elapsed > planned_end + 10min` AND `user_did_not_tap_end`
- [ ] When both conditions hold, a confirm/adjust dialog appears
- [ ] The dialog offers "confirm logged elapsed time as-is" and "adjust duration" (with a number input)
- [ ] When elapsed is within 10 minutes of planned end, no dialog appears
- [ ] When the user already tapped End, no dialog appears under any circumstance
- [ ] The dialog does not appear more than once for the same session
- [ ] The 10-minute threshold is a single named constant — easy to tune after beta
- [ ] The detection works correctly across app backgrounding, app process kill, and full device reboot
- [ ] Tests cover: each branch of the condition; the no-double-fire guarantee; the timestamp-based detection working after process restart

## Blocked by

- #02 — Active session with timestamp-based timer
