import { useState, useEffect } from 'react';

import {
  getFreePlanChannelInputMessaging,
  getAgencyPlanMinimumChannelInputMessaging,
} from '../../components/Modal/utils';

function handleChannelsCountConditions(
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
    }
  }

  function decreaseCounter(disableDecrease = false) {
    if (channelsCount > minimumQuantity || disableDecrease) {
      setChannelsCount(channelsCount - 1);
    }

    if (
      planId === 'agency' &&
      channelsCount === minimumQuantity &&
      channelCountMessageStatus === null
    ) {
      setChannelCountMessageStatus(agencyPlanLimitMessageStatus);
    }
  }

  function handleWarningMessageChecks() {
    if (planId === 'team' || planId === 'essentials') {
      setChannelCountMessageStatus(null);
    }

    if (
      planId === 'free' &&
      channelsCount > 3 &&
      channelCountMessageStatus === null
    ) {
      setChannelCountMessageStatus(freePlanLimitMessageStatus);
    }

    if (
      planId === 'agency' &&
      channelsCount >= minimumQuantity &&
      channelCountMessageStatus !== null
    ) {
      setChannelCountMessageStatus(null);
    }

    if (
      planId === 'free' &&
      channelsCount <= 3 &&
      channelCountMessageStatus !== null
    ) {
      setChannelCountMessageStatus(null);
    }
  }

  useEffect(() => {
    handleWarningMessageChecks();
  }, [channelsCount]);

  useEffect(() => {
    handleWarningMessageChecks();
    handleChannelsCountConditions(
      planId,
      channelsCount,
      setChannelsCounterValue
    );
  }, [planId]);

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
