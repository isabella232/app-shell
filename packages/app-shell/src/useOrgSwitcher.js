import { useMutation, useApolloClient } from '@apollo/client'
import { QUERY_ACCOUNT, SET_CURRENT_ORGANIZATION } from './graphql/account';

function useOrgSwitcher() {
  const apolloClient = useApolloClient()
  const [setCurrentOrganization] = useMutation(
    SET_CURRENT_ORGANIZATION, {
      client: apolloClient,
      refetchQueries: [{
        query: QUERY_ACCOUNT,
      }],
    }
  )

  return async (organizationId, {
    onCompleted
  }) => {
    await setCurrentOrganization({
      variables: {
        organizationId,
      }
    })
    onCompleted(organizationId)
  }
}

export default useOrgSwitcher
