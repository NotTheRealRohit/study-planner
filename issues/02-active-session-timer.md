# 02 — Active session with timestamp-based timer

**Type:** AFK
**Source:** Study Tracker v1 PRD

## What to build

The active-session flow. From the home screen, the user can start an ad-hoc timed session by entering a label and a target duration. The active-session screen shows elapsed time updating in real time, the screen stays awake while the session is in the foreground, and the timer keeps running silently past the target duration. A single soft notification fires when the target duration is reached. Tapping "End session" logs the elapsed time, attributes it to today, and returns to the home screen — where the streak calendar reflects the new session immediately.

Critically, elapsed time is computed as `now - start_time` from the recorded start timestamp; there is no real long-running JavaScript timer. The timer math survives app backgrounding and process kill/restart.

Planned-session entry points come in slice #03 (onboarding/roadmap) and #10 (deep-link launch). This slice ships ad-hoc start as the entry point, which remains a useful capability in v1.

## Acceptance criteria

- [ ] From the home screen, a user can start an ad-hoc timed session by entering a label and a target duration
- [ ] The active-session screen shows elapsed time updating roughly every second
- [ ] The screen does not auto-sleep while the active-session screen is in the foreground (`expo-keep-awake`)
- [ ] The timer continues to advance silently past the target duration — no popup, no auto-stop
- [ ] A single soft notification fires when the target duration is reached ("planned length reached — still going?")
- [ ] Tapping "End session" logs a session with elapsed time = `now - start_time` and date = today
- [ ] Elapsed-time computation is correct after the app is backgrounded and resumed
- [ ] Elapsed-time computation is correct after the app process is killed and relaunched mid-session
- [ ] The logged session appears on the streak calendar immediately upon ending

## Blocked by

- #01 — App shell, log a manual session, streak calendar on home
