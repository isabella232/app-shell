import React from 'react';
import PropTypes from 'prop-types';

import {
  ChannelsCounterContainer,
  ChannelsCounterButton,
  ChannelsCounterCountDisplay,
} from './ChannelCounter.style';

function ChannelCounter(props) {
  const { channelsCount, onDecreaseCounter, onIncreaseCounter } = props;

  // TODO: Replace text with Icons
  return (
    <ChannelsCounterContainer>
      <ChannelsCounterButton onClick={() => onDecreaseCounter()}>
        -
      </ChannelsCounterButton>
      <ChannelsCounterCountDisplay>{channelsCount}</ChannelsCounterCountDisplay>
      <ChannelsCounterButton onClick={() => onIncreaseCounter()}>
        +
      </ChannelsCounterButton>
    </ChannelsCounterContainer>
  );
}

ChannelCounter.propTypes = {
  channelsCount: PropTypes.number,
  onDecreaseCounter: PropTypes.func.isRequired,
  onIncreaseCounter: PropTypes.func.isRequired,
};

ChannelCounter.defaultProps = {
  channelsCount: 0,
};

export default ChannelCounter;
