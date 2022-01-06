import React, { useEffect, useState, useContext } from 'react';
import Text from '@bufferapp/ui/Text';
import Switch from '@bufferapp/ui/Switch';
import Button from '@bufferapp/ui/Button';
import Checkmark from '@bufferapp/ui/Icon/Icons/Checkmark';
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
import { ModalContext } from '../../../../../common/context/Modal';
import { Error } from '../../PaymentMethod/style';

import FreePlanSection from './FreePlanSection';

import { userHasFeatureFlip, filterListOfPlans } from '../../../utils';

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
  const filterPlanOptions = () => {
    if (isUpgradeIntent) {
      return changePlanOptions.filter((option) => option.planId !== 'free');
    }
    return changePlanOptions;
  };

  const featureFilpAgencyPlan = userHasFeatureFlip(user, 'agencyPlan');

  const planOptions = filterPlanOptions();

  const [error, setError] = useState(null);

  const { data: modalData, modal } = useContext(ModalContext);
  const { cta } = modalData || {};
  const { monthlyBilling, setBillingInterval } = useInterval(
    planOptions,
    isUpgradeIntent
  );
  const { selectedPlan, updateSelectedPlan } = useSelectedPlan(
    planOptions,
    isUpgradeIntent,
    user
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
  });

  const { label, action, updateButton, ctaButton } = useButtonOptions({
    selectedPlan,
    updatePlan,
    openPaymentMethod,
    hasPaymentDetails,
    isActiveTrial: trialInfo?.isActive,
    isAwaitingUserAction: trialInfo?.isAwaitingUserAction,
  });
  const { headerLabel } = useHeaderLabel(
    trialInfo?.isActive,
    planOptions,
    isFreePlan
  );

  const planOptionsWithoutFreePlans = filterListOfPlans(planOptions, 'free');

  const planOptionsWithoutAgencyPlans = filterListOfPlans(
    planOptions,
    'agency'
  );

  const availablePlans = featureFilpAgencyPlan
    ? planOptionsWithoutFreePlans
    : planOptionsWithoutAgencyPlans;

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
    updateButton(selectedPlan);
  }, [selectedPlan]);

  useEffect(() => {
    if (data?.billingUpdateSubscriptionPlan.success) {
      openSuccess({ selectedPlan });
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
        {featureFilpAgencyPlan && !isFreePlan && <FreePlanSection />}
      </Left>
      <Right>
        <Summary
          selectedPlan={selectedPlan}
          fromPlanSelector
          isUpgradeIntent={isUpgradeIntent}
        />
        <ButtonContainer>
          <Button
            type="primary"
            onClick={() =>
              action({
                plan: selectedPlan,
                cta,
                ctaView: modal,
                isUpgradeIntent,
              })
            }
            label={processing ? 'Processing...' : label}
            fullWidth
            disabled={label === 'Stay On My Current Plan' || processing}
          />
        </ButtonContainer>
      </Right>
    </Container>
  );
};
