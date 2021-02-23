import { useMutation, useApolloClient } from '@apollo/client';
import { QUERY_ACCOUNT, SET_CURRENT_ORGANIZATION } from './graphql/account';

function useOrgSwitcher() {
  const apolloClient = useApolloClient();
  const [setCurrentOrganization] = useMutation(SET_CURRENT_ORGANIZATION);

  const updateCache = (organizationId) => {
    const previousData = apolloClient.readQuery({ query: QUERY_ACCOUNT });
    const organizationSelected = previousData?.account?.organizations?.filter(
      (organization) => organization.id === organizationId
    )[0];
    const updatedData = {
      account: {
        ...previousData.account,
        currentOrganization: organizationSelected,
      },
    };
    apolloClient.writeQuery({
      query: QUERY_ACCOUNT,
      data: updatedData,
    });
  };

  return async (organizationId, options = {}) => {
    await setCurrentOrganization({
      variables: {
        organizationId,
      },
      update: () => updateCache(organizationId),
      onCompleted: () => options.onCompleted(organizationId),
    });
  };
}

export default useOrgSwitcher;
