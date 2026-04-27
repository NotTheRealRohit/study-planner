# 05 — Email/password auth

**Type:** AFK
**Source:** Study Tracker v1 PRD

## What to build

The `AuthModule` wrapping Supabase Auth, supporting email + password sign-up, sign-in, and sign-out. This slice establishes the per-user data scope that backup, restore, and the social sign-in slices build on. It exposes a stable `current_user()` interface and emits sign-in / sign-out events that other modules subscribe to.

Local data created on the device prior to the first sign-up (sessions logged via #01, roadmap created via #03) is preserved and associated with the new account on first sign-up — it is **not** discarded.

When an existing user signs in on a fresh device, this slice gives them a signed-in but empty state. The restore flow lands in #08; this slice does not attempt to fetch backed-up data on its own.

## Acceptance criteria

- [ ] A new user can create an account with email + password
- [ ] An existing user can sign in with email + password
- [ ] Sign-in failures (bad credentials, network error, rate limit) surface as structured results — never as thrown exceptions
- [ ] A signed-in user can sign out from an in-app surface
- [ ] After sign-out, returning to the app routes to the sign-in / sign-up screen rather than to a signed-in home
- [ ] `current_user()` returns the signed-in user when authenticated and a clear "no user" sentinel when not
- [ ] Sign-in and sign-out events are emitted on a stable channel that other modules can subscribe to
- [ ] On first sign-up, any local data (sessions, roadmap) created before sign-up is preserved and associated with the new account
- [ ] On sign-in to an existing account on a fresh device, the user lands in a signed-in state with empty local data (restore comes in #08)
- [ ] Tests mock the Supabase client; tests assert wrapper behavior (event emission, structured failures, identity exposure), not Supabase internals

## Blocked by

- #01 — App shell, log a manual session, streak calendar on home
