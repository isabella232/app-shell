import React from 'react';
import PropTypes from 'prop-types';

import InstagramIcon from '@bufferapp/ui/Icon/Icons/Instagram';
import FacebookIcon from '@bufferapp/ui/Icon/Icons/Facebook';
import LinkedInIcon from '@bufferapp/ui/Icon/Icons/LinkedIn';
import PinterestIcon from '@bufferapp/ui/Icon/Icons/Pinterest';
import ShopifyIcon from '@bufferapp/ui/Icon/Icons/Shopify';
import TwitterIcon from '@bufferapp/ui/Icon/Icons/Twitter';

import Counter from '../Counter/Counter';
import UXMessaging, { MessageStatusShape } from '../UXMessaging/UXMessaging';

import {
  ChannelsContainer,
  Icons,
  Title,
  ChannelsInputContainer,
} from './Channels.style';

function Channels(props) {
  const {
    channelsCount,
    onDecreaseCounter,
    onIncreaseCounter,
    channelCounterMessageStatus,
  } = props;

  return (
    <ChannelsContainer>
      <Title>
        <span>Channels:</span>
        <Icons>
          <InstagramIcon size="medium" />
          <FacebookIcon size="medium" />
          <TwitterIcon size="medium" />
          <PinterestIcon size="medium" />
          <LinkedInIcon size="medium" />
          <ShopifyIcon size="medium" />
        </Icons>
      </Title>
      <ChannelsInputContainer>
        <Counter
          channelsCount={channelsCount}
          onIncreaseCounter={() => onIncreaseCounter()}
          onDecreaseCounter={() => onDecreaseCounter()}
        />
      </ChannelsInputContainer>
      {channelCounterMessageStatus && (
        <UXMessaging
          messageStatus={channelCounterMessageStatus.messageStatus}
          message={channelCounterMessageStatus.message}
        />
      )}
    </ChannelsContainer>
  );
}

Channels.propTypes = {
  channelsCount: PropTypes.number,
  onDecreaseCounter: PropTypes.func.isRequired,
  onIncreaseCounter: PropTypes.func.isRequired,
  channelCounterMessageStatus: PropTypes.shape({ ...MessageStatusShape }),
};

Channels.defaultProps = {
  channelsCount: 0,
  channelCounterMessageStatus: null,
};

export default Channels;
