import { useEffect, useState } from 'react';
import {
  useStripe,
  useElements,
  CardNumberElement,
} from '@stripe/react-stripe-js';

function useCreatePaymentMethod(setupIntent) {
  const stripe = useStripe();
  const elements = useElements();
  const [result, setPaymentMethod] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [processingError, setProcessingError] = useState(null);

  async function submit() {
    setProcessingError(null);
    setProcessing(true);
  }

  async function confirmCardSetup({
    error: paymentMethodError,
    paymentMethod,
  }) {
    if (paymentMethodError) {
      setProcessingError(paymentMethodError);
      return;
    }

    await stripe
      .confirmCardSetup(setupIntent, {
        payment_method: paymentMethod.id,
      })
      .then(({ error }) => {
        if (error) {
          setProcessingError(error);
          setProcessing(false);
          return;
        }

        setPaymentMethod(paymentMethod);
      })
      .catch((e) => {
        console.error(e); // eslint-disable-line no-console
      });
  }

  async function createPaymentMethod() {
    await stripe
      .createPaymentMethod({
        type: 'card',
        card: elements.getElement(CardNumberElement),
      })
      .then(confirmCardSetup)
      .catch((e) => {
        console.error(e); // eslint-disable-line no-console
      });
  }

  useEffect(() => {
    setProcessing(false);
  }, [processingError]);

  useEffect(() => {
    if (processing) {
      if (!stripe || !elements) {
        return;
      }

      createPaymentMethod();
    }
  }, [processing]);

  return {
    // _confirmCardSetup is exposed for simpler testing
    _confirmCardSetup: confirmCardSetup,
    error: processingError,
    paymentMethod: result,
    processing,
    submit,
  };
}

export default useCreatePaymentMethod;
