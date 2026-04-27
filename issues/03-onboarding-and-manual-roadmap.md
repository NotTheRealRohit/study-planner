# 03 — Onboarding form + roadmap with manual-entry materials only

**Type:** AFK
**Source:** Study Tracker v1 PRD

## What to build

The first-launch onboarding flow that produces a real roadmap. The user enters a topic, a deadline (or marks no-deadline), weekly hours of availability, a knowledge self-rating, and an optional free-text note. They add **manual-entry materials only** in this slice — type-specific forms (book → page count, course → estimated hours, notes → estimated time). URL-based ingestion lands in #04.

The app generates a proposed roadmap using `SessionPlanner` with the default 2.0x pace multiplier. If materials over-allocate the available time, up to 3 multi-choice clarifications are shown — never more, never when there isn't a real conflict, never as free-text. The user sees a roadmap preview with edit affordances (move date, adjust duration, reorder, delete) before commit. After commit, the home screen shows the next planned session prominently, and tapping it routes to the active-session flow from #02.

This slice deliberately does not include URL ingestion, deep-link launch, calibration learning, or notifications — each of those is a follow-up slice that adds one capability cleanly on top of this foundation.

## Acceptance criteria

- [ ] On first launch (with no roadmap), the user is taken into an onboarding flow
- [ ] User can enter: topic (free text), deadline (date or no-deadline), weekly hours (number), knowledge self-rating (small option set), optional free-text note
- [ ] User can add manual-entry materials with type-specific inputs (e.g., book → page count; course → estimated hours; notes → estimated time)
- [ ] The app generates a roadmap using a 2.0x default pace multiplier and the user's weekly availability
- [ ] If proposed materials over-allocate the available time, up to 3 multi-choice clarifications appear (extend deadline / add hours / trim materials)
- [ ] Clarifications never exceed 3 in a single onboarding
- [ ] Clarifications never appear when materials fit the deadline at the chosen weekly hours
- [ ] Clarifications are always presented as constrained options — no free-text response
- [ ] A roadmap preview is shown before commit
- [ ] User can edit individual sessions in the preview: move date, adjust duration, reorder materials, delete sessions
- [ ] After commit, user lands on home with the next planned session prominently displayed
- [ ] Tapping the next planned session routes to the active-session screen from #02
- [ ] Roadmap, sessions, and onboarding inputs persist locally across app restarts
- [ ] Only one active roadmap exists per user at a time

## Blocked by

- #01 — App shell, log a manual session, streak calendar on home
