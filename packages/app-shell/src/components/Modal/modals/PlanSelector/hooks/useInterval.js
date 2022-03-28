import { useState } from 'react';

import { getDefaultSelectedPlan } from '../../../utils';

const useInterval = (planOptions, isUpgradeIntent) => {
  const defaultSelectedPlan = getDefaultSelectedPlan(
    planOptions,
    isUpgradeIntent
  );

  const initiallyMonthly = defaultSelectedPlan.planInterval === 'month';

  const [monthlyBilling, setBillingInterval] = useState(initiallyMonthly);

  return {
    monthlyBilling,
    setBillingInterval,
  };
};

export default useInterval;
