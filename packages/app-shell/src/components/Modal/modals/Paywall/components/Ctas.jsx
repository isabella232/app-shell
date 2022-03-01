import React, { useEffect } from 'react';
import Button from '@bufferapp/ui/Button';
import Link from '@bufferapp/ui/Link';

import useStartTrial from '../../../../../common/hooks/useStartTrial';
import { useSuggestedPlan } from '../../../../../common/hooks/useSuggestedPlan';
import { getActiveProductFromPath } from '../../../../../common/utils/getProduct';
import { useUser } from '../../../../../common/context/User';
import { MODALS } from '../../../../../common/hooks/useModal';
import { ModalContext } from '../../../../../common/context/Modal';
import { Error } from '../../PaymentMethod/style';
import * as styles from '../styles';

const Content = ({ openModal }) => {
  const user = useUser();
  const product = getActiveProductFromPath();

  const canStartTrial = user?.currentOrganization?.billing?.canStartTrial;
  const cta = canStartTrial ? 'startTrial' : 'upgradePlan';

  const { suggestedPlan } = useSuggestedPlan(user);
  const { startTrial, trial, error, processing } = useStartTrial({
    user,
    plan: suggestedPlan,
    attribution: { cta },
  });

  let ctaLabel = canStartTrial ? 'Start a 14-day free trial' : 'Upgrade Plan';
  if (processing) {
    ctaLabel = 'Processing ...';
  }

  useEffect(() => {
    if (trial && trial.billingStartTrial.success) {
      openModal(MODALS.success, {
        startedTrial: true,
        selectedPlan: suggestedPlan,
      });
    }
  }, [trial]);

  return (<>
    <styles.CTAs>
      <Button
        type="primary"
        disabled={processing}
        onClick={() => {
          if (canStartTrial) {
            startTrial()
          } else {
            openModal(MODALS.planSelector, {
              cta,
              ctaButton: `paywall-${cta}-1`,
              isUpgradeIntent: true,
            });
          }
        }}
        label={ctaLabel}
      />
      <Link newTab href={`https://buffer.com/${product}`}>Learn more</Link>
      </styles.CTAs>
      <Error
        error={
          error
            ? {
                message: error.message,
              }
            : null
        }
      />
    </>
  );
};

export const Ctas = () => {
  return (<ModalContext.Consumer>
    {({ openModal }) => (
      <Content openModal={openModal} />
    )}
  </ModalContext.Consumer>);
};

