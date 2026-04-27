# 04 — URL-based material ingestion (YouTube + articles)

**Type:** AFK
**Source:** Study Tracker v1 PRD

## What to build

Adds URL pasting to onboarding so users can bring in YouTube videos, YouTube playlists, and web articles alongside manual entries. URLs are resolved through a Supabase Edge Function (`MaterialsMetadataProxy`) that wraps the YouTube Data API v3 (for videos and playlists) and a fetch + Mozilla Readability pipeline (for articles). All third-party API keys live in the Edge Function environment, never bundled in the mobile binary.

Failures are handled gracefully per item — a single dead link or paywalled article does not block the rest of the batch. The user is offered a manual-fallback form (title + rough length) for any URL that couldn't be resolved.

After this slice, the full onboarding mix works: any combination of YouTube URLs, playlist URLs, article URLs, manual entries, and per-item fallbacks for failed URLs.

## Acceptance criteria

- [ ] During onboarding, user can paste a list of URLs in addition to manual entries
- [ ] YouTube video URLs are resolved to title + duration via the proxy
- [ ] YouTube playlist URLs are expanded into per-video items in the materials list
- [ ] Article URLs are resolved to title + reading-time estimate via the proxy
- [ ] Each resolved URL becomes a normalized item in the same list shape as manual entries — downstream `SessionPlanner` does not distinguish them
- [ ] A URL that fails to resolve (paywall, dead link, timeout, blocked, unsupported) produces a structured per-item failure
- [ ] A per-item failure prompts the user to fill in title + rough length manually; the failure does not abort the batch
- [ ] The full mix works in a single onboarding session: some URLs succeed, some are filled in manually, some are pure manual entries
- [ ] No third-party API keys are present in the mobile binary (verified by repo grep + binary inspection)
- [ ] The Edge Function and the mobile-side `MaterialsIngestion` module both have tests covering normalization and failure handling

## Blocked by

- #03 — Onboarding form + roadmap with manual-entry materials only
