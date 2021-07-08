import React from 'react';

import Text from '@bufferapp/ui/Text';
import Link from '@bufferapp/ui/Link';
import Button from '@bufferapp/ui/Button';
import Summary from '../../Summary';

import FlashIcon from '@bufferapp/ui/Icon/Icons/Flash';
import ArrowLeftIcon from '@bufferapp/ui/Icon/Icons/ArrowLeft';

import { Holder, FeaturesList, LeftColumn, RightColumn } from './style';

const Pricing = () => {
  return (
    <Holder>
      <LeftColumn>
        <Text type="h2">Why supercharge your plan to Essentials?</Text>

        <Text type="p">
          By upgrading your plan today you are gaining so many features.
        </Text>

        <FeaturesList>
          {planFeatures.map((feature) => (
            <li>
              <FlashIcon size="large" />
              <Text type="p">{feature}</Text>
            </li>
          ))}
        </FeaturesList>

        <Button
          type="text"
          onClick={() => openPlans(isUpgradeIntent)}
          label="Go back to plans"
          icon={<ArrowLeftIcon />}
        />
      </LeftColumn>

      <RightColumn>
        <Summary
          selectedPlan={selectedPlan}
          fromPlanSelector={false}
          isUpgradeIntent={true}
        />
      </RightColumn>
    </Holder>
  );
};

export const planFeatures = [
  'Comprehensive analytics',
  'Intelligent answers and suggestions',
  'Advanced Instagram features',
  'The entirety of the Buffer platform',
];

export const selectedPlan = {
  planId: 'essentials',
  planName: 'Essentials',
  planInterval: 'month',
  channelsQuantity: 1,
  description: 'Grow your business with advanced features and unlimited usage.',
  isCurrentPlan: false,
  highlights: ['Unlimited usage', 'Advanced IG features'],
  currency: '$',
  basePrice: 5,
  totalPrice: 5,
  discountPercentage: 0,
  discountNote: '',
  priceNote: 'Price per social channel',
  summary: {
    details: ['Add social channels anytime', 'Cancel at anytime'],
    warning:
      'By downgrading, aspects of your account will be frozen to meet with plan quotas. Nothings will be lost.',
    intervalBasePrice: 5,
    intervalUnit: 'mo',
  },
  isRecommended: false,
};

export default Pricing;
