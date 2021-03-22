/**
 *
 */
export const useTrackPlanSelectorViewed = ({ payload, user }) => {
  if (user.isImpersonation) {
    return;
  }

  const organization = user.currentOrganization;
  if (!organization || !organization.id) {
    return;
  }

  const eventData = {
    organizationId: organization.id,
    ctaApp: window.PRODUCT_TRACKING_KEY || null,
    ctaVersion: 1,
    currentPlan: null,
    screenName: null, // Human readable name of the section of the plan selector viewed (e.g., ""plans"", ""billing_info"", etc.)
    cta: null, // If the user navigated to this page from a CTA on another Buffer page, which call to action was it?
    ctaView: null, // What website page or app view is the CTA located?  Examples would be, `composer` or `analyticsOverview` for Publish, and `pricingPublish` for the Publish pricing page on the Buffer marketing site
    ctaLocation: null, //  Where in the view is the CTA located? An example would be `menu` for the Pro trial CTA in Publish app shell menu
    ctaButton: null, // What is the name or action of the CTA?  In many cases it makes sense to describe the intended result of the CTA, like `proTrial` or `publishPro`
    ...payload,
  };

  window.analytics && window.analytics.track('Plan Selector Viewed', eventData);
};
