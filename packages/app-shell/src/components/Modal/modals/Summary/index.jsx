import React from 'react';
import Text from '@bufferapp/ui/Text';
import Coupon from '@bufferapp/ui/Icon/Icons/Coupon';
import { useSplitEnabled } from '@bufferapp/features';

import { UserContext } from '../../../../common/context/User';
import CurrentPlanInfo from './components/CurrentPlanInfo';
import UpdatedPlanInfo from './components/UpdatedPlanInfo';

import {
  DiscountReminder,
  TotalPrice,
  Detail,
  DetailList,
  Bottom,
  Body,
  SummaryContainer,
  Separator,
  SummaryNote,
  SummaryDetails,
  Title,
  PriceFooterWrapper,
} from './style';

function renderSocialChannelsText(selectedPlan) {
  const { channelsQuantity } = selectedPlan;
  return (
    <Text type="p" color="grayDark">
      {/* this ends up reading: # social channels x base price */}
      {`Includes ${channelsQuantity} social channel${
        channelsQuantity > 1 ? 's' : ''
      }`}
    </Text>
  );
}

// TODO: Implement this with FF
// eslint-disable-next-line no-unused-vars
function renderSBBSummary(
  currentPlan,
  selectedPlan,
  channelsCount,
  increaseCounter,
  decreaseCounter
) {
  const {
    planName: currentPlanName,
    totalPrice: currentPlanPricing,
    planInterval: currentPlanInterval,
    channelsQuantity: currentChannelsQuantity,
    summary: currentPlanSummary,
  } = currentPlan;
  const currentPlanUsersText = currentPlanSummary.details[1];
  const {
    planId: selectedPlanId,
    planName: selectedPlanName,
    basePrice: selectedPlanPricing,
    planInterval: selectedPlanInterval,
    summary: selectePlanSummary,
  } = selectedPlan;
  const selectedPlanUsersText = selectePlanSummary.details[1];

  return (
    <>
      <CurrentPlanInfo
        planName={currentPlanName}
        planPrice={currentPlanPricing}
        planCycle={currentPlanInterval}
        numberOfChannels={currentChannelsQuantity}
        numberOfUsers={currentPlanUsersText}
      />
      <UpdatedPlanInfo
        planId={selectedPlanId}
        planName={selectedPlanName}
        planPrice={selectedPlanPricing}
        planCycle={selectedPlanInterval}
        numberOfChannels={currentChannelsQuantity}
        numberOfUsers={selectedPlanUsersText}
        channelsCount={channelsCount}
        increaseCounter={() => increaseCounter()}
        decreaseCounter={() => decreaseCounter()}
      />
    </>
  );
}

const Summary = ({
  planOptions,
  selectedPlan,
  fromPlanSelector,
  subscriptionEndDate,
  isUpgradeIntent,
  channelsCount,
  increaseCounter,
  decreaseCounter,
}) => {
  const currentPlan = planOptions.find((option) => option.isCurrentPlan);
  const currentPlanId = currentPlan.planId;
  const selectedPlanId = selectedPlan.planId;

  // TODO: Remove eslint disable
  // Switch Split FF key to us SBB
  // eslint-disable-next-line no-unused-vars
  const { isEnabled: splitSBBEnabled } = useSplitEnabled('slot-based-billing');

  const getStatus = () => {
    let planStatus;
    if (currentPlanId === selectedPlanId) {
      planStatus = `Currently on ${currentPlan.planName}`;
    } else {
      planStatus = `${fromPlanSelector ? 'Changing to' : 'Paying for'} ${
        selectedPlan?.planName
      }`;
    }

    if (isUpgradeIntent) {
      planStatus = `Change to ${selectedPlan?.planName}`;
    }

    return (
      <>
        <Title>
          <Text type="p">{planStatus}</Text>
        </Title>
      </>
    );
  };

  const getPriceFooter = () => {
    if (selectedPlan.planId === 'free') {
      return null;
    }
    return (
      <PriceFooterWrapper>
        <Text type="p" color="grayDark">
          Billed {selectedPlan.planInterval}ly in USD
        </Text>
        {renderSocialChannelsText(selectedPlan)}
      </PriceFooterWrapper>
    );
  };

  const dateOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  const formattedSubscriptionEndDate = new Date(
    subscriptionEndDate
  ).toLocaleDateString('en-US', dateOptions);

  const getSummaryNote = () => {
    if (selectedPlan.planId === 'free' && subscriptionEndDate) {
      return (
        <Text type="p">
          Changing to Free will occur at the end of your next billing cycle on{' '}
          <span>{formattedSubscriptionEndDate}</span>
        </Text>
      );
    }
    if (selectedPlan.planId === 'free' && !subscriptionEndDate) {
      return <Text type="p">Upgrade your plan at anytime</Text>;
    }
    return (
      <Text type="p">
        First payment due today and then every {selectedPlan.planInterval} until
        canceled
      </Text>
    );
  };

  return (
    <SummaryContainer>
      <Body>
        <Text type="h2">Summary</Text>
        {splitSBBEnabled ? (
          renderSBBSummary(
            currentPlan,
            selectedPlan,
            channelsCount,
            increaseCounter,
            decreaseCounter
          )
        ) : (
          <>
            <SummaryDetails>
              <>
                {getStatus()}
                <DetailList>
                  {selectedPlan.summary.details.map((detail) => (
                    <Detail key={detail}>
                      <Text type="p">{detail}</Text>
                    </Detail>
                  ))}
                </DetailList>
                <Separator />
                <SummaryNote>{getSummaryNote()}</SummaryNote>
              </>
            </SummaryDetails>

            <Bottom>
              <TotalPrice>
                <sup>{selectedPlan.currency}</sup>
                <Text type="h2" as="p">
                  {selectedPlan.totalPrice}
                </Text>
              </TotalPrice>
              {!selectedPlan.channelsQuantity ? '' : <>{getPriceFooter()}</>}
              {selectedPlan.planInterval === 'year' &&
                selectedPlan.planId !== 'free' && (
                  <DiscountReminder>
                    <Coupon />
                    <p>{selectedPlan.discountPercentage}% discount</p>
                  </DiscountReminder>
                )}
            </Bottom>
          </>
        )}
      </Body>
    </SummaryContainer>
  );
};

const SummaryProvider = ({
  selectedPlan,
  fromPlanSelector,
  isUpgradeIntent,
  channelsCount,
  increaseCounter,
  decreaseCounter,
}) => {
  return (
    <UserContext.Consumer>
      {(user) => {
        return (
          <Summary
            planOptions={user?.currentOrganization?.billing?.changePlanOptions}
            trialInfo={user?.currentOrganization?.billing?.subscription?.trial}
            subscriptionEndDate={
              user?.currentOrganization?.billing?.subscription?.periodEnd
            }
            selectedPlan={selectedPlan}
            fromPlanSelector={fromPlanSelector}
            isUpgradeIntent={isUpgradeIntent}
            channelsCount={channelsCount}
            increaseCounter={() => increaseCounter()}
            decreaseCounter={() => decreaseCounter()}
          />
        );
      }}
    </UserContext.Consumer>
  );
};

export default SummaryProvider;
