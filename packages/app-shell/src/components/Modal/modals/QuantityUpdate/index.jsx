import React from 'react';
import CardBody from './components/CardBody';

import { UserContext } from '../../../../common/context/User';
import { ModalContext } from '../../../../common/context/Modal';

import { LoadingContainer, Container } from './style';

import { getCurrentPlanFromPlanOptions } from '../../utils';

const QuantityUpdate = () => {
  return (
    <UserContext.Consumer>
      {(user) => (
        <ModalContext.Consumer>
          {({ openModal }) => {
            if (!user.currentOrganization.billing) {
              return (
                <LoadingContainer>
                  <Loader />
                </LoadingContainer>
              );
            }
            const {
              flatFee,
              currentQuantity,
              chargableQuantity,
              pricePerQuantity,
              minimumQuantity,
            } = user.currentOrganization.billing.channelSlotDetails;

            const { name: planName, id: planId } =
              user.currentOrganization.billing.subscription.plan;
            const planOptions =
              user.currentOrganization.billing.changePlanOptions;
            const currentPlan = getCurrentPlanFromPlanOptions(planOptions);
            const { basePrice: planPricing, planInterval: planInterval } =
              currentPlan;
            return (
              <Container>
                <CardBody
                  planName={planName}
                  planPrice={planPricing}
                  planCycle={planInterval}
                  quantity={currentQuantity}
                  channelFee={flatFee}
                  pricePerQuantity={pricePerQuantity}
                  minimumQuantity={minimumQuantity}
                  plandId={planId}
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
