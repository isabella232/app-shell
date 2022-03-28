import { useState } from 'react';
import { freePlan } from '../../../../../common/mocks/freePlan';

import { getDefaultSelectedPlan } from '../../../utils';

const useSelectedPlan = (planOptions) => {
  const defaultSelectedPlan = getDefaultSelectedPlan(planOptions);
  const [selectedPlan, setSelectedPlan] = useState(defaultSelectedPlan);

  const updateSelectedPlan = (planString) => {
    const [newSelectedPlanId, newSelectedPlanInterval] = planString.split('_');
    const newPlan = planOptions.find(
      (option) =>
        newSelectedPlanId === option.planId &&
        newSelectedPlanInterval === option.planInterval
    );
    if (!newPlan) {
      setSelectedPlan(freePlan);
    } else setSelectedPlan(newPlan);
  };

  return {
    selectedPlan,
    updateSelectedPlan,
  };
};

export default useSelectedPlan;
