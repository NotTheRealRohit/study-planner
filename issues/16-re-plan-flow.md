# 16 — Re-plan flow: extend / increase pace / reduce scope

**Type:** AFK
**Source:** Study Tracker v1 PRD

## What to build

The user-initiated re-plan flow. When projected finish exceeds the original deadline (visible from the weekly progress view in #14), a **"Re-plan" button** becomes available. Tapping it opens a screen showing **three concrete options with the math already computed**:

1. **Extend deadline by N days** — N is computed so the existing plan finishes on time at the current calibrated pace
2. **Increase weekly hours to X** — X is the weekly hours required to hit the original deadline at the current pace
3. **Trim Y hours of material** — Y is the hours that need to come out for the original deadline + weekly hours combo to work; the default cuts unstarted end-of-plan items, with a manual override for the user to choose what to keep

Each option shows exactly what it costs. The user chooses; the app never silently shifts anything. Cancelling out of the flow leaves the original roadmap untouched. After applying a re-plan, the new schedule replaces the old, and notifications are rescheduled (via the cancel/schedule plumbing from #09).

The PRD is emphatic that this flow exists to make tradeoffs **felt**: the user always picks, knowing exactly what each path costs.

## Acceptance criteria

- [ ] A "Re-plan" button is visible when projected finish exceeds the original deadline
- [ ] Tapping the button opens a screen with three options, each showing pre-computed numbers
- [ ] Option A ("extend deadline") shows the new deadline date and how many days are added
- [ ] Option B ("increase pace") shows the new weekly hours required and the delta from current
- [ ] Option C ("trim scope") shows how many hours of material are cut and which materials by default
- [ ] For Option C, the user can manually override which materials are cut (default is unstarted end-of-plan items)
- [ ] The app never initiates a re-plan on its own — the button must be tapped
- [ ] Cancelling out of the flow leaves the original roadmap untouched
- [ ] Applying a re-plan replaces the active roadmap with the new schedule
- [ ] Notifications are cancelled and rescheduled correctly after a re-plan (using the schedule/cancel plumbing from #09)
- [ ] Tests cover: each option's math against representative stale-plan + actual-progress fixtures; cancellation produces no state change; trim-scope manual override is respected

## Blocked by

- #11 — Pace calibration learning from completed sessions
- #14 — Weekly progress view (charts, projected finish, mini calendar)
