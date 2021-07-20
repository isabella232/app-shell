import React from 'react';

import Text from '@bufferapp/ui/Text';
import Button from '@bufferapp/ui/Button';
import FlashIcon from '@bufferapp/ui/Icon/Icons/Flash';

import {
  Holder,
  ButtonContainer,
  IconWrapper,
  BackgroundLayerBottom,
  BackgroundLayerTop,
  OverlayBackground,
} from './style';

const Intro = () => {
  return (
    <Holder>
      <BackgroundLayerBottom></BackgroundLayerBottom>
      <BackgroundLayerTop></BackgroundLayerTop>
      <IconWrapper>
        <FlashIcon size="large" />
      </IconWrapper>

      <Text type="h3">Supercharge your plan with Essentials</Text>

      <OverlayBackground>
        <ButtonContainer>
          <Button type="text" label="Remind Me Later" onClick={() => {}} />
          <Button
            type="primary"
            label="Learn More"
            onClick={() => {
              const { MODALS, actions } = window?.appshell || {};
              actions.openModal(MODALS.essentialsPlan, {
                cta: 'renderModal',
                ctaButton: 'renderModal',
              });
            }}
          />
        </ButtonContainer>
      </OverlayBackground>
    </Holder>
  );
};

export default Intro;
