import gql from 'graphql-tag'

export const CREATE_SETUP_INTENT = gql`
  mutation billingCreateSetupIntent(
    $organizationId: String
  ) {
    billingCreateSetupIntent(
      organizationId: $organizationId
    )
    {
      ... on BillingCreateSetupIntentResponse { success, clientSecret }
      ... on BillingError { userFriendlyMessage }
    }
  }
`;

export const UPDATE_PAYMENT_METHOD = gql`
  mutation updatePaymentMethod(
    $organizationId: String,
    $paymentMethodId: String
  ) {
    billingUpdateCustomerPaymentMethod(
      organizationId:$organizationId,
      paymentMethodId:$paymentMethodId
    )
    {
      ... on BillingResponse { success }
      ... on BillingError { userFriendlyMessage }
    }
  }
`;

export const UPDATE_SUBSCRIPTION_PLAN = gql`
  mutation updatePlan(
    $organizationId: String,
    $plan: OBPlanId,
    $interval: BillingInterval
  ) {
    billingUpdateSubscriptionPlan(
      organizationId: $organizationId,
      plan: $plan,
      interval: $interval
    )
    {
      ... on BillingResponse { success }
      ... on BillingError { userFriendlyMessage }
    }
  }
`;

export const START_TRIAL = gql`
  mutation startTrial(
    $organizationId:String,
    $plan:OBPlanId,
    $interval:BillingInterval
  ) {
    billingStartTrial(
      organizationId:$organizationId, 
      plan:$plan, 
      interval:$interval
    )
    {
      ... on BillingResponse { success }
      ... on BillingError { userFriendlyMessage }
    }
  }
`
export const MIGRATE_TO_OB = gql`
  mutation BillingMigrateToOneBufferResponseMutation(
    $billingMigrateToOneBufferOrganizationId: String!
  ) {
    billingMigrateToOneBuffer(
      organizationId: $billingMigrateToOneBufferOrganizationId
    ) {
      ... on BillingMigrateToOneBufferResponse {
        billing {
          ... on OBBilling {
            canStartTrial
            subscription {
              interval
              periodEnd
              trial {
                isActive
                remainingDays
                isAwaitingUserAction
                startDate
                endDate
              }
              plan {
                id
                name
              }
            }
            changePlanOptions {
              planId
              planName
              planInterval
              channelsQuantity
              description
              isCurrentPlan
              highlights
              currency
              basePrice
              totalPrice
              discountPercentage
              discountNote
              priceNote
              absoluteSavings
              summary {
                details
                intervalBasePrice
                intervalUnit
              }
              isRecommended
              downgradedMessage
            }
          }
        }
      }
      ... on BillingError { userFriendlyMessage }
  }
}
`
