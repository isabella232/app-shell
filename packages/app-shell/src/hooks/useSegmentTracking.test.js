import { useTrackPageViewed, useTrackPlanSelectorViewed } from './useSegmentTracking';

describe('useSegmentTracking hooks', () => {
  describe('useTrackPlanSelectorViewed', () => {
    it('should return undefined on impersonation', () => {
      const result = useTrackPlanSelectorViewed({
        payload: {},
        user: {
          isImpersonation: true,
        },
      });
      expect(result).toBeUndefined();
    });

    it('should return undefined on missing currentOrganization id', () => {
      const result = useTrackPlanSelectorViewed({
        payload: {},
        user: {
          isImpersonation: false,
          currentOrganization: {},
        },
      });
      expect(result).toBeUndefined();
    });

    it('should track the plan selector viewed event without PRODUCT_TRACKING_KEY', () => {
      window.analytics = {
        track: jest.fn(),
      };
      useTrackPlanSelectorViewed({
        payload: {
          screenName: 'Change My Plan',
          currentPlan: 'individual_month',
        },
        user: {
          isImpersonation: false,
          currentOrganization: {
            id: '123-test-org',
          },
        },
      });

      expect(window.analytics.track).toHaveBeenCalledWith(
        'Plan Selector Viewed',
        {
          organizationId: '123-test-org',
          ctaApp: null,
          ctaVersion: 1,
          currentPlan: 'individual_month',
          screenName: 'Change My Plan',
          ctaLocation: 'app-shell',
          cta: null,
          ctaView: null,
          ctaButton: null,
        }
      );
    });

    it('should track the plan selector viewed event with PRODUCT_TRACKING_KEY', () => {
      window.analytics = {
        track: jest.fn(),
      };
      window.PRODUCT_TRACKING_KEY = 'account';
      useTrackPlanSelectorViewed({
        payload: {
          screenName: 'Change My Plan',
          currentPlan: 'individual_month',
        },
        user: {
          isImpersonation: false,
          currentOrganization: {
            id: '123-test-org',
          },
        },
      });

      expect(window.analytics.track).toHaveBeenCalledWith(
        'Plan Selector Viewed',
        {
          organizationId: '123-test-org',
          ctaApp: 'account',
          ctaVersion: 1,
          currentPlan: 'individual_month',
          screenName: 'Change My Plan',
          ctaLocation: 'app-shell',
          cta: null,
          ctaView: null,
          ctaButton: null,
        }
      );
    });
  });

  describe('useTrackPageViewed', () => {
    const oldWindowLocation = window.location;
    
    beforeAll(() => {
      delete window.location;
      window.location = {
          href: '',
      };
    });

    afterAll(() => {
      window.location = oldWindowLocation;
    });

    it('should return undefined on impersonation', () => {
      const result = useTrackPageViewed({
        payload: {},
        user: {
          isImpersonation: true,
        },
      });
      expect(result).toBeUndefined();
    });

    it('should return undefined on missing currentOrganization id', () => {
      const result = useTrackPageViewed({
        payload: {},
        user: {
          isImpersonation: false,
          currentOrganization: {},
        },
      });
      expect(result).toBeUndefined();
    });

    it('should track the Page Viewed event', () => {
      window.analytics = {
        track: jest.fn(),
      };
      window.PRODUCT_TRACKING_KEY = 'account';
      window.location.href = 'http://localhost/the-path?query=the-query';
      window.location.pathname = '/the-path';
      window.location.search = '?query=the-query';

      useTrackPageViewed({
        payload: {
          name: 'The Page',
          title: 'Page title',
        },
        user: {
          isImpersonation: false,
          currentOrganization: {
            id: '123-test-org',
          },
        },
      });

      expect(window.analytics.track).toHaveBeenCalledWith(
        'Page Viewed',
        {
          organizationId: '123-test-org',
          ctaApp: 'account',
          ctaVersion: 1,
          name: 'The Page',
          title: 'Page title',
          ctaLocation: 'app-shell',
          product: 'account',
          url: 'http://localhost/the-path?query=the-query',
          path: '/the-path',
          search: '?query=the-query',
          cta: null,
          ctaView: null,
          ctaButton: null,
          channel: null,
          channelId: null,
          channelServiceId: null,
          channelType: null,
          
          platform: null,
          referrer: null,
        }
      );
    });
  });
})