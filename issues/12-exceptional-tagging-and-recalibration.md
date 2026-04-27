# 12 — Exceptional tagging + >40%-of-last-10 recalibration prompt

**Type:** AFK
**Source:** Study Tracker v1 PRD

## What to build

Adds the "unusual" / "exceptional" session tag. When ending an active session or logging a passive session, the user can mark the session as unusual via a checkbox and optionally attach a short free-text note ("kid was sick," "post-flu fog," etc.). Exceptional sessions are excluded from `PaceCalibration` learning but **still count** toward the streak calendar and weekly progress numbers — the user is credited for showing up even on rough days.

When more than 40% of the last 10 sessions are tagged exceptional, the app surfaces a one-time prompt — what the PRD calls "exceptional has become the norm" — with three multiple-choice resolutions:

1. **Treat as new normal** — recalibrate from all sessions (including those previously tagged exceptional)
2. **Keep excluding** — leave the existing behavior as is
3. **Review individually** — present recent exceptional sessions for the user to re-tag one by one

After the user answers, the prompt does not appear again for at least **2 weeks**, regardless of how the ratio shifts in that window. The prompt also does not fire on a single rough day in isolation — the rolling window of 10 sessions guards against that.

## Acceptance criteria

- [ ] When ending an active session or logging a passive session, the user can mark it as "unusual" via a checkbox
- [ ] An optional short free-text note can be attached to an unusual session
- [ ] Unusual sessions are excluded from pace calibration in #11
- [ ] Unusual sessions still contribute to the streak calendar (color intensity reflects total minutes)
- [ ] Unusual sessions still contribute to weekly progress numbers
- [ ] When more than 40% of the last 10 sessions are tagged unusual, a one-time prompt appears with three resolution options
- [ ] Choosing "treat as new normal" recomputes the calibration multiplier from all sessions, including those previously tagged unusual
- [ ] Choosing "keep excluding" preserves the existing behavior
- [ ] Choosing "review individually" lets the user re-tag recent exceptional sessions one by one
- [ ] After any resolution, the prompt does not appear again for at least 14 days
- [ ] The prompt does not fire when fewer than 10 sessions exist in total
- [ ] The prompt does not fire on a single rough day in isolation
- [ ] The boundary conditions are tested: exactly 40%, exactly 41%, exactly 10 sessions, the day after the cooldown ends

## Blocked by

- #11 — Pace calibration learning from completed sessions
