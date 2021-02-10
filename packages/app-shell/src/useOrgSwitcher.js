import { useContext } from 'react';
import { useApolloClient, useMutation } from '@apollo/client';
import { SET_CURRENT_ORGANIZATION } from './graphql/account';
import { UserQuery } from './index';

function useOrgSwitcher() {
  const apolloClient = useApolloClient();
  const userQuery = useContext(UserQuery);
  const [setCurrentOrganization] = useMutation(SET_CURRENT_ORGANIZATION, {
    client: apolloClient,
  });

  return async (organizationId, options = {}) => {
    await setCurrentOrganization({
      variables: {
        organizationId,
      },
    });
    userQuery.refetch();
    if (options.onCompleted) {
      options.onCompleted(organizationId);
    }
  };
}

export default useOrgSwitcher;
