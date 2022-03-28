import gql from 'graphql-tag';

export const CREATE_SETUP_INTENT = gql`
  mutation billingCreateSetupIntent($organizationId: String) {
    billingCreateSetupIntent(organizationId: $organizationId) {
      ... on BillingCreateSetupIntentResponse {
        success
        clientSecret
      }
      ... on BillingError {
        userFriendlyMessage
      }
    }
  }
`;

export const UPDATE_PAYMENT_METHOD = gql`
  mutation updatePaymentMethod(
    $organizationId: String
    $paymentMethodId: String
  ) {
    billingUpdateCustomerPaymentMethod(
      organizationId: $organizationId
      paymentMethodId: $paymentMethodId
    ) {
      ... on BillingResponse {
        success
      }
      ... on BillingError {
        userFriendlyMessage
      }
    }
  }
`;

export const UPDATE_SUBSCRIPTION_PLAN = gql`
  mutation updatePlan(
    $organizationId: String
    $plan: OBPlanId
    $interval: BillingInterval
    $attribution: AttributionInput
    $quantity: Int
  ) {
    billingUpdateSubscriptionPlan(
      organizationId: $organizationId
      plan: $plan
      interval: $interval
      quantity: $quantity
      attribution: $attribution
    ) {
      ... on BillingResponse {
        success
      }
      ... on BillingError {
        userFriendlyMessage
      }
    }
  }
`;

export const UPDATE_SUBSCRIPTION_QUANTITY = gql`
  mutation updateQuantity(
    $organizationId: String
    $quantity: Int
  ) {
    billingUpdateSubscriptionQuantity(
      organizationId: $organizationId
      quantity: $quantity
    ) {
      ... on BillingResponse {
        success
      }
      ... on BillingError {
        userFriendlyMessage
      }
    }
  }
`;

export const START_TRIAL = gql`
  mutation startTrial(
    $organizationId: String
    $plan: OBPlanId
    $interval: BillingInterval
    $attribution: AttributionInput
  ) {
    billingStartTrial(
      organizationId: $organizationId
      plan: $plan
      interval: $interval
      attribution: $attribution
    ) {
      ... on BillingResponse {
        success
      }
      ... on BillingError {
        userFriendlyMessage
      }
    }
  }
`;
