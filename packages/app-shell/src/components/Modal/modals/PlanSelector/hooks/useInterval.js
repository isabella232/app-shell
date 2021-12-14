import { useState } from 'react';

import useDefaultSelectedPlan from './useDefaultSelectedPlan';

const useInterval = (planOptions, isUpgradeIntent) => {
  const defaultSelectedPlan = useDefaultSelectedPlan(
    planOptions,
    isUpgradeIntent
  );

  const initiallyMonthly = isUpgradeIntent
    ? false
    : defaultSelectedPlan.planInterval === 'month';

  const [monthlyBilling, setBillingInterval] = useState(initiallyMonthly);

  return {
    monthlyBilling,
    setBillingInterval,
  };
};

export default useInterval;
