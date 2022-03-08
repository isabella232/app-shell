import { useState } from 'react';

const useChannelsCounter = (initialChannelCount = 0, minimumQuantity = 1) => {
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
