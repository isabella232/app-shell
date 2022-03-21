import React, { useContext, useEffect } from 'react';

import { MODALS } from '../../../../common/hooks/useModal';
import { UserContext } from '../../../../common/context/User';
import { ModalContext } from '../../../../common/context/Modal';

import StripeProvider from './components/StripeProvider';
import Form from './components/Form';
import { useTrackPageViewed } from '../../../../common/hooks/useSegmentTracking';

const PaymentMethod = () => {
  const currentUser = useContext(UserContext);
  const { data } = useContext(ModalContext);
  const { cta, ctaView, ctaButton } = data || {};

  useEffect(() => {
    useTrackPageViewed({
      payload: {
        name: 'addPaymentDetails',
        title: 'planSelector',
        cta,
        ctaButton,
        ctaView,
      },
      user: currentUser,
    });
  }, []);

  return (
    <UserContext.Consumer>
      {(user) => (
        <ModalContext.Consumer>
          {({ openModal, data: modalData, modal }) => {
            return (
              <StripeProvider>
                <Form
                  openPlans={(isUpgradeIntent) => {
                    openModal(MODALS.planSelector, {
                      isUpgradeIntent,
                      cta,
                      ctaButton: 'goBackToPlanSelection',
                      ctaView: modal,
                    });
                  }}
                  openSuccess={(newData) => {
                    openModal(MODALS.success, {
                      ...newData,
                      cta,
                      ctaView: modal,
                    });
                  }}
                  user={user}
                  plan={modalData ? modalData.plan : null}
                  isTrial={
                    user?.currentOrganization.billing?.subscription?.trial
                      ?.isActive
                  }
                  canManageBilling={
                    user?.currentOrganization?.privileges?.canManageBilling
                  }
                  isUpgradeIntent={modalData?.isUpgradeIntent}
                  newPrice={modalData?.newPrice}
                  channelCounterMessageStatus={
                    modalData?.channelCounterMessageStatus
                  }
                  currentChannelQuantity={modalData?.currentChannelQuantity}
                  channelsCount={modalData?.channelsCount}
                />
              </StripeProvider>
            );
          }}
        </ModalContext.Consumer>
      )}
    </UserContext.Consumer>
  );
};

export default PaymentMethod;
