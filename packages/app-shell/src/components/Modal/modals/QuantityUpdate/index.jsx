import React from 'react';
import Loader from '@bufferapp/ui/Loader';
import CardBody from './components/CardBody';

import { UserContext } from '../../../../common/context/User';
import { ModalContext } from '../../../../common/context/Modal';

import { LoadingContainer, Container } from './style';

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
              pricePerQuantity,
              minimumQuantity,
            } = user.currentOrganization.billing.channelSlotDetails;

            const {
              name: planName,
              id: planId,
              prices: { baseMonthlyPrice },
            } = user.currentOrganization.billing.subscription.plan;

            const { interval: planCycle } =
              user.currentOrganization.billing.subscription;
            return (
              <Container>
                <CardBody
                  planName={planName}
                  planPrice={baseMonthlyPrice}
                  planCycle={planCycle}
                  quantity={currentQuantity}
                  channelFee={flatFee}
                  pricePerQuantity={pricePerQuantity}
                  minimumQuantity={minimumQuantity}
                  planId={planId}
                  openModal={openModal}
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
