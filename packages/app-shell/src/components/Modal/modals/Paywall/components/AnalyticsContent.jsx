import React from 'react';
import Text from '@bufferapp/ui/Text';
import ReactPlayer from 'react-player';
import CheckmarkIcon from '@bufferapp/ui/Icon/Icons/Checkmark';

import * as styles from '../styles';
import { Ctas } from './Ctas';

export const AnalyticsContent = () => {
  return (<styles.Content>
    <styles.Video>
      <ReactPlayer
        url="https://www.youtube.com/watch?v=KHWHAeWQ1u8"
        width="520px"
        height="312px"
        light="https://buffer-ui.s3.amazonaws.com/video-thumbnail-analytics.jpg"
        playIcon={<styles.PlayIcon />}
      />
      <Text type="label" color="gray"> See how you can use Buffer’s tools together to grow your brand </Text>
    </styles.Video>
    <styles.Info>
      <Text type="h2">Get in-depth insights to grow <br /> your brand on social media</Text>
      <styles.List>
        <li>
          <styles.Check><CheckmarkIcon /></styles.Check>
          <Text>Get recommendations to grow your presence like “Best time to post”</Text>
        </li>
        <li>
          <styles.Check><CheckmarkIcon /></styles.Check>
          <Text>Measure social media performance</Text>
        </li>
        <li>
          <styles.Check><CheckmarkIcon /></styles.Check>
          <Text>Create gorgeous reports</Text>
        </li>
      </styles.List>
      <Ctas />
    </styles.Info>
  </styles.Content>);
};

