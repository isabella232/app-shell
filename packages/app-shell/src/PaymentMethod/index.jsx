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
  Form as StyledForm,
  LeftSide,
  RightSide,
  Error,
} from './style'

import Field from './components/Field'

// production = pk_dGKqAIFsUQonSYGPBM9Rek71IHOcL
// test = pk_test_CvOaedJTBPQLmI0YSnQsitzN
const STRIPE_PUBLIC_KEY = 'pk_test_CvOaedJTBPQLmI0YSnQsitzN';

const Form = ({ openPlans, setupIntent }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [stripeResponse, setStripeResponse] = useState(null);

  const submit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }

    await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardNumberElement)
    })
      .then((response) => setStripeResponse(response));
      // TODO add paymentMethod to org
      // TODO change plan
  };

  useEffect(() => {
    console.log(stripeResponse);
  }, [stripeResponse])

  return (<StyledForm>
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
  </StyledForm>)
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
    <Form openPlans={openPlans} setupIntent={setupIntent} />
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
