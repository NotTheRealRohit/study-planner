# 06 — Apple Sign-In

**Type:** HITL
**Source:** Study Tracker v1 PRD

## What to build

Adds Sign In with Apple as an authentication option on iOS. This is marked HITL because completing it requires human-in-the-loop steps that can't be automated:

- Enrollment in the Apple Developer Program ($99/year)
- Configuring the Sign In with Apple capability in the app's provisioning profile
- Configuring the Apple provider in the Supabase Auth dashboard
- App Store review compliance: per Apple's rules, **if any other social sign-in is offered on iOS, Sign In with Apple must also be offered.** This means slice #06 (Apple) and slice #07 (Google) are paired on iOS — shipping Google without Apple risks rejection at review.

A first-time Apple sign-in creates a new account; a returning Apple sign-in resolves to the existing account. Sign-out behaves identically to email/password from #05.

## Acceptance criteria

- [ ] User can sign in with Apple from the sign-in / sign-up screens on iOS
- [ ] The Apple Sign-In button is offered on iOS whenever any other social sign-in is offered (App Store rule compliance)
- [ ] A first-time Apple sign-in creates a new account in Supabase
- [ ] A returning Apple sign-in resolves to the existing account
- [ ] Sign-out from an Apple-authenticated session works identically to email/password
- [ ] Apple Developer Program enrollment is in place (HITL)
- [ ] Sign In with Apple capability is configured on the iOS app (HITL)
- [ ] Apple provider is configured in Supabase Auth (HITL)
- [ ] On Android, this option is hidden — Apple Sign-In is iOS-only in v1

## Blocked by

- #05 — Email/password auth
