import React, { useEffect, useState } from 'react';
import { useMutation } from '@apollo/client';
import {loadStripe} from '@stripe/stripe-js';
import {
  Elements,
  useStripe,
  useElements,
  CardElement,
} from "@stripe/react-stripe-js";

import { UserContext } from '../context/User';
import { CREATE_SETUP_INTENT } from '../graphql/billing';

const Form = () => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async event => {
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    const payload = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement)
    });

    console.log("[PaymentMethod]", payload);
  };

  return (<form onSubmit={handleSubmit}>
    <label>
      Card details
      <CardElement
        onReady={() => {
          console.log("CardElement [ready]");
        }}
        onChange={event => {
          console.log("CardElement [change]", event);
        }}
        onBlur={() => {
          console.log("CardElement [blur]");
        }}
        onFocus={() => {
          console.log("CardElement [focus]");
        }}
      />
    </label>
    <button type="submit" disabled={!stripe}>
      Pay
    </button>
  </form>)
}

const StripeProvider = ({ user }) => {
  const [createSetupIntent, { data:setupIntent, error:setupIntentError }] = useMutation(CREATE_SETUP_INTENT);
  //Get setup intent
  useEffect(() => {
    createSetupIntent({
      variables: {
        organizationId: user.currentOrganization.id
      }
    });
  }, [])

  // Setup Stripe
  const [stripe, setStripe] = useState(null)
  useEffect(() => {
    // extra check to make sure we are not accidentally recreating stripe instance
    if (setupIntent && !stripe) {
      setStripe(loadStripe(setupIntent.billingCreateSetupIntent))
    }
  }, [setupIntent])

  return (<Elements stripe={stripe}>
    <Form />
  </Elements>)
}

const PaymentMethod = () => {
  return (
    <UserContext.Consumer>{user => (
      <StripeProvider user={user} />
    ) }</UserContext.Consumer>
  )
}

export default PaymentMethod;
