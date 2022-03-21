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
      } else return hasPaymentDetails ? 'Confirm Plan' : 'Go To Payment';
    } else if (selectedPlan?.isCurrentPlan) {
      if (selectedPlan.planId === 'free' && isAwaitingUserAction) {
        return 'Confirm Free Plan';
      } else if (selectedPlan.planId === 'free' && selectedPlan?.isCurrentPlan) {
        return 'Stay On My Current Plan'
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
    // If Free is selected and is not the current plan (no payment method modal needed)
    if (selectedPlan.planId === 'free' && !selectedPlan.isCurrentPlan) {
      return updatePlan;
    }

    // If trialing
    if (isActiveTrial) {
      return hasPaymentDetails ? updatePlan : openPaymentMethod;
    }

    // If not not trialing, no plan changed and quantity has not changed.
    if (selectedPlan.isCurrentPlan && currentChannelQuantity === updatedChannelQuantity) {
      return null
    }

    // If there are no payment details we open the paymentMethod modal
    // otherwise we update the plan directly.
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
