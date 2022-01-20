import { getCookie } from '../../common/utils/cookies';
import { getActiveProductFromPath } from '../../common/utils/getProduct';
import { isFreeUser, userCanStartFreeTrial } from '../../common/utils/user';

export function isPendoModalVisible() {
  return Boolean(
    window.pendo &&
      window.pendo.hasOwnProperty('isGuideShown') &&
      window.pendo.isGuideShown()
  );
}

export function hasSeenFreeUserStartTrialPrompt() {
  return Boolean(
    getCookie({
      key: 'startTrialPrompt',
    })
  );
}

export function shouldShowFreeUserStartTrialPrompt(user) {
  const activeProduct = getActiveProductFromPath();
  return (
    activeProduct === 'publish' &&
    isFreeUser(user) &&
    userCanStartFreeTrial(user) &&
    !isPendoModalVisible() &&
    !hasSeenFreeUserStartTrialPrompt()
  );
}

export function filterListOfPlans(planOptions, planToExclude) {
  const planOptionsFiltered = planOptions.filter(
    (plan) => plan.planId !== planToExclude
  );

  return planOptionsFiltered;
}

export function userHasFeatureFlip(user, featureFlip) {
  if (!user || !user.featureFlips) return false;

  return user.featureFlips.includes(featureFlip);
}

export function getDefaultSelectedPlan(planOptions, user, isUpgradeIntent) {
  const featureFilpAgencyPlan = userHasFeatureFlip(user, 'agencyPlan'); // TODO:REMOVE_WITH_FF:agencyPlan

  const currentPlan = planOptions.find((plan) => plan.isCurrentPlan);

  const isOnFreePlan =
    isUpgradeIntent || !currentPlan || currentPlan.planId === 'free'
      ? true
      : false;

  const planOptionsExcludingFree = filterListOfPlans(planOptions, 'free');
  const plans = featureFilpAgencyPlan ? planOptionsExcludingFree : planOptions;

  const defaultSelectedPlan =
    isOnFreePlan && !currentPlan ? plans[0] : currentPlan;

  return defaultSelectedPlan;
}
