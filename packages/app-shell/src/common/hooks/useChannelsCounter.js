import { useState } from 'react';

<<<<<<< HEAD
const useChannelsCounter = (initialChannelCount = 0, minimumQuantity = 1) => {
=======
import {
  getFreePlanChannelInputMessaging,
  getAgencyPlanMinimumChannelInputMessaging,
} from '../../components/Modal/utils';

const agencyPlanLimitMessageStatus =
  getAgencyPlanMinimumChannelInputMessaging();
const freePlanLimitMessageStatus = getFreePlanChannelInputMessaging();

const useChannelsCounter = (
  planId,
  initialChannelCount = 0,
  minimumQuantity = 1
) => {
>>>>>>> c9b4635 (switch link for button on modal call)
  const [channelsCount, setChannelsCount] = useState(initialChannelCount);

  function setChannelsCounterValue(value) {
    setChannelsCount(value);
  }

  function increaseCounter(disableIncrease = false) {
    if (!disableIncrease) {
      setChannelsCount(channelsCount + 1);
    }
  }

  function decreaseCounter(disableDecrease = false) {
    if (channelsCount > minimumQuantity || disableDecrease) {
      setChannelsCount(channelsCount - 1);
    }
  }

  return {
    channelsCount,
    setChannelsCounterValue,
    increaseCounter,
    decreaseCounter,
  };
};

export default useChannelsCounter;
