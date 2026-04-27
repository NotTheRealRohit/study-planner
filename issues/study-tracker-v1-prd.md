# Study Tracker — v1 PRD

## Problem Statement

People who study on their own — exam-prep students working through a syllabus, career-switchers learning new skills from online resources — have no good way to plan their study time across the materials they've gathered, see whether they're on track for their goal, and stay consistent day to day. Existing tools either treat study as generic to-dos (no concept of materials, deadlines, or pace), or they're rigid course platforms that only work with one specific provider's content.

The result: learners assemble their own playlists, articles, books, and notes — and then run those without a plan. They fall behind without realizing it, cram at the end, abandon goals they could have hit with steadier pacing, or feel constantly anxious about whether they're doing enough. They want a personal coach for execution; what they have is a pile of bookmarks and good intentions.

## Solution

A personal study tracker that takes what the learner *already* plans to study (the topic + the materials they've gathered) and turns it into a realistic, time-aware roadmap they execute against day by day.

The product is deliberately a **mirror**, not an enforcer. It estimates how long the user's materials will actually take based on the user's own pace, lays them across the calendar against the user's deadline, and shows — clearly and honestly — whether the user is on track. When the user falls behind, the original plan stays visible alongside a projected finish date, and the user is offered three concrete tradeoffs (extend deadline, study more per week, or trim materials). The user always chooses; the app never silently adjusts.

Day to day, the user opens the app to start their planned session (the app launches the right resource and runs a timer) or to log a session they did elsewhere. A GitHub-style year calendar on the home screen rewards the *habit* of studying, independent of any single goal. A weekly progress view answers the question "am I going to make it?" with a burn-up chart, daily activity bars, and a short plain-language summary.

The app is **offline-first** — sessions, roadmaps, and history live on the device and the app works without a network. A periodic encrypted backup to the cloud protects the user's data across reinstalls and device changes, but the app does not require connectivity for any core flow except onboarding (where it fetches metadata for the user's materials).

The product uses AI under the hood for time estimation and weekly narrative summaries, but it is not branded or surfaced as "AI-powered" — the intelligence shows up in what the app does well, not in what it calls itself.

## User Stories

### Onboarding & roadmap creation

1. As a new user, I want to enter my study topic in plain language, so that I can start setting up a roadmap without picking from a fixed list.
2. As a new user, I want to set a deadline for my goal (or mark it as no-deadline), so that the app can compute pacing.
3. As a new user, I want to specify how many hours per week I can realistically study, so that the plan reflects my actual availability.
4. As a new user, I want to paste a list of URLs (YouTube videos, playlists, web articles), so that the app can pull in the materials I've already gathered.
5. As a new user, I want to add manual entries for offline materials (textbooks, my own notes, a course PDF on my laptop), so that materials without URLs are still part of my plan.
6. As a new user, I want each manual entry to ask for the right inputs based on its type (page count for a book, estimated hours for a course), so that the time math works correctly without me overthinking it.
7. As a new user, I want to self-rate my existing knowledge of the topic from a small set of options, so that the app has minimal context for pacing.
8. As a new user, I want to optionally add a free-text note about anything else the app should know, so that I can give context that the form can't capture.
9. As a new user, I want the app to fetch metadata (titles, durations, page counts) for my materials automatically, so that I don't have to type them in.
10. As a new user, I want the app to ask me at most three clarifying questions when there's a real conflict (e.g., my materials don't fit my deadline), so that onboarding stays short.
11. As a new user, I want clarifying questions to be presented as multiple-choice options (extend deadline / add hours / trim materials), so that I don't have to type free-form answers.
12. As a new user, I want to see a preview of my proposed roadmap before committing to it, so that I can catch obvious problems before I start.
13. As a new user, I want to edit individual sessions in the preview (move dates, adjust durations, reorder materials, delete sessions), so that I can fix the AI's first attempt without starting over.
14. As a new user, I want onboarding to land me on the home screen with my first session ready to start, so that there's no gap between planning and doing.
15. As a new user, I want the app to gracefully handle materials whose metadata it couldn't fetch (paywall, dead link, blocked) by letting me fill in the title and rough length manually, so that one bad URL doesn't block onboarding.

