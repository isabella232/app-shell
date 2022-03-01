import React from 'react';
import Text from '@bufferapp/ui/Text';
import ReactPlayer from 'react-player';
import CheckmarkIcon from '@bufferapp/ui/Icon/Icons/Checkmark';
import Button from '@bufferapp/ui/Button';
import Link from '@bufferapp/ui/Link';

import { useUser } from '../../../../../common/context/User';
import * as styles from '../styles';

export const AnalyticsContent = () => {
  const user = useUser();
  const canStartTrial = user?.currentOrganization?.billing?.canStartTrial;
  const { MODALS, actions } = window?.appshell || {};
  const modal = canStartTrial ? MODALS?.startTrial : MODALS?.planSelector;
  const cta = canStartTrial ? 'startTrial' : 'upgradePlan';

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
    </styles.Info>
  </styles.Content>);
};

