import React from 'react';
import Text from '@bufferapp/ui/Text';
import Coupon from '@bufferapp/ui/Icon/Icons/Coupon';
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
import { UserContext } from '../../../../common/context/User';

const Summary = ({
  planOptions,
  selectedPlan,
  fromPlanSelector,
  subscriptionEndDate,
  isUpgradeIntent,
}) => {
  const currentPlan = planOptions.find((option) => option.isCurrentPlan);
  const currentPlanId = currentPlan.planId
  const selectedPlanId = selectedPlan.planId

  const getStatus = () => {

    let planStatus;
    if (currentPlanId === selectedPlanId) {
      planStatus = `Currently on ${currentPlan.planName}`;
    } else {
      planStatus = `${fromPlanSelector ? 'Changing to' : 'Paying for'} ${selectedPlan?.planName}`;
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
        <Text type="p" color="grayDark">
          {/* this ends up reading: # social channels x base price */}
          {`Includes ${selectedPlan.channelsQuantity} social channel${
            selectedPlan.channelsQuantity > 1 ? 's' : ''
          }`}
        </Text>
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
    return <Text type="p">First payment due today and then every {selectedPlan.planInterval} until canceled</Text>;
  };

  return (
    <SummaryContainer>
      <Body>
        <Text type="h2">Summary</Text>
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
          {selectedPlan.planInterval === 'year' && selectedPlan.planId !== 'free' && (
            <DiscountReminder>
              <Coupon />
              <p>{selectedPlan.discountPercentage}% discount</p>
            </DiscountReminder>
          )}
        </Bottom>
      </Body>
    </SummaryContainer>
  );
};

const SummaryProvider = ({
  selectedPlan,
  fromPlanSelector,
  isUpgradeIntent,
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
          />
        );
      }}
    </UserContext.Consumer>
  );
};

export default SummaryProvider;
