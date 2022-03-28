import React, { useEffect, useState } from 'react';

import Text from '@bufferapp/ui/Text';
import Button from '@bufferapp/ui/Button';
import ArrowLeftIcon from '@bufferapp/ui/Icon/Icons/ArrowLeft';
import LockIcon from '@bufferapp/ui/Icon/Icons/Locked';
import {
  DoubleFields,
  Footer,
  Form as StyledForm,
  LeftSide,
  RightSide,
  Error,
  ButtonContainer,
  Notice,
} from '../style';
import Field from './Field';
import Summary from '../../Summary';

import useSetupIntent from '../hooks/useSetupIntent';
import useCreatePaymentMethod from '../hooks/useCreatePaymentMethod';
import useUpdateUserPaymentMethod from '../hooks/useUpdateUserPaymentMethod';
import useUpdateSubscriptionPlan from '../../../../../common/hooks/useUpdateSubscriptionPlan';

const Form = ({
  user,
  openPlans,
  openSuccess,
  plan,
  isTrial,
  isUpgradeIntent,
  canManageBilling,
  newPrice,
  channelCounterMessageStatus,
  currentChannelQuantity,
  channelsCount,
}) => {
  const [submitEnabled, setSubmitEnabled] = useState(false);
  const [hasPaymentMethod, setHasPaymentMethod] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);

  const { setupIntent, error: setupIntentError } = useSetupIntent(user);
  const {
    error: newPaymentMethodError,
    paymentMethod,
    submit,
  } = useCreatePaymentMethod(setupIntent);

  const { userPaymentMethod, error: updatePaymentMethodError } =
    useUpdateUserPaymentMethod({
      user,
      paymentMethod,
    });

  const { data: newPlan, error: subscriptionPlanError } =
    useUpdateSubscriptionPlan({
      user,
      plan,
      hasPaymentMethod,
      alreadyProcessing: processing,
      channelsQuantity: channelsCount,
    });

  useEffect(() => {
    if (paymentMethod) {
      if (!plan) {
        openSuccess({ onlyUpdatedCardDetails: true });
      } else {
        setHasPaymentMethod(true);
      }
    }
  }, [userPaymentMethod]);

  useEffect(() => {
    //re-enable form submit in case of errors
    setProcessing(false);

    if (updatePaymentMethodError) {
      setError(updatePaymentMethodError);
    }
    if (newPaymentMethodError) {
      setError(newPaymentMethodError);
    }
    if (subscriptionPlanError) {
      setError(subscriptionPlanError);
    }
    if (setupIntentError) {
      setError(setupIntentError);
    }
  }, [
    updatePaymentMethodError,
    newPaymentMethodError,
    subscriptionPlanError,
    setupIntentError,
  ]);

  useEffect(() => {
    if (newPlan?.billingUpdateSubscriptionPlan.success) {
      openSuccess({ selectedPlan: plan });
    }
  }, [newPlan]);

  const getButtonLabel = () => {
    if (processing) {
      return 'Processing...';
    }
    if (isTrial) {
      return 'Confirm Payment Details';
    }
    if (plan) {
      return 'Confirm Payment';
    }
    return 'Update Payment Details';
  };

  function handleSubmit(e) {
    e.preventDefault();

    if (submitEnabled || !processing) {
      setProcessing(true);
      submit();
    }
  }

  return (
    <StyledForm onSubmit={handleSubmit}>
      <LeftSide>
        <Text type="h2">Billing Details</Text>
        {canManageBilling ? (
          <>
            <Error
              error={error && error.type !== 'validation_error' ? error : null}
            />
            <br />
            <Field
              label="Credit card number"
              enableSubmit={() => {
                setSubmitEnabled(true);
              }}
            />
            <DoubleFields>
              <Field label="Expiration date" />
              <Field label="CVC" />
            </DoubleFields>
            <Footer>
              <Button
                type="text"
                onClick={() => openPlans(isUpgradeIntent)}
                label="Go back to plans"
                icon={<ArrowLeftIcon />}
              />
              <Text type="p">
                <LockIcon size="medium" /> Payments securely processed by Stripe
              </Text>
            </Footer>
          </>
        ) : (
          <Notice>
            <Text type="p">
              Please verify your email address in order to update payment method
              details. An email has been sent to your inbox to verify your email
              address. You can visit our{' '}
              <a
                href="https://support.buffer.com/hc/en-us/articles/4563021461907-Verifying-your-Buffer-email-address"
                target="_blank"
                rel="noopener noreferrer"
              >
                help guide
              </a>{' '}
              for more info.
            </Text>
          </Notice>
        )}
      </LeftSide>
      <RightSide>
        {plan && (
          <Summary
            selectedPlan={plan}
            isPaymentMethodSummary
            newPrice={newPrice}
            channelCounterMessageStatus={channelCounterMessageStatus}
            currentChannelQuantity={currentChannelQuantity}
            channelsCount={channelsCount}
          />
        )}
        {canManageBilling && (
          <ButtonContainer>
            <Button
              type="primary"
              onClick={handleSubmit}
              disabled={!submitEnabled || processing}
              label={getButtonLabel()}
              fullWidth
            />
          </ButtonContainer>
        )}
      </RightSide>
    </StyledForm>
  );
};

export default Form;
