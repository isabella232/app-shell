import { useEffect, useState } from 'react';
import { useMutation } from '@apollo/client';
import { ACTIONS as ORGANIZATION_ACTIONS } from 'common/events/orgEvents';
import { UPDATE_SUBSCRIPTION_PLAN } from '../graphql/billing';
import { QUERY_ACCOUNT } from '../graphql/account';

const useUpdateSubscriptionPlan = ({
  cta,
  user,
  plan,
  hasPaymentMethod,
  alreadyProcessing,
  channelsQuantity,
}) => {
  const [processing, setProcessing] = useState(alreadyProcessing);
  const [error, setError] = useState(null);

  const [updateSubscriptionPlan, { data, error: mutationError }] = useMutation(
    UPDATE_SUBSCRIPTION_PLAN,
    {
      refetchQueries: [{ query: QUERY_ACCOUNT }],
      awaitRefetchQueries: true,
      onCompleted: () => {
        ORGANIZATION_ACTIONS.billingUpdated({ user });
      },
    }
  );

  useEffect(() => {
    if (!user || !plan) {
      // eslint-disable-next-line no-console
      console.error(
        'Could not update plan because either: user or plan are undefined'
      );
      return;
    }
    if (processing || alreadyProcessing) {
      updateSubscriptionPlan({
        variables: {
          organizationId: user.currentOrganization.id,
          plan: plan.planId,
          interval: plan.planInterval,
          quantity: channelsQuantity,
          attribution: { cta },
        },
      }).catch((e) => {
        console.error(e); // eslint-disable-line no-console
      });
    }
  }, [processing, hasPaymentMethod]);

  useEffect(() => {
    if (mutationError) {
      setError(mutationError);
    } else if (data?.billingUpdateSubscriptionPlan.userFriendlyMessage) {
      setError({
        message: data.billingUpdateSubscriptionPlan.userFriendlyMessage,
      });
      setProcessing(false);
    }
  }, [mutationError, data]);

  return {
    updateSubscriptionPlan: () => {
      setProcessing(true);
    },
    data,
    error,
    processing,
  };
};

export default useUpdateSubscriptionPlan;
