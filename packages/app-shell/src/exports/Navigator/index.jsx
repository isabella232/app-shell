/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  useQuery,
  HttpLink,
} from '@apollo/client';
import ReactDOM from 'react-dom';
import { FeaturesWrapper } from '@bufferapp/features';

import NavBar, { getLoginUrl } from '../../components/NavBar';
import Banner from '../../components/Banner';
import Modal from '../../components/Modal/index';
import { UserContext } from '../../common/context/User';
import { ModalContext } from '../../common/context/Modal';
import useModal, { MODALS } from '../../common/hooks/useModal';
import { QUERY_ACCOUNT } from '../../common/graphql/account';
import useUserTracker from '../../common/hooks/useUserTracker';
import useEmailVerification from '../../common/hooks/useEmailVerification';
import getTrialBannerCopy from './getTrialBannerCopy';
import ErrorBoundary from './ErrorBoundary';
import EmailVerificationBanner from './components/EmailVerificationBanner/EmailVerificationBanner';

function getActiveProductFromUrl() {
  const productUrl = window.location.hostname.split('.')[0];
  if (['analyze', 'engage', 'publish', 'start-page'].includes(productUrl)) {
    return productUrl;
  }

  return null;
}

export const Navigator = React.memo(({ apolloClient, channels }) => {
  const graphqlConfig = apolloClient
    ? {
        client: apolloClient,
      }
    : {};
  const { data, loading, error } = useQuery(QUERY_ACCOUNT, graphqlConfig);
  // eslint-disable-next-line no-underscore-dangle
  window.__userData = {
    data,
    loading,
    error,
  };

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
  useUserTracker(user);

  const networkErrors = error?.networkError?.result?.errors;
  if (
    networkErrors?.some((err) => err.extensions?.code === 'UNAUTHENTICATED')
  ) {
    window.location.assign(getLoginUrl(window.location.href));
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
      trialBannerString = getTrialBannerCopy({
        planName,
        daysRemaining,
      });
    }
  }

  const showEmailVerificationBanner =
    !loading && user.shouldShowEmailVerificationCommunication;
  const { bannerOptions } = useEmailVerification();

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
              label: 'Start Subscription',
              action: () =>
                modal.openModal(MODALS.planSelector, {
                  cta: 'addPaymentDetailsBanner',
                  isUpgradeIntent: true,
                }),
            }}
          />
        )}
        {showEmailVerificationBanner && <EmailVerificationBanner />}
        {!user.loading && <Modal {...modal} />}
      </ModalContext.Provider>
    </UserContext.Provider>
  );
});

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

export default () => {
  const client = new ApolloClient({
    cache: new InMemoryCache({
      possibleTypes: {
        Billing: ['MPBilling', 'OBBilling'],
      },
    }),
    link: new HttpLink({
      uri: window.API_GATEWAY_URL,
      credentials: 'include',
      headers: {
        'x-buffer-client-id': 'webapp-account',
      },
    }),
  });

  ReactDOM.render(
    <ErrorBoundary>
      <React.StrictMode>
        <ApolloProvider client={client}>
          <FeaturesWrapper>
            <Navigator />
          </FeaturesWrapper>
        </ApolloProvider>
      </React.StrictMode>
    </ErrorBoundary>,
    document.getElementById('navigator')
  );
};
