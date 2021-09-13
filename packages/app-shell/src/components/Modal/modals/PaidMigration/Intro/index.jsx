import React from 'react';

import Text from '@bufferapp/ui/Text';
import Button from '@bufferapp/ui/Button';
import FlashIcon from '@bufferapp/ui/Icon/Icons/Flash';
import { setCookie, DATES } from 'utils/cookies';
import { ModalContext } from 'context/Modal';
import { MODALS } from 'hooks/useModal';

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
    <ModalContext.Consumer>
      {({ openModal }) => (
        <Holder>
          <BackgroundLayerBottom></BackgroundLayerBottom>
          <BackgroundLayerTop></BackgroundLayerTop>
          <IconWrapper>
            <FlashIcon size="large" />
          </IconWrapper>

          <Text type="h3">New plans. More features. Affordable pricing.</Text>

          <OverlayBackground>
            <ButtonContainer>
              <Button
                type="text"
                label="Remind Me Later"
                onClick={() => {
                  openModal(null);
                  setCookie({
                    key: 'migrationModalDismissed',
                    value: true,
                    expires: DATES.inDaysFromNow(7),
                  });
                }}
              />

              <Button
                type="primary"
                label="Learn More"
                onClick={() => {
                  openModal(MODALS.essentialsPlan, {
                    cta: 'Migrate to OB Modal',
                    ctaButton: 'Learn More',
                  });
                }}
              />
            </ButtonContainer>
          </OverlayBackground>
        </Holder>
      )}
    </ModalContext.Consumer>
  );
};

export default Intro;
