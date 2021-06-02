import {
  groupUser,
  identifyUser,
} from './useUserTracker';

describe('useUserTracker hooks', () => {
  const MPUser = {
    createdAt: "2021-05-03T21:44:15.069Z",
    id: 'fooBar',
    isImpersonation: false,
    currentOrganization: {
      id: 'fooOrg',
      name: 'fooOrgaName',
      role: 'admin',
      isOneBufferOrganization: false,
      billing: {
        subscriptions: [
          { plan: "pro", product: "publish", interval: 'month', trial: { isActive: false } },
          { plan: "pro", product: "analyze", interval: 'month', trial: null },
        ]
      },
    },
  }

  const OBUser = {
    ...MPUser,
    currentOrganization: {
      id: 'fooOrg',
      name: 'fooOrgaName',
      role: 'admin',
      isOneBufferOrganization: true,
      billing: {
        subscription: {
          plan: { id: "team", name: "Team", interval: 'month', trial: null },
        }
      },
    },
  };

  beforeAll(() => {
    window.analytics = {
      track: jest.fn(),
      identify: jest.fn(),
      group: jest.fn(),
    };
  });

  beforeEach(() => {
   jest.clearAllMocks();
  });

  describe('identify', () => {
    it('should not identify if no user data', () => {
      identifyUser({})
      expect(global.analytics.identify).not.toHaveBeenCalled()
    });

    it('should not identify on impersonation', () => {
      identifyUser({
        id: 'fooBar',
        isImpersonation: true,
      })
      expect(global.analytics.identify).not.toHaveBeenCalled()
    });

    it('should identify a MP user', () => {
      identifyUser(MPUser)
      expect(global.analytics.identify)
        .toHaveBeenCalledWith(MPUser.id, expect.objectContaining({
          createdAt: "2021-05-03T21:44:15.069Z",
          currentAnalyzePlan: 'pro',
          currentBufferPlan: null,
          currentBufferTrialPlan: null,
          currentPublishPlan: 'pro',
          email: MPUser.email,
          isMultiProductCustomer: true,
          isOnBufferTrial: false,
          isOnPublishTrial: false,
          isOneBufferEnabled: false,
          isPayingAnalyzeUser: true,
          isPayingBufferUser: false,
          isPayingPublishUser: true,
          currentOrganizationId: MPUser.currentOrganization.id,
          organizationUserRole: 'admin',
        }))
    });

    it('should identify a OB user', () => {
      identifyUser(OBUser)
      expect(global.analytics.identify)
        .toHaveBeenCalledWith(OBUser.id, expect.objectContaining({
          createdAt: "2021-05-03T21:44:15.069Z",
          currentBufferTrialPlan: null,
          email: OBUser.email,
          isMultiProductCustomer: false,
          isOnBufferTrial: false,
          isOnPublishTrial: false,
          isOneBufferEnabled: true,
          currentOrganizationId: OBUser.currentOrganization.id,
          organizationUserRole: 'admin',
        }))
    });
  })

  describe('group', () => {
    it('should not group if no user data', () => {
      groupUser({})
      expect(global.analytics.group).not.toHaveBeenCalled()
    });

    it('should not group on impersonation', () => {
      groupUser({
        id: 'fooBar',
        isImpersonation: true,
      })
      expect(global.analytics.group).not.toHaveBeenCalled()
    });

    it('should group a MP user', () => {
      groupUser(MPUser)
      expect(global.analytics.group)
        .toHaveBeenCalledWith(MPUser.currentOrganization.id, expect.objectContaining({
          currentAnalyzePlan: 'pro',
          currentBufferPlan: null,
          currentBufferTrialPlan: null,
          currentPublishPlan: 'pro',
          isOnPublishTrial: false,
          isOneBufferEnabled: false,
          isPayingAnalyzeOrganization: true,
          isPayingBufferOrganization: false,
          isPayingPublishOrganization: true,
          name: MPUser.currentOrganization.name, organizationId: MPUser.currentOrganization.id,
        }))
    });

    it('should group a OB user', () => {
      groupUser(OBUser)
      expect(global.analytics.group)
        .toHaveBeenCalledWith(OBUser.currentOrganization.id, expect.objectContaining({
          currentAnalyzePlan: null,
          currentBufferPlan: 'team',
          currentBufferTrialPlan: null,
          currentPublishPlan: null,
          isOnPublishTrial: false,
          isOneBufferEnabled: true,
          isPayingAnalyzeOrganization: false,
          isPayingBufferOrganization: true,
          isPayingPublishOrganization: false,
          name: OBUser.currentOrganization.name,
          organizationId: OBUser.currentOrganization.id,
        }))
    });
  })
})
