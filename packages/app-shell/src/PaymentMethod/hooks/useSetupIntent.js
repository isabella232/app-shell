import { useEffect } from 'react'
import { useMutation } from '@apollo/client';
import { CREATE_SETUP_INTENT } from '../../graphql/billing'

function useSetupIntent(user) {
  const [createSetupIntent, { data, error }] = useMutation(CREATE_SETUP_INTENT)

  useEffect(() => {
    if (user.currentOrganization && user.currentOrganization.id) {
      createSetupIntent({
        variables: {
          organizationId: user.currentOrganization.id
        }
      })
    }
  }, [user])

  return {
    setupIntent: data ? data.billingCreateSetupIntent : null,
    error
  }
}

export default useSetupIntent

