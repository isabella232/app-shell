import { useEffect } from 'react';

import * as traits from './utils/segmentTraitGetters';

export function identifyUser(user) {
  if (window.analytics) {
    if (user.id && ! user.isImpersonation) {
      window.analytics.identify(user.id, { createdAt: user.createdAt,
        currentAnalyzePlan: traits.currentAnalyzePlan(user),
        currentBufferPlan: traits.currentBufferPlan(user),
        currentPublishPlan: traits.currentPublishPlan(user),
        email: user.email,
        isMultiProductCustomer: traits.isMultiProductCustomer(user),
        isOneBufferEnabled: user.currentOrganization.isOneBufferOrganization,
        isPayingAnalyzeUser: traits.isPayingAnalyzeOrganization(user),
        isPayingBufferUser: traits.isPayingBufferOrganization(user),
        isPayingPublishUser: traits.isPayingPublishOrganization(user),
        isFreePlan: traits.isFreePlan(user),
        currentOrganizationId: user.currentOrganization.id,
        organizationUserRole: traits.organizationUserRole(user),

        isOnBufferTrial: traits.isOnBufferTrial(user),
        currentBufferTrialPlan: traits.currentBufferTrialPlan(user),

        isOnPublishTrial: traits.isOnPublishTrial(user),
        currentPublishTrialPlan: traits.currentPublishTrialPlan(user),

        isOnAnalyzeTrial: traits.isOnAnalyzeTrial(user),
        currentAnalyzeTrialPlan: traits.currentAnalyzeTrialPlan(user),

        billingCycle: traits.billingCycle(user),
        trialBillingCycle: traits.trialBillingCycle(user),
        paidSubscriptionAutoRenewEnabled: traits.paidSubscriptionAutoRenewEnabled(user),
      })
    }
  }
}

export function groupUser(user) {
  if (window.analytics) {
    if (user.id && ! user.isImpersonation) {
      window.analytics.group(user.currentOrganization.id, {
        currentAnalyzePlan: traits.currentAnalyzePlan(user),
        currentBufferPlan: traits.currentBufferPlan(user),
        currentPublishPlan: traits.currentPublishPlan(user),
        isOneBufferEnabled: user.currentOrganization.isOneBufferOrganization,
        isPayingAnalyzeOrganization: traits.isPayingAnalyzeOrganization(user),
        isPayingBufferOrganization: traits.isPayingBufferOrganization(user),
        isPayingPublishOrganization: traits.isPayingPublishOrganization(user),
        name: user.currentOrganization.name,
        organizationId: user.currentOrganization.id,

        isOnBufferTrial: traits.isOnBufferTrial(user),
        currentBufferTrialPlan: traits.currentBufferTrialPlan(user),

        isOnPublishTrial: traits.isOnPublishTrial(user),
        currentPublishTrialPlan: traits.currentPublishTrialPlan(user),

        isOnAnalyzeTrial: traits.isOnAnalyzeTrial(user),
        currentAnalyzeTrialPlan: traits.currentAnalyzeTrialPlan(user),
      })
    }
  }
}

function injectSegmentTracker() {
  if (!window.analytics) {
    if (window.SEGMENT_KEY) {
      // This is the Segment snippet https://segment.com/docs/connections/sources/catalog/libraries/website/javascript/quickstart/#step-2-copy-the-segment-snippet
      !function(){var analytics=window.analytics=window.analytics||[];if(!analytics.initialize)if(analytics.invoked)window.console&&console.error&&console.error("Segment snippet included twice.");else{analytics.invoked=!0;analytics.methods=["trackSubmit","trackClick","trackLink","trackForm","pageview","identify","reset","group","track","ready","alias","debug","page","once","off","on","addSourceMiddleware","addIntegrationMiddleware","setAnonymousId","addDestinationMiddleware"];analytics.factory=function(t){return function(){var e=Array.prototype.slice.call(arguments);e.unshift(t);analytics.push(e);return analytics}};for(var t=0;t<analytics.methods.length;t++){var e=analytics.methods[t];analytics[e]=analytics.factory(e)}analytics.load=function(t,e){var n=document.createElement("script");n.type="text/javascript";n.async=!0;n.src="https://cdn.segment.com/analytics.js/v1/"+t+"/analytics.min.js";var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(n,a);analytics._loadOptions=e};analytics.SNIPPET_VERSION="4.1.0";
      analytics.load(window.SEGMENT_KEY);
      analytics.page();
      }}();
    } else {
      window.console.warn('Please provide a SEGMENT_KEY, to start tracking')
    }
  }
}

function useUserTracker(user) {
  useEffect(() => {
    injectSegmentTracker()
  }, []);

  useEffect(() => {
    if (window?.analytics?.initialized) {
      identifyUser(user);
      groupUser(user);
    }
  }, [user, window?.analytics?.initialized])
}

export default useUserTracker
