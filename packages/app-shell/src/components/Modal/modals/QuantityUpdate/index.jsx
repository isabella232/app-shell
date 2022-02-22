import React from 'react';
import Loader from '@bufferapp/ui/Loader';
import Text from '@bufferapp/ui/Text';
import Button from '@bufferapp/ui/Button/Button';

import InstagramIcon from '@bufferapp/ui/Icon/Icons/Instagram';
import FacebookIcon from '@bufferapp/ui/Icon/Icons/Facebook';
import LinkedInIcon from '@bufferapp/ui/Icon/Icons/LinkedIn';
import PinterestIcon from '@bufferapp/ui/Icon/Icons/Pinterest';
import ShopifyIcon from '@bufferapp/ui/Icon/Icons/Shopify';
import TwitterIcon from '@bufferapp/ui/Icon/Icons/Twitter';

import { MODALS } from '../../../../common/hooks/useModal';
import { UserContext } from '../../../../common/context/User';
import { ModalContext } from '../../../../common/context/Modal';

import {
  LoadingContainer,
  Container,
  Header,
  SectionContainer,
  Section,
  Icons,
  Title,
  ButtonWrapper,
} from './style';

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
                <Header>
                  <Text type="h2">Add or Remove Channels from Plan</Text>
                  <Text type="p">
                    You&apos;re currently on the <strong>{planName}</strong>{' '}
                    plan and you&apos;re paying <strong>$40/mo</strong> for{' '}
                    {quantity} channels.
                    <Button
                      type="link"
                      onClick={(data) => {
                        openModal(MODALS.planSelector, data);
                      }}
                      label="Change Plan"
                    />
                  </Text>
                </Header>
                <SectionContainer>
                  <Section>
                    <Title>
                      <span>Channels</span>
                      <Icons>
                        <InstagramIcon size="medium" />
                        <FacebookIcon size="medium" />
                        <TwitterIcon size="medium" />
                        <PinterestIcon size="medium" />
                        <LinkedInIcon size="medium" />
                        <ShopifyIcon size="medium" />
                      </Icons>
                    </Title>
                    Channel counter + description
                  </Section>
                </SectionContainer>
                <ButtonWrapper>
                  <Button
                    type="text"
                    onClick={() => openModal(null)}
                    label="Cancel"
                  />
                  <Button
                    type="primary"
                    onClick={(data) => {
                      openModal(MODALS.paymentMethod, data);
                    }}
                    label="Confirm and Pay"
                  />
                </ButtonWrapper>
              </Container>
            );
          }}
        </ModalContext.Consumer>
      )}
    </UserContext.Consumer>
  );
};

export default QuantityUpdate;
