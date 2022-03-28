import React, { useEffect, useState, useContext } from 'react';
import Text from '@bufferapp/ui/Text';
import Switch from '@bufferapp/ui/Switch';
import Button from '@bufferapp/ui/Button';
import Checkmark from '@bufferapp/ui/Icon/Icons/Checkmark';
import { useSplitEnabled } from '@bufferapp/features';

import { SelectionScreen } from './SelectionScreen';
import Summary from '../../Summary';
import useSelectedPlan from '../hooks/useSelectedPlan';
import useButtonOptions from '../hooks/useButtonOptions';
import useHeaderLabel from '../hooks/useHeaderLabel';
import useUpdateSubscriptionPlan from '../../../../../common/hooks/useUpdateSubscriptionPlan';
import {
  useTrackPlanSelectorViewed,
  useTrackPageViewed,
  formatCTAString,
} from '../../../../../common/hooks/useSegmentTracking';
import {
  ButtonContainer,
  SwitchContainer,
  PlanSelectorHeader,
  Right,
  Left,
  Container,
  AbsoluteSavings,
  HeaderLeft,
  DowngradeMessage,
} from '../style';
import useInterval from '../hooks/useInterval';
import useChannelsCounter from '../../../../../common/hooks/useChannelsCounter';
import { ModalContext } from '../../../../../common/context/Modal';
import { Error } from '../../PaymentMethod/style';

import { freePlan } from '../../../../../common/mocks/freePlan';

import FreePlanSection from './FreePlanSection';
import AgencyPlanSection from './AgencyPlanSection';

import {
  isAgencyUser,
  isOnAgencyTrial,
  getUsersCurrentPlan,
  getUsersCurrentChannelSlotDetails,
} from '../../../../../common/utils/user';

import {
  calculateTotalSlotsPrice,
  handleUpgradeIntent,
  getAvailablePlansForDisplay,
} from '../../../utils';

