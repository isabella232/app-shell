import React from 'react';
import Text from '@bufferapp/ui/Text';
import ReactPlayer from 'react-player';
import CheckmarkIcon from '@bufferapp/ui/Icon/Icons/Checkmark';

import * as styles from '../styles';
import { Ctas } from './Ctas';

export const EngagementContent = () => {
  return (<styles.Content>
    <styles.Video>
      <ReactPlayer
        url="https://www.youtube.com/watch?v=KHWHAeWQ1u8"
        width="520px"
        height="312px"
        light="https://buffer-ui.s3.amazonaws.com/video-thumbnail-engagement.jpg"
        playIcon={<styles.PlayIcon />}
      />
      <Text> See how you can use Buffer’s tools together to grow your brand </Text>
    </styles.Video>
    <styles.Info>
      <Text type="h2">Turn your followers into your <br/> fans</Text>
      <styles.List>
        <li>
          <styles.Check><CheckmarkIcon /></styles.Check>
          <Text>View unanswered comments in a simple dashboard</Text>
        </li>
        <li>
          <styles.Check><CheckmarkIcon /></styles.Check>
          <Text>Machine-learning-powered comment alerts</Text>
        </li>
        <li>
          <styles.Check><CheckmarkIcon /></styles.Check>
          <Text>Reply faster with hotkeys and a smart emoji picker</Text>
        </li>
      </styles.List>
      <Ctas />
    </styles.Info>
  </styles.Content>);
};
