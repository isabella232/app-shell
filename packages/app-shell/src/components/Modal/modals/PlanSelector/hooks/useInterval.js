import { useState } from 'react';

import { getDefaultSelectedPlan } from '../../../utils';

const useInterval = (planOptions) => {
  const defaultSelectedPlan = getDefaultSelectedPlan(planOptions);

  const initiallyMonthly = defaultSelectedPlan.planInterval === 'month';

  const [monthlyBilling, setBillingInterval] = useState(initiallyMonthly);

  return {
    monthlyBilling,
    setBillingInterval,
  };
};

export default useInterval;
