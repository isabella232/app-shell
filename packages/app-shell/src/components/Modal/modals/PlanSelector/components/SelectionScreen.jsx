
import React from 'react';
import Text from '@bufferapp/ui/Text';
import CheckmarkIcon from '@bufferapp/ui/Icon/Icons/Checkmark';
import {
  Wrapper,
  CardContainer,
  CardHeader,
  CardFooter,
  Price,
  BenefitList,
  Benefit,
  Check
} from '../style';

const ENTER_KEY = 13;
const SPACE_KEY = 32;

const Card = ({
  planId,
  planName,
  planInterval,
  description,
  highlights,
  currency,
  basePrice,
  priceNote,
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
      <CardHeader>
        <Text type="h2">{planName}</Text>
        <Check isSelectedPlan={isSelectedPlan}><CheckmarkIcon size="medium" /></Check>
      </CardHeader>

      <Text type="p">{description}</Text>

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
          <Text type="h3">
            Features
          </Text>
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
          }
          return option.planInterval === 'year';
        })
        .map((option) => (
          <Card
            planId={option.planId}
            planName={option.planName}
            planInterval={option.planInterval}
            description={option.description}
            highlights={option.highlights}
            currency={option.currency}
            basePrice={option.basePrice}
            priceNote={option.priceNote}
            summary={option.summary}
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
