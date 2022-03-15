import React from 'react';
import Text from '@bufferapp/ui/Text';
import Link from '@bufferapp/ui/Link';

export const SUCCESS_CTA = "Great, Let's Go!";
const getCopy = ({ planName, startedTrial, stayedOnSamePlan }) => {
  if (startedTrial) {
    return {
      label: 'Trial activated! Time to explore.',
      description:
        'Let’s make the most of your 14-day trial. Jump in and start exploring your advanced publishing, analytics, and engagement features. ',
      buttonCopy: "Let's Go!",
      imageUrl: 'https://buffer-ui.s3.amazonaws.com/illustration-celebrate.png',
    };
  }

  if (planName === 'Free') {
    return {
      label: 'Congrats! You are now on the Free plan',
      description: `You've successfully changed your plan. Start using your Free plan today.`,
      buttonCopy: SUCCESS_CTA,
      imageUrl: 'https://buffer-ui.s3.amazonaws.com/illustration-celebrate.png',
    };
  }

  if (planName && !stayedOnSamePlan) {
    return {
      label: `Congrats! Welcome to the ${planName} plan`,
      description: `You've successfully saved your payment details! Start using your ${planName} plan features.`,
      buttonCopy: SUCCESS_CTA,
      imageUrl: 'https://buffer-ui.s3.amazonaws.com/illustration-celebrate.png',
      footer: (
        <Text type="p">
          You can always access your invoices and billing information{' '}
          <Link href="https://account.buffer.com/billing">here</Link>.
        </Text>
      ),
    };
  }

  // Just quantity change
  return {
    label: 'All set!',
    description: 'You have successfully adjusted your channels.',
    buttonCopy: 'Great!',
    imageUrl: 'https://buffer-ui.s3.amazonaws.com/illustration-highfive.png',
  };
};

export default getCopy;
