import React, { useState, useEffect } from 'react';

import { Text, Button } from '@bufferapp/ui';

import { MODALS } from '../../../../../common/hooks/useModal';
import useChannelsCounter from '../../../../../common/hooks/useChannelsCounter';
import { getProductPriceCycleText } from '../../../../../common/utils/product';
import Channels from '../../../../../common/components/Channels/Channels';
import {
  calculateTotalSlotsPrice,
  handleChannelsCountConditions,
} from '../../../utils';

import {
  Header,
  SectionContainer,
  Section,
  ButtonWrapper,
  InnerContainer,
  ChannelsWrapper,
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
    setChannelsCounterValue,
    increaseCounter,
    decreaseCounter,
    channelCountMessageStatus,
  } = useChannelsCounter(planId, quantity, minimumQuantity);

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

  useEffect(() => {
    handleChannelsCountConditions(
      planId,
      channelsCount,
      setChannelsCounterValue
    );
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
            <ChannelsWrapper>
              <Channels
                channelsCount={channelsCount}
                onIncreaseCounter={() => increaseCounter()}
                onDecreaseCounter={() => decreaseCounter()}
                channelCounterMessageStatus={channelCountMessageStatus}
              />
            </ChannelsWrapper>

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
