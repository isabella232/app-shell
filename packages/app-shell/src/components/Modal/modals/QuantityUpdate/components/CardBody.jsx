import React from 'react';
import { MODALS } from '../../../../../common/hooks/useModal';

import { Text, Button } from '@bufferapp/ui';
import InstagramIcon from '@bufferapp/ui/Icon/Icons/Instagram';
import FacebookIcon from '@bufferapp/ui/Icon/Icons/Facebook';
import LinkedInIcon from '@bufferapp/ui/Icon/Icons/LinkedIn';
import PinterestIcon from '@bufferapp/ui/Icon/Icons/Pinterest';
import ShopifyIcon from '@bufferapp/ui/Icon/Icons/Shopify';
import TwitterIcon from '@bufferapp/ui/Icon/Icons/Twitter';

import ChannelCounter from '../../../../../common/components/Counter/Counter';
import useChannelsCounter from '../../../../../common/hooks/useChannelsCounter';

import {
  Header,
  SectionContainer,
  Section,
  Icons,
  Title,
  ButtonWrapper,
  InnerContainer,
  ChannelCounterWrapper,
  Summary,
} from './style';

const CardBody = ({ planName, quantity, channelFee, pricePerQuantity }) => {
  const {
    channelsCount,
    setChannelsCounterValue,
    increaseCounter,
    decreaseCounter,
  } = useChannelsCounter(quantity, 1);

  return (
    <>
      <Header>
        <Text type="h2">Add or Remove Channels from Plan</Text>
        <Text type="p">
          You&apos;re currently on the <strong>{planName}</strong> plan and
          you&apos;re paying <strong>$40/mo</strong> for {quantity} channel
          {quantity !== 1 ? 's' : ''}.{' '}
          <a
            href="#"
            onClick={(e, data) => {
              e.preventDefault();
              openModal(MODALS.planSelector, data);
            }}
          >
            Change Plan
          </a>
        </Text>
      </Header>
      <SectionContainer>
        <Section>
          <InnerContainer>
            <div>
              <Title>
                <Text>Channels </Text>
                <Icons>
                  <InstagramIcon size="medium" />
                  <FacebookIcon size="medium" />
                  <TwitterIcon size="medium" />
                  <PinterestIcon size="medium" />
                  <LinkedInIcon size="medium" />
                  <ShopifyIcon size="medium" />
                </Icons>
              </Title>
              <ChannelCounterWrapper>
                <ChannelCounter
                  channelsCount={channelsCount}
                  onDecreaseCounter={() => decreaseCounter()}
                  onIncreaseCounter={() => increaseCounter()}
                />
              </ChannelCounterWrapper>
            </div>

            <Summary>
              <Text type="p">
                <strong>+ ${pricePerQuantity}</strong> per channel
              </Text>
              <Text type="p">
                New monthly cost: <strong>$60</strong>
              </Text>

              <Text>
                Then $60 on your next billing date and every month until
                canceled
              </Text>
            </Summary>
          </InnerContainer>
        </Section>
      </SectionContainer>

      <ButtonWrapper>
        <Button type="text" onClick={() => openModal(null)} label="Cancel" />
        <Button
          type="primary"
          onClick={(data) => {
            openModal(MODALS.paymentMethod, data);
          }}
          label="Confirm and Pay"
        />
      </ButtonWrapper>
    </>
  );
};

export default CardBody;
