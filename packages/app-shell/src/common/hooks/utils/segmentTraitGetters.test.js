import {
  billingCycle,
  currentAnalyzePlan,
  currentAnalyzeTrialPlan,
  currentBufferPlan,
  currentBufferTrialPlan,
  currentPublishPlan,
  currentPublishTrialPlan,
  isMultiProductCustomer,
  isPayingAnalyzeOrganization,
  isPayingBufferOrganization,
  isPayingPublishOrganization,
  isFreePlan,
  trialBillingCycle,
  organizationUserRole,
  paidSubscriptionAutoRenewEnabled,
} from './segmentTraitGetters';

describe('Segment Traits Getters', () => {
  const MPUser = {
    createdAt: "2021-05-03T21:44:15.069Z",
    id: 'fooBar',
    isImpersonation: false,
    currentOrganization: {
      name: 'fooOrgaName',
      id: 'fooOrg',
      role: 'admin',
      isOneBufferOrganization: false,
      billing: {
        subscriptions: [
          { plan: "pro", product: "publish", interval: 'month', trial: { isActive: false } },
          { plan: "pro", product: "analyze", interval: 'year', trial: null },
        ]
      },
    },
  }

  const OBUser = {
    ...MPUser,
    currentOrganization: {
      id: 'fooOrg',
      name: 'fooOrgaName',
      role: 'member',
      isOneBufferOrganization: true,
      billing: {
        subscription: {
          isCanceledAtPeriodEnd: false,
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

  describe('isMultiProductCustomer', () => {
    it('should identify a MP user', () => {
      expect(isMultiProductCustomer(MPUser)).toBeTruthy();
    });

    it('should not flag a OB user', () => {
      expect(isMultiProductCustomer(OBUser)).toBeFalsy();
    });

    it('should not flag as MP user with one subscription', () => {
      expect(isMultiProductCustomer({
        currentOrganization: {
          isOneBufferOrganization: false,
          billing: {
            subscriptions: [
              { plan: "pro", product: "analyze", },
            ]
          },
        },
      })).toBeFalsy();
    });

    it('should not flag as MP user with trialing subscription', () => {
      expect(isMultiProductCustomer({
        currentOrganization: {
          isOneBufferOrganization: false,
          billing: {
            subscriptions: [
              { plan: "pro", product: "publish", interval: 'month', trial: { isActive: false } },
              { plan: "pro", product: "publish", interval: 'month', trial: { isActive: true } },
            ]
          },
        },
      })).toBeFalsy();
    });
  })

  describe('isFreePlan', () => {
    it('should not flag a MP user as free', () => {
      expect(isFreePlan(MPUser)).toBeFalsy();
    });

    it('should not flag a MP user as free', () => {
      expect(isFreePlan(OBUser)).toBeFalsy();
    });

    it('should flag a MP user', () => {
      expect(isFreePlan({
        currentOrganization: {
          isOneBufferOrganization: false,
          billing: {
            subscriptions: [
              { plan: "free", product: "publish", },
            ]
          },
        },
      })).toBeTruthy();
    });

    it('should flag a OB user', () => {
      expect(isFreePlan({
        currentOrganization: {
          isOneBufferOrganization: true,
          billing: {
            subscription: {
              plan: { id: "free" },
            }
          },
        },
      })).toBeTruthy();
    });

    it('should not flag a OB trialing user', () => {
      expect(isFreePlan({
        currentOrganization: {
          isOneBufferOrganization: true,
          billing: {
            subscription: {
              plan: { id: "free", trial: { isActive: true } },
            }
          },
        },
      })).toBeFalsy();
    });
  })

  describe('isPayingPublishOrganization', () => {
    it('should identify a Publish user', () => {
      expect(isPayingPublishOrganization(MPUser)).toBeTruthy();
    });

    it('should not identify a Analyze user', () => {
      expect(isPayingPublishOrganization({
        currentOrganization: {
          isOneBufferOrganization: false,
          billing: {
            subscriptions: [
              { plan: "pro", product: "analyze", },
            ]
          },
        },
      })).toBeFalsy();
    });

    it('should not identify a trial user', () => {
      expect(isPayingPublishOrganization({
        currentOrganization: {
          isOneBufferOrganization: false,
          billing: {
            subscriptions: [
              { plan: "pro", product: "publish", trial: { isActive: true }, },
            ]
          },
        },
      })).toBeFalsy();
    });

    it('should not identify a free user', () => {
      expect(isPayingPublishOrganization({
        currentOrganization: {
          isOneBufferOrganization: false,
          billing: {
            subscriptions: [
              { plan: "free", product: "publish", trial: null, },
            ]
          },
        },
      })).toBeFalsy();
    });
  });

  describe('isPayingAnalyzeOrganization', () => {
    it('should identify a Analyze user', () => {
      expect(isPayingAnalyzeOrganization(MPUser)).toBeTruthy();
    });

    it('should not identify a Publish only user', () => {
      expect(isPayingAnalyzeOrganization({
        currentOrganization: {
          isOneBufferOrganization: false,
          billing: {
            subscriptions: [
              { plan: "pro", product: "publish", },
            ]
          },
        },
      })).toBeFalsy();
    });

    it('should not identify a trial user', () => {
      expect(isPayingAnalyzeOrganization({
        currentOrganization: {
          isOneBufferOrganization: false,
          billing: {
            subscriptions: [
              { plan: "pro", product: "analyze", trial: { isActive: true }, },
            ]
          },
        },
      })).toBeFalsy();
    });
  })

  describe('isPayingBufferOrganization', () => {
    it('should identify a OB user', () => {
      expect(isPayingBufferOrganization(OBUser)).toBeTruthy();
    });

    it('should not identify a trial user', () => {
      expect(isPayingBufferOrganization({
        currentOrganization: {
          isOneBufferOrganization: true,
          billing: {
            subscription: {
              plan: { id: "Team", name: "Team", trial: { isActive: true }, },
            }
          },
        },
      })).toBeFalsy();
    });

    it('should not identify a free user', () => {
      expect(isPayingBufferOrganization({
        currentOrganization: {
          isOneBufferOrganization: true,
          billing: {
            subscription: {
              plan: { id: "free", name: "Free", trial: null, },
            }
          },
        },
      })).toBeFalsy();
    });
  })

  describe('currentAnalyzePlan', () => {
    it('should return analyze plan', () => {
      expect(currentAnalyzePlan(MPUser)).toEqual('pro');
    });

    it('should return null for publish only user', () => {
      expect(currentAnalyzePlan({
        currentOrganization: {
          billing: {
            subscriptions: [
              { plan: "pro", product: "publish", trial: null },
            ]
          }
        }
      })).toBeNull();
    });

    it('should return null for analyze trial user', () => {
      expect(currentAnalyzePlan({
        currentOrganization: {
          billing: {
            subscriptions: [
              { plan: "pro", product: "analyze", trial: { isActive: true }, },
            ]
          }
        }
      })).toBeNull();
    });

    it('should return null for OBUser', () => {
      expect(currentAnalyzePlan(OBUser)).toBeNull();
    });
  });

  describe('currentAnalyzeTrialPlan', () => {
    it('should return publish plan', () => {
      expect(currentAnalyzeTrialPlan(MPUser)).toBeNull();
    });

    it('should return null for publish only user', () => {
      expect(currentAnalyzeTrialPlan({
        currentOrganization: {
          billing: {
            subscriptions: [
              { plan: "pro", product: "publish", trial: null },
            ]
          }
        }
      })).toBeNull();
    });

    it('should return plan for analyze trial user', () => {
      expect(currentAnalyzeTrialPlan({
        currentOrganization: {
          billing: {
            subscriptions: [
              { plan: "pro", product: "analyze", trial: { isActive: true }, },
            ]
          }
        }
      })).toEqual("pro");
    });

    it('should return null for OBUser', () => {
      expect(currentAnalyzeTrialPlan(OBUser)).toBeNull();
    });
  });

  describe('currentPublishPlan', () => {
    it('should return publish plan', () => {
      expect(currentPublishPlan(MPUser)).toEqual('pro');
    });

    it('should return null for analyze only user', () => {
      expect(currentPublishPlan({
        currentOrganization: {
          billing: {
            subscriptions: [
              { plan: "pro", product: "analyze", trial: null },
            ]
          }
        }
      })).toBeNull();
    });

    it('should return null for publish trial user', () => {
      expect(currentPublishPlan({
        currentOrganization: {
          billing: {
            subscriptions: [
              { plan: "pro", product: "publish", trial: { isActive: true }, },
            ]
          }
        }
      })).toBeNull();
    });

    it('should return null for OBUser', () => {
      expect(currentPublishPlan(OBUser)).toBeNull();
    });
  });

  describe('currentPublishTrialPlan', () => {
    it('should return publish plan', () => {
      expect(currentPublishTrialPlan(MPUser)).toBeNull();
    });

    it('should return null for analyze only user', () => {
      expect(currentPublishTrialPlan({
        currentOrganization: {
          billing: {
            subscriptions: [
              { plan: "pro", product: "analyze", trial: null },
            ]
          }
        }
      })).toBeNull();
    });

    it('should return plan for publish trial user', () => {
      expect(currentPublishTrialPlan({
        currentOrganization: {
          billing: {
            subscriptions: [
              { plan: "pro", product: "publish", trial: { isActive: true }, },
            ]
          }
        }
      })).toEqual("pro");
    });

    it('should return null for OBUser', () => {
      expect(currentPublishTrialPlan(OBUser)).toBeNull();
    });
  });

  describe('currentBufferPlan', () => {
    it('should return plan id', () => {
      expect(currentBufferPlan(OBUser)).toEqual('team');
    });

    it('should return free for trialing users', () => {
      expect(currentBufferPlan({ 
        ...OBUser,
        currentOrganization: {
          billing: {
            subscription: {
              plan: { id: "team", name: "Team", trial: { isActive: true } },
            }
          },
        },
      })).toEqual('free');
    });

    it('should return null for MPUser', () => {
      expect(currentBufferPlan(MPUser)).toBeNull();
    });
  });

  describe('currentBufferTrialPlan', () => {
    it('should return plan id for trialing users', () => {
      expect(currentBufferTrialPlan({
        ...OBUser,
        currentOrganization: {
          billing: {
            subscription: {
              plan: { id: "team", name: "Team", trial: { isActive: true } },
            }
          },
        },
      })).toEqual('team');
    });

    it('should return null for non trialing users', () => {
      expect(currentBufferTrialPlan(OBUser)).toEqual(null);
    });

    it('should return null for MPUser', () => {
      expect(currentBufferTrialPlan(MPUser)).toBeNull();
    });
  });

  describe('currentBufferPlan', () => {
    it('should return plan id', () => {
      expect(currentBufferPlan(OBUser)).toEqual('team');
    });

    it('should return free for trialing users', () => {
      expect(currentBufferPlan({ 
        ...OBUser,
        currentOrganization: {
          billing: {
            subscription: {
              plan: { id: "team", name: "Team", trial: { isActive: true } },
            }
          },
        },
      })).toEqual('free');
    });

    it('should return null for MPUser', () => {
      expect(currentBufferPlan(MPUser)).toBeNull();
    });
  });

  describe('trialBillingCycle', () => {
    it('should return interval for OB users', () => {
      expect(trialBillingCycle({
        currentOrganization: {
          isOneBufferOrganization: true,
          billing: {
            subscription: {
              plan: { id: "team", name: "Team", interval: 'month', trial: { isActive: true } },
            }
          },
        },
      })).toEqual('month')
    });

    it('should return null for non trialing OB users', () => {
      expect(trialBillingCycle(OBUser)).toBeNull()
    });

    it('should return null for non trialing MP users', () => {
      expect(trialBillingCycle(MPUser)).toBeNull()
    });

    it('should return interval for MP users', () => {
      expect(trialBillingCycle({
        currentOrganization: {
          isOneBufferOrganization: false,
          billing: {
            subscriptions: [
              { plan: "pro", product: "publish", interval: 'month', trial: { isActive: true } },
              { plan: "pro", product: "analyze", interval: 'year', trial: null },
            ]
          },
        },
      })).toEqual('month')
    });
  });

  describe('billingCycle', () => {
    it('should return the cycle of the last subscription for MP users', () => {
      expect(billingCycle(MPUser)).toEqual('year')
    });

    it('should return null for MP users without subscriptions', () => {
      expect(billingCycle({
        currentOrganization: {
          billing: {
            subscriptions: [],
          },
        },
      })).toBeNull();
    });

    it('should return interval for OB users', () => {
      expect(billingCycle(OBUser)).toEqual('month')
    });
  });

  describe('organizationUserRole', () => {
    it('should get the role for MP user', () => {
      expect(organizationUserRole(MPUser)).toBe('admin');
    });

    it('should get the role for OB user', () => {
      expect(organizationUserRole(OBUser)).toBe('member');
    });

    it('should return null if missing role', () => {
      expect(organizationUserRole({
        currentOrganization: {}
      })).toBeNull();
    });
  })

  describe('paidSubscriptionAutoRenewEnabled', () => {
    it('return true for OB if isCanceledAtPeriodEnd is false', () => {
      expect(paidSubscriptionAutoRenewEnabled(OBUser)).toBeTruthy();
    });

    it('return false for OB if isCanceledAtPeriodEnd is true', () => {
      expect(paidSubscriptionAutoRenewEnabled({
        currentOrganization: {
          isOneBufferOrganization: true,
          billing: {
            subscription: {
              isCanceledAtPeriodEnd: true,
            }
          },
        },
      })).toBeFalsy();
    });

    it('return null for OB if isCanceledAtPeriodEnd is missing', () => {
      expect(paidSubscriptionAutoRenewEnabled({
        currentOrganization: {
          isOneBufferOrganization: true,
          billing: {
            subscription: {}
          },
        },
      })).toBeNull();
    });

    it('should return null for MP user', () => {
      expect(paidSubscriptionAutoRenewEnabled(MPUser)).toBeNull();
    });
  })
})
