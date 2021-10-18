import { getCookie } from '../../common/utils/cookies';
import { getActiveProductFromPath } from '../../common/utils/getProduct';

export function isPendoModalVisible() {
  return (
    window.pendo &&
    window.pendo.hasOwnProperty('isGuideShown') &&
    window.pendo.isGuideShown()
  );
}

export function isFreeUser(user) {
  return user.currentOrganization?.billing?.subscription?.plan?.id === 'free';
}

export function userCanStartFreeTrial(user) {
  return user.currentOrganization?.billing?.canStartTrial;
}

export function hasSeenStartTrialModalExperiement() {
  return getCookie({
    key: 'startTrialPrompt',
  });
}

export function shouldShowStartTrialModalExperimentGDEID1(user) {
  const activeProduct = getActiveProductFromPath();
  return (
    activeProduct === 'publish' &&
    isFreeUser(user) &&
    userCanStartFreeTrial(user) &&
    !isPendoModalVisible() &&
    !hasSeenStartTrialModalExperiement()
  );
}
