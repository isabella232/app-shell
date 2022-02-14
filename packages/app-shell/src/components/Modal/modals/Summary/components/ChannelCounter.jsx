import React, { useState } from 'react';

import {
  ChannelsCounterContainer,
  ChannelsCounterButton,
  ChannelsCounterCountDisplay,
} from './ChannelCounter.style';

function ChannelCounter(props) {
  const { onUpdate } = props;
  const [channelCount, setChannelCount] = useState(0);

  function handleUpdate() {
    if (onUpdate) {
      onUpdate(channelCount);
    }
  }

  function increaseCounter() {
    setChannelCount(channelCount + 1);
    handleUpdate();
  }

  function decreaseCounter() {
    if (channelCount !== 0) {
      setChannelCount(channelCount - 1);
      handleUpdate();
    }
  }

  // TODO: Replace text with Icons
  return (
    <ChannelsCounterContainer>
      <ChannelsCounterButton onClick={() => decreaseCounter()}>
        -
      </ChannelsCounterButton>
      <ChannelsCounterCountDisplay>{channelCount}</ChannelsCounterCountDisplay>
      <ChannelsCounterButton onClick={() => increaseCounter()}>
        +
      </ChannelsCounterButton>
    </ChannelsCounterContainer>
  );
}

export default ChannelCounter;
