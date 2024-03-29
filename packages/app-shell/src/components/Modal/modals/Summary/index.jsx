import React from 'react';
import Text from '@bufferapp/ui/Text';
import Coupon from '@bufferapp/ui/Icon/Icons/Coupon';
import { useSplitEnabled } from '@bufferapp/features';

import { UserContext } from '../../../../common/context/User';
import CurrentPlanInfo from './components/CurrentPlanInfo';
import UpdatedPlanInfo from './components/UpdatedPlanInfo';
import PaymentPlanInfo from './components/PaymentPlanInfo';

import { findPlanUserDetails } from '../../../../common/utils/product';

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

function renderSBBSummary(
  currentPlan,
  selectedPlan,
  channelsCount,
  increaseCounter,
  decreaseCounter,
  newPrice,
  channelCounterMessageStatus,
  currentChannelQuantity,
  isPaymentMethodSummary
) {
  const {
    planName: currentPlanName,
    totalPrice: currentPlanPricing,
    planInterval: currentPlanInterval,
    summary: currentPlanSummary,
  } = currentPlan;
  const currentPlanUsersText = findPlanUserDetails(currentPlanSummary.details);
  const {
    planName: selectedPlanName,
    planInterval: selectedPlanInterval,
    summary: selectePlanSummary,
  } = selectedPlan;
  const selectedPlanUsersText = findPlanUserDetails(selectePlanSummary.details);

  const paymentInfo = isPaymentMethodSummary ? (
    <PaymentPlanInfo
      planName={selectedPlanName}
      planCycle={selectedPlanInterval}
      numberOfUsers={selectedPlanUsersText}
      channelsCount={channelsCount}
      newPrice={newPrice}
      channelCounterMessageStatus={channelCounterMessageStatus}
    />
  ) : (
    <UpdatedPlanInfo
      planName={selectedPlanName}
      planCycle={selectedPlanInterval}
      numberOfUsers={selectedPlanUsersText}
      channelsCount={channelsCount}
      increaseCounter={() => increaseCounter()}
      decreaseCounter={() => decreaseCounter()}
      newPrice={newPrice}
      channelCounterMessageStatus={channelCounterMessageStatus}
    />
  );

  return (
    <>
      <CurrentPlanInfo
        planName={currentPlanName}
        planPrice={currentPlanPricing}
        planCycle={currentPlanInterval}
        numberOfChannels={currentChannelQuantity}
        numberOfUsers={currentPlanUsersText}
      />
      {paymentInfo}
    </>
  );
}

const Summary = ({
  planOptions,
  selectedPlan,
  fromPlanSelector,
  subscriptionEndDate,
  channelsCount,
  increaseCounter,
  decreaseCounter,
  newPrice,
  channelCounterMessageStatus,
  currentChannelQuantity,
  isPaymentMethodSummary,
}) => {
  const currentPlan = planOptions.find((option) => option.isCurrentPlan);
  const currentPlanId = currentPlan.planId;
  const selectedPlanId = selectedPlan.planId;

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
    <SummaryContainer sbbEnabled={splitSBBEnabled}>
      <Body sbbEnabled={splitSBBEnabled}>
        <Text type="h2">Summary</Text>
        {splitSBBEnabled ? (
          renderSBBSummary(
            currentPlan,
            selectedPlan,
            channelsCount,
            increaseCounter,
            decreaseCounter,
            newPrice,
            channelCounterMessageStatus,
            currentChannelQuantity,
            isPaymentMethodSummary
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
  channelsCount,
  increaseCounter,
  decreaseCounter,
  newPrice,
  channelCounterMessageStatus,
  currentChannelQuantity,
  isPaymentMethodSummary,
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
            channelsCount={channelsCount}
            increaseCounter={() => increaseCounter()}
            decreaseCounter={() => decreaseCounter()}
            newPrice={newPrice}
            channelCounterMessageStatus={channelCounterMessageStatus}
            currentChannelQuantity={currentChannelQuantity}
            isPaymentMethodSummary={isPaymentMethodSummary}
          />
        );
      }}
    </UserContext.Consumer>
  );
};

export default SummaryProvider;
