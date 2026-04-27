# 07 — Google Sign-In

**Type:** AFK
**Source:** Study Tracker v1 PRD

## What to build

Adds Sign In with Google as an authentication option on iOS and Android. This is straightforward Supabase Auth provider configuration plus an OAuth client set up in the Google Cloud console — no human gating beyond the standard one-time provider configuration.

A first-time Google sign-in creates a new account; a returning Google sign-in resolves to the existing account. Sign-out behaves identically to email/password from #05.

**Pairing note:** On iOS, this slice should ship together with #06 (Apple Sign-In). Apple's App Store review rule requires that if any other social sign-in is offered, Sign In with Apple must also be offered. Shipping Google to iOS without Apple risks rejection. The two are still split as separate issues because they have different infrastructure and HITL profiles, but their iOS rollout should be coordinated.

## Acceptance criteria

- [ ] User can sign in with Google from the sign-in / sign-up screens on both iOS and Android
- [ ] A first-time Google sign-in creates a new account in Supabase
- [ ] A returning Google sign-in resolves to the existing account
- [ ] Sign-out from a Google-authenticated session works identically to email/password
- [ ] Google OAuth client is configured in the Google Cloud console (one-time setup)
- [ ] Google provider is configured in Supabase Auth (one-time setup)
- [ ] iOS rollout is coordinated with #06 — Google is not visible on iOS unless Apple Sign-In is also visible

## Blocked by

- #05 — Email/password auth
