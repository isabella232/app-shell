import React from 'react';
import PropTypes from 'prop-types';

import AddIcon from '@bufferapp/ui/Icon/Icons/Add';
import SubtractIcon from '@bufferapp/ui/Icon/Icons/Subtract';

import {
  ChannelsCounterContainer,
  ChannelsCounterButton,
  ChannelsCounterCountDisplay,
} from './Counter.style';

function ChannelCounter(props) {
  const { channelsCount, onDecreaseCounter, onIncreaseCounter } = props;

  return (
    <ChannelsCounterContainer>
      <ChannelsCounterButton onClick={() => onDecreaseCounter()}>
        <SubtractIcon size="medium" />
      </ChannelsCounterButton>
      <ChannelsCounterCountDisplay>{channelsCount}</ChannelsCounterCountDisplay>
      <ChannelsCounterButton onClick={() => onIncreaseCounter()}>
        <AddIcon size="medium" />
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
