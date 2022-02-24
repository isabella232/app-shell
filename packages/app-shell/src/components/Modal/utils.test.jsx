import MOCK_ACCOUNT_OB_FREE_DATA from '../../common/mocks/accountOBFree';

import {
  isPendoModalVisible,
  hasSeenFreeUserStartTrialPrompt,
  shouldShowFreeUserStartTrialPrompt,
  shouldShowChannelConnectionPrompt,
  filterListOfPlans,
  getDefaultSelectedPlan,
  calculateTotalSlotsPrice,
  getPlanByPlanId,
} from './utils';

const listOfPlanOptions = [
  { planId: 'free', planInterval: 'month', isCurrentPlan: false },
  { planId: 'essentials', planInterval: 'month', isCurrentPlan: false },
  { planId: 'team', planInterval: 'year', isCurrentPlan: true },
];

const listOfPlanOptionsWithNoCurrentPlan = [
  { planId: 'essentials', planInterval: 'month', isCurrentPlan: false },
  { planId: 'team', planInterval: 'year', isCurrentPlan: false },
];

const listOfFilteredPlanOptions = [
  { planId: 'essentials', planInterval: 'month', isCurrentPlan: false },
  { planId: 'team', planInterval: 'year', isCurrentPlan: true },
];

const isUpgradeIntent = false;

