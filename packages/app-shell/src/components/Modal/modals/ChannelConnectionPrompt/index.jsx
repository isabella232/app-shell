import React, { useEffect, useState } from 'react';
import Text from '@bufferapp/ui/Text';
import FacebookIcon from '@bufferapp/ui/Icon/Icons/Facebook';
import InstagramIcon from '@bufferapp/ui/Icon/Icons/Instagram';
import Button from '@bufferapp/ui/Button';
import { facebook, instagram } from '@bufferapp/ui/style/colors';

//foo
import { getActiveProductFromPath } from 'utils/getProduct';
import { Content, Icons } from './style';

export const SUPPORTED_PRODUCTS = ['analyze', 'engage'];
const CHANNELS_CONNECTION_URL ='https://account.buffer.com/channels/connect';

const Analytics = () => (<>
<Text type='h3'>Connect a channel to get started with Analytics</Text>
  <Icons>
    <FacebookIcon color={facebook} size='large'/>
    <InstagramIcon color={instagram} size='large'/>
  </Icons>
  <img
    src="https://buffer-ui.s3.amazonaws.com/onboarding/connection-modal-analytics_%40x2.jpg"
    alt="A preview of BUffer's Analytics app."
    width="313px"
  />
  <Button
    type="primary"
    onClick={() => {window.location = CHANNELS_CONNECTION_URL}}
      label="Connect a Channel"
  />
</>);

const Engagement = () => (<>
  <Text type='h3'>Connect a channel to get started with Engagement</Text>
  <Icons>
    <FacebookIcon color={facebook} size='large'/>
    <InstagramIcon color={instagram} size='large'/>
  </Icons>
  <img
    src="https://buffer-ui.s3.amazonaws.com/onboarding/connection-modal-engagement_%40x2.jpg"
    alt="A preview of BUffer's Engagement app."
    width="313px"
  />
  <Button
    type="primary"
    onClick={() => {window.location = CHANNELS_CONNECTION_URL}}
      label="Connect Facebook or Instagram"
  />
</>);

const ChannelConnectionPrompt = () => {
  const [product, setProduct] = useState(null);

  // TODO add tracking on render
  useEffect(() => {
    setProduct(getActiveProductFromPath());
  }, [])

    return <Content id="channel-connection-prompt">
      {product === 'analyze' && <Analytics />}
      {product === 'engage' && <Engagement />}
    </Content>;
};

export default ChannelConnectionPrompt;
