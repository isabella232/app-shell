import { useEffect, useState } from 'react';
import { useMutation } from '@apollo/client';
import { ACTIONS as ORGANIZATION_ACTIONS } from 'common/events/orgEvents';
import { START_TRIAL } from '../graphql/billing';
import { QUERY_ACCOUNT } from '../graphql/account';

const useStartTrial = ({ user, plan, attribution }) => {
  const [startTrial, { data: trial, error: mutationError }] = useMutation(
    START_TRIAL,
    {
      refetchQueries: [{ query: QUERY_ACCOUNT }],
      awaitRefetchQueries: true,
      onCompleted: () => {
        ORGANIZATION_ACTIONS.billingUpdated({ user });
      }
    }
  );
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (processing && user && plan) {
      startTrial({
        variables: {
          organizationId: user.currentOrganization.id,
          plan: plan.planId,
          interval: plan.planInterval,
          attribution,
        },
      }).catch((e) => {
        console.error(e); // eslint-disable-line no-console
      });
    }
  }, [processing]);

  useEffect(() => {
    if (mutationError) {
      setError(mutationError);
      setProcessing(false);
    } else if (trial?.billingStartTrial.userFriendlyMessage) {
      setError({ message: trial?.billingStartTrial.userFriendlyMessage });
      setProcessing(false);
    }
  }, [trial, mutationError]);

  return {
    startTrial: () => {
      setProcessing(true);
    },
    trial: trial ? { ...trial } : null,
    error,
    processing,
  };
};

export default useStartTrial;