describe('Modal - utils', () => {
  describe('isPendoModalVisible', () => {
    it('should return true if there is a pendo modal visible', () => {
      Object.defineProperty(window, 'pendo', {
        configurable: true,
        writable: true,
        value: {
          isGuideShown: () => true,
        },
      });

      const result = isPendoModalVisible();
      expect(result).toBe(true);
    });

    it('should return false if there is NOT a pendo modal visible', () => {
      global.window = Object.create(window);
      Object.defineProperty(window, 'pendo', {
        configurable: true,
        writable: true,
        value: null,
      });
      const result = isPendoModalVisible();
      expect(result).toBe(false);
    });
  });

  describe('hasSeenFreeUserStartTrialPrompt', () => {
    it('should return true if startTrialPrompt exists in cookies', () => {
      Object.defineProperty(document, 'cookie', {
        writable: true,
        value: 'appshell_startTrialPrompt=true',
      });

      const result = hasSeenFreeUserStartTrialPrompt();
      expect(result).toBe(true);
    });

    it('should return false if startTrialPrompt does NOT exist in cookies', () => {
      Object.defineProperty(document, 'cookie', {
        writable: true,
        value: '',
      });
      const result = hasSeenFreeUserStartTrialPrompt();
      expect(result).toBe(false);
    });
  });

  describe('shouldShowFreeUserStartTrialPrompt', () => {
    beforeEach(() => {
      global.window = Object.create(window);
      const url = 'http://publish.bufer.com';
      Object.defineProperty(window, 'location', {
        configurable: true,
        writable: true,
        value: {
          origin: url,
        },
      });
      Object.defineProperty(window, 'pendo', {
        configurable: true,
        writable: true,
        value: null,
      });
    });

    it('should return true if user plan is free, can start a trial, no pendo modal is visible, they have not seen the modal before and they are currently on the publish app', () => {
      const mockUserData = MOCK_ACCOUNT_OB_FREE_DATA.data.account;
      const result = shouldShowFreeUserStartTrialPrompt(mockUserData);
      expect(result).toBe(true);
    });

    it('should return false is not on a free plan', () => {
      const mockUserData = {
        currentOrganization: {
          billing: {
            subscription: {
              plan: {
                id: 'essentials',
              },
            },
          },
        },
      };
      const result = shouldShowFreeUserStartTrialPrompt(mockUserData);
      expect(result).toBe(false);
    });

    it('should return false if user cannot start a trial', () => {
      const mockUserData = {
        currentOrganization: {
          billing: {
            canStartTrial: false,
          },
        },
      };
      const result = shouldShowFreeUserStartTrialPrompt(mockUserData);
      expect(result).toBe(false);
    });

    it('should return false if there is a pendo modal visible', () => {
      const mockUserData = MOCK_ACCOUNT_OB_FREE_DATA.data.account;
      Object.defineProperty(window, 'pendo', {
        configurable: true,
        writable: true,
        value: {
          isGuideShown: () => true,
        },
      });

      const result = shouldShowFreeUserStartTrialPrompt(mockUserData);
      expect(result).toBe(false);
    });

    it('should return false if current product is not publish', () => {
      const mockUserData = MOCK_ACCOUNT_OB_FREE_DATA.data.account;
      const url = 'http://analytics.bufer.com';
      delete window.location;
      Object.defineProperty(window, 'location', {
        configurable: true,
        writable: true,
        value: {
          origin: url,
        },
      });

      const result = shouldShowFreeUserStartTrialPrompt(mockUserData);
      expect(result).toBe(false);
    });
  });

  describe('filterListOfPlans', () => {
    it('should remove all plans which match the passed in value to filter', () => {
      const result = filterListOfPlans(listOfPlanOptions, 'free');

      expect(result).toEqual(listOfFilteredPlanOptions);
    });

    it('should return original list if no plans match the passed in value to filter', () => {
      const result = filterListOfPlans(listOfPlanOptions, 'unknown plan');

      expect(result).toEqual(listOfPlanOptions);
    });

    it('should return empty array if all plans match the passed in value to filter', () => {
      const result = filterListOfPlans(
        [
          { planId: 'free', planInterval: 'month', isCurrentPlan: false },
          { planId: 'free', planInterval: 'yearly', isCurrentPlan: false },
        ],
        'free'
      );

      expect(result).toEqual([]);
    });
  });

  describe('getDefaultSelectedPlan', () => {
    it('should set the default selected plan to the current plan when their is a currentPlan found', () => {
      const planOptions = [
        { planId: 'free', planInterval: 'month', isCurrentPlan: false },
        ...listOfFilteredPlanOptions,
      ];

      const result = getDefaultSelectedPlan(planOptions, isUpgradeIntent);

      expect(result).toEqual({
        planId: 'team',
        planInterval: 'year',
        isCurrentPlan: true,
      });
    });

    it('should set the default selected plan to the current plan when isUpgradeIntent is true AND there is a current plan found', () => {
      const planOptions = [
        { planId: 'free', planInterval: 'month', isCurrentPlan: false },
        ...listOfFilteredPlanOptions,
      ];

      const result = getDefaultSelectedPlan(planOptions, isUpgradeIntent);

      expect(result).toEqual({
        planId: 'team',
        planInterval: 'year',
        isCurrentPlan: true,
      });
    });

    it('should set the default selected plan to essentials when isCurrentPlan cannot be found in the list of plans', () => {
      const planOptions = [...listOfPlanOptionsWithNoCurrentPlan];

      const result = getDefaultSelectedPlan(planOptions, isUpgradeIntent);

      expect(result).toEqual({
        planId: 'essentials',
        planInterval: 'month',
        isCurrentPlan: false,
      });
    });

    it('should set the default selected plan to essentials when isUpgradeIntent ', () => {
      const planOptions = [...listOfFilteredPlanOptions];
      const result = getDefaultSelectedPlan(planOptions, true);

      expect(result).toEqual({
        planId: 'essentials',
        planInterval: 'month',
        isCurrentPlan: false,
      });
    });
  });

  describe('shouldShowChannelConnectionPrompt', () => {
    beforeEach(() => {
      global.window = Object.create(window);
      const url = 'http://analyze.bufer.com';
      Object.defineProperty(window, 'location', {
        configurable: true,
        writable: true,
        value: {
          origin: url,
        },
      });
    });

    it('should return false if it has channels', () => {
      const mockUserData = MOCK_ACCOUNT_OB_FREE_DATA.data.account;
      const result = shouldShowChannelConnectionPrompt(mockUserData);
      expect(result).toBeFalsy();
    });

    it('should return false if product is publish', () => {
      global.window = Object.create(window);
      const url = 'http://publish.bufer.com';
      Object.defineProperty(window, 'location', {
        configurable: true,
        writable: true,
        value: {
          origin: url,
        },
      });
      const mockUserData = MOCK_ACCOUNT_OB_FREE_DATA.data.account;
      const noChannelsUser = Object.assign(mockUserData, {
        currentOrganization: {
          ...mockUserData.currentOrganization,
          channels: [],
        },
      });
      const result = shouldShowChannelConnectionPrompt(noChannelsUser);
      expect(result).toBeFalsy();
    });

    it('should return true if it has no channels', () => {
      const mockUserData = MOCK_ACCOUNT_OB_FREE_DATA.data.account;
      const noChannelsUser = Object.assign(mockUserData, {
        currentOrganization: {
          ...mockUserData.currentOrganization,
          channels: [],
        },
      });
      const result = shouldShowChannelConnectionPrompt(noChannelsUser);
      expect(result).toBeTruthy();
    });
  });

  describe('calculateTotalSlotsPrice', () => {
    it('should return 100 when 20 slots selected and pricing equals 5', () => {
      const planId = 'essentials';
      const numberOfSlots = 20;
      const slotPrice = 5;
      const minimumQuantity = 1;
      const flatFee = 0;

      const result = calculateTotalSlotsPrice(
        planId,
        numberOfSlots,
        slotPrice,
        minimumQuantity,
        flatFee
      );
      expect(result).toEqual(100);
    });

    it('should return 50 when 5 slots selected and pricing equals 10', () => {
      const planId = 'essentials';
      const numberOfSlots = 5;
      const slotPrice = 10;
      const minimumQuantity = 1;
      const flatFee = 0;

      const result = calculateTotalSlotsPrice(
        planId,
        numberOfSlots,
        slotPrice,
        minimumQuantity,
        flatFee
      );
      expect(result).toEqual(50);
    });

    it('should return 120 when plan is agency and number of slots is <= 10', () => {
      const planId = 'agency';
      const numberOfSlots = 10;
      const slotPrice = 6;
      const minimumQuantity = 10;
      const flatFee = 120;

      const result = calculateTotalSlotsPrice(
        planId,
        numberOfSlots,
        slotPrice,
        minimumQuantity,
        flatFee
      );
      expect(result).toEqual(120);
    });

    it('should return 132 when plan is agency and number of slots are 12', () => {
      const planId = 'agency';
      const numberOfSlots = 12;
      const slotPrice = 6;
      const minimumQuantity = 10;
      const flatFee = 120;

      const result = calculateTotalSlotsPrice(
        planId,
        numberOfSlots,
        slotPrice,
        minimumQuantity,
        flatFee
      );
      expect(result).toEqual(132);
    });
  });

  describe('getPlanByPlanId', () => {
    it('should return essentials plan when provided with essentials id', () => {
      const planId = 'essentials';

      const result = getPlanByPlanId(planId, listOfPlanOptions);
      expect(result).toEqual({
        planId: 'essentials',
        planInterval: 'month',
        isCurrentPlan: false,
      });
    });

    it('should return free plan when provided with free id', () => {
      const planId = 'free';

      const result = getPlanByPlanId(planId, listOfPlanOptions);
      expect(result).toEqual({
        planId: 'free',
        planInterval: 'month',
        isCurrentPlan: false,
      });
    });

    it('should return the first essentials plan in list when provided with essentials id', () => {
      const planId = 'essentials';
      const plans = [
        ...listOfPlanOptions,
        { planId: 'essentials', planInterval: 'year', isCurrentPlan: false },
        { planId: 'essentials', planInterval: 'month', isCurrentPlan: false },
      ];

      const result = getPlanByPlanId(planId, plans);
      expect(result).toEqual(plans[1]);
    });
  });
});
