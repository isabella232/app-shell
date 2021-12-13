import React from 'react';
import Text from '@bufferapp/ui/Text';
import CheckmarkIcon from '@bufferapp/ui/Icon/Icons/Checkmark';
import Tag from '@bufferapp/ui/Tag';

import {
  Wrapper,
  CardContainer,
  CardHeader,
  CardFooter,
  CurrentLabel,
  Recommended,
  Price,
  BenefitList,
  Benefit,
  Check,
  Description,
  TopSection,
} from '../style';

const ENTER_KEY = 13;
const SPACE_KEY = 32;

function PlanName({ planName, planId }) {
  if (planId === 'agency') {
    return (
      <>
        <Text type="h2">{planName}</Text>
        <Tag color="green">New</Tag>
      </>
    );
  }
  return <Text type="h2">{planName}</Text>;
}

const Card = ({
  planId,
  planName,
  planInterval,
  description,
  highlights,
  currency,
  basePrice,
  priceNote,
  summary,
  isCurrentPlan,
  updateSelectedPlan,
  selectedPlan,
}) => {
  const isSelectedPlan = selectedPlan === planId;
  return (
    <Wrapper
      tabIndex="0"
      onClick={(e) => {
        updateSelectedPlan(e.currentTarget.id);
      }}
      onKeyDown={(e) => {
        if (e.keyCode === ENTER_KEY || e.keyCode === SPACE_KEY)
          updateSelectedPlan(e.currentTarget.id);
      }}
      id={`${planId}_${planInterval}`}
      isSelectedPlan={isSelectedPlan}
      aria-label={isSelectedPlan ? 'checked' : 'unchecked'}
    >
      <TopSection>
        <CardHeader>
          <PlanName planName={planName} planId={planId} />
          <Check isSelectedPlan={isSelectedPlan}>
            <CheckmarkIcon size="medium" />
          </Check>
        </CardHeader>
        <Text type="p">{description}</Text>
      </TopSection>
      <CardFooter>
        <Price>
          <sup>{currency}</sup>
          <Text type="h2" as="p">
            {basePrice}
          </Text>
        </Price>
        <Text type="label" color="grayDark">
          {priceNote}
        </Text>
        <BenefitList>
          <Text type="h3">Features</Text>
          <ul>
            {highlights.map((benefit) => (
              <Benefit key={benefit}>
                <CheckmarkIcon />
                <Text type="p">{benefit}</Text>
              </Benefit>
            ))}
          </ul>
        </BenefitList>
      </CardFooter>
    </Wrapper>
  );
};

export const SelectionScreen = ({
  planOptions,
  selectedPlan,
  updateSelectedPlan,
  monthlyBilling,
}) => {
  return (
    <CardContainer>
      {planOptions
        .filter((option) => {
          if (monthlyBilling) {
            return option.planInterval === 'month';
          } else {
            return option.planInterval === 'year';
          }
        })
        .map((option) => (
          <Card
            {...option}
            isCurrentPlan={option.isCurrentPlan}
            key={`${option.planId}_${option.planInterval}`}
            updateSelectedPlan={updateSelectedPlan}
            selectedPlan={selectedPlan.planId}
            recommended={false}
          />
        ))}
    </CardContainer>
  );
};
