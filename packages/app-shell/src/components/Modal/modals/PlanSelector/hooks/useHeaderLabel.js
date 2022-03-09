import { freePlan } from '../../../../../common/mocks/freePlan';

const useHeaderLabel = (isActiveTrial, planOptions, isFreePlan) => {
  if (isActiveTrial) {
    return { headerLabel: 'Confirm Plan' };
  }

  const currentPlan = isFreePlan
    ? freePlan
    : planOptions.find((option) => option.isCurrentPlan);
  if (currentPlan.planId === 'free') {
    return { headerLabel: 'Upgrade from Free' };
  }

  return {
    headerLabel: 'Change my plan',
  };
};

export default useHeaderLabel;
