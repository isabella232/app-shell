import React from 'react';

const getTrialBannerCopy = ({ planName, daysRemaining }) => {

    let planNameText = planName
    if (planName === 'Essentials + Team Pack') {
        planNameText = 'Essentials plan with Team pack'
    } else {
        planNameText = `${planName} plan`
    }
    return `You are on the ${planNameText} trial with ${daysRemaining} ${
        daysRemaining === 1 ? 'day' : 'days'
      } left. Add your billing details now to start your subscription.`;
};

export default getTrialBannerCopy;