### Account & data persistence

16. As a new user, I want to sign up using either email and password, Google, or Apple Sign-In, so that I can pick the auth path I'm comfortable with.
17. As an iOS user, I want Apple Sign-In offered whenever any other social sign-in is available, so that the app respects my privacy preferences and complies with platform rules.
18. As a returning user on a fresh install or a new device, I want to sign in and have my roadmap, sessions, calibration state, and streak history restored, so that years of progress aren't lost when I switch phones or reinstall.
19. As a user, I want the app to work offline for every core flow (starting a session, logging a session, viewing my streak, viewing weekly progress), so that I'm never blocked by spotty connectivity.
20. As a user, I want my data to back up automatically in the background when I'm online, so that I don't have to think about backups.
21. As a user, I want to see roughly when my last backup happened (e.g., "backed up 2 hours ago"), so that I have confidence my data is safe.
22. As a user signing in on a new device, I want a clear restore step (rather than silently merging or overwriting whatever's local), so that I don't accidentally lose data.
23. As a user, I want a way to sign out, so that I can hand off the device or step away from the account cleanly.

### Daily engagement

24. As a returning user, I want the home screen to show me my next planned session prominently, so that I know what to do today without thinking.
25. As a returning user, I want a clearly visible secondary option to log a session I did outside the app, so that ad-hoc studying still counts.
26. As a returning user, I want to see my year-long streak calendar on the home screen, so that my consistency habit is reinforced every time I open the app.
27. As a returning user, I want each day's square in the streak calendar to reflect how much I studied that day (color intensity scaled by minutes), so that heavy days look different from light days.
28. As a returning user, I want my streak calendar to persist across goals — including ones I've completed or abandoned — so that finishing a roadmap doesn't reset my history.
29. As a returning user, I want to receive a notification ~10 minutes before each planned session, so that I don't miss sessions I committed to.
30. As a returning user, I want a single global toggle to turn notifications on or off, so that I'm not stuck managing per-feature notification settings.
31. As a returning user who doesn't want to be nudged about consistency, I want the app to NOT send streak-at-risk warnings or guilt-driven notifications, so that the app feels respectful rather than manipulative.

### Active study session

32. As a user starting a planned session, I want the app to deep-link me to the planned resource (open the YouTube video, the article URL), so that I'm immediately on the right material.
33. As a user starting a planned session, I want a timer to begin running automatically, so that I don't have to start it manually.
34. As a user studying with an offline resource (textbook, manual entry), I want the timer to start without trying to launch a URL, so that the experience degrades gracefully.
35. As a user studying past the planned session length, I want the timer to keep running silently, so that the app doesn't interrupt me when I'm in flow.
36. As a user studying past the planned session length, I want a single soft notification at the planned-end mark ("planned length reached — still going?"), so that I have the option to wrap up but I'm not yanked out of focus.
37. As a user who finished a session, I want to tap "End session" and have the timer's elapsed time logged as-is, so that my actual time is captured without extra friction.
38. As a user who closed the app and walked away mid-session, I want the app to ask me to confirm or adjust the duration when I come back (only when there's real ambiguity — timer ran >10 min past planned end with no End tap), so that my logged times stay honest.
39. As a user, I want the confirm/adjust dialog to NOT appear on every session, so that I'm not desensitized to it and don't rubber-stamp it.

### Logging & tagging

40. As a user logging a session I already did, I want to enter the duration, the resource I worked on, and the date, so that the session is attributed to the day it actually happened.
41. As a user logging a session, I want the date to default to today but be editable, so that yesterday's session counts toward yesterday's calendar square.
42. As a user finishing a session, I want a checkbox to mark the session as "unusual," so that genuinely abnormal sessions don't poison my pace calibration.
43. As a user marking a session as unusual, I want to optionally add a short note explaining why, so that my future self can remember the context.
44. As a user, I want unusual sessions to still count toward my streak calendar and weekly progress numbers, so that I'm credited for showing up even on rough days.

### Pace calibration

45. As a user, I want my time estimates to start from a sensible default (videos and articles assumed to take ~2x their raw duration), so that the first plan is realistic out of the gate.
46. As a user, I want the app to learn my actual pace over time and update future estimates, so that the plan gets more accurate the longer I use it.
47. As a user, I want to see why the app estimated a session at a given duration (e.g., "30 min based on the video's 20 min and your average pace"), so that the number isn't a black box.
48. As a user who has tagged many recent sessions as unusual (>40% of last 10), I want the app to surface this once and ask me how to interpret it (treat as new normal / keep as exceptional / review individually), so that my calibration reflects reality.
49. As a user who has answered the "exceptional has become the norm" prompt, I want the app to not ask me again for at least two weeks, so that the prompt doesn't become noise.
50. As a user with one rough day, I want the app to NOT trigger any recalibration prompt on that basis alone, so that "exceptional" remains useful for genuinely off days.

### Progress visualization

51. As a user, I want a weekly progress view that prominently shows my projected finish date next to my original deadline, color-coded green or red based on whether I'm trending ahead or behind, so that I know my status at a glance.
52. As a user, I want a burn-up line chart showing my actual progress vs. an ideal-pace line over the duration of my goal, so that I can see whether I've been drifting from the plan.
53. As a user, I want a daily-minutes bar chart for the past 7 days, so that I can see whether my week was consistent or front-loaded/back-loaded.
54. As a user, I want a 7-day mini streak calendar at the top of the weekly view, so that I can connect my weekly numbers to which days I actually showed up.
55. As a user, I want a 2-3 sentence written summary of my week appearing automatically every week, so that I get a contextual read on my progress without parsing charts.
56. As a user, I want the weekly written summary to acknowledge unusual circumstances I've noted (e.g., "you noted you were sick this week"), so that the summary feels grounded in my actual reality.
57. As a user, I want a button to generate the weekly summary on demand, so that I can pull it up before a re-plan or to share with a study group.

### Falling behind & re-planning

58. As a user who has fallen behind, I want my original plan to remain visible and unchanged, so that the slip is real and felt rather than silently smoothed away.
59. As a user who has fallen behind, I want my projected finish date (based on my current calibrated pace) to be visible on the home screen and weekly view, so that I can see where I'm heading.
60. As a user who decides to re-plan, I want to click an explicit "Re-plan" button, so that re-planning is a deliberate choice, not something the app does to me.
61. As a user re-planning, I want to see three concrete options with the math already computed: extend deadline by N days, increase weekly hours to X, or trim Y hours of material from the end of the plan, so that I can pick a tradeoff knowing exactly what it costs.
62. As a user re-planning by trimming scope, I want to manually override which materials get cut (default is end-of-plan items I haven't started), so that I keep what matters most to me.

### Roadmap lifecycle

63. As a user with one active roadmap, I want to mark it complete or abandoned when I'm done, so that I can move on cleanly.
64. As a user, I want completed and abandoned roadmaps to be archived as read-only history, so that I can revisit my past work.
65. As a user, I want session history from old roadmaps to remain in my streak calendar, so that years of consistency aren't tied to whether any individual goal was finished.

### Cross-cutting

66. As a user, I want the app to never silently shift my deadline, never auto-skip materials, and never re-plan on its own, so that I trust the plan reflects my own choices.
67. As a user, I want the app to never feel like an "AI chatbot" — no chat bubble, no "Ask me anything" surface, no robot framing — so that my expectations match what the product actually delivers.
68. As a user, I want every "the app needs me to decide something" moment to be presented as constrained options (multi-choice, sliders, dates), with optional free-text only as a safety valve, so that I'm never stuck staring at a blinking cursor.

## Implementation Decisions

### Tech stack & platform

The app is a **cross-platform mobile application built with React Native and Expo**, in TypeScript. iOS and Android are shipped from a single codebase. Web and desktop are explicitly out of scope for v1.

**Development environment:** Windows-friendly. Android development (emulator + physical device) runs entirely on Windows. iOS development uses Expo Go on a physical iPhone for daily iteration; production iOS builds are produced via EAS Build's cloud service rather than locally — no Mac required for v1.

**Front-end foundation:**
- **Expo Router** for file-system-based navigation. Deep linking (used to launch YouTube and article URLs) is handled by the router's URL scheme support.
- **NativeWind** (Tailwind for React Native) for styling, with design tokens defined in `tailwind.config.js`.
- **A small, custom set of primitive components** (Button, Card, ScreenContainer, Heading, Body, Stat, ProgressBar, etc.) built on NativeWind. No third-party UI kit — the PRD's "respectful, mirror not enforcer" tone is poorly served by Material Design or iOS-flavored kits.

**State management — three layers, each with one job:**
- **WatermelonDB** (reactive SQLite) for the local data layer. It is the source of truth for roadmaps, sessions, calibration state, and material metadata. UI components subscribe to reactive queries and re-render automatically on writes — relevant for the streak calendar, projected-finish, and weekly views, all of which derive from the session log.
- **Zustand** for ephemeral UI state — running timer state, modal/dialog visibility, current onboarding step. Domain data does not live here.
- **TanStack Query** for server-side calls only — the periodic backup upload, the LLM proxy call for the weekly narrative, the metadata proxy call during onboarding. Local DB reads do not go through TanStack Query.

**Backend — Supabase:**
- **Supabase Auth** for sign-up and sign-in (email + password, Google, Apple Sign-In).
- **Supabase Storage** for the periodic backup blob, scoped to the authenticated user via row-level security.
- **Supabase Edge Functions** (Deno) for the two server-side proxies — the **MaterialsMetadataProxy** (wraps YouTube Data API v3 + Mozilla Readability) and the **LLMProxy** (wraps OpenAI GPT-4o-mini). API keys live in the Edge Function environment, never in the mobile binary.
- **Postgres** (under Supabase) is available but unused at v1. It exists as an escape hatch if the local-first model is outgrown.

**LLM:** OpenAI GPT-4o-mini, used for the weekly narrative only. Onboarding clarifications and manual-entry forms are templated and deterministic — they do not require the LLM. Inputs to the narrative call are pre-computed structured facts from `ProgressEngine`; the model verbalizes facts, it does not reason or recommend.

**Timer & notifications:**
- **Timestamp-based timer.** A session records its start timestamp; elapsed time is computed as `now - start_time` whenever the UI renders. There is no real long-running JavaScript timer in the background — the platform doesn't reliably support that, and pretending it does causes battery and reliability issues.
- **`expo-keep-awake`** prevents the screen from sleeping while a session screen is in the foreground.
- **`expo-notifications`** schedules the 10-min-before reminder, the planned-end ping, and is the surface that gets cancelled or rescheduled on session completion or re-plan.
- The "did you walk away mid-session?" detection is timestamp arithmetic on app return: if elapsed is >10 min past planned end and the user never tapped End, fire the confirm dialog.

**Sync model:** **Local-first with periodic blob backup.** SQLite on-device is canonical. A snapshot of the user's database is uploaded to Supabase Storage on a periodic schedule (when the app is online and foregrounded). Restore is an explicit user action on a new install or new device. Real multi-device sync (live conflict resolution across devices) is explicitly v2.

### Modules

The system is organized into 10 deep modules, each encapsulating substantial logic behind a small, stable interface.

**MaterialsIngestion** — Accepts a heterogeneous list of inputs (YouTube URLs, web article URLs, manual entries) and returns a normalized list of resource items with type, title, duration estimate, and any other metadata. Hides all the API/fetch/parse mess. URL-based items are resolved by calling the `MaterialsMetadataProxy` Edge Function (which itself wraps YouTube Data API v3 for video and playlist metadata and HTTP fetch + Mozilla Readability for articles). Manual entries are resolved on-device using per-type form schemas. Single primary interface: `ingest(inputs) -> resource_items`.

**SessionPlanner** — Owns the roadmap concept (topic, materials, deadline, weekly availability, ordered session schedule). Generates the initial schedule from a set of resource items + constraints, and provides the three re-plan options (push deadline / increase weekly hours / reduce scope) with all math pre-computed. The roadmap itself is a data shape owned by this module, not a separate module. Pure domain logic; no infrastructure dependency. Key interfaces: `create_plan(materials, deadline, weekly_hours) -> roadmap`, `replan_options(roadmap, current_progress) -> {extend_deadline, increase_pace, reduce_scope}`, `apply_replan(roadmap, choice) -> roadmap`.

**PaceCalibration** — Owns the per-user time multiplier. Default is 2.0x for new users. Updates from sessions tagged "normal" (excludes "exceptional"). Runs the rolling pattern detection: when >40% of the last 10 sessions are tagged exceptional, surfaces a one-time prompt with three resolution options (treat as new normal → recalibrate from all sessions / keep excluding / review individually) and a 2-week cooldown after the user answers. State persisted via WatermelonDB. Interfaces: `estimate(resource) -> minutes`, `record(session_outcome)`, `check_pattern() -> optional<RecalibrationPrompt>`.

**SessionLifecycle** — State machine for individual sessions. Handles active mode (timer + resource launcher; timer keeps running silently past planned end via `expo-keep-awake` foreground + `expo-notifications` planned-end ping), passive logging (post-hoc with editable date), the >10-min-overrun confirm dialog (only fires when user did NOT tap End and timer ran significantly over), and exceptional tagging (binary checkbox + optional free-text note). Timer is timestamp-based, not a long-running JS timer. Interfaces: `start_active(session)`, `end_active(session) -> session_outcome`, `log_passive(resource, duration, date, exceptional, note) -> session_outcome`.

**ProgressEngine** — Pure derived-data layer over the session log. Computes projected finish date (calibrated-pace forecast), burn-up trajectory (ideal vs. actual progress over time), daily minutes for any date range, and streak calendar data (per-date totals, color-intensity bucketing). Stateless query module — no writes. Implemented as reactive WatermelonDB queries so UIs subscribed to these derivations re-render automatically on session writes. Interfaces: `projection(roadmap) -> projected_finish_date`, `burn_up(roadmap) -> series`, `daily_minutes(user, date_range) -> series`, `streak_calendar(user, date_range) -> grid`.

**WeeklyNarrative** — Generates the 2-3 sentence weekly summary by calling the `LLMProxy` Edge Function (which wraps OpenAI GPT-4o-mini), using only structured facts from `ProgressEngine` as input. The LLM verbalizes pre-computed facts; it does NOT make inferences from raw session data. Includes notes from any exceptional sessions in the input so the narrative can acknowledge context (e.g., "you noted you were sick"). Drives both auto-weekly generation and the on-demand button. Interface: `generate(structured_progress_facts) -> narrative_text`.

**NotificationScheduler** — Schedules and cancels session-start reminders (one per planned session, ~10 min before start), and any in-session pings owned by `SessionLifecycle`. Built on `expo-notifications`. Single global on/off toggle per user. Handles timezone correctness and cancels notifications when sessions are completed early or rescheduled. The global toggle suppresses all notifications without losing the schedule, so toggling back on restores them. Interfaces: `schedule(session)`, `cancel(session)`, `set_user_toggle(user, enabled)`.

**OnboardingFlow** — Orchestrates the four-step new-user flow: form (topic, deadline, weekly hours, materials, knowledge self-rating, optional note) → metadata processing (calls `MaterialsIngestion`) → optional clarifications (max 3, structured-input only, only when there's a real conflict) → roadmap preview (calls `SessionPlanner`; supports manual edits before commit). Interfaces: `start()`, `submit_form(form_data) -> processing_state`, `next_clarification(state) -> optional<question>`, `finalize(state) -> roadmap`.

**AuthModule** — Wraps Supabase Auth. Owns sign-up, sign-in (email + password, Google, Apple Sign-In), sign-out, and the per-user data scope that all other modules depend on. Exposes the current user identity to other modules and emits sign-in/sign-out events that `BackupSync` listens to. Interfaces: `sign_up(...)`, `sign_in(...)`, `sign_out()`, `current_user() -> optional<user>`.

**BackupSync** — Owns the periodic snapshot of the local SQLite state to a blob in Supabase Storage scoped to the authenticated user. Schedules backups when online and the app is foregrounded; tracks last-successful-backup timestamp surfaced in the UI. On a fresh install with sign-in, drives the explicit restore step (download blob → seed SQLite → done). Does not perform live multi-device sync. Interfaces: `backup_now()`, `restore(user) -> result`, `last_backup_at(user) -> optional<timestamp>`.

### Cross-module rules

- **Local SQLite (via WatermelonDB) is the source of truth.** The cloud backup is a derivative; it never overwrites local state silently.
- **All third-party API calls (LLM, YouTube Data API, article fetches) go through Supabase Edge Functions.** No third-party API keys are bundled into the mobile binary.
- **Restore on first sign-in is explicit.** Users see a clear "restore from backup" step rather than the app silently merging or overwriting whatever's already on the device.
- **One active roadmap per user in v1.** Multiple concurrent roadmaps ("folders") are explicitly out of scope.
- **Sessions reference a roadmap by ID but are not deleted when their roadmap is archived.** This is what makes the lifetime streak calendar work.
- **Streak square fill rule:** any session counts; the date attributed is the date the session *occurred*, not the date it was logged. Color intensity scales with total minutes for that date.
- **AI never inspects material content** — only metadata. The user vouches for relevance of their own materials. This is a deliberate scope boundary that prevents the AI from making fragile content judgments.
- **AI never auto-shifts the schedule.** Re-plan is always user-initiated.
- **No chat UI surface anywhere in v1.** All "AI asks the user" moments use constrained inputs. Optional free-text fields are allowed where their use by downstream logic is bounded (e.g., the "anything else?" note in onboarding, the optional reason note on exceptional-session tagging).
- **Default pace multiplier:** 2.0x. Calibration adjusts per user from "normal" sessions only.
- **Exceptional-pattern threshold:** >40% of last 10 sessions, with a 2-week cooldown after user response.
- **Confirm-dialog threshold:** timer ran >10 min past planned end AND user did not tap End.
- **No real long-running background timer.** Timer state is timestamp arithmetic; the platform's background-execution limits are accepted, not fought.

### Brand & UX framing

The product is **not** marketed or labeled as "AI-powered." There are no AI badges, no robot icons, no "✨" sparkle indicators on AI-generated content. The intelligence is visible in what the app does well (accurate estimates, useful summaries, sharp re-plan options), not in what it calls itself.

## Testing Decisions

All 10 modules get test coverage. Tests target external behavior — what the module *does* from the perspective of its caller — not internal implementation details. A test that breaks when the module is refactored without changing behavior is a bad test.

**MaterialsIngestion** — Test that mixed inputs (URLs of various types + manual entries) return a correctly normalized list with the right types and durations. Test graceful failure for unreachable URLs (per-item structured failure result, not a thrown exception that blocks the batch). Test that YouTube playlists expand to per-video items. Mock the `MaterialsMetadataProxy` Edge Function; the test is about the normalization contract, not network behavior.

**SessionPlanner** — Test that a given set of materials + constraints produces a valid schedule (total estimated time fits the available time, no overcommitment per day, sessions ordered correctly). Test that all three re-plan options (extend / increase pace / reduce scope) produce the right math given a stale plan + actual progress. Test edge cases: zero materials, deadline already past, weekly hours = 0.

**PaceCalibration** — Test that the multiplier updates correctly from normal sessions and ignores exceptional ones. Test that the >40%-of-last-10 detection fires exactly when expected and respects the 2-week cooldown. Test the boundary cases (exactly 40%, exactly 10 sessions, fewer than 10 total sessions). Test each of the three user responses to the recalibration prompt produces the correct calibration state going forward.

**SessionLifecycle** — Test the state machine: start active → end active produces a session outcome; passive log produces an equivalent outcome attributable to a user-chosen date. Test that the confirm dialog is triggered exactly when (timer overrun > 10 min) AND (user did not tap End), and not otherwise. Test that exceptional-tag + note are correctly attached to the outcome. Test that the timestamp-based timer math survives app kill and resume (i.e., elapsed = `now - start_time` is correct after a process restart).

**ProgressEngine** — Property-based testing is a strong fit here: given an arbitrary session log + roadmap, the projection / burn-up / daily-minutes / streak-grid functions should always return internally consistent results (e.g., sum of daily minutes = total logged time; projected finish ≥ today; streak grid totals = sum of session minutes per date).

**WeeklyNarrative** — Test that the prompt construction includes all expected fields from the structured input (no hallucination opportunities through omission). Test the contract end-to-end with a stub LLM: given fixed structured input, generated text is non-empty, within length bounds, and references the right week. Use snapshot/golden tests for prompt construction. Avoid asserting specific LLM output text — that's testing the model, not your code.

**NotificationScheduler** — Test that scheduling a session creates exactly one notification at the correct time (accounting for timezone). Test that completing or rescheduling a session cancels the corresponding notification. Test that the global user toggle suppresses all notifications when off without losing the schedule (so toggling back on restores them).

**OnboardingFlow** — Integration-style test of the orchestration: form submission → processing → 0–3 clarifications → finalize. Test that clarifications fire only on real conflicts (over-allocated materials), and never exceed 3. Test that the finalized roadmap matches the form inputs + clarification answers. Test that manual edits in the preview survive into the final roadmap.

**AuthModule** — Test wrapper logic, not Supabase itself. Test that sign-in success populates `current_user()`, sign-out clears it, and sign-in/sign-out events are emitted. Test that sign-in failures (bad credentials, network error) surface as structured results rather than thrown exceptions. Mock the underlying Supabase client.

**BackupSync** — Test that `backup_now()` produces a snapshot reflecting current SQLite state. Test that `restore(user)` on a fresh device hydrates SQLite from a backup blob. Test that scheduled backups are skipped when offline and resume when online. Test that `last_backup_at` updates only on successful backup completion. Mock both the file-level snapshot and the Supabase Storage client.

There is no existing codebase, so no prior-art tests to mirror. As patterns emerge during implementation, future tests should follow whatever testing conventions get established for the first 1-2 modules built.

## Out of Scope

The following are explicitly deferred to v2 or later:

- **Real multi-device sync** — i.e., live conflict resolution and concurrent edits across devices. v1 has periodic backup blobs only; not the same thing.
- **Multiple concurrent roadmaps per user** ("folders" of topics, each with its own deadline and tracker)
- **File uploads** of any kind (PDFs, DOCXs, images of notes, etc.)
- **Cloud storage integration for source materials** (Google Drive, OneDrive, Dropbox, etc.)
- **Paid / gated course integration** (Udemy, Coursera, LinkedIn Learning) — including reading completion-percentage from those platforms
- **Career-upskilling curriculum inference** — i.e., the app suggesting *what* to learn based on job market data. v1 supports career-switchers only insofar as they bring their own materials, same as students.
- **Coaching-style summaries** that make pattern observations or recommendations ("you consistently overrun video sessions; consider longer blocks"). v1 narratives only verbalize pre-computed facts.
- **Streak-at-risk notifications** and other engagement-driven push notifications
- **User-configurable notification settings page** — v1 ships with a single global on/off only
- **Chat UI** of any kind — including a floating "Ask the AI" surface, mid-session "I'm stuck" help, or chat-style onboarding
- **Mid-session interruptions** by the app (focus check-ins, etc.)
- **Stats / analytics tab** (time-of-day patterns, estimated-vs-actual scatter plots, exceptional-tag breakdowns)
- **Splitting a manual entry into sub-units at planning time** (e.g., per-chapter time estimates for a textbook). v1 supports manual entries only as a single block of estimated time.
- **AI judging the relevance of user-provided materials** — v1 trusts the user's curation completely; the AI does not suggest skipping or reordering based on content analysis.
- **Web app and desktop app** — v1 is mobile (iOS + Android) only.
- **Caching layer for the materials metadata proxy** — v1 calls the proxy fresh per onboarding. URL-keyed caching is a v2 optimization once re-onboarding and shared-URL traffic become real patterns.
- **Account deletion / data export** — UI surfaces for these are deferred to v2; a manual-process backstop must exist for v1 launch but is not a product feature.

## Further Notes

### Decisions made and their rationale

- **Cross-platform mobile via React Native + Expo** was chosen over native Swift/Kotlin (slower to ship two platforms), Flutter (additional language and ecosystem cost), and PWA (notification reliability and background timer behavior are inadequate for the planned UX). Windows-friendliness for development was a hard requirement.
- **Local-first with backup blob** was chosen over real multi-device sync to keep v1 architecture simple and the app instantly responsive offline. Real sync (CRDTs or a sync engine like Replicache/PowerSync) is a v2 architectural decision, not a small retrofit — this is a known forward debt.
- **Supabase** was chosen over Firebase (NoSQL is an awkward fit for the relational data shape) and over rolling a custom backend (auth + storage + edge functions for free is too good to ignore at v1 scale).
- **OpenAI GPT-4o-mini** was chosen over Gemini 2.5 Flash and Claude Haiku on grounds of SDK maturity and ecosystem. At v1 usage volume (one short call per active user per week), the cost difference between providers is rounding error.
- **WatermelonDB + Zustand + TanStack Query** as a three-tool split was chosen over a single state library to keep responsibilities clean: domain data is reactive-from-DB, ephemeral UI state is in-memory, server calls are query-cached.

### Tunable parameters that may need adjustment after beta

- **Default pace multiplier (2.0x).** May be too high or too low for some material types. Reading vs. video may warrant separate defaults in a later iteration.
- **Confirm-dialog overrun threshold (10 min).** Starting guess; tune based on real session data.
- **Exceptional-pattern threshold (>40% of last 10 sessions).** Starting guess; tune based on whether the prompt fires too often or too rarely in real use.
- **Recalibration prompt cooldown (2 weeks).** Starting guess; can be made user-adjustable later if needed.
- **Notification lead time (~10 min before session start).** Could be made user-configurable in a future version, but a single sensible default ships in v1.
- **Backup cadence and trigger.** Starting heuristic: backup on app foreground if last successful backup was >24h ago and the app is online. Tune based on actual session-write rates and storage costs.

### Open design questions deliberately deferred

- **Detailed UI design** — layouts, navigation structure, component-level design. NativeWind tokens and the primitive component set need to be defined before screen building begins, but the *design* of those primitives is a separate exercise.
- **Specific copy and microcopy** — including the exact wording of the recalibration prompt, the weekly narrative tone library, onboarding clarification questions, and the restore-on-new-device prompt. The PRD specifies the *behavior* of these surfaces but not the words.
- **Onboarding screen-by-screen UX** — the shape (form → process → optional clarifications → preview → finalize) is decided; the screen-by-screen UX is not.
- **Analytics / observability strategy** — what events are logged, where they go, how product decisions get instrumented. Not a v1-launch blocker but worth deciding before users arrive.

### Costs at v1 launch

- $0 to develop and test on a developer's own phone via Expo Go.
- $25 one-time Google Play Console registration; $99/year Apple Developer Program (required for store distribution).
- Supabase, OpenAI, and YouTube Data API costs are usage-based and within free tiers for early users; expected to be single-digit dollars per month at hundreds of active users.
