# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What This Repo Is

Pre-implementation planning repo for Study Tracker v1 — a cross-platform mobile app (React Native + Expo, TypeScript) that turns a learner's gathered materials into a paced study roadmap with session tracking, progress visualization, and weekly summaries.

No source code exists yet. The repo contains the PRD, 17 vertical-slice implementation issues, and custom Claude Code skills.

## Key Documents

- `issues/study-tracker-v1-prd.md` — canonical product requirements, architecture decisions, module definitions, testing strategy
- `issues/README.md` — issue dependency graph and slice list
- `issues/01-*.md` through `issues/17-*.md` — individual implementation slices (tracer-bullet order)

## Tech Stack (decided)

- **Mobile:** React Native + Expo + Expo Router (file-system routing) + TypeScript
- **Styling:** NativeWind (Tailwind for RN), custom primitive components (no UI kit)
- **Local DB:** WatermelonDB (reactive SQLite) — source of truth for all domain data
- **UI state:** Zustand — ephemeral only (timer, modals, onboarding step)
- **Server calls:** TanStack Query — backup, LLM proxy, metadata proxy only
- **Backend:** Supabase (Auth, Storage, Edge Functions in Deno)
- **LLM:** OpenAI GPT-4o-mini via Supabase Edge Function (weekly narratives only)
- **Notifications:** expo-notifications; **Keep-awake:** expo-keep-awake

## Architecture: 10 Domain Modules

MaterialsIngestion, SessionPlanner, PaceCalibration, SessionLifecycle, ProgressEngine, WeeklyNarrative, NotificationScheduler, OnboardingFlow, AuthModule, BackupSync. Each has a small public interface defined in the PRD — read `issues/study-tracker-v1-prd.md` § Modules for contracts.

## Cross-Cutting Constraints

These apply to every issue and PR:

- Local SQLite is the source of truth; cloud backup is derivative, never silently overwrites
- All third-party API keys live in Edge Functions, never in the mobile binary
- AI never inspects material content — only metadata
- AI never auto-shifts the schedule; re-plan is always user-initiated
- No chat UI, no "AI-powered" branding, no robot icons or sparkle indicators
- All user decision points use constrained inputs (multi-choice, sliders, dates), not free-text
- Sessions reference roadmaps by ID but survive roadmap archival (enables lifetime streak calendar)
- Streak date = occurrence date, not logged date; any session counts; color intensity scales with minutes
- Timer is timestamp-based (`now - start_time`), not a long-running JS timer
- One active roadmap per user in v1

## Development Methodology

- **Tracer bullet:** Issue #01 is the end-to-end architecture proof (Expo + NativeWind + WatermelonDB + reactive queries). Every later slice adds one capability without re-architecture.
- **TDD:** Red-green-refactor through public module interfaces. Tests target external behavior, not internals. See `.claude/skills/tdd/` for the full methodology.
- **Vertical slices:** Each issue ships independently. Follow the dependency graph in `issues/README.md`.

## Issue Dependencies

#01 (shell) is the root. #03 (onboarding) and #05 (auth) are the two main branches. Apple Sign-In (#06) is the only human-in-the-loop slice. #06 and #07 must ship together on iOS (Apple review rule).

## Tunable Parameters

Default pace multiplier: 2.0x · Overrun confirm threshold: 10 min · Exceptional-pattern trigger: >40% of last 10 sessions · Recalibration cooldown: 2 weeks · Notification lead time: ~10 min · Backup trigger: >24h since last + online + foregrounded
