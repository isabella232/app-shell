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
  useEffect(() => {
    const cta = data && data.cta ? data.cta : null;
    useTrackPageViewed({
      payload: {
        name: 'addPaymentDetails',
        title: 'planSelector',
        cta,
        ctaButton: cta,
        ctaView: data && data.ctaView ? data.ctaView : null,
      },
      user: currentUser,
    });
  }, []);

  return (
    <UserContext.Consumer>
      {(user) => (
        <ModalContext.Consumer>
          {({ openModal, data, modal }) => {
            return (
              <StripeProvider>
                <Form
                  openPlans={(isUpgradeIntent) => {
                    openModal(MODALS.planSelector, {
                      isUpgradeIntent,
                      cta: 'planSelection',
                      ctaButton: 'goBackToPlanSelection',
                      ctaView: modal,
                    });
                  }}
                  openSuccess={(newData) => {
                    openModal(MODALS.success, {
                      ...newData,
                      cta: 'addPaymentDetails',
                      ctaView: modal,
                    });
                  }}
                  user={user}
                  plan={data ? data.plan : null}
                  isTrial={
                    user?.currentOrganization.billing?.subscription?.trial
                      ?.isActive
                  }
                  isUpgradeIntent={data?.isUpgradeIntent}
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
