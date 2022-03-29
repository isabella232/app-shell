import React from 'react';
import Loader from '@bufferapp/ui/Loader';
import {
  onSuccess,
  openPlanSelector,
  closeModal,
} from 'common/actions/openModal';
import { getUserBillingData } from 'common/utils/user';
import {
  getSubscriptionInterval,
  getSubscriptionPlanData,
  getBillingChannelSlotDetails,
} from 'common/utils/billing';

import CardBody from './components/CardBody';

import { UserContext } from '../../../../common/context/User';
import { ModalContext } from '../../../../common/context/Modal';

import { LoadingContainer, Container } from './style';

const QuantityUpdate = () => {
  return (
    <UserContext.Consumer>
      {(user) => (
        <ModalContext.Consumer>
          {({ openModal, data }) => {
            if (!user.currentOrganization.billing) {
              return (
                <LoadingContainer>
                  <Loader />
                </LoadingContainer>
              );
            }

            const billingData = getUserBillingData(user);
            const currentPlan = getSubscriptionPlanData(billingData);

            const {
              flatFee,
              currentQuantity,
              pricePerQuantity,
              minimumQuantity,
            } = getBillingChannelSlotDetails(billingData);
            const { name: planName, id: planId } = currentPlan;
            const planInterval = getSubscriptionInterval(billingData);

            return (
              <Container>
                <CardBody
                  planName={planName}
                  planCycle={planInterval}
                  quantity={currentQuantity}
                  channelFee={flatFee}
                  pricePerQuantity={pricePerQuantity}
                  minimumQuantity={minimumQuantity}
                  planId={planId}
                  user={user}
                  onSuccess={(data) => onSuccess(data, openModal)}
                  openPlanSelector={(data) => openPlanSelector(data, openModal)}
                  closeModal={() => closeModal(openModal)}
                  cta={data?.cta}
                />
              </Container>
            );
          }}
        </ModalContext.Consumer>
      )}
    </UserContext.Consumer>
  );
};

export default QuantityUpdate;
