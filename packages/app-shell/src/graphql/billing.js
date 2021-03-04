import gql from 'graphql-tag'

export const CREATE_SETUP_INTENT = gql`
  mutation billingCreateSetupIntent(
    $organizationId: String
  ) {
    billingCreateSetupIntent(
      organizationId: $organizationId
    )
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
  }
`;
