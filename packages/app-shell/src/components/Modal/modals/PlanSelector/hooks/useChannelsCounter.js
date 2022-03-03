import { useState } from 'react';

import {
  getFreePlanChannelInputMessaging,
  getAgencyPlanMinimumChannelInputMessaging,
} from '../../../utils';

const agencyPlanLimitMessageStatus =
  getAgencyPlanMinimumChannelInputMessaging();
const freePlanLimitMessageStatus = getFreePlanChannelInputMessaging();

const useChannelsCounter = (
  planId,
  initialChannelCount = 0,
  minimumQuantity = 1
) => {
  const [channelsCount, setChannelsCount] = useState(initialChannelCount);
  const [channelCountMessageStatus, setChannelCountMessageStatus] =
    useState(null);

  function setChannelsCounterValue(value) {
    setChannelsCount(value);
  }

  function increaseCounter(disableIncrease = false) {
    if (!disableIncrease) {
      setChannelsCount(channelsCount + 1);

      if (
        planId === 'free' &&
        channelsCount >= 3 &&
        channelCountMessageStatus === null
      ) {
        setChannelCountMessageStatus(freePlanLimitMessageStatus);
      }

      if (
        planId === 'agency' &&
        channelsCount >= 10 &&
        channelCountMessageStatus !== null
      ) {
        setChannelCountMessageStatus(null);
      }
    }
  }

  function decreaseCounter(disableDecrease = false) {
    if (channelsCount > minimumQuantity || disableDecrease) {
      setChannelsCount(channelsCount - 1);
    }

    if (
      planId === 'free' &&
      channelsCount <= 4 &&
      channelCountMessageStatus !== null
    ) {
      setChannelCountMessageStatus(null);
    }

    if (
      planId === 'agency' &&
      channelsCount === 10 &&
      channelCountMessageStatus === null
    ) {
      setChannelCountMessageStatus(agencyPlanLimitMessageStatus);
    }
  }

  return {
    channelsCount,
    setChannelsCounterValue,
    increaseCounter,
    decreaseCounter,
    channelCountMessageStatus,
    setChannelCountMessageStatus,
  };
};

export default useChannelsCounter;
