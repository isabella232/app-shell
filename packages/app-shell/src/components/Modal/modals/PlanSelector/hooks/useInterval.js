import { useState } from 'react';

import useDefaultSelectedPlan from './useDefaultSelectedPlan';

const useInterval = (planOptions, isUpgradeIntent, user) => {
  const defaultSelectedPlan = useDefaultSelectedPlan(
    planOptions,
    user // TODO:REMOVE_WITH_FF:agencyPlan
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
