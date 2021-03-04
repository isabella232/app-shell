import React, { useEffect, useState } from 'react';
import { useMutation } from '@apollo/client';
import {loadStripe} from '@stripe/stripe-js';
import {
  Elements,
  useStripe,
  useElements,
  CardNumberElement,
} from "@stripe/react-stripe-js";

import Text from '@bufferapp/ui/Text';
import Button from '@bufferapp/ui/Button';
import ArrowLeftIcon from '@bufferapp/ui/Icon/Icons/ArrowLeft';
import LockIcon from '@bufferapp/ui/Icon/Icons/Locked';

import { MODALS } from '../hooks/useModal';
import { UserContext } from '../context/User';
import { ModalContext } from '../context/Modal';
import { CREATE_SETUP_INTENT, UPDATE_PAYMENT_METHOD } from '../graphql/billing';
import {
  DoubleFields,
  Footer,
  Form as StyledForm,
  LeftSide,
  RightSide,
  Error,
} from './style'

import Field from './components/Field'

// production = pk_dGKqAIFsUQonSYGPBM9Rek71IHOcL
// test = pk_test_CvOaedJTBPQLmI0YSnQsitzN
const STRIPE_PUBLIC_KEY = 'pk_test_CvOaedJTBPQLmI0YSnQsitzN';

const Form = ({ openPlans, openSuccess, setupIntent, user }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [stripeReady, setStripeReady] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(null);
  const [updatePaymentMethod, { data:paymentMethodResult, error:paymentMethodError }] = useMutation(UPDATE_PAYMENT_METHOD);

  const submit = async (e) => {
    e.preventDefault();
    setError(null);
    setProcessing(true);
  };

  useEffect(() => {
    if (processing) {
      if (!stripe || !elements) {
        return;
      }

      async function createPaymentMethod() {
        await stripe.createPaymentMethod({
          type: "card",
          card: elements.getElement(CardNumberElement)
        })
          .then(({ error, paymentMethod }) => {
            if (error) {
              setError(error);
              return;
            }
            setPaymentMethod(paymentMethod);
          });
      }

      createPaymentMethod();
    }
  }, [processing])

  useEffect(() => {
    setProcessing(false);
  }, [error])

  useEffect(() => {
    if (paymentMethod) {
      stripe
        .confirmCardSetup(setupIntent, {
          payment_method: paymentMethod.id,
        })
        .then(function({ error, setupIntent }) {
          if (error) {
            setError(error);
            return;
          }

          updatePaymentMethod({
            variables: {
              organizationId: user.currentOrganization.id,
              paymentMethodId: setupIntent.payment_method,
            }
          });
        });
    }
  }, [paymentMethod])

  useEffect(() => {
    setProcessing(false);
    // TODO confirm plan if present
    if (paymentMethod) {
      openSuccess(paymentMethodResult)
    }
  }, [paymentMethodResult])

  return (<StyledForm>
    <LeftSide>
      <Text type='h2'>Billing Details</Text>
      <Error error={error && error.type !== 'validation_error' ? error : null} /><br/>
      <Field label="Credit card number" enableSubmit={() => { setStripeReady(true) }} />
      <DoubleFields>
        <Field label="Expiration date" />
        <Field label="CVC" />
      </DoubleFields>
      <Footer>
        <Button
          type="text"
          onClick={openPlans}
          label="Go back to plans"
          icon={<ArrowLeftIcon />}
        />
        <Text type="p">
          <LockIcon size="medium" /> Payments are securely provided by Stripe
        </Text>
      </Footer>
    </LeftSide>
    <RightSide>
      <Footer>
        <Button type="primary" onClick={submit} disabled={!stripeReady || processing} label={processing ? "Processing..." : "Confirm Payment"} fullWidth />
      </Footer>
    </RightSide>
  </StyledForm>)
}

const StripeProvider = ({ user, openPlans, openSuccess }) => {
  const [createSetupIntent, { data:setupIntent, error:setupIntentError }] = useMutation(CREATE_SETUP_INTENT);
  //Get setup intent
  useEffect(() => {
    if (user.currentOrganization && user.currentOrganization.id) {
      createSetupIntent({
        variables: {
          organizationId: user.currentOrganization.id
        }
      });
    }
  }, [user])

  // Setup Stripe
  const [stripe, setStripe] = useState(null)
  useEffect(() => {
    // extra check to make sure we are not accidentally recreating stripe instance
    if (!stripe) {
      setStripe(loadStripe(STRIPE_PUBLIC_KEY))
    }
  }, [])

  return (<Elements
    stripe={stripe}
    options={{
      fonts: [{
        cssSrc: 'https://fonts.googleapis.com/css?family=Roboto',
      }],
    }}
  >
    <Form
      openPlans={openPlans}
      openSuccess={openSuccess}
      setupIntent={setupIntent ? setupIntent.billingCreateSetupIntent : null}
      user={user}
    />
  </Elements>)
}

const PaymentMethod = () => {
  return (
    <UserContext.Consumer>{user => (
      <ModalContext.Consumer>{modal => (
        <StripeProvider
          user={user}
          openPlans={() => {modal.openModal(MODALS.planSelector)}}
          openSuccess={(data) => {modal.openModal(MODALS.success, data)}}
        />
      ) }</ModalContext.Consumer>
    ) }</UserContext.Consumer>
  )
}

export default PaymentMethod;
