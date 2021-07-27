export const planMigrationPreview = {
  "data":{
      "previewPlanMigration":{
         "showPreview":true,
         "preview":{
            "suggestedPlan":{
               "name":"Essentials",
               "interval":"month",
               "supportedFeatures":[
                  "publishingTools",
                  "engagementTools",
                  "comprehensiveAnalytics",
                  "campaignAnalytics",
                  "customisableReports",
                  "bestTimeToPost",
                  "advancedInstagramFeatures",
                  "organicAndBoostedPosts",
                  "hashtagManager",
                  "perChannelPricing"
               ],
               "__typename":"MigrationPlan"
            },
            "currentPlan": {
              "interval": "month",
              "supportedFeatures": ["publishingTools", "engagementTools"],
              "__typename": "MigrationPlan",
            },
            "migrationSummary":{
               "details":[
                  "Unlimited scheduled posts",
                  "Unlimited social channels",
                  "One user"
               ],
               "totalPrice":6,
               "channelCount":0,
               "baseMonthlyPrice":6,
               "basePlanPrice":6,
               "migrationPreview":{
                  "chargeAmount":0,
                  "creditAmount":0,
                  "__typename":"PlanMigrationPreview"
               },
               "__typename":"MigrationSummary"
            },
            "planFeatures":[
               {
                  "id":"publishingTools",
                  "title":"Publishing tools",
                  "tagline":"Auto-schedule posts across multiple networks",
                  "__typename":"MigrationMarketingFeaturesCopy"
               },
               {
                  "id":"engagementTools",
                  "title":"Engagement tools",
                  "tagline":"Get back to your customers without delay",
                  "__typename":"MigrationMarketingFeaturesCopy"
               },
               {
                  "id":"comprehensiveAnalytics",
                  "title":"Comprehensive Analytics",
                  "tagline":"Construct and schedule posts across networks",
                  "__typename":"MigrationMarketingFeaturesCopy"
               },
               {
                  "id":"campaignAnalytics",
                  "title":"Campaign Analytics",
                  "tagline":"Take your campaigns further with in-depth analysis",
                  "__typename":"MigrationMarketingFeaturesCopy"
               },
               {
                  "id":"customisableReports",
                  "title":"Customisable Reports",
                  "tagline":"Custom-made reports out of your social media analytics",
                  "__typename":"MigrationMarketingFeaturesCopy"
               },
               {
                  "id":"bestTimeToPost",
                  "title":"Best time to post",
                  "tagline":"Know when it's the right time to post and how",
                  "__typename":"MigrationMarketingFeaturesCopy"
               },
               {
                  "id":"advancedInstagramFeatures",
                  "title":"Advanced Instagram Features",
                  "tagline":"Schedule Instagram stories and post to first comment",
                  "__typename":"MigrationMarketingFeaturesCopy"
               },
               {
                  "id":"organicAndBoostedPosts",
                  "title":"Compare organic and boosted posts",
                  "tagline":"See how your paid posts are performing",
                  "__typename":"MigrationMarketingFeaturesCopy"
               },
               {
                  "id":"hashtagManager",
                  "title":"Hashtag manager",
                  "tagline":"Don't get lost with hashtags, manage them with ease",
                  "__typename":"MigrationMarketingFeaturesCopy"
               },
               {
                  "id":"perChannelPricing",
                  "title":"Per social channel pricing",
                  "tagline":"Pay only for what you use with the social channels you need",
                  "__typename":"MigrationMarketingFeaturesCopy"
               }
            ],
            "__typename":"PlanMigrationPreviewDetails"
         },
         "__typename":"PlanMigrationPreviewResponse"
      }
   },
}
