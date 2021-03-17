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
  BoldPrice,
  Notice,
} from './style';
import { UserContext } from '../context/User';
import { freePlan } from '../mocks/freePlan';

const Summary = ({
  planOptions,
  isActiveTrial,
  selectedPlan,
  fromPlanSelector,
  isFreePlan,
}) => {
  const currentPlan = isFreePlan
    ? freePlan
    : planOptions.find((option) => option.isCurrentPlan);
  const currentPlanString = `${currentPlan.planId}_${currentPlan.planInterval}`;
  const selectedPlanString = selectedPlan
    ? `${selectedPlan.planId}_${selectedPlan.planInterval}`
    : '';

  const getStatus = () => {
    const [currentPlanId, currentPlanInterval] = currentPlanString.split('_');
    const [selectedPlanId, selectedPlanInterval] = selectedPlanString.split(
      '_'
    );
    let planStatus;
    let billingIntervalStatus;
    let planChanging;
    let billingIntervalChanging;
    if (currentPlanId === selectedPlanId) {
      const type = isActiveTrial ? 'trial' : 'plan';
      planStatus = `Currently on the ${currentPlan.planName} ${type}`;
    } else {
      const indefiniteArticle =
        selectedPlan?.planName == 'Individual' ? 'an' : 'a';
      planStatus = `Changing to ${indefiniteArticle} ${selectedPlan?.planName} plan`;
      planChanging = true;
    }

    if (currentPlanInterval !== selectedPlanInterval) {
      billingIntervalStatus = `Changing to ${selectedPlanInterval}ly billing`;
      billingIntervalChanging = true;
    }

    return (
      <>
        <Detail changing={planChanging}>
          <Text type="p">{planStatus}</Text>
        </Detail>
        {billingIntervalStatus && (
          <Detail changing={billingIntervalChanging}>
            <Text type="p">{billingIntervalStatus}</Text>
          </Detail>
        )}
      </>
    );
  };

  const shouldShowDowngradeWarning = () => {
    if (!fromPlanSelector) {
      return false;
    }
    if (
      (currentPlan.planId === 'team' && selectedPlan.planId === 'individual') ||
      (currentPlan.planId === 'team' && selectedPlan.planId === 'free') ||
      (currentPlan.planId === 'individual' && selectedPlan.planId === 'free')
    ) {
      return true;
    }
  };

  return (
    <SummaryContainer>
      <Body>
        <Text type="h2">Summary</Text>
        {fromPlanSelector ? (
          <DetailList>
            {getStatus()}
            {selectedPlan.summary.details.map((detail) => (
              <Detail key={detail}>
                <Text type="p">{detail}</Text>
              </Detail>
            ))}
          </DetailList>
        ) : (
          <DetailList>
            <Detail>
              <Text type="p">Paying for {selectedPlan.planName} plan</Text>
            </Detail>
            <Detail>
              <Text type="p">First payment today</Text>
            </Detail>
            <Detail>
              <Text type="p">Cancel billing anytime</Text>
            </Detail>
          </DetailList>
        )}
        {shouldShowDowngradeWarning() && (
          <Notice>
            <Text>{selectedPlan.summary.warning}</Text>
          </Notice>
        )}
        <Bottom>
          <TotalPrice>
            <sup>{selectedPlan.currency}</sup>
            <Text type="h2" as="p">
              {selectedPlan.totalPrice}
            </Text>
            <sup
              aria-label={
                selectedPlan.summary.intervalUnit === 'mo'
                  ? 'per month'
                  : 'per year'
              }
            >
              /{selectedPlan.summary.intervalUnit}
            </sup>
          </TotalPrice>
          {!selectedPlan.channelsQuantity ? (
            ''
          ) : (
            <>
              {fromPlanSelector ? (
                <Text type="label" color="grayDark">
                  {/* this ends up reading: # social channels x base price */}
                  {`${selectedPlan.channelsQuantity} social channel${
                    selectedPlan.channelsQuantity > 1 ? 's' : ''
                  } x `}
                  {
                    <BoldPrice>
                      {selectedPlan.currency}
                      {selectedPlan.summary.intervalBasePrice}
                    </BoldPrice>
                  }
                </Text>
              ) : (
                <Text type="label" color="grayDark">
                  Includes tax
                </Text>
              )}
            </>
          )}
          {selectedPlan.planInterval === 'year' && (
            <DiscountReminder>
              <Coupon />
              <p>20% discount</p>
            </DiscountReminder>
          )}
        </Bottom>
      </Body>
    </SummaryContainer>
  );
};

const SummaryProvider = ({ selectedPlan, fromPlanSelector }) => {
  return (
    <UserContext.Consumer>
      {(user) => {
        return (
          <Summary
            planOptions={user.currentOrganization.billing.changePlanOptions}
            isActiveTrial={
              user.currentOrganization.billing.subscription.trial?.isActive
            }
            isFreePlan={
              user.currentOrganization.billing.subscription.plan?.id === 'free'
            }
            selectedPlan={selectedPlan}
            fromPlanSelector={fromPlanSelector}
          />
        );
      }}
    </UserContext.Consumer>
  );
};

export default SummaryProvider;
