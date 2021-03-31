import { useTrackPageViewed, useTrackPlanSelectorViewed } from './useSegmentTracking';

describe('useSegmentTracking hooks', () => {
  const oldWindowLocation = window.location;
    
  beforeAll(() => {
    delete window.location;
    window.location = {
        href: '',
        origin: ''
    };
  });

  afterAll(() => {
    window.location = oldWindowLocation;
  });

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

    it('should track the plan selector viewed event', () => {
      window.analytics = {
        track: jest.fn(),
      };
      window.location.origin = 'https://analyze.buffer.com';
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
          ctaApp: 'analyze',
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
      window.location.href = 'http://localhost/the-path?query=the-query';
      window.location.pathname = '/the-path';
      window.location.search = '?query=the-query';
      window.location.origin = 'https://account.buffer.com';

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