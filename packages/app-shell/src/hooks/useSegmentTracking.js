import { getProductPath } from '../NavBar';

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


  const baseUrl = window.location.origin;
  const eventData = {
    organizationId: organization.id,
    ctaApp: getProductPath(baseUrl),
    ctaVersion: 1,
    currentPlan: null,
    ctaLocation: 'app-shell',
    screenName: null, // Human readable name of the section of the plan selector viewed (e.g., ""plans"", ""billing_info"", etc.)
    cta: null, // If the user navigated to this page from a CTA on another Buffer page, which call to action was it?
    ctaButton: null, // What is the name or action of the CTA?  In many cases it makes sense to describe the intended result of the CTA, like `proTrial` or `publishPro`,

    ctaView: null, // What website page or app view is the CTA located?  Examples would be, `composer` or `analyticsOverview` for Publish, and `pricingPublish` for the Publish pricing page on the Buffer marketing site
    
    ...payload,
  };

  window.analytics && window.analytics.track('Plan Selector Viewed', eventData);
};

export const useTrackPageViewed = ({ payload, user }) => {
  if (user.isImpersonation) {
    return;
  }

  const organization = user.currentOrganization;
  if (!organization || !organization.id) {
    return;
  }

  const baseUrl = window.location.origin;
  const product = getProductPath(baseUrl);
  const eventData = {
    organizationId: organization.id,
    ctaApp: product,
    ctaVersion: 1,
    product,
    url: window.location.href || null,
    search: window.location.search || null,
    path: window.location.pathname || null, // The path typically refers to a file or directory on the web server.
    ctaLocation: 'app-shell',
    title: null,
    name: null, // Human readable name of the page (e.g., ""overview"", ""posts"", etc.)
    cta: null, // If the user navigated to this page from a CTA on another Buffer page, which call to action was it?
    ctaButton: null, // What is the name or action of the CTA?  In many cases it makes sense to describe the intended result of the CTA, like `proTrial` or `publishPro`

    channel: null, // Channel of the page, if applicable (e.g., ""facebook"", ""instagram"", etc.)
    channelId: null, // The database id for the channel document
    channelServiceId: null, // The id of the channel on the given service
    channelType: null, // What is the type of channel? ex. "page", "group"
    platform: null, // The platform on which the page view occurred (e.g. ""classic"", ""new_publish"", ""marketing"", ""ios"")
    referrer: null, // The address of the webpage which is linked to the resource being requested. By checking the referrer, the new webpage can see where the request originated.
    ctaView: null, // What website page or app view is the CTA located?  Examples would be, `composer` or `analyticsOverview` for Publish, and `pricingPublish` for the Publish pricing page on the Buffer marketing site
    
    ...payload,
  };

  window.analytics && window.analytics.track('Page Viewed', eventData);
};
