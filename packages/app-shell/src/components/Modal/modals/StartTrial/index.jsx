import React, { useEffect } from 'react';

import CheckmarkIcon from '@bufferapp/ui/Icon/Icons/Checkmark';
import Text from '@bufferapp/ui/Text';
import Button from '@bufferapp/ui/Button';

import { Error } from '../PaymentMethod/style';
import { MODALS } from '../../../../common/hooks/useModal';
import { UserContext } from '../../../../common/context/User';
import { ModalContext } from '../../../../common/context/Modal';
import useStartTrial from '../../../../common/hooks/useStartTrial';
import { getSuggestesPlan } from '../../../../common/utils/getSuggestedPlan';
import { useTrackPageViewed } from '../../../../common/hooks/useSegmentTracking';

import { Holder, Content, Ctas } from './style';

const StartTrial = ({ user, openModal, modalData }) => {
  const suggestedPlan = getSuggestesPlan(user);
  const { cta, ctaButton } = modalData || {};

  const { startTrial, trial, error, processing } = useStartTrial({
    user,
    plan: suggestedPlan,
    attribution: { cta },
  });

  useEffect(() => {
    if (trial && trial.billingStartTrial.success) {
      openModal(MODALS.success, {
        startedTrial: true,
        selectedPlan: suggestedPlan,
      });
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
    <Holder id="start-trial-modal">
      <Content>
        <Text type="h1">
          {' '}
          Grow your audience with the full power of Buffer.
        </Text>
        <Text type="p">
          Add our powerful analytics and engagement tools to drive more growth
          for your business.
        </Text>
        <ol>
          <li>
            {' '}
            <CheckmarkIcon size="medium" />
            <Text>Unlimited users</Text>
          </li>
          <li>
            {' '}
            <CheckmarkIcon size="medium" />
            <Text>Unlimited channels</Text>
          </li>
          <li>
            {' '}
            <CheckmarkIcon size="medium" />
            <Text>No credit card required</Text>
          </li>
        </ol>
        <Ctas>
          <Button
            type="primary"
            disabled={!suggestedPlan || processing}
            onClick={() => {
              startTrial();
            }}
            label={processing ? 'Processing ...' : 'Start a 14-day free trial'}
          />
          <Button
            type="secondary"
            onClick={() => {
              openModal(MODALS.planSelector, {
                cta: 'startTrialModal',
                ctaButton: 'checkOutPaidPlans',
              });
            }}
            label="See paid plans"
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
          {({ openModal, data: modalData }) => (
            <StartTrial
              modalData={modalData}
              user={user}
              openModal={openModal}
            />
          )}
        </ModalContext.Consumer>
      )}
    </UserContext.Consumer>
  );
};

export default StartTrialProvider;
