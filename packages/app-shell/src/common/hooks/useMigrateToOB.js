import { useEffect, useState } from 'react';
import { useMutation } from '@apollo/client';
import { MIGRATE_TO_OB } from '../graphql/billing';

const useMigrateToOB = ({ user }) => {
  const [migrateToOB, { data, error: mutationError }] = useMutation(
    MIGRATE_TO_OB,
  );
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (processing && user) {
      migrateToOB({
        variables: {
          organizationId: user.currentOrganization.id,
        },
      }).catch((e) => {
        console.error(e);
      });
    }
  }, [processing]);

  useEffect(() => {
    console.log(data);
    if (mutationError) {
      setError(mutationError);
      setProcessing(false);
    } else if (data?.billingMigrateToOneBuffer.userFriendlyMessage) {
      setError({ message: data?.billingMigrateToOneBuffer.userFriendlyMessage });
      setProcessing(false);
    }
  }, [data, mutationError]);

  return {
    migrateToOB: () => {
      setProcessing(true);
    },
    success: !!data,
    error,
    processing,
  };
};

export default useMigrateToOB;
