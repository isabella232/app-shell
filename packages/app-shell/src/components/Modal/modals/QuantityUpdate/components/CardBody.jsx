import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { Text, Button } from '@bufferapp/ui';

import useChannelsCounter from '../../../../../common/hooks/useChannelsCounter';
import useUpdateSubscriptionQuantity from '../../../../../common/hooks/useUpdateSubscriptionQuantity';
import Channels from '../../../../../common/components/Channels/Channels';
import { calculateTotalSlotsPrice } from '../../../utils';

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
  planCycle,
  user,
  onSuccess,
  openPlanSelector,
  closeModal,
  cta,
}) => {
  const [hasCounterChanged, changeCounterState] = useState(false);

  const {
    channelsCount,
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

  const {
    updateSubscriptionQuantity,
    data: updateQuantityData,
    isProcessing,
    error,
  } = useUpdateSubscriptionQuantity({
    user,
    channelsQuantity: channelsCount,
    cta,
  });

  const disableSumbitButton = !hasCounterChanged || isProcessing;

  useEffect(() => {
    changeCounterState(false);

    if (channelsCount !== quantity) {
      changeCounterState(true);
    }
  });

  useEffect(() => {
    if (updateQuantityData?.billingUpdateSubscriptionQuantity.success) {
      onSuccess(updateQuantityData);
    }
  }, [updateQuantityData]);

  return (
    <>
      <Header>
        <Text type="h2">Add or Remove Channels from Plan</Text>
        <Text type="p">
          You&apos;re currently on the <strong>{planName}</strong> plan and
          you&apos;re paying{' '}
          <strong>
            ${pricePerQuantity}/{planCycle} per channel
          </strong>{' '}
          for {quantity} channel
          {quantity !== 1 ? 's' : ''}.{' '}
          <button
            type="button"
            onClick={(newData) => {
              openPlanSelector(newData);
            }}
          >
            Change Plan
          </button>
        </Text>
        {error && (
          <Text type="help" hasError>
            {error.message}
          </Text>
        )}
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
        <Button type="text" onClick={closeModal} label="Cancel" />
        <Button
          id="confirm_and_pay"
          type="primary"
          onClick={() => {
            updateSubscriptionQuantity();
          }}
          label={isProcessing ? 'Processing...' : 'Confirm and Pay'}
          disabled={disableSumbitButton}
        />
      </ButtonWrapper>
    </>
  );
};

CardBody.propTypes = {
  planName: PropTypes.string.isRequired,
  planId: PropTypes.string.isRequired,
  planCycle: PropTypes.string.isRequired,
  quantity: PropTypes.number.isRequired,
  channelFee: PropTypes.number.isRequired,
  pricePerQuantity: PropTypes.number.isRequired,
  minimumQuantity: PropTypes.number.isRequired,
  user: PropTypes.shape({
    // eslint-disable-next-line react/forbid-prop-types
    currentOrganization: PropTypes.object.isRequired,
  }).isRequired, // TODO: This type should be defined better/stricter
  onSuccess: PropTypes.func.isRequired,
  openPlanSelector: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
};

export default CardBody;
