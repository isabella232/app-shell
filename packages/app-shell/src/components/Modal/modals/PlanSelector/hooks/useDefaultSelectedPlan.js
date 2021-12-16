import useFilteredListOfPlans from './useFilteredListOfPlans';
import useFeatureFlip from './useFeatureFlip';

const useDefaultSelectedPlan = (planOptions, user) => {
  const featureFilpAgencyPlan = useFeatureFlip(user, 'agencyPlan');

  const currentPlan = planOptions.find((plan) => plan.isCurrentPlan);
  const isOnFreePlan = currentPlan.planId === 'free' ? true : false;

  const planOptionsExcludingFree = useFilteredListOfPlans(planOptions, 'free');
  const plans = featureFilpAgencyPlan ? planOptionsExcludingFree : planOptions;

  const defaultSelectedPlan = isOnFreePlan ? plans[0] : currentPlan;

  return defaultSelectedPlan;
};

export default useDefaultSelectedPlan;
