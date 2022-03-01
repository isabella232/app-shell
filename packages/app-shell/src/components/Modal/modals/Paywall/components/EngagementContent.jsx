import React from 'react';
import Text from '@bufferapp/ui/Text';
import ReactPlayer from 'react-player';
import CheckmarkIcon from '@bufferapp/ui/Icon/Icons/Checkmark';
import Button from '@bufferapp/ui/Button';
import Link from '@bufferapp/ui/Link';

import { useUser } from '../../../../../common/context/User';
import * as styles from '../styles';

export const EngagementContent = () => {
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
        light="https://buffer-ui.s3.amazonaws.com/video-thumbnail-engagement.jpg"
        playIcon={<styles.PlayIcon />}
      />
      <Text type="label" color="gray"> See how you can use Buffer’s tools together to grow your brand </Text>
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
      <styles.CTAs>
        <Button
          type="primary"
          onClick={() => {
            actions.openModal(modal, {
              cta,
              ctaButton: `paywall-${cta}-1`,
              isUpgradeIntent: true,
            });
          }}
          label={canStartTrial ? 'Start free Trial' : 'Upgrade Plan'}
        />
        <Link newTab href="https://buffer.com/engage ">Learn more</Link>
      </styles.CTAs>
    </styles.Info>
  </styles.Content>);
};

