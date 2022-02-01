import gql from 'graphql-tag';

export const SET_CURRENT_ORGANIZATION = gql`
  mutation AccountSetCurrentOrganization($organizationId: String) {
    accountSetCurrentOrganization(organizationId: $organizationId)
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
      canStartTrial
      subscription {
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
