import { useEffect } from 'react'
import { useMutation } from '@apollo/client';
import { UPDATE_SUBSCRIPTION_PLAN } from '../../graphql/billing'

function useUpdateSubscriptionPlan({ user, plan, interval, hasPaymentMethod }) {
  const [updateSubscriptionPlan, { data, error }] = useMutation(UPDATE_SUBSCRIPTION_PLAN)

  useEffect(() => {
    if (!user || !plan || !interval || !hasPaymentMethod) {
      return;
    }

    updateSubscriptionPlan({
      variables: {
        organizationId: user.currentOrganization.id,
        plan: plan.id,
        interval,
      }
    }).catch((e) => {
      console.error(e)
    })
  }, [hasPaymentMethod])

  return {
    data,
    error
  }
}

export default useUpdateSubscriptionPlan

