import { useEffect, useState } from 'react';
import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';

import { BILLING_FIELDS } from '../../../../../common/graphql/account';

export const MIGRATE_TO_OB = gql`
  ${BILLING_FIELDS}
  mutation BillingMigrateToOneBufferResponseMutation($organizationId: String!) {
    billingMigrateToOneBuffer(organizationId: $organizationId) {
      ... on BillingMigrateToOneBufferResponse {
        billing {
          ...BillingFields
        }
      }
      ... on BillingError {
        userFriendlyMessage
      }
    }
  }
`;

const useMigrateToOB = ({ currentOrganization }) => {
  const [migrateToOB, { data, error: mutationError }] =
    useMutation(MIGRATE_TO_OB);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (processing && currentOrganization) {
      migrateToOB({
        variables: {
          organizationId: currentOrganization.id,
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
    } else if (data?.billingMigrateToOneBuffer.userFriendlyMessage) {
      setError({
        message: data?.billingMigrateToOneBuffer.userFriendlyMessage,
      });
      setProcessing(false);
    }
  }, [data, mutationError]);

  return {
    migrateToOB: () => {
      setProcessing(true);
    },
    success: !!data?.billingMigrateToOneBuffer?.billing,
    error,
    processing,
  };
};

export default useMigrateToOB;
