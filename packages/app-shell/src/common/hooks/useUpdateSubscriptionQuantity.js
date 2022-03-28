import { useEffect, useState } from 'react';
import { useMutation } from '@apollo/client';
import { ACTIONS as ORGANIZATION_ACTIONS } from 'common/events/orgEvents';
import { UPDATE_SUBSCRIPTION_QUANTITY } from '../graphql/billing';
import { QUERY_ACCOUNT } from '../graphql/account';

const useUpdateSubscriptionQuantity = ({ user, channelsQuantity }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);

  const [updateSubscriptionQuantityRequest, { data, error: mutationError }] =
    useMutation(UPDATE_SUBSCRIPTION_QUANTITY, {
      refetchQueries: [{ query: QUERY_ACCOUNT }],
      awaitRefetchQueries: true,
      onCompleted: () => {
        ORGANIZATION_ACTIONS.billingUpdated({ user });
        setIsProcessing(false);
      },
    });

  function updateSubscriptionQuantity() {
    setIsProcessing(true);
    updateSubscriptionQuantityRequest({
      variables: {
        organizationId: user.currentOrganization.id,
        quantity: channelsQuantity,
      },
    }).catch((e) => {
      throw new Error('Error: updateSubscriptionQuantity failed', e);
    });
  }

  useEffect(() => {
    if (!user || !channelsQuantity) {
      // eslint-disable-next-line no-console
      console.warn(
        'Warning: useUpdateSubscriptionQuantity: user or channelsQuantity undefined - unexpected behaviour may happen'
      );
    }
  }, [isProcessing]);

  useEffect(() => {
    if (mutationError) {
      setError(mutationError);
    } else if (data?.billingUpdateSubscriptionQuantity?.userFriendlyMessage) {
      setError({
        message: data.billingUpdateSubscriptionQuantity.userFriendlyMessage,
      });
      setIsProcessing(false);
    }
  }, [mutationError, data]);

  return {
    updateSubscriptionQuantity,
    data,
    error,
    isProcessing,
  };
};

export default useUpdateSubscriptionQuantity;
