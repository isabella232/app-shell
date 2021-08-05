import React, { useEffect, useState } from 'react';

import CheckmarkIcon from '@bufferapp/ui/Icon/Icons/Checkmark';
import Text from '@bufferapp/ui/Text';
import Button from '@bufferapp/ui/Button';

import { Error } from '../PaymentMethod/style';
import { MODALS } from '../../../../common/hooks/useModal';
import { UserContext } from '../../../../common/context/User';
import { ModalContext } from '../../../../common/context/Modal';
import useStartTrial from '../../../../common/hooks/useStartTrial';

import { Holder, Content, Ctas } from './style';

const StartTrial = ({ user, openModal }) => {
  const [suggestedPlan, setSuggestedPlan] = useState(null);
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
  });

  useEffect(() => {
    if (trial && trial.billingStartTrial.success) {
      openModal(MODALS.success, { startedTrial: true });
    }
  }, [trial]);

  return (
    <Holder>
      <Content>
        <Text type="h1">Try it all, for free!</Text>
        <Text type="p">
          Take your online business further with our entire suite of tools.
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
            <Text>Comprehensive analytics</Text>
          </li>
          <li>
            {' '}
            <CheckmarkIcon size="medium" />
            <Text>
              Easy reporting for your team and clients
            </Text>
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
                cta: 'planSelection',
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
          {({ openModal }) => <StartTrial user={user} openModal={openModal} />}
        </ModalContext.Consumer>
      )}
    </UserContext.Consumer>
  );
};

export default StartTrialProvider;
