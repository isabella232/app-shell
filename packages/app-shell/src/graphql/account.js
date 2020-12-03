import gql from 'graphql-tag'

export const SET_CURRENT_ORGANIZATION = gql`
  mutation AccountSetCurrentOrganization($organizationId: String) {
    accountSetCurrentOrganization(organizationId: $organizationId)
  }
`

export const QUERY_ACCOUNT = gql`
  query GetAccount {
    account {
      id
      email
      featureFlips
      isImpersonation
      currentOrganization {
        id
        name
        canEdit
        role
        createdAt
      }
      channels {
        id,
        name,
        service,
        avatar
      }
      organizations {
        id
        name
      }
      products {
        name
        userId
      }
    }
  }
`;
