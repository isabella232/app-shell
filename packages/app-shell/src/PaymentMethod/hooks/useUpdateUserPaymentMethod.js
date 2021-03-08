import { useEffect } from 'react'
import { useMutation } from '@apollo/client';
import { UPDATE_PAYMENT_METHOD } from '../../graphql/billing';

function useUpdateUserPaymentMethod({ user, paymentMethod }) {
  const [updatePaymentMethod, { data, error }] = useMutation(UPDATE_PAYMENT_METHOD);

  useEffect(() => {
    if (paymentMethod && user) {
      updatePaymentMethod({
        variables: {
          organizationId: user.currentOrganization.id,
          paymentMethodId: paymentMethod.id,
        }
      }).catch((e) => {
        console.error(e)
      })
    }
  }, [paymentMethod])

  return {
    data,
    error,
  }
}

export default useUpdateUserPaymentMethod
