import gql from 'graphql-tag';

export const SET_CURRENT_ORGANIZATION = gql`
  mutation AccountSetCurrentOrganization($organizationId: String) {
    accountSetCurrentOrganization(organizationId: $organizationId)
  }
`;

export const ACCOUNT_INITIATE_EMAIL_VERIFICATION = gql`
  mutation AccountInitiateEmailVerification {
    accountInitiateEmailVerification {
      ... on AccountInitiateEmailVerificationResponse {
        success
      }
      ... on AccountInitiateEmailVerificationError {
        userFriendlyMessage
      }
    }
  }
`;

export const BILLING_FIELDS = gql`
  fragment BillingFields on Billing {
    id
    canAccessAnalytics
    canAccessEngagement
    canAccessPublishing
    paymentDetails {
      hasPaymentDetails
    }
    ... on MPBilling {
      billingRedirectUrl
      subscriptions {
        interval
        plan
        product
        trial {
          isActive
        }
      }
    }
    ... on OBBilling {
      channelSlotDetails {
        flatFee
        currentQuantity
        chargableQuantity
        pricePerQuantity
        minimumQuantity
      }
      canStartTrial
      subscription {
        quantity
        interval
        periodEnd
        isCanceledAtPeriodEnd
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
        }
        isRecommended
        downgradedMessage
        channelSlotDetails {
          flatFee
          currentQuantity
          chargableQuantity
          pricePerQuantity
          minimumQuantity
        }
      }
    }
  }
`;

export const QUERY_ACCOUNT = gql`
  ${BILLING_FIELDS}
  query GetAccount {
    account {
      id
      email
      createdAt
      featureFlips
      isImpersonation
      shouldShowEmailVerificationCommunication
      currentOrganization {
        id
        name
        canEdit
        role
        createdAt
        isOneBufferOrganization
        canMigrateToOneBuffer {
          canMigrate
          reasons
        }
        shouldDisplayInviteCTA
        featureFlips
        billing {
          ...BillingFields
        }
        channels {
          id
        }
      }
      organizations {
        id
        name
        canEdit
        role
        createdAt
        isOneBufferOrganization
        canMigrateToOneBuffer {
          canMigrate
          reasons
        }
        shouldDisplayInviteCTA
        featureFlips
        channels {
          id
          name
          service
          organizationId
        }
        billing {
          ...BillingFields
        }
      }
      products {
        name
        userId
      }
    }
  }
`;
