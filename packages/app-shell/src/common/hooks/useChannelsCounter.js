<<<<<<< HEAD
import { useState } from 'react';

<<<<<<< HEAD
const useChannelsCounter = (initialChannelCount = 0, minimumQuantity = 1) => {
=======
=======
import { useState, useEffect } from 'react';

>>>>>>> 5d60899382d1976e68ab31b3b8ad088ec46483cb
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
<<<<<<< HEAD
>>>>>>> c9b4635 (switch link for button on modal call)
  const [channelsCount, setChannelsCount] = useState(initialChannelCount);
=======
  const [channelsCount, setChannelsCount] = useState(initialChannelCount);
  const [channelCountMessageStatus, setChannelCountMessageStatus] =
    useState(null);
>>>>>>> 5d60899382d1976e68ab31b3b8ad088ec46483cb

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
<<<<<<< HEAD
  }

=======

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
  }, [planId]);

>>>>>>> 5d60899382d1976e68ab31b3b8ad088ec46483cb
  return {
    channelsCount,
    setChannelsCounterValue,
    increaseCounter,
    decreaseCounter,
<<<<<<< HEAD
=======
    channelCountMessageStatus,
    setChannelCountMessageStatus,
>>>>>>> 5d60899382d1976e68ab31b3b8ad088ec46483cb
  };
};

export default useChannelsCounter;
