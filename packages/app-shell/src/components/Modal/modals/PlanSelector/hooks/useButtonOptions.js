import { useState } from 'react';
import { formatCTAString } from '../../../../../common/hooks/useSegmentTracking';

const useButtonOptions = ({
  selectedPlan,
  updatePlan,
  openPaymentMethod,
  hasPaymentDetails,
  isActiveTrial,
  isAwaitingUserAction,
}) => {
  const getLabel = (selectedPlan) => {
    if (isActiveTrial) {
      if (selectedPlan.planId === 'free') {
        return 'Confirm Plan Change';
      } else return hasPaymentDetails ? 'Confirm Trial Plan' : 'Go To Payment';
    } else if (selectedPlan?.isCurrentPlan) {
      if (selectedPlan.planId === 'free' && isAwaitingUserAction) {
        return 'Confirm Free Plan';
      } else return 'Stay On My Current Plan';
    } else if (hasPaymentDetails || selectedPlan.planId === 'free') {
      return 'Confirm Plan Change';
    }
    return 'Go To Payment';
  };

  const [label, setLabel] = useState(getLabel(selectedPlan));

  const buttonFunction = () => {
    if (selectedPlan.isCurrentPlan && isActiveTrial && hasPaymentDetails) {
      return updatePlan;
    }

    if (selectedPlan.planId === 'free') {
      return updatePlan;
    }

    if (selectedPlan.isCurrentPlan && !isActiveTrial) {
      return null;
    }

    return hasPaymentDetails ? updatePlan : openPaymentMethod;
  };

  const [action, setAction] = useState(() => buttonFunction());

  const updateButton = (selectedPlan) => {
    setLabel(getLabel(selectedPlan));
    setAction(() => buttonFunction());
  };

  return {
    label,
    action,
    updateButton,
    ctaButton: formatCTAString(label),
  };
};

export default useButtonOptions;
