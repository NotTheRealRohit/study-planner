# 10 — Deep-link launch of planned-session resources

**Type:** AFK
**Source:** Study Tracker v1 PRD

## What to build

Wires planned sessions into the active-session flow with deep-link launch of their materials. Tapping Start on a planned session whose material has a URL (YouTube video, article) opens the URL in the appropriate app or browser via Expo Router's URL-scheme support, and starts the active-session timer at the same time. For planned sessions whose material is offline (textbook, manual entry, course PDF on disk), tapping Start begins the timer without attempting any URL launch — the experience degrades gracefully.

All other active-session behavior from #02 (silent overrun past planned end, the planned-end soft ping, end-to-log, kill-and-resume timer correctness) continues to work unchanged. This slice is intentionally narrow: it's the bridge between "I have a plan" and "I'm consuming the material," and nothing else.

## Acceptance criteria

- [ ] Tapping Start on a planned session whose material is a YouTube URL launches the YouTube app (or browser fallback) on the correct video
- [ ] Tapping Start on a planned session whose material is an article URL launches the URL in the system browser
- [ ] In both URL cases, the active-session timer begins automatically at the moment of launch
- [ ] Tapping Start on a planned session whose material is offline (textbook, manual entry) begins the timer without attempting any URL launch
- [ ] All active-session behavior from #02 is preserved: silent timer past planned end, planned-end soft ping, end-to-log, correct elapsed time after backgrounding or process kill
- [ ] If a URL fails to launch (no handler available, malformed URL after data corruption, etc.), the timer still starts and the user sees a non-blocking message
- [ ] Returning to the app after consuming the material brings the user back to the active-session screen with elapsed time correctly computed

## Blocked by

- #02 — Active session with timestamp-based timer
- #03 — Onboarding form + roadmap with manual-entry materials only
