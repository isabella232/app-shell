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
import { CREATE_SETUP_INTENT } from '../graphql/billing';
import {
  DoubleFields,
  Footer,
  Form,
  LeftSide,
  RightSide,
  Error,
} from './style'

import Field from './components/Field'

const Content = ({ openPlans }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [stripeResponse, setStripeResponse] = useState(null);

  const submit = async () => {
    if (!stripe || !elements) {
      return;
    }

    await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardNumberElement)
    })
      .then((response) => setStripeResponse(response));
  };

  useEffect(() => {
    console.log(stripeResponse);
  }, [stripeResponse])

  return (<Form>
    <LeftSide>
      <Text type='h2'>Billing Details</Text>
      {stripeResponse && stripeResponse.error && stripeResponse.error.type === "invalid_request_error" &&
        <><Error error={stripeResponse.error} /><br/></>
      }
      <Field label="Credit card number" />
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
        <Button type="primary" onClick={submit} disabled={!stripe} label="Confirm Payment" fullWidth />
      </Footer>
    </RightSide>
  </Form>)
}

const StripeProvider = ({ user, openPlans }) => {
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
    if (setupIntent && !stripe) {
      setStripe(loadStripe(setupIntent.billingCreateSetupIntent))
    }
  }, [setupIntent])

  return (<Elements
    stripe={stripe}
    options={{
      fonts: [{
        cssSrc: 'https://fonts.googleapis.com/css?family=Roboto',
      }],
    }}
  >
    <Content openPlans={openPlans} />
  </Elements>)
}

const PaymentMethod = () => {
  return (
    <UserContext.Consumer>{user => (
      <ModalContext.Consumer>{modal => (
        <StripeProvider user={user} openPlans={() => {modal.openModal(MODALS.planSelector)}}/>
      ) }</ModalContext.Consumer>
    ) }</UserContext.Consumer>
  )
}

export default PaymentMethod;
