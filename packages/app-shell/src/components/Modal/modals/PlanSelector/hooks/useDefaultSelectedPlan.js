import useFilteredListOfPlans from './useFilteredListOfPlans';

const useDefaultSelectedPlan = (planOptions) => {
  const currentPlan = planOptions.find((plan) => plan.isCurrentPlan);

  const planOptionsExcludingFree = useFilteredListOfPlans(planOptions, 'free');

  const isOnFreePlan = currentPlan.planId === 'free' ? true : false;

  const defaultSelectedPlan = isOnFreePlan
    ? planOptionsExcludingFree[0]
    : currentPlan;

  return defaultSelectedPlan;
};

export default useDefaultSelectedPlan;
