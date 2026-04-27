# 08 — Periodic backup blob + explicit restore on new device

**Type:** AFK
**Source:** Study Tracker v1 PRD

## What to build

The `BackupSync` module. When the user is signed in, online, and the app is foregrounded, periodically (default: at most once per 24h since last successful backup) snapshot the local SQLite database and upload it to Supabase Storage as a single blob scoped to the authenticated user via row-level security. The last-successful-backup timestamp is surfaced in the UI ("backed up 2 hours ago") so the user has confidence their data is safe.

On a fresh install with sign-in to an existing account, the user sees an **explicit** restore prompt — not silent merge, not silent overwrite. Choosing "restore" downloads the latest blob and seeds local SQLite from it. Choosing "skip restore" leaves local state empty (signed in, fresh).

**Restore is the only way the cloud blob ever overwrites local state.** This is the rule that makes "local-first" trustworthy. No live multi-device sync — that's explicitly v2.

## Acceptance criteria

- [ ] When signed in, online, and foregrounded, a backup is performed at most once per 24 hours since last successful backup
- [ ] The backup is a snapshot of the local SQLite database, uploaded as a single blob scoped to the authenticated user
- [ ] A "last backed up" timestamp is visible in the UI and updates only on successful backup completion
- [ ] If a backup attempt fails (network error, auth error, server error), the timestamp does not update and the next attempt is rescheduled
- [ ] Backups are skipped when offline; backup attempts resume automatically when network returns
- [ ] On a fresh install with sign-in to an existing account, the user sees an explicit restore prompt — never silent merge or silent overwrite
- [ ] Choosing "restore" downloads the latest backup blob and seeds the local SQLite database from it
- [ ] Choosing "skip restore" leaves local state empty
- [ ] Restore is the only flow that ever overwrites local state from the cloud blob
- [ ] Tests cover: snapshot reflects current state; restore hydrates state; offline backups are skipped and resumed; `last_backup_at` semantics

## Blocked by

- #05 — Email/password auth
