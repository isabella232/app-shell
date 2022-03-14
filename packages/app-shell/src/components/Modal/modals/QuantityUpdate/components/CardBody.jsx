import React, { useState, useEffect } from 'react';

import { Text, Button } from '@bufferapp/ui';
import InstagramIcon from '@bufferapp/ui/Icon/Icons/Instagram';
import FacebookIcon from '@bufferapp/ui/Icon/Icons/Facebook';
import LinkedInIcon from '@bufferapp/ui/Icon/Icons/LinkedIn';
import PinterestIcon from '@bufferapp/ui/Icon/Icons/Pinterest';
import ShopifyIcon from '@bufferapp/ui/Icon/Icons/Shopify';
import TwitterIcon from '@bufferapp/ui/Icon/Icons/Twitter';

import { MODALS } from '../../../../../common/hooks/useModal';
import ChannelCounter from '../../../../../common/components/Counter/Counter';
import useChannelsCounter from '../../../../../common/hooks/useChannelsCounter';
import { getProductPriceCycleText } from '../../../../../common/utils/product';
import { calculateTotalSlotsPrice } from '../../../utils';

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

const CardBody = ({
  planName,
  quantity,
  channelFee,
  pricePerQuantity,
  minimumQuantity,
  planId,
  planPrice,
  planCycle,
  openModal,
}) => {
  const [hasCounterChanged, updateCounter] = useState(false);

  const {
    channelsCount,
    // setChannelsCounterValue,
    increaseCounter,
    decreaseCounter,
  } = useChannelsCounter(quantity, minimumQuantity);

  const newPrice = calculateTotalSlotsPrice(
    planId,
    channelsCount,
    pricePerQuantity,
    minimumQuantity,
    channelFee
  );

  useEffect(() => {
    // available channels is different from # in counter
    updateCounter(channelsCount !== quantity);
  }, [channelsCount]);

  return (
    <>
      <Header>
        <Text type="h2">Add or Remove Channels from Plan</Text>
        <Text type="p">
          You&apos;re currently on the <strong>{planName}</strong> plan and
          you&apos;re paying{' '}
          <strong>{getProductPriceCycleText(planPrice, planCycle)}</strong> for{' '}
          {quantity} channel
          {quantity !== 1 ? 's' : ''}.{' '}
          <button
            type="button"
            onClick={(data) => {
              openModal(MODALS.planSelector, data);
            }}
          >
            Change Plan
          </button>
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
              {hasCounterChanged ? (
                <>
                  <Text type="p">
                    New cost: <strong>${newPrice}</strong>
                  </Text>
                  <Text>
                    This will be billed every {planCycle} until canceled
                  </Text>
                </>
              ) : (
                <Text type="p">
                  <strong>+ ${pricePerQuantity}</strong> per channel
                </Text>
              )}
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
          disabled={!hasCounterChanged}
        />
      </ButtonWrapper>
    </>
  );
};

export default CardBody;
