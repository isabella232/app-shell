import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';
import Text from '@bufferapp/ui/Text';
import Button from '@bufferapp/ui/Button';
import { black } from '@bufferapp/ui/style/colors';

import { UserContext } from '../../../../common/context/User';
import { ModalContext } from '../../../../common/context/Modal';
import { useTrackPageViewed } from '../../../../common/hooks/useSegmentTracking';
import getCopy from './getCopy';

const ScreenContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 800px;
  height: ${({ planId }) => (planId === 'team' ? '446px' : '376px')};
  box-sizing: border-box;
  background-repeat: no-repeat;
  background-position-x: right;
  background-position-y: bottom;
  background-image: url(${(props) => props.imageUrl});
  background-size: 445px;
  padding: 24px;

  p,
  h1 {
    color: ${black};
  }

  h1 {
    max-width: 324px;
    margin-top: 22px;
    margin-bottom: 22px;
  }

  p {
    margin-top: 0px;
    max-width: 282px;
  }

  p:last-child {
    font-style: italic;
  }
`;

const ButtonContainer = styled.div`
  width: fit-content;
  margin-top: 32px;
  margin-bottom: 32px;
`;

const Screen = ({
  selectedPlan,
  onlyUpdatedCardDetails,
  startedTrial,
  closeModal,
  stayedOnSamePlan,
}) => {
  const planName = selectedPlan ? selectedPlan.planName : null;
  const { label, description, buttonCopy, imageUrl, footer } = getCopy({
    planName,
    onlyUpdatedCardDetails,
    startedTrial,
    stayedOnSamePlan,
  });

  const currentUser = useContext(UserContext);
  const { data } = useContext(ModalContext);
  useEffect(() => {
    const cta = data && data.cta ? data.cta : null;
    useTrackPageViewed({
      payload: {
        name: 'confirmation',
        title: 'planSelector',
        cta,
        ctaButton: cta,
      },
      user: currentUser,
    });
  }, []);

  return (
    <ScreenContainer planId={selectedPlan.planId} imageUrl={imageUrl}>
      <Text type="h1">{label}</Text>
      <Text type="p">{description}</Text>
      <ButtonContainer>
        <Button
          type="primary"
          onClick={() => {
            closeModal();
          }}
          label={buttonCopy}
        />
      </ButtonContainer>
      {footer && footer}
    </ScreenContainer>
  );
};

const Confirmation = () => {
  return (
    <UserContext.Consumer>
      {/* eslint-disable-next-line no-unused-vars */}
      {(user) => (
        <ModalContext.Consumer>
          {({ openModal, data }) => {
            if (!data.selectedPlan) {
              // eslint-disable-next-line no-console
              console.error(
                'Error: Confirmation Modal - selectedPlan is undefined'
              );
            }

            return (
              <Screen
                selectedPlan={data.selectedPlan}
                onlyUpdatedCardDetails={data.onlyUpdatedCardDetails}
                startedTrial={data.startedTrial}
                stayedOnSamePlan={data.stayedOnSamePlan}
                closeModal={() => {
                  openModal(null);
                }}
              />
            );
          }}
        </ModalContext.Consumer>
      )}
    </UserContext.Consumer>
  );
};

export default Confirmation;
