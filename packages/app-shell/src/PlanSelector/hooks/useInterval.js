import { useState } from 'react';

const useInterval = (planOptions, isUpgradeIntent) => {
  const defaultSelectedPlan = isUpgradeIntent
    ? planOptions[1]
    : planOptions.find((plan) => plan.isCurrentPlan);
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
