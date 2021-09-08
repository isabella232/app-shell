import React, { useEffect, useContext } from 'react';

import Text from '@bufferapp/ui/Text';
import Button from '@bufferapp/ui/Button';
import FlashIcon from '@bufferapp/ui/Icon/Icons/Flash';
import { setCookie, DATES } from '../../../../../common/utils/cookies';
import { ModalContext } from '../../../../../common/context/Modal';
import { UserContext } from '../../../../../common/context/User';
import { MODALS } from '../../../../../common/hooks/useModal';

import {
  useTrackPageViewed,
} from '../../../../../common/hooks/useSegmentTracking';

import {
  Holder,
  ButtonContainer,
  IconWrapper,
  BackgroundLayerBottom,
  BackgroundLayerTop,
  OverlayBackground,
} from './style';

const Intro = () => {
  const currentUser = useContext(UserContext);
  const { data } = useContext(ModalContext);
  const { cta, ctaButton } = data || {};

  useEffect(() => {
    useTrackPageViewed({
      payload: {
        name: 'Migrate to OB Modal',
        title: 'Intro',
        cta,
        ctaButton,
      },
      user: currentUser,
    });
  }, []);

  return (
    <ModalContext.Consumer>
      {({ openModal }) => (
        <Holder>
          <BackgroundLayerBottom/>
          <BackgroundLayerTop/>
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
