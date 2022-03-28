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
  if (isSupportedProdut && hasNoChannels && !isFreeUser(user)) {
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

export function shouldShowPaywallModal(user) {
  const activeProduct = getActiveProductFromPath();
  return (
    (activeProduct === 'analyze' || activeProduct === 'engage') &&
    isFreeUser(user)
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

export function getPlanByPlanId(planId, planOptions) {
  return planOptions.find((plan) => plan.planId === planId);
}

export function getCurrentPlanFromPlanOptions(planOptions) {
  return planOptions.find((plan) => plan.isCurrentPlan);
}

export function getDefaultSelectedPlan(planOptions) {
  const currentPlan = getCurrentPlanFromPlanOptions(planOptions);
  const essentialsPlan = getPlanByPlanId('essentials', planOptions);

  const defaultSelectedPlan = !currentPlan ? essentialsPlan : currentPlan;

  return defaultSelectedPlan;
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

export function getAgencyPlanMinimumChannelInputMessaging() {
  return {
    messageStatus: 'warning',
    message: 'Oops! The Agency Plan has a minimum of 10 channels. ',
  };
}

export function getFreePlanChannelInputMessaging() {
  return {
    messageStatus: 'warning',
    message:
      'The Free plan is limited to 3 channels. Additional channels will be locked.',
  };
}

export function handleUpgradeIntent(
  selectedPlanId,
  isUpgradeIntent,
  monthlyBilling,
  updateSelectedPlan
) {
  if (selectedPlanId === 'free' && isUpgradeIntent) {
    updateSelectedPlan(`essentials_${monthlyBilling ? 'month' : 'year'}`);
  }
}
