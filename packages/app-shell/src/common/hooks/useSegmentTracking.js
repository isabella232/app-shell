import { BufferTracker } from '@bufferapp/buffer-tracking-browser-ts'
import { getActiveProductFromPath } from '../utils/getProduct';

export const formatCTAString = (str) => {
  const result = str.split(/\s+/).map(word => `${word.charAt(0).toUpperCase()}${word.slice(1)}`).join('');
  return `${result.charAt(0).toLowerCase()}${result.slice(1)}`;
}

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

  

  const product = getActiveProductFromPath();
  const eventData = {
    organizationId: organization.id,
    ctaApp: product,
    ctaVersion: '1',
    currentPlan: null,
    ctaLocation: 'appShell',
    screenName: null, // Human readable name of the section of the plan selector viewed (e.g., ""plans"", ""billing_info"", etc.)
    ctaButton: null, // What is the name or action of the CTA?  In many cases it makes sense to describe the intended result of the CTA, like `proTrial` or `publishPro`,
    ctaView: null, // What website page or app view is the CTA located?  Examples would be, `composer` or `analyticsOverview` for Publish, and `pricingPublish` for the Publish pricing page on the Buffer marketing site
    
    ...payload,
    cta: `${product}-${payload.cta}-planSelectorViewed`, // If the user navigated to this page from a CTA on another Buffer page, which call to action was it?
  };

  BufferTracker.planSelectorViewed(eventData);
};

export const useTrackPageViewed = ({ payload, user }) => {
  if (user.isImpersonation) {
    return;
  }

  const organization = user.currentOrganization;
  if (!organization || !organization.id) {
    return;
  }

  const product = getActiveProductFromPath();
  const eventData = {
    organizationId: organization.id,
    ctaApp: product,
    ctaVersion: '1',
    product,
    url: window.location.href || null,
    search: window.location.search || null,
    path: window.location.pathname || null, // The path typically refers to a file or directory on the web server.
    ctaLocation: 'appShell',
    title: null,
    name: null, // Human readable name of the page (e.g., ""overview"", ""posts"", etc.)
    ctaButton: null, // What is the name or action of the CTA?  In many cases it makes sense to describe the intended result of the CTA, like `proTrial` or `publishPro`
    ctaView: null, // What website page or app view is the CTA located?  Examples would be, `composer` or `analyticsOverview` for Publish, and `pricingPublish` for the Publish pricing page on the Buffer marketing site

    channel: null, // Channel of the page, if applicable (e.g., ""facebook"", ""instagram"", etc.)
    channelId: null, // The database id for the channel document
    channelServiceId: null, // The id of the channel on the given service
    channelType: null, // What is the type of channel? ex. "page", "group"
    platform: null, // The platform on which the page view occurred (e.g. ""classic"", ""new_publish"", ""marketing"", ""ios"")
    referrer: null, // The address of the webpage which is linked to the resource being requested. By checking the referrer, the new webpage can see where the request originated.
    
    ...payload,
    cta: payload?.cta ? `${product}-${payload.cta}` : null, // If the user navigated to this page from a CTA on another Buffer page, which call to action was it?
  };

  BufferTracker.pageViewed(eventData);
};
