import { getCookie } from '../../common/utils/cookies';
import { getActiveProductFromPath } from '../../common/utils/getProduct';
import { isFreeUser, userCanStartFreeTrial } from '../../common/utils/user';
import { SUPPORTED_PRODUCTS as CHANNEL_PROMPT_PRODUCTS } from './modals/ChannelConnectionPrompt';

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

export function shouldShowChannelConnectionPrompt(user) {
  const activeProduct = getActiveProductFromPath();
  const isSupportedProdut = CHANNEL_PROMPT_PRODUCTS.includes(activeProduct);
  const hasNoChannels = user?.currentOrganization?.channels?.length === 0;
  if (isSupportedProdut && hasNoChannels) {
    return true;
  }

  return false;
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

export function getCurrentPlanFromPlanOptions(planOptions) {
  return planOptions.find((plan) => plan.isCurrentPlan);
}

export function calculateAgencySlotPrice(
  numberOfSlots,
  slotPrice,
  flatFee,
  minimumQuantity
) {
  if (numberOfSlots <= minimumQuantity) {
    return flatFee;
  }

  const numberOfExtraChannels = numberOfSlots - minimumQuantity;

  return flatFee + numberOfExtraChannels * slotPrice;
}

export function calculateTotalSlotsPrice(
  planId,
  numberOfSlots,
  slotPrice,
  minimumQuantity,
  flatFee
) {
  if (planId === 'agency') {
    return calculateAgencySlotPrice(
      numberOfSlots,
      slotPrice,
      flatFee,
      minimumQuantity
    );
  }

  return numberOfSlots * slotPrice;
}

export function handleChannelsCountConditions(
  planId,
  channelsCount,
  setChannelsCounterValue
) {
  if (planId === 'agency' && channelsCount < 10) {
    setChannelsCounterValue(10);
  }
  if (planId === 'free' && channelsCount > 3) {
    setChannelsCounterValue(3);
  }
}
