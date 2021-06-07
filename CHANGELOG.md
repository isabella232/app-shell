# Changelog
## [2.10.2] - 2021-06-07

- fix Pubish upgrade CTAs

## [2.10.1] - 2021-06-03

- fix start trial menu CTA it now opens the start trial modal

## [2.10.0] - 2021-06-02

- default plan selector to annual pricing when upgrading
- Remove the "You will be charged after trial" message from the plan selector
- Plan selector tweaks, depends on bufferapp/core-authentication-service#1008
- Optimize UX for Invoice access in the Plan Selector
- Persistent CTAs in top nav for OB/MP
- Add Invite your Team CTA to Appshell

## [2.9.4] - 2021-05-17

- fixes the subscription.trial, and subscription.interval fields

## [2.9.3] - 2021-05-17

- remove the trial field from MPBilling, to patch the failing query

## [2.9.2] - 2021-05-17

- add isFreePlan trait to identify

## [2.9.1] - 2021-05-13

- fix account query by removing the subscription interval field

## [2.9.0] - 2021-05-13

- Add Segment tracking

## [2.8.7] - 2021-05-12

- automatically hides the org switcher tooltip (list of connected channels) if
  no channels are passed as props

## [2.8.6] - 2021-04-27

- fix: update copy in Trial banner to read 'Essentials + Team Pack' instead of Team

## [2.8.5] - 2021-04-13

- fix: Plan Selector → Design feedback tweaks
- fix: Billing Screen → The summary box is looking pretty squashed here compared to the plan selector screen
- fix: vertical centering of the modals

## [2.8.4] - 2021-04-13

- fix borders in plan selector to prevent jumping
- change images for confirmation modal
- start trial and confirmation modal copy changes

## [2.8.3] - 2021-04-12

- fix payment method modal submit on Enter key press

## [2.8.2] - 2021-04-12

- Show all trial users the summary note that they won't be charged till the end of their trial
- fix stripe copy in payment method

## [2.8.1] - 2021-04-12

- Rename individual plan to essentials

## [2.8.0] - 2021-04-12

- moves the start trial logic to a hook and exposes it on the app-shell for 1 click trial starts

## [2.7.5] - 2021-04-12

- Plan selector QA fixes:
  - fix spacing and button copy in Start Trial modal
  - tweaks to the trial banner display logic (show on trial, to admins, when there's not billing info)
  - style tweaks to the plan selector cards and summary
  - summary logic tweaks to summary note
  - small copy fixes

## [2.7.4] - 2021-04-12

- fix: Default null data to avoid failing during cache update

## [2.7.3] - 2021-04-07

- fix: No error message displayed when the very first API call (createSetupIntent) errors
- fix: Confirm Payment Details CTA remains disabled after an error
- fix: Uncaught TypeError: Cannot read property 'billingStartTrial' of undefined

## [2.7.2] - 2021-04-07

- Only redirects to login if account has unauthenticated error

## [2.7.1] - 2021-04-07

- Fetches the organization feature flips and MP subscriptions

## [2.7.0] - 2021-04-06

- Returns typed errors for billing mutations

## [2.6.10] - 2021-04-06

- Render plan selector when awaiting user action
- Use camel case names for tracking CTAs
- Extract app CTA from url

## [2.6.9] - 2021-04-05

- show trial banner only for OB users

## [2.6.8] - 2021-04-01

- default to global Stripe Key

## [2.6.7] - 2021-04-01

- Stripe production key
- rendering plan selector from URL
- rendering payment method from URL
- payment method top level error style

## [2.6.6] - 2021-04-01

- Dislpay downgraded to Free plan message in the plan selector

## [2.6.5] - 2021-03-29

- adds isUpgradeIntent to upgrade CTA in navbar

## [2.6.4] - 2021-03-29

- Plan selector QA fixes:
  - if isAwaitingUserAction allow the user to confirm a free plan
  - summary tweaks on the plan selector and payment method
  - adds absolute savings to toggle
  - copy tweaks and trial tweaks
  - renders 2 planOptions if the intent is to upgrade

## [2.6.3] - 2021-03-25

- Change account redirect error from 400 to 401

## [2.6.2] - 2021-03-25

- Add missing field in account query

## [2.6.0] - 2021-03-24

- Redirect account 400 error to login

## [2.5.1] - 2021-03-24

- Add missing fields in account query

## [2.5.0] - 2021-03-23

- Remove Apollo Client from dependencies
- Change SetCurrentOrganization to update cache manually

## [2.4.3] - 2021-03-23

- Plan selector QA fixes:
  - updates header, CTA and summary status during trial
  - update button copy considering payment detail availability
  - update confirmation modal cta message
  - update header label copy
  - update card footer copy
  - removes price footer from free plans
  - makes plan cards narrower
  - billing interval toggle disappears on free plan
  - stop requesting summary warning

## [2.4.2] - 2021-03-17

- Plan selector QA fixes:
  - open selector properly if on free plan
  - billing and confirmation header margins
  - bigger, bolder price in summary
  - blue highlight if interval is chaning
  - higher res confirmation image background

## [2.4.1] - 2021-03-17

- Plan selector QA fixes:
  - add if plan is plan or trial
  - recognize when billing interval changes
  - bolder fonts
  - thicker borders
  - fixes alignment
  - fixes summary bullet points
  - updates the downgrade notice

## [2.4.0] - 2021-03-16

- add confirmation screen

## [2.3.1] - 2021-03-11

- add a loading state to Plan Selector in case user info isn't there yet

## [2.3.0] - 2021-03-10

- Update @bufferapp/ui to 5.62.3
- add PlanSelector modal

## [2.2.0] - 2021-03-09

- Update @bufferapp/ui to 5.60.1
- add PaymentMethod modal

## [2.1.0] - 2021-02-04

- Add canAccess\* flags to the organizations an account belongs to:
  - `canAccessAnalytics`
  - `canAccessEngagement`
  - `canAccessPublishing`

## [2.0.0] - 2021-02-04

- Add global organization switcher
- Breaking change: Added dependency with Apollo: now the AppShell needs to be
  rendered within
  an `ApolloProvider` compotent to be able to trigger its own queries and
  mutations.

## [1.1.1] - 2021-01-21

- Update `Engagement` URL.

## [1.1.0] - 2021-01-20

- Remove requirement for `engageRollout` feature flip.
- Rename links on navigation bar.

## [1.0.6] - 2020-12-01

- Fix function binding error when trying to close `Banner`

## [1.0.5] - 2020-11-15

- Re-publishing to NPM with correct version.

## [1.0.4] - 2020-11-18

- Allow tooltip message for org switcher to be hidden.

## [1.0.3] - 2020-11-10

- Refactor appendOrgSwitcher function.

## [1.0.2] - 2020-11-09

- Fix org switcher menu items.

## [1.0.1] - 2020-10-28

- Replace empty channels copy in org switcher.

## [1.0.0] - 2020-10-21

- First release. 🎉
