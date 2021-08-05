import React, { useEffect, useState } from 'react';

import CheckmarkIcon from '@bufferapp/ui/Icon/Icons/Checkmark';
import Text from '@bufferapp/ui/Text';
import Button from '@bufferapp/ui/Button';

import { Error } from '../PaymentMethod/style';
import { MODALS } from '../../../../common/hooks/useModal';
import { UserContext } from '../../../../common/context/User';
import { ModalContext } from '../../../../common/context/Modal';
import useStartTrial from '../../../../common/hooks/useStartTrial';
import {
  useTrackPageViewed,
} from '../../../../common/hooks/useSegmentTracking';

import { Holder, Content, Ctas } from './style';

const StartTrial = ({ user, openModal, modalData }) => {
  const [suggestedPlan, setSuggestedPlan] = useState(null);
  const { cta, ctaButton } = modalData || {};

  useEffect(() => {
    if (user) {
      let plan = user.currentOrganization?.billing?.changePlanOptions.find(
        (p) => p.isRecommended
      );
      if (!plan) {
        plan = {
          planId: 'team',
          planInterval: 'month',
        };
      }
      setSuggestedPlan(plan);
    }
  }, [user]);

  const { startTrial, trial, error, processing } = useStartTrial({
    user,
    plan: suggestedPlan,
    attribution: { cta },
  });

  useEffect(() => {
    if (trial && trial.billingStartTrial.success) {
      openModal(MODALS.success, { startedTrial: true });
    }
  }, [trial]);

  useEffect(() => {
    useTrackPageViewed({
      payload: {
        name: 'AppShell Start Trial',
        cta,
        ctaButton,
      },
      user,
    });
  }, []);

  return (
    <Holder>
      <Content>
        <Text type="h1">Test run our paid features</Text>
        <Text type="p">
          Get faster results from your creative with our best publishing,
          analytics, and engagement tools built for growing businesses.
        </Text>
        <ol>
          <li>
            {' '}
            <CheckmarkIcon size="medium" />
            <Text>Advanced Instagram features</Text>
          </li>
          <li>
            {' '}
            <CheckmarkIcon size="medium" />
            <Text>Machine-learning driven insights</Text>
          </li>
          <li>
            {' '}
            <CheckmarkIcon size="medium" />
            <Text>
              Analytics for the best time to post and your audience demographics
            </Text>
          </li>
          <li>
            {' '}
            <CheckmarkIcon size="medium" />
            <Text>Easy, automatic reporting on growth and engagement</Text>
          </li>
        </ol>
        <Ctas>
          <Button
            type="secondary"
            onClick={() => {
              openModal(MODALS.planSelector, {
                cta: 'startTrialUpgrade',
                ctaButton: 'checkOutPaidPlans',
              });
            }}
            label="I'm ready to upgrade"
          />
          <Button
            type="primary"
            disabled={!suggestedPlan || processing}
            onClick={() => {
              startTrial();
            }}
            label={processing ? 'Processing ...' : 'Start my 14-day Free Trial'}
          />
        </Ctas>
        <Error
          error={
            error
              ? {
                  message: error.message,
                }
              : null
          }
        />
      </Content>
    </Holder>
  );
};

const StartTrialProvider = () => {
  return (
    <UserContext.Consumer>
      {(user) => (
        <ModalContext.Consumer>
          {({ openModal, data:modalData }) => <StartTrial modalData={modalData} user={user} openModal={openModal} />}
        </ModalContext.Consumer>
      )}
    </UserContext.Consumer>
  );
};

export default StartTrialProvider;
