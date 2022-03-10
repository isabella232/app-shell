# @bufferapp/app-shell

Buffer's Navigator for our front-end applications.


## Usage
The `Navigator` is distributed as a self contained JS file, served from `https://components.buffer.com/navigator`.
To ensure that all the Produt Apps are running the same version the file, is automatically updated every time a new commit is pushed into the main branch.

To consume the `Navigator` you will need to have a `#navigator` div right on top of the app `#root` div, and declare some style and the `API_GATEWAY_URL`.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <!-- This style reset is required for all Apps to make sure we are not seeing any glitch on load -->
    <style type="text/css">
      #navigator {
        display: flex;
        flex-direction: column;
        min-height: 64px;
        max-height: 105px;
      }

      #root {
        background-color: #F5F5F5;
        display: flex;
        flex-direction: column;
        height: 100%;
        margin: 0;
        overflow: auto;
      }
    </style>
  </head>
  <body>
    <!-- This is the div used to render the Navigator -->
    <div id="navigator"></div>
    <!-- This is the div used to render the App -->
    <div id="root"></div>

    <!-- Define the URL for the APIs Gateway used by the App Shell -->
    <script type="text/javaScript">
      window.API_GATEWAY_URL= "https://graph.local.buffer.com";
    </script>
    <script src="https://components.buffer.com/navigator.js" async></script>
  </body>
</html>
```

## Listening to Organization changes Events in a Product App
The Navigator is dispatching custom events on the window object. The key to those events are accessible in `window.appshell.eventKeys`.
To react to Organization changes events in the App the easiest option is to listen to those events in a React Hook

```jsx
  useEffect(() => {
    const { ORGANIZATION_EVENT_KEY } = window?.appshell?.eventKeys || {};

    function handleOrgChange({ detail }) {
      // Action will be present if we are dispatching an organization change event from the App
      if (!detail.action) {
        console.log(detail.OrganizationId);
        // handle the change in here, for example refetch the account query
      }
    }

    window.addEventListener(ORGANIZATION_EVENT_KEY, handleOrgChange);

    return function cleanup() {
      window.removeEventListener(ORGANIZATION_EVENT_KEY, handleOrgChange);
    };
  }, []);
```

It's also possible to listen to updates on the current organization billing, for example trial starts, by filtering for event action type 

```jsx
  useEffect(() => {
    const { ORGANIZATION_EVENT_KEY } = window?.appshell?.eventKeys || {};
    const { billingUpdated } = window?.appshell?.actionKeys || {};

    function handleOrgChange({ detail }) {
      if (detail.action === billingUpdated) {
        // handle the change in here, for example refetch the account query
      }
    }

    window.addEventListener(ORGANIZATION_EVENT_KEY, handleOrgChange);

    return function cleanup() {
      window.removeEventListener(ORGANIZATION_EVENT_KEY, handleOrgChange);
    };
  }, []);
```

## Change the Organization from the AppShell
The Navigator is also exposing a series of actions in the `window.appshell.actions` object.
One of those actions allow the Apps to trigger an Organization change.

```jsx
  const { actions } = window?.appshell || {};
  actions.setCurrentOrganization(newOrganizationId);
```

## Opening Modals from a Product App

1. Hash in the URL:
To use the plan selector or payment method modal with a hash in the URL, include #planSelector or #paymentMethod on the URL. This will open the desired modal on page load

2. Using actions:
To open the modal from a CTA, you can use actions:
```jsx
const { actions, MODALS } = window?.appshell || {};

const ModalTesting = () => (
  <ModalContext.Consumer>
    {modal => (
      <button onClick={
        () => {actions.openModal(MODALS.paymentMethod, { cta: 'upgradePlan', ctaButton: 'renderModal' isUpgradeIntent: false })}
      }>Render Modal</button>
    )}
  </ModalContext.Consumer>
)
```
#### Using CTAs for tracking
In the method above, you'll notice that openModal accepts an object as a second paramater. The cta property is used for tracking. Use it when possible to allow for accurate tracking in Segment

#### Using intentions
Some places in our apps, the user's intent is to upgrade from Trial or from Free. For that, we only want to show 2 plan options (Essentials and Team) instead of 3. For these CTAs, pass in `isUpgradeIntent : true` as part of the second paramater in openModal:
```jsx
<button onClick={
    () => {modal.openModal(MODALS.paymentMethod, { cta: 'upgradePlan', ctaButton: 'upgradePlan', isUpgradeIntent: true })}
  }>
  Upgrade
</button>
```

## Redering components in Product App

```jsx
const ComponentHolder = () => {
  useEffect(() => {
    const { COMPONENTS, actions } = window?.appshell || {}
    actions.renderComponent({
      containerId: 'startTrialOnboardingCta',
      componentKey: COMPONENTS.startTrialButton,
      cta: 'startTrial',
      ctaButton: 'account-onboarding-startTrial-1',
    })
  }, [])

  return (<div id="startTrialOnboardingCta" />)
}
```

## Contributing

* Clone this repo and make your changes.

```
git clone git@github.com:bufferapp/app-shell.git
```

* Ensure your editor is setup for ESLint and Prettier.
* Make and test your changes locally (docs for this TBD, contact @hamstu in the meantime).
* Make a pull request and have it reviewed and merged into `main`.
* Once deployed, this will update the js file at `https://components.buffer.com/navigator`, and each of the products will automatically use the new version with your merged changes

## Local development

### Running the Navigator, in dev mode, against the local environment

