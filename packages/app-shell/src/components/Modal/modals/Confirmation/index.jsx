import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
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
  width: ${({ stayedOnSamePlan }) => (stayedOnSamePlan ? '650px' : '800px')};
  height: ${({ stayedOnSamePlan }) => (stayedOnSamePlan ? '290px' : '376px')};
  box-sizing: border-box;
  background-repeat: no-repeat;
  background-position-x: right;
  background-position-y: bottom;
  background-image: url(${(props) => props.imageUrl});
  background-size: ${({ stayedOnSamePlan }) =>
    stayedOnSamePlan ? '376px' : '445px'};
  padding: 24px;

  p,
  h1 {
    color: ${black};
  }

  h1 {
    max-width: 324px;
    margin-top: 20px;
    margin-bottom: 20px;
  }

  p {
    margin-top: 0px;
    max-width: 285px;
  }

  p:last-child {
    font-style: italic;
  }
`;

const ButtonContainer = styled.div`
  width: fit-content;
  margin-top: 10px;
  margin-bottom: 10px;
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
    <ScreenContainer stayedOnSamePlan={stayedOnSamePlan} imageUrl={imageUrl}>
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

Screen.propTypes = {
  selectedPlan: PropTypes.shape({
    planId: PropTypes.string,
  }).isRequired,
  onlyUpdatedCardDetails: PropTypes.bool,
  startedTrial: PropTypes.bool,
  closeModal: PropTypes.func.isRequired,
  stayedOnSamePlan: PropTypes.bool,
};

Screen.defaultProps = {
  onlyUpdatedCardDetails: false,
  startedTrial: false,
  stayedOnSamePlan: false,
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
