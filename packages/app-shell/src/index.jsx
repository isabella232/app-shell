/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import { ApolloProvider, ApolloClient, InMemoryCache, useQuery, HttpLink } from '@apollo/client';
import ReactDOM from 'react-dom';

import NavBar, { getLogoutUrl } from './NavBar';
import Banner from './Banner';
import Modal from './Modal/index';
import { UserContext } from './context/User';
import { ModalContext } from './context/Modal';
import useModal, { MODALS } from './hooks/useModal';
import { QUERY_ACCOUNT } from './graphql/account';
import useUserTracker from './hooks/useUserTracker';

import {
  SidebarWrapper,
  Wrapper,
} from './style';


/**
 * The AppShell component is a general purpose wrapper for all of our applications. At the moment it's primarily a wrapper for the `NavBar` component. Check out the example below to see how to integrate it into your app.
 */
export const AppShell = ({
  activeProduct,
  helpMenuItems,
  sidebar,
  bannerOptions,
  onLogout,
  displaySkipLink,
  onOrganizationSelected,
  menuItems,
  ignoreMenuItems,
  apolloClient,
  channels,
}) => {
  const graphqlConfig = apolloClient
    ? {
        client: apolloClient,
      }
    : {};
  const { data, loading, error } = useQuery(QUERY_ACCOUNT, graphqlConfig);
  window.__userData = {
    data,
    loading,
    error,
  }

  const user =
    loading || !data
      ? {
          name: '...',
          email: '...',
          products: [],
          featureFlips: [],
          organizations: [],
          currentOrganization: {},
          isImpersonation: false,
          loading: true,
        }
      : {
          ...data.account,
        };
  useUserTracker(user)

  const networkErrors = error?.networkError?.result?.errors;
  if (
    networkErrors?.some((err) => err.extensions?.code === 'UNAUTHENTICATED')
  ) {
    window.location.assign(getLogoutUrl(window.location.href));
  }

  const modal = useModal();

  let isActiveTrial;
  let trialBannerString;
  //in human: is OB, is admin, doesn't have payment details
  if (
    user.currentOrganization?.isOneBufferOrganization &&
    user.currentOrganization?.canEdit &&
    !user.currentOrganization?.billing.paymentDetails.hasPaymentDetails
  ) {
    isActiveTrial =
      user.currentOrganization?.billing?.subscription?.trial?.isActive;
    if (isActiveTrial) {
      const planName =
        user.currentOrganization?.billing?.subscription?.plan?.name;
      const daysRemaining =
        user.currentOrganization?.billing?.subscription?.trial?.remainingDays;
      trialBannerString = `You are on the ${planName === 'Team' ? 'Essentials + Team Pack' : planName} trial with ${daysRemaining} ${
        daysRemaining === 1 ? 'day' : 'days'
      } left. Add a billing method to keep access after your trial expires.`;
    }
  }

  return (
    <UserContext.Provider value={user}>
      <ModalContext.Provider value={modal}>
        <NavBar
          activeProduct={activeProduct}
          helpMenuItems={helpMenuItems}
          menuItems={menuItems}
          ignoreMenuItems={ignoreMenuItems}
          onLogout={onLogout}
          displaySkipLink={displaySkipLink}
          onOrganizationSelected={onOrganizationSelected}
          graphqlConfig={graphqlConfig}
          channels={channels}
        />
        {isActiveTrial && (
          <Banner
            text={trialBannerString}
            actionButton={{
              label: "Let's do this",
              action: () =>
                modal.openModal(MODALS.planSelector, {
                  cta: 'Render Modal',
                  isUpgradeIntent: true,
                }),
            }}
          />
        )}
        {bannerOptions && <Banner {...bannerOptions} />}
        <Wrapper>
          {sidebar && <SidebarWrapper>{sidebar}</SidebarWrapper>}
        </Wrapper>
        <Modal
          {...modal}
          isAwaitingUserAction={
            data
              ? data.account.currentOrganization.billing.subscription?.trial
                  ?.isAwaitingUserAction
              : null
          }
        />
      </ModalContext.Provider>
    </UserContext.Provider>
  );
};

AppShell.propTypes = {
  /** The list of features enabled for the user */
  featureFlips: PropTypes.arrayOf(PropTypes.string),

  /** The currently active (highlighted) product in the `NavBar`. */
  activeProduct: PropTypes.oneOf(['publish', 'analyze', 'engage']),

  /** Menu items to show in the help menu */
  helpMenuItems: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      component: PropTypes.node,
      hasDivider: PropTypes.bool,
      onItemClick: PropTypes.func,
    })
  ),

  /** (Optional) Your sidebar component. */
  sidebar: PropTypes.node,

  /** (Optional) Content of banner displayed below the navbar */
  bannerOptions: PropTypes.shape({
    text: PropTypes.string,
    actionButton: PropTypes.shape({
      label: PropTypes.string,
      action: PropTypes.func,
    }),
    customHTML: PropTypes.shape({ __html: PropTypes.string }),
  }),

  /** (Optional) Callback to be called before logout */
  onLogout: PropTypes.func,

  /** (Optional) Is the current session an impersonation session */
  isImpersonation: PropTypes.bool,

  displaySkipLink: PropTypes.bool,

  /** Optional menu for selecting the user's organization */
  orgSwitcher: PropTypes.shape({
    title: PropTypes.string.isRequired,
    menuItems: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        selected: PropTypes.bool.isRequired,
        onItemClick: PropTypes.func,
      })
    ).isRequired,
  }),
  onOrganizationSelected: PropTypes.func,
  apolloClient: PropTypes.instanceOf(ApolloClient),
  channels: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      service: PropTypes.string.isRequired,
      organizationId: PropTypes.string.isRequired,
    })
  ),
};

AppShell.defaultProps = {
  featureFlips: [],
  sidebar: null,
  activeProduct: undefined,
  bannerOptions: null,
  onLogout: undefined,
  helpMenuItems: null,
  isImpersonation: false,
  displaySkipLink: false,
  orgSwitcher: undefined,
  onOrganizationSelected: () => {},
  apolloClient: undefined,
  channels: [],
};

export { UserContext, useUser } from './context/User';
export { ModalContext } from './context/Modal';
export { default as useStartTrial } from './hooks/useStartTrial';
export { default as useOrgSwitcher } from './hooks/useOrgSwitcher';
export { MODALS } from './hooks/useModal';

export default () => {
  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
      uri: GRAPHQL_API,
      credentials: 'include',
    }),
  });

  ReactDOM.render(
    <React.StrictMode>
      <ApolloProvider client={client}>
        <AppShell />
      </ApolloProvider>
    </React.StrictMode>,
    document.getElementById('appShell')
  );
}
