// https://github.com/bufferapp/buffer-marketing/blob/master/components/Experiment/experiments.js

import deterministicSplit from 'deterministic-split';
import { useEffect, useState } from 'react';

import {
  getCookie,
  setCookie,
  DATES,
} from '../app-shell/src/common/utils/cookies';

export const experiments = {
  EID34: {
    name: 'EID34_homepage-illustration',
    distribution: {
      variant_1: 50,
    },
  },
  GEID1: {
    name: 'GEID1_free-trial-prompt',
    distribution: {
      variant_1: 50,
      variant_2: 50,
    },
  },
};

// This is used to pass the experiment key to the components
// export const experimentKeys = Object.keys(experiments).reduce((obj, key) => {
//   obj[key] = key;
//   return obj;
// }, {});

// https://github.com/bufferapp/buffer-marketing/tree/master/components/Experiment

function isTrackingBlocked() {
  return !!navigator.doNotTrack;
}

// To determine if this is the first time an Experiment has been viewed
// we are storing an array of all viewed experimentKeys in a cookie
// albert=['EXP_KEY1', 'EXP_KEY_2']
function setIsFirstView(experimentKey) {
  let isFirstView = true;
  const expCookie = getCookie({
    key: 'albert',
  });

  if (expCookie) {
    const experimentKeys = JSON.parse(expCookie).keys;

    if (experimentKeys.includes(experimentKey)) {
      isFirstView = false;
    } else {
      setCookie({
        key: 'albert',
        value: JSON.stringify({ keys: [...experimentKeys, experimentKey] }),
        expires: DATES.inMonthsFromNow(12),
      });
    }
  } else {
    setCookie({
      key: 'albert',
      value: JSON.stringify({ keys: [experimentKey] }),
      expires: DATES.inMonthsFromNow(12),
    });
  }

  return isFirstView;
}

function calculateDistribution(distribution) {
  const variants = Object.keys(distribution);
  const totalExpectedDistribution = 100;
  let distributionArray = [];

  // check to see if variant_1 property exists in the distribution object
  if (!distribution.hasOwnProperty('variant_1')) {
    throw new Error("distribution Object must contain 'variant_1' property");
  }

  variants.forEach((variant) => {
    distributionArray = distributionArray.concat(
      new Array(distribution[variant]).fill(variant)
    );
  });

  const controlSize = totalExpectedDistribution - distributionArray.length;

  return distributionArray.concat(new Array(controlSize).fill('control'));
}

function getVariant(experimentKey) {
  if (isTrackingBlocked() || !window.analytics.user) {
    return 'control';
  }

  // Force variant_1 when running tests
  const isTestUser = window.analytics.user().anonymousId() === 'TEST_USER_ID';
  if (isTestUser) {
    return 'variant_1';
  }

  const userId = window.analytics.user().anonymousId();
  const distribution = calculateDistribution(
    experiments[experimentKey].distribution
  );

  return deterministicSplit(userId, distribution);
}

function track(experimentKey, variant, isFirstView) {
  if (window.analytics?.user) {
    window.analytics.track('Experiment Viewed', {
      experimentId: experiments[experimentKey].name,
      experimentGroup: variant,
      firstViewed: isFirstView,
      product: 'buffer',
      sourceFramework: 'albert',
      view: window.location.href,
    });
  }
}

export function useAlbert(experimentKey) {
  const [variant, setVariant] = useState('control');
  useEffect(() => {
    const newVariant = getVariant(experimentKey);
    track(experimentKey, newVariant, setIsFirstView(experimentKey));
    setVariant(newVariant);
  }, [experimentKey]);
  return variant;
}
