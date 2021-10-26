import React, { useEffect, useState } from 'react';

import SimpleModal from '@bufferapp/ui/SimpleModal';
import CheckmarkIcon from '@bufferapp/ui/Icon/Icons/Checkmark';
import Text from '@bufferapp/ui/Text';
import Button from '@bufferapp/ui/Button';

import { Error } from '../PaymentMethod/style';
import { MODALS } from '../../../../common/hooks/useModal';
import { UserContext } from '../../../../common/context/User';
import { ModalContext } from '../../../../common/context/Modal';
import useStartTrial from '../../../../common/hooks/useStartTrial';
import { useTrackPageViewed } from '../../../../common/hooks/useSegmentTracking';

import { useAlbert } from '../../../../../../albert';

import { Holder, Content, Ctas } from './style';

const StartTrialExperiment = ({ user, openModal, modalData, closeAction }) => {
  const [suggestedPlan, setSuggestedPlan] = useState(null);
  const { cta, ctaButton } = modalData || {};

  const variant = useAlbert('GEID1');
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
    <>
      {variant === 'variant_1' ? (
        <SimpleModal closeAction={closeAction}>
          <Holder id="start-trial-modal">
            <Content>
              <Text type="h1">
                {' '}
                Grow your audience with the full power of Buffer.
              </Text>
              <Text type="p">
                Add our powerful analytics and engagement tools to drive more
                growth for your business.
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
                  label={
                    processing ? 'Processing ...' : 'Start a 14-day free trial'
                  }
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
        </SimpleModal>
      ) : null}
    </>
  );
};

const StartTrialExperimentProvider = ({ closeAction }) => {
  return (
    <UserContext.Consumer>
      {(user) => (
        <ModalContext.Consumer>
          {({ openModal, data: modalData }) => {
            return (
              <StartTrialExperiment
                modalData={modalData}
                user={user}
                openModal={openModal}
                closeAction={closeAction}
              />
            );
          }}
        </ModalContext.Consumer>
      )}
    </UserContext.Consumer>
  );
};

export default StartTrialExperimentProvider;
