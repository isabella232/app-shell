import React, { useEffect } from 'react';
import styled from 'styled-components';
import Text from '@bufferapp/ui/Text';
import Button from '@bufferapp/ui/Button';

import { black } from '@bufferapp/ui/style/colors';
import { useTrackPageViewed } from '../hooks/useSegmentTracking';
import { UserContext } from '../context/User';
import { ModalContext } from '../context/Modal';

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

  p:last-child {
    font-style: italic;
  }
`;

const ButtonContainer = styled.div`
  width: fit-content;
  margin-top: 32px;
  margin-bottom: 32px;
`;

export const Modal = ({
  user,
  closeModal,
}) => {

  useEffect(() => {
    useTrackPageViewed({
      payload: {
        name: 'trial',
        title: 'trial expired modal',
      },
      user
    });
  }, []);

  const imageUrl = 'https://buffer-ui.s3.amazonaws.com/Confirmation+Illustration.png';
  const description = `Your trial is over and you are back to free features. Upgrade to get the power restored.`;

  return (
    <ScreenContainer imageUrl={imageUrl}>
      <Text type="h1">Your trial has expired</Text>
      <Text type="p">{description}</Text>
      <ButtonContainer>
        <Button
          type="primary"
          onClick={() => {
            closeModal();
          }}
          label="Upgrade"
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
              closeModal={() => {
                openModal(null);
              }}
            />
          )}
        </ModalContext.Consumer>
      )}
    </UserContext.Consumer>
  )
};

export default TrialExpired;