1. You will need to run the API Gateway and login services on `buffer-dev`: `./dev up api-gateway login`
2. Run `yarn watch` in this root directory
3. visit `https://appshell.local.buffer.com:3000`

_note: you will need to manually trust the certificate, if `navigator.js` is not loading you will also need to trust the certificate for that one, you can do that by visiting `https://appshell.local.buffer.com:8085/main.js`_

### Running the Navigator, in dev mode, against production
1. go to https://login.buffer.com/ and login with your production account (impersonation will also work).
2. from the root folder run `yarn watch-production`
3. visit `https://appshell.local.buffer.com:3000`

### Storybook

We use Storybook for isolating components and allowing us to work on each component one at a time

To run Storybook navigate to `/packages/app-shell` and run `yarn storybook`

## Testing
We have two types of testing, unit tests, and UX tests.
Unit tests use [Jest ](https://jestjs.io/), and can be run with `yarn run test` or  `yarn run test:watch`.
UX tests use [Cypress](https://docs.cypress.io/), and can be run with `yarn run test:ux` or `yarn run test:ux:live` for Cypress live mode.

### UX testing
UX testing are integration tests meant to ensure that the entire app behaves as expected in its entirety on all the various scenarios (Account types, billing states, …).
![Navigator tetst](https://user-images.githubusercontent.com/992920/129117558-c4854e38-4ba2-4bc2-a4cb-be02cbf9d1f7.png)

All integrations tests are contained in the `./cypress/integration` folder.

#### What to test
- We want to tests complex core flows. For example: that a specifix CTA is properly showing for a subset of users, or that the billing flow can be fully executed.
- do not test for a specific copy. This type of tests are quite brittle, on honestly not that useful. Instead, use static `#ids` to test for the presence of a specific component
Ex:
```js
    it('has an invite team CTA', () => {
      cy.get('#inviteTeamCTA')
        .should('exist')
    })
```

- do not test the entire APIs flow (login, user fetching). While those tests can be very valuable (we have Synthetic tets in DD for those), they are outside of the scope of what we want to test for in a PR, also  they are more expensive to run, and cumbersome to maintain. To avoid that you can leverage `cy.intercept` and fixtures to skip APIs request and return mocked data.

Ex:
```js
    // All GraphQL request for the tests will return the account mock
    before(() => {
      cy.fixture('accountObFree').then(account => {
        cy.intercept('POST', 'https://graph.buffer.com/', {
          status: 200,
          body: account,
        })
        cy.visit('/')
      })
    })
```
_Please read Cypress's [Working with GraphQL](https://docs.cypress.io/guides/testing-strategies/working-with-graphql) guide for more details on mocking strategies._

### Troubleshooting

If you spot any issues with your local setup, ping @msanroman any time!

#### TypeError: Cannot read property 'account' of undefined

![https://cln.sh/fwcvzd](https://cleanshot-cloud-fra.s3.eu-central-1.amazonaws.com/media/4280/aZROl1zdvDW8L1MGQ00AOVPG7DVN4X4H1v0S4jXP.jpg?X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaDGV1LWNlbnRyYWwtMSJHMEUCIQCfVQXNg0l1UunpBKOdNFXhh8oIDlGYScM7RjNW1vsCjwIgB9fmpqKH1HojKoGvdzrPCGf6QKH1TCihhyNtxQQ18GIq4gEIlf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw5MTk1MTQ0OTE2NzQiDBqmpcht5iL6j%2F5EyCq2ATTVO4tG4%2FgfUDyuRZX0DjE%2FQD%2FTcHslztoJ2xsbUpqCWk4ludx5dx%2F6y90OUvjtE62TwoAXFV%2F0jEq26uE3lQAMjoygG42XWdT5cS7LOd%2BturaTc2rVSKzQBkxTq2ktUKzyyZPwqOn%2BKCxowz7T43OoOQ%2FEj%2FXO5b5M2zjq8qR%2BW4raHffwiz7S6D7MOK14ARKCMEWulOKltJtqe5MPWb%2B1JuL30R3u10V36epjF%2BOBVMB%2FMytSMOqkwIEGOuABnCkPaJQZXOoP9AQ%2BFZvqRqeWqTwO6woGkvOB1oC6A7RF2U601mUl6sA4%2BRc74bfopBDTbKvDXVuCgz7ECp5XrEQ1lJbsXJjxHiAI4HULNmxjh4Nxf4GUEsK%2BaZjzO0zGc7TrxKUt%2BUHAFLph%2Bo%2F%2FvJFsembdOsdnVXJYsf%2FHQU3hWMeJzuyvWpt1nHyQp5sUPqOGFLsVj2II0%2F2gkmf%2FrAty8U9ylmV6BUtyfjhPVXbj%2B%2FZgVxyhVxFMAFlNCwwUuQgal1xwHnxnRL%2BWpPWPT61SjhSDtiiALmpfAXlSjWM%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=ASIA5MF2VVMNOJHXCA5D%2F20210219%2Feu-central-1%2Fs3%2Faws4_request&X-Amz-Date=20210219T210422Z&X-Amz-SignedHeaders=host&X-Amz-Expires=300&X-Amz-Signature=824251448427a3f4afc7c1e10f85c279811000948894c7e78d250f4d0a8c3113)

This is likely a local session issue. Heading to https://login.local.buffer.com and signing up should make it work!

#### I get a DNS_PROBE_FINISHED_NXDOMAIN when trying to load https://appshell.local.buffer.com:3000

This is likely that you don't have the domain on your `/etc/hosts` file. Updating your `buffer-dev-config` setup and running `./dev up` again should 
fix it!
