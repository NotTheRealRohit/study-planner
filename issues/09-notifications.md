# 09 — Session-start reminders + planned-end ping + global notification toggle

**Type:** AFK
**Source:** Study Tracker v1 PRD

## What to build

The `NotificationScheduler` module, built on `expo-notifications`. For each planned session in the active roadmap, schedule a local notification approximately 10 minutes before its start time. During an active session, fire a single soft notification when the planned end is reached (this is the surface referenced in slice #02's acceptance criteria — this slice owns the schedule plumbing and the global toggle).

A single global on/off toggle suppresses all notifications when off without losing the underlying schedule, so toggling back on restores delivery. There is **no per-feature notification settings page** in v1 — that's deferred to v2. There are **no streak-at-risk warnings, no engagement nags, no guilt-driven pushes**, ever. The PRD is explicit about this.

Notifications are cancelled and rescheduled correctly when sessions are completed early, rescheduled, or removed (e.g., via re-plan in a later slice).

## Acceptance criteria

- [ ] For each planned session in the active roadmap, a local notification is scheduled approximately 10 minutes before its start time
- [ ] Notifications fire at the correct local time, accounting for the device's timezone
- [ ] The planned-end soft ping fires once during an active session when the planned end time is reached
- [ ] When a session is completed (end-tapped or auto-ended), its associated reminder is cancelled
- [ ] When a session is rescheduled or removed (e.g., via roadmap edit), its reminder is cancelled and re-scheduled appropriately
- [ ] A single global on/off toggle is reachable from a settings surface
- [ ] When the toggle is off, no notifications are delivered, but the underlying schedule is preserved
- [ ] When the toggle is flipped from off to on, future scheduled notifications resume firing
- [ ] No streak-at-risk, consistency-nag, or engagement-driven notifications exist anywhere in the app
- [ ] Tests cover: scheduling produces exactly one notification at the correct time; completion cancels; toggle suppresses without losing schedule

## Blocked by

- #03 — Onboarding form + roadmap with manual-entry materials only
