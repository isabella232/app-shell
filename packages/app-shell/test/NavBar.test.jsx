import React from 'react';
import { MockedProvider } from '@apollo/client/testing';
import {
  act,
  fireEvent,
  leftClick,
  render,
  screen,
} from '@testing-library/react';
import { UserContext } from '../src/index';
import { account as mockAccount } from './mocks/account';
import NavBar from '../src/NavBar';
import {
  QUERY_ACCOUNT,
  SET_CURRENT_ORGANIZATION,
} from '../src/graphql/account';

let mutationCalled = false;

function renderNavBarWithAccount(account) {
  render(
    <MockedProvider
      mocks={[
        {
          request: {
            query: SET_CURRENT_ORGANIZATION,
            variables: {
              organizationId: 2,
            },
          },
          result: () => {
            mutationCalled = true;
            return null;
          },
        },
      ]}
    >
      <UserContext.Provider value={account}>
        <NavBar />
      </UserContext.Provider>
    </MockedProvider>
  );
}

describe('NavBar', () => {
  describe('Organization switcher', () => {
    it('renders returning global organizations', async () => {
      renderNavBarWithAccount(mockAccount);
      for (const organization of mockAccount.organizations) {
        // eslint-disable-next-line no-await-in-loop
        const foundOrganization = await screen.findByText(organization.name);
        expect(foundOrganization).toBeTruthy();
      }
    });
    it('does not render org switcher if there is only one organization', async () => {
      const accountWithOneOrganization = {
        ...mockAccount,
        organizations: [
          {
            id: '1',
            name: 'My only organization',
          },
        ],
      };

      renderNavBarWithAccount(accountWithOneOrganization);
      const foundOrganization = await screen.queryByText(
        'My only organization'
      );
      expect(foundOrganization).toBeNull();
    });

    // describe ('changing organizations', () => {
    //   let mutationCalled = false
    //   beforeEach(() => {
    //     mutationCalled = false
    //   })
    //   function renderNavBarWithMutation(account, onOrganizationSelected) {
    //     render(
    //       <MockedProvider mocks={[{
    //         request: {
    //           query: SET_CURRENT_ORGANIZATION,
    //           variables: {
    //             organizationId: account.organizations[1].id,
    //           }
    //         },
    //         result: () => {
    //           mutationCalled = true;
    //           return {}
    //         },
    //       }, {
    //         request: {
    //           query: QUERY_ACCOUNT
    //         },
    //         result: {
    //           account: {
    //             ...account,
    //             organizationSelected: {
    //               name: account.organizations[1].name,
    //               id: account.organizations[1].id,
    //             }
    //           }
    //         }
    //       }]}>
    //         <UserContext.Provider value={account}><NavBar onOrganizationSelected={onOrganizationSelected}/></UserContext.Provider>
    //       </MockedProvider>,
    //     );
    //   }

    //   async function selectOrganizationByName(organization) {
    //     fireEvent.click(screen.getByText(organization), leftClick)
    //     await act(() => new Promise(resolve => setTimeout(resolve, 0)));
    //   }

    //   it('selecting another organization stores the selected organization', async () => {
    //     renderNavBarWithMutation(mockAccount, () => {})
    //     await selectOrganizationByName(mockAccount.organizations[1].name)
    //     expect(mutationCalled).toBeTruthy()
    //   })

    //   it('selecting another organization triggers the passed callback as a prop', async () => {
    //     const onOrganizationSelected = jest.fn()
    //     renderNavBarWithMutation(mockAccount, onOrganizationSelected)

    //     await selectOrganizationByName(mockAccount.organizations[1].name)

    //     expect(onOrganizationSelected).toHaveBeenCalledWith(mockAccount.organizations[1].id)
    //   })

    //   it('cannot select the currently selected organization', async() => {
    //     const onOrganizationSelected = jest.fn()
    //     renderNavBarWithMutation(mockAccount, onOrganizationSelected)

    //     await selectOrganizationByName(mockAccount.organizations[0].name)

    //     expect(onOrganizationSelected).not.toHaveBeenCalledWith(mockAccount.organizations[0].id)
    //     expect(mutationCalled).toBeFalsy()
    //   })
    // })
  });
});
