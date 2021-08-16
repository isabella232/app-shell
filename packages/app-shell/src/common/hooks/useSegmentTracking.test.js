import { BufferTracker } from '@bufferapp/buffer-tracking-browser-ts'
import { useTrackPageViewed, useTrackPlanSelectorViewed } from './useSegmentTracking';

jest.mock('@bufferapp/buffer-tracking-browser-ts', () => ({
  BufferTracker: {
    planSelectorViewed: jest.fn(),
    pageViewed: jest.fn(),
  },
}))

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
    jest.clearAllMocks();
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
      window.location.origin = 'https://analyze.buffer.com';
      useTrackPlanSelectorViewed({
        payload: {
          screenName: 'changeMyPlan',
          currentPlan: 'essentialsMonth',
          cta: 'upgradePlan',
        },
        user: {
          isImpersonation: false,
          currentOrganization: {
            id: '123-test-org',
          },
        },
      });

      expect(BufferTracker.planSelectorViewed).toHaveBeenCalledWith(
        {
          organizationId: '123-test-org',
          ctaApp: 'analyze',
          ctaVersion: '1',
          currentPlan: 'essentialsMonth',
          screenName: 'changeMyPlan',
          ctaLocation: 'appShell',
          cta: 'analyze-upgradePlan-planSelectorViewed',
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
      window.location.href = 'http://localhost/the-path?query=the-query';
      window.location.pathname = '/the-path';
      window.location.search = '?query=the-query';
      window.location.origin = 'https://account.buffer.com';

      useTrackPageViewed({
        payload: {
          name: 'thePage',
          title: 'pageTitle',
          cta: 'addPaymentMethod'
        },
        user: {
          isImpersonation: false,
          currentOrganization: {
            id: '123-test-org',
          },
        },
      });

      expect(BufferTracker.pageViewed).toHaveBeenCalledWith(
        {
          organizationId: '123-test-org',
          ctaApp: 'account',
          ctaVersion: '1',
          name: 'thePage',
          title: 'pageTitle',
          ctaLocation: 'appShell',
          product: 'account',
          url: 'http://localhost/the-path?query=the-query',
          path: '/the-path',
          search: '?query=the-query',
          cta: 'account-addPaymentMethod',
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