export const PlanSelectorContainer = ({
  changePlanOptions,
  user,
  openPaymentMethod,
  hasPaymentDetails,
  trialInfo,
  openSuccess,
  isFreePlan,
  isUpgradeIntent,
}) => {
  const { isEnabled: splitSBBEnabled } = useSplitEnabled('slot-based-billing');
  const planOptions = changePlanOptions;

  const shouldIncludeAgencyPlan = isAgencyUser(user) || isOnAgencyTrial(user);

  const [error, setError] = useState(null);
  const [showAgencyPlan, setShowAgencyPlan] = useState(shouldIncludeAgencyPlan);
  const [previousPlanId, setPreviousPlanId] = useState(null);

  const { data: modalData, modal } = useContext(ModalContext);
  const { cta } = modalData || {};

  const { selectedPlan, updateSelectedPlan } = useSelectedPlan(planOptions);
  const availablePlans = getAvailablePlansForDisplay(
    user,
    planOptions,
    showAgencyPlan
  );

  const { monthlyBilling, setBillingInterval } = useInterval(availablePlans);

  const currentPlan = getUsersCurrentPlan(user);
  const currentPlanId = currentPlan?.id;

  const { currentQuantity } = getUsersCurrentChannelSlotDetails(user);
  const {
    flatFee: selectedPlanFlatFee,
    pricePerQuantity: selectedPlanPricePerQuantity,
    minimumQuantity: selectedPlanMinimumQuantity,
  } = selectedPlan.channelSlotDetails;

  const {
    channelsCount,
    increaseCounter,
    decreaseCounter,
    channelCountMessageStatus,
  } = useChannelsCounter(
    selectedPlan.planId,
    currentQuantity,
    selectedPlanMinimumQuantity
  );

  const newPrice = calculateTotalSlotsPrice(
    selectedPlan.planId,
    channelsCount,
    selectedPlanPricePerQuantity,
    selectedPlanMinimumQuantity,
    selectedPlanFlatFee
  );

  const {
    updateSubscriptionPlan: updatePlan,
    data,
    error: subscriptionError,
    processing,
  } = useUpdateSubscriptionPlan({
    cta,
    user,
    plan: selectedPlan,
    hasPaymentMethod: true,
    channelsQuantity: channelsCount,
  });

  const { label, action, updateButton, ctaButton } = useButtonOptions({
    selectedPlan,
    updatePlan,
    openPaymentMethod,
    hasPaymentDetails,
    isActiveTrial: trialInfo?.isActive,
    isAwaitingUserAction: trialInfo?.isAwaitingUserAction,
    currentChannelQuantity: currentQuantity,
    updatedChannelQuantity: channelsCount,
  });
  const { headerLabel } = useHeaderLabel(
    trialInfo?.isActive,
    planOptions,
    isFreePlan
  );

  const disableSumbitButton = splitSBBEnabled
    ? label === 'Stay On My Current Plan' || processing || !action
    : label === 'Stay On My Current Plan' || processing;

  useEffect(() => {
    useTrackPlanSelectorViewed({
      payload: {
        currentPlan: formatCTAString(
          `${selectedPlan.planId} ${selectedPlan.planInterval}`
        ),
        screenName: headerLabel,
        cta,
        ctaButton,
      },
      user,
    });

    useTrackPageViewed({
      payload: {
        name: 'planSelection',
        title: 'planSelector',
        cta,
        ctaButton,
      },
      user,
    });
  }, []);

  useEffect(() => {
    const newInterval = monthlyBilling ? 'month' : 'year';
    const planString = `${selectedPlan.planId}_${newInterval}`;
    updateSelectedPlan(planString);
  }, [monthlyBilling]);

  useEffect(() => {
    updateButton(selectedPlan, channelsCount);
  }, [selectedPlan]);

  useEffect(() => {
    updateButton(selectedPlan, channelsCount);

    // When the channel count changes and we are on the Free plan
    // We do this to automatically switch the user to the essentials plan
    // as Free plans can have a max of 3 channels
    if (
      selectedPlan.planId === 'free' &&
      channelsCount > selectedPlanMinimumQuantity
    ) {
      const newInterval = monthlyBilling ? 'month' : 'year';
      const planString = `essentials_${newInterval}`;
      updateSelectedPlan(planString);
    }
  }, [channelsCount]);

  useEffect(() => {
    if (data?.billingUpdateSubscriptionPlan.success) {
      openSuccess({
        selectedPlan,
        stayedOnSamePlan: previousPlanId === selectedPlan.planId,
        splitSBBEnabled,
      });
    }
    if (subscriptionError) {
      setError(subscriptionError);
    }
  }, [data, subscriptionError]);

  return (
    <Container
      downgradedMessage={selectedPlan?.downgradedMessage}
      isFreePlan={isFreePlan}
    >
      <Left>
        <PlanSelectorHeader>
          <Text type="h2">{headerLabel}</Text>
          {selectedPlan.planId !== 'free' && (
            <HeaderLeft>
              <SwitchContainer>
                <Switch
                  isOn={!monthlyBilling}
                  handleSwitch={() => setBillingInterval(!monthlyBilling)}
                  label="Monthly"
                  id="switch-off"
                />
                <p>Yearly</p>
              </SwitchContainer>
              <AbsoluteSavings>{selectedPlan.absoluteSavings}</AbsoluteSavings>
            </HeaderLeft>
          )}
        </PlanSelectorHeader>
        {selectedPlan.downgradedMessage && (
          <DowngradeMessage>
            <Checkmark />
            <Text>{selectedPlan.downgradedMessage}</Text>
          </DowngradeMessage>
        )}
        {error && <Error error={error}>{error.message}</Error>}
        <SelectionScreen
          planOptions={availablePlans}
          selectedPlan={selectedPlan}
          updateSelectedPlan={updateSelectedPlan}
          monthlyBilling={monthlyBilling}
        />
        {!shouldIncludeAgencyPlan && !showAgencyPlan && (
          <AgencyPlanSection
            ctaAction={() => {
              updateSelectedPlan(`agency_${monthlyBilling ? 'month' : 'year'}`);
              setShowAgencyPlan(true);
            }}
          />
        )}
        {(shouldIncludeAgencyPlan || showAgencyPlan) && (
          <FreePlanSection
            ctaAction={() => {
              updateSelectedPlan(
                `${freePlan.planId}_${monthlyBilling ? 'month' : 'year'}`
              );
              updatePlan({
                plan: freePlan,
                cta,
                ctaView: modal,
              });
            }}
          />
        )}
      </Left>
      <Right>
        <Summary
          selectedPlan={selectedPlan}
          fromPlanSelector
          isUpgradeIntent={isUpgradeIntent}
          channelsCount={channelsCount}
          increaseCounter={() => increaseCounter()}
          decreaseCounter={() => decreaseCounter()}
          newPrice={newPrice}
          channelCounterMessageStatus={channelCountMessageStatus}
          currentChannelQuantity={currentQuantity}
        />
        <ButtonContainer>
          <Button
            type="primary"
            onClick={() => {
              action({
                plan: selectedPlan,
                cta,
                ctaView: modal,
                newPrice,
                channelCounterMessageStatus: channelCountMessageStatus,
                currentChannelQuantity: currentQuantity,
                channelsCount,
              });
              setPreviousPlanId(currentPlanId);
            }}
            label={processing ? 'Processing...' : label}
            fullWidth
            disabled={disableSumbitButton}
          />
        </ButtonContainer>
      </Right>
    </Container>
  );
};
