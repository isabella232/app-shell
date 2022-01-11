import { useState } from 'react';

import { getDefaultSelectedPlan } from '../../../utils';

const useInterval = (planOptions, isUpgradeIntent, user) => {
  const defaultSelectedPlan = getDefaultSelectedPlan(
    planOptions,
    user, // TODO:REMOVE_WITH_FF:agencyPlan
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
