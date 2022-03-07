import React from 'react';
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
            const { quantity, plan: currentPlan } =
              user.currentOrganization.billing.subscription;
            const { name: planName } = currentPlan;
            return (
              <Container>
                <CardBody planName={planName} quantity={quantity} />
              </Container>
            );
          }}
        </ModalContext.Consumer>
      )}
    </UserContext.Consumer>
  );
};

export default QuantityUpdate;
