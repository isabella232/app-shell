import React, { useEffect, useState, useMemo } from 'react';
import { useMutation } from '@apollo/client';
import {loadStripe} from '@stripe/stripe-js';
import {
  Elements,
  useStripe,
  useElements,
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement
} from "@stripe/react-stripe-js";
import Text from '@bufferapp/ui/Text';
import Button from '@bufferapp/ui/Button';
import ArrowLeftIcon from '@bufferapp/ui/Icon/Icons/ArrowLeft';
import LockIcon from '@bufferapp/ui/Icon/Icons/Locked';
import { gray } from '@bufferapp/ui/style/colors';

import { MODALS } from '../hooks/useModal';
import { UserContext } from '../context/User';
import { ModalContext } from '../context/Modal';
import { CREATE_SETUP_INTENT } from '../graphql/billing';
import {
  DoubleFields,
  Field,
  Footer,
  Form,
  Input,
  LeftSide,
  RightSide,
} from './style'

const Content = ({ openPlans }) => {
  const stripe = useStripe();
  const elements = useElements();
  const options = useMemo(() => ({
    style: {
      base: {
        color: "#636363",
        fontSize: "18px",
        fontFamily: "Source Code Pro, monospace",
        letterSpacing: "0.025em",
        "::placeholder": {
          color: "#aab7c4"
        }
      },
      invalid: {
        color: "#9e2146"
      }
    }
  }), []);

  const submit = async () => {
    if (!stripe || !elements) {
      return;
    }

    const payload = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardNumberElement)
    });

    console.log("[PaymentMethod]", payload);
  };

  return (<Form>
    <LeftSide>
      <Text type='h2'>Billing Details</Text>
      <Field><Text type='label' >
        Credit Card number
        <Input><CardNumberElement options={options} /></Input>
      </Text></Field>
      <DoubleFields>
        <Field><Text type='label' >
          Expiration date
          <Input><CardExpiryElement options={options} /></Input>
        </Text></Field>
        <Field><Text type='label' >
          CVC
          <Input><CardCvcElement options={options} /></Input>
        </Text></Field>
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

  return (<Elements stripe={stripe}>
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
