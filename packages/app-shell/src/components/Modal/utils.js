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

export function hasSeenStartTrialModalExperiement() {
  return Boolean(
    getCookie({
      key: 'startTrialPrompt',
    })
  );
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
