import React, { useEffect, useState, useContext } from 'react';
import Text from '@bufferapp/ui/Text';
import FacebookIcon from '@bufferapp/ui/Icon/Icons/Facebook';
import InstagramIcon from '@bufferapp/ui/Icon/Icons/Instagram';
import TwitterIcon from '@bufferapp/ui/Icon/Icons/Twitter';
import LinkedInIcon from '@bufferapp/ui/Icon/Icons/LinkedIn';
import ShopifyIcon from '@bufferapp/ui/Icon/Icons/Shopify';
import Button from '@bufferapp/ui/Button';
import { facebook, instagram, twitter, linkedin, shopify } from '@bufferapp/ui/style/colors';

import { getActiveProductFromPath } from 'utils/getProduct';
import { Content, Icons } from './style';
import { useTrackPageViewed } from '../../../../common/hooks/useSegmentTracking';
import { UserContext } from '../../../../common/context/User';

export const SUPPORTED_PRODUCTS = ['analyze', 'engage'];
const CHANNELS_CONNECTION_URL ='https://account.buffer.com/channels/connect?utm_source=channel_connection_prompt';

const Analytics = () => (<>
<Text type='h3'>Connect a channel <br/> to get started with Analytics</Text>
  <Icons>
    <FacebookIcon color={facebook} size='large'/>
    <InstagramIcon color={instagram} size='large'/>
    <TwitterIcon color={twitter} size='large'/>
    <LinkedInIcon color={linkedin} size='large'/>
    <ShopifyIcon color={shopify} size='large'/>
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
  <Text type='h3'>Connect a channel <br/> to get started with Engagement</Text>
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
      label="Connect a Facebook or Instagram Channel"
  />
</>);

const ChannelConnectionPrompt = () => {
  const [product, setProduct] = useState(null);
  const user = useContext(UserContext);

  useEffect(() => {
    const activeProduct = getActiveProductFromPath();
    setProduct(activeProduct);

    useTrackPageViewed({
      payload: {
        name: 'Connect Channel Prompt',
        title: 'Connect a Channel',
        product: activeProduct,
      },
      user,
    });
  }, [])

    return <Content id="channel-connection-prompt">
      {product === 'analyze' && <Analytics />}
      {product === 'engage' && <Engagement />}
    </Content>;
};

export default ChannelConnectionPrompt;
