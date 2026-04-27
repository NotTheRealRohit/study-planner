# 17 — Roadmap lifecycle: mark complete/abandoned + archived history

**Type:** AFK
**Source:** Study Tracker v1 PRD

## What to build

Closes the loop on a roadmap. From a roadmap or settings surface, the user can mark the active roadmap as **complete** or **abandoned**. The roadmap becomes read-only and moves out of the active slot, freeing the user to start a new one (still one active roadmap at a time in v1).

Past roadmaps are accessible as **read-only history** so the user can revisit their work. Critically, **sessions from archived roadmaps remain in the streak calendar** — the calendar reflects lifetime study activity, not per-roadmap activity. Years of consistency are not tied to whether any individual goal was finished.

This is enforced in the data model: sessions reference a roadmap by ID but are not deleted when the roadmap is archived. The streak calendar query in `ProgressEngine` operates on all sessions for the user, not just sessions tied to the active roadmap.

## Acceptance criteria

- [ ] User can mark the active roadmap as complete from a roadmap/settings surface
- [ ] User can mark the active roadmap as abandoned from a roadmap/settings surface
- [ ] A completed or abandoned roadmap becomes read-only — its sessions, schedule, and metadata cannot be edited after archiving
- [ ] An archived roadmap is no longer the active roadmap; the user can create a new active roadmap (one active at a time)
- [ ] Past archived roadmaps are accessible as read-only history through a "Past roadmaps" surface
- [ ] Sessions from archived roadmaps continue to populate the streak calendar
- [ ] Sessions from archived roadmaps continue to count toward lifetime totals
- [ ] Marking a roadmap complete or abandoned never deletes any session data
- [ ] Tests cover: archiving preserves session data; archived roadmaps render read-only; streak calendar includes sessions from archived roadmaps; creating a new roadmap is allowed only when no roadmap is active

## Blocked by

- #03 — Onboarding form + roadmap with manual-entry materials only
