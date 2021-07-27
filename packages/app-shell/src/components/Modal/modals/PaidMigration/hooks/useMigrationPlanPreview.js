import gql from 'graphql-tag';
import { useQuery } from '@apollo/client';

const PREVIEW_PLAN_MIGRATION = gql`
  query PreviewPlanMigration($organizationId: String!) {
    previewPlanMigration(organizationId: $organizationId) {
      preview {
        currentPlan {
          supportedFeatures
          interval
        }
        suggestedPlan {
          name
          interval
          supportedFeatures
        }
        migrationSummary {
          details
          totalPrice
          channelCount
          baseMonthlyPrice
          basePlanPrice
          migrationPreview {
            chargeAmount
            creditAmount
          }
        }
        planFeatures {
          id
          title
          tagline
        }
      }
    }
  }
`


function useMigrationPlanPreview({ currentOrganization }) {
  const { loading, error, data } = useQuery(PREVIEW_PLAN_MIGRATION, {
    variables: { organizationId: currentOrganization.id }
  })

  return {
    loading,
    error,
    data: data?.previewPlanMigration?.preview || null,
  }
}

export default useMigrationPlanPreview
