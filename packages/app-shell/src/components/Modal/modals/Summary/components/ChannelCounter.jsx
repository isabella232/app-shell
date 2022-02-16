import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import {
  ChannelsCounterContainer,
  ChannelsCounterButton,
  ChannelsCounterCountDisplay,
} from './ChannelCounter.style';

function ChannelCounter(props) {
  const { channelsCount, onUpdate } = props;
  const [count, setCount] = useState(channelsCount);

  function increaseCounter() {
    setCount(count + 1);
  }

  function decreaseCounter() {
    if (count !== 0) {
      setCount(count - 1);
    }
  }

  useEffect(() => {
    if (onUpdate) {
      onUpdate(count);
    }
  });

  // TODO: Replace text with Icons
  return (
    <ChannelsCounterContainer>
      <ChannelsCounterButton onClick={() => decreaseCounter()}>
        -
      </ChannelsCounterButton>
      <ChannelsCounterCountDisplay>{count}</ChannelsCounterCountDisplay>
      <ChannelsCounterButton onClick={() => increaseCounter()}>
        +
      </ChannelsCounterButton>
    </ChannelsCounterContainer>
  );
}

ChannelCounter.propTypes = {
  channelsCount: PropTypes.number,
  onUpdate: PropTypes.func,
};

ChannelCounter.defaultProps = {
  channelsCount: 0,
  onUpdate: () => {},
};

export default ChannelCounter;
