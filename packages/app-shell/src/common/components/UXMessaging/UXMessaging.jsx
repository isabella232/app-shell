import React from 'react';
import PropTypes from 'prop-types';

import { red, yellowDark } from '@bufferapp/ui/style/colors';

import { UXMessagingContainer } from './UXMessaging.style';

const messageStatusColor = {
  error: red,
  warning: yellowDark,
};

function UXMessaging(props) {
  const { messageStatus, message } = props;

  const messageTest = message;
  const color = messageStatusColor[messageStatus];

  return (
    <UXMessagingContainer color={color}>{messageTest}</UXMessagingContainer>
  );
}

UXMessaging.propTypes = {
  messageStatus: PropTypes.oneOf(['error', 'warning']),
  message: PropTypes.string.isRequired,
};

UXMessaging.defaultProps = {
  messageStatus: 'warning',
};

export default UXMessaging;
