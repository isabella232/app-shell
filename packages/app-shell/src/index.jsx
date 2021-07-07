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

function getActiveProductFromUrl() {
  const productUrl = window.location.hostname.split('.')[0];
  if (['analyze', 'engage', 'publish'].includes(productUrl)) {
    return productUrl
  }

  return null
}

export const Navigator = ({
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
          activeProduct={getActiveProductFromUrl()}

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
        <Modal
          {...modal}
        />
      </ModalContext.Provider>
    </UserContext.Provider>
  );
};

Navigator.propTypes = {
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

Navigator.defaultProps = {
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
      uri: window.API_GATEWAY_URL,
      credentials: 'include',
      headers: {
        'x-buffer-client-id': 'webapp-account',
      },
    }),
  });

  ReactDOM.render(
    <React.StrictMode>
      <ApolloProvider client={client}>
        <Navigator />
      </ApolloProvider>
    </React.StrictMode>,
    document.getElementById('navigator')
  );
}
