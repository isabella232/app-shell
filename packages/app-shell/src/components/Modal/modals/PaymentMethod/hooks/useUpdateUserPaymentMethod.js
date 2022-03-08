import { useEffect , useState} from 'react';
import { useMutation } from '@apollo/client';
import { UPDATE_PAYMENT_METHOD } from '../../../../../common/graphql/billing';

function useUpdateUserPaymentMethod({ user, paymentMethod }) {
  const [updatePaymentMethod, { data, error: mutationError }] = useMutation(
    UPDATE_PAYMENT_METHOD,
  );
  const [error, setError] = useState(null);

  useEffect(() => {
    if (paymentMethod && user) {
      updatePaymentMethod({
        variables: {
          organizationId: user.currentOrganization.id,
          paymentMethodId: paymentMethod.id,
        },
      }).catch((e) => {
        console.error(e); // eslint-disable-line no-console
      });
    }
  }, [paymentMethod]);

  useEffect(() => {
    if (mutationError) {
      setError(mutationError);
    } else if (data?.billingUpdateCustomerPaymentMethod.userFriendlyMessage) {
      setError({
        message: data.billingUpdateCustomerPaymentMethod.userFriendlyMessage,
      });
    }
  }, [mutationError, data]);

  return {
    userPaymentMethod:
      data && data?.billingUpdateCustomerPaymentMethod.success
        ? data.billingUpdateCustomerPaymentMethod.success
        : null,
    error,
  };
}

export default useUpdateUserPaymentMethod;
