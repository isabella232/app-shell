import React, { useEffect } from 'react';
import styled from 'styled-components';
import Text from '@bufferapp/ui/Text';
import Button from '@bufferapp/ui/Button';
import { black, blue } from '@bufferapp/ui/style/colors';
import CheckmarkIcon from '@bufferapp/ui/Icon/Icons/Checkmark';

import { useTrackPageViewed } from '../hooks/useSegmentTracking';
import { UserContext } from '../context/User';
import { ModalContext } from '../context/Modal';
import { MODALS } from '../hooks/useModal';
import { setCookie, DATES } from '../utils/cookies'


const ScreenContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 800px;
  height: ${({ planId }) => planId === 'team' ? '446px' : '376px'};
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
`;

const ButtonContainer = styled.div`
  width: fit-content;
  margin-top: 32px;
  margin-bottom: 32px;

  > div:first-child {
    margin-right: 8px;
  }
`;

const Details = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;

  svg {
    color: ${blue};
    margin-right: 4px;
  }

  li {
    display: flex;

    p {
      margin-bottom: 8px;
    }
  }
`;

export const Modal = ({
  user,
  onDismiss,
  closeModal,
  onUpgrade,
}) => {

  useEffect(() => {
    useTrackPageViewed({
      payload: {
        name: 'trial',
        title: 'trial expired modal',
      },
      user
    })
  }, [])

  const imageUrl = 'https://buffer-ui.s3.amazonaws.com/Confirmation+Illustration.png';
  const description = `Your trial is over and you are back to free features. Upgrade to get the power restored.`;
  const planId = user?.currentOrganization?.billing?.subscription?.plan?.id
  const planDetails = user?.currentOrganization?.billing?.changePlanOptions.find(o => o.planId === planId)?.summary.details

  if (!planDetails) {
    return null
  }

  return (
    <ScreenContainer imageUrl={imageUrl}>
      <Text type="h1">Your trial has expired</Text>
      <Text type="p">{description}</Text>
      <Details>
        {planDetails.map(detail => (<li>
          <CheckmarkIcon size="medium" />
          <Text type="p">{detail}</Text>
        </li>))}
      </Details>
      <ButtonContainer>
        <Button
          type="primary"
          onClick={onUpgrade}
          label="Upgrade"
        />
      <Button
        type="secondary"
        onClick={onDismiss}
        label="No Thanks"
      />
    </ButtonContainer>
    </ScreenContainer>
  );
};

const TrialExpired = () => {
  return (
    <UserContext.Consumer>
      {(user) => (
        <ModalContext.Consumer>
          {({ openModal }) => (
            <Modal
              user={user}
              onDismiss={() => {
                setCookie({
                  key: 'trialOverDismissed',
                  value: true,
                  expires: DATES.inMonthsFromNow(2),
                })
                openModal(null);
              }}
              onUpgrade={() => {
                openModal(MODALS.planSelector, {
                  cta: 'ugradePlan',
                  ctaButton: 'ugradePlan',
                  isUpgradeIntent: true,
                })
              }}
              closeModal={() => {
                openModal(null)
              }
              }
            />
          )}
        </ModalContext.Consumer>
      )}
    </UserContext.Consumer>
  )
};

export default TrialExpired;
