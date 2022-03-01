import React from 'react';
import Button from '@bufferapp/ui/Button';
import Link from '@bufferapp/ui/Link';

import { getActiveProductFromPath } from '../../../../../common/utils/getProduct';
import { useUser } from '../../../../../common/context/User';
import * as styles from '../styles';

export const Ctas = () => {
  const user = useUser();
  const canStartTrial = user?.currentOrganization?.billing?.canStartTrial;
  const { MODALS, actions } = window?.appshell || {};
  const modal = canStartTrial ? MODALS?.startTrial : MODALS?.planSelector;
  const cta = canStartTrial ? 'startTrial' : 'upgradePlan';
  const product = getActiveProductFromPath();

  return (<styles.CTAs>
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
    <Link newTab href={`https://buffer.com/${product}`}>Learn more</Link>
  </styles.CTAs>);
};

