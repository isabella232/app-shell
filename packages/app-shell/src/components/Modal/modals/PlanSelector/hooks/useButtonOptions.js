/* eslint-disable no-shadow, no-else-return */
import { useState } from 'react';
import { formatCTAString } from '../../../../../common/hooks/useSegmentTracking';

const useButtonOptions = ({
  selectedPlan,
  updatePlan,
  openPaymentMethod,
  hasPaymentDetails,
  isActiveTrial,
  isAwaitingUserAction,
  currentChannelQuantity,
  updatedChannelQuantity,
}) => {
  const getLabel = (selectedPlan, updatedQuantity) => {
    if (isActiveTrial) {
      if (selectedPlan.planId === 'free') {
        return 'Confirm Plan Change';
      } else return hasPaymentDetails ? 'Confirm Trial Plan' : 'Go To Payment';
    } else if (selectedPlan?.isCurrentPlan) {
      if (selectedPlan.planId === 'free' && isAwaitingUserAction) {
        return 'Confirm Free Plan';
      } else if (currentChannelQuantity !== updatedQuantity) {
        return 'Confirm Changes';
      } else return 'Stay On My Current Plan';
    } else if (hasPaymentDetails || selectedPlan.planId === 'free') {
      return 'Confirm Plan Change';
    }
    return 'Go To Payment';
  };
  const [label, setLabel] = useState(
    getLabel(selectedPlan, currentChannelQuantity, updatedChannelQuantity)
  );

  const buttonFunction = () => {
    if (selectedPlan.isCurrentPlan && isActiveTrial && hasPaymentDetails) {
      return updatePlan;
    }

    if (selectedPlan.planId === 'free') {
      return updatePlan;
    }

    if (
      selectedPlan.isCurrentPlan &&
      currentChannelQuantity !== updatedChannelQuantity
    ) {
      return updatePlan;
    }

    if (selectedPlan.isCurrentPlan && !isActiveTrial) {
      return null;
    }

    return hasPaymentDetails ? updatePlan : openPaymentMethod;
  };

  const [action, setAction] = useState(() => buttonFunction());

  const updateButton = (selectedPlan, channelsCount) => {
    setLabel(getLabel(selectedPlan, channelsCount));
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
