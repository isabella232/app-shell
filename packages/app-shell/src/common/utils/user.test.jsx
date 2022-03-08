import MOCK_ACCOUNT_OB_FREE_DATA from '../mocks/accountOBFree';

import { isFreeUser, userCanStartFreeTrial } from './user';

describe('Modal - utils', () => {
  describe('isFreeUser', () => {
    it('should return true if user plan is free', () => {
      const mockUserData = MOCK_ACCOUNT_OB_FREE_DATA.data.account;
      const result = isFreeUser(mockUserData);
      expect(result).toBe(true);
    });

    it('should return false if user data is missing relevant information', () => {
      const mockUserData = {
        currentOrganization: null,
      };
      const result = isFreeUser(mockUserData);
      expect(result).toBe(false);
    });

    it('should return false if user data is not provided', () => {
      const result = isFreeUser(null);
      expect(result).toBe(false);
    });
  });

  describe('userCanStartFreeTrial', () => {
    it('should return true if user billing information states they can start a free trial', () => {
      const mockUserData = MOCK_ACCOUNT_OB_FREE_DATA.data.account;
      const result = userCanStartFreeTrial(mockUserData);
      expect(result).toBe(true);
    });

    it('should return false if user data is missing relevant information', () => {
      const mockUserData = {
        currentOrganization: null,
      };
      const result = userCanStartFreeTrial(mockUserData);
      expect(result).toBe(false);
    });

    it('should return false if user data is not provided', () => {
      const result = userCanStartFreeTrial(null);
      expect(result).toBe(false);
    });
  });
});
