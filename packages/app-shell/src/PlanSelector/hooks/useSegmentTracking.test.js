import { useTrackPlanSelectorViewed } from './useSegmentTracking';
import { renderHook } from '@testing-library/react-hooks';

window.analytics = {
  track: jest.fn(),
};

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
        cta: null,
        ctaView: null,
        ctaLocation: null,
        ctaButton: null,
      }
    );
  });

  it('should track the plan selector viewed event with PRODUCT_TRACKING_KEY', () => {
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
        cta: null,
        ctaView: null,
        ctaLocation: null,
        ctaButton: null,
      }
    );
  });
});
