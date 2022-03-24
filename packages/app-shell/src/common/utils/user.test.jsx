import MOCK_ACCOUNT_OB_FREE_DATA from '../mocks/accountOBFree';

import { isFreeUser, isOnActiveTrial, userCanStartFreeTrial } from './user';

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

  describe('isOnActiveTrial', () => {
    it('should return false with no proper organization response structure', () => {
      // Arrange
      const account = {};

      // Act
      const result = isOnActiveTrial(account);

      // Assert
      expect(result).toBeFalsy();
    });

    it('should return false with non active trial', () => {
      // Arrange
      const account = {
        currentOrganization: {
          billing: {
            subscription: {
              trial: {
                isActive: false,
              },
            },
          },
        },
      };

      // Act
      const result = isOnActiveTrial(account);

      // Assert
      expect(result).toBeFalsy();
    });

    it('should return true with an active trial', () => {
      // Arrange
      const account = {
        currentOrganization: {
          billing: {
            subscription: {
              trial: {
                isActive: true,
              },
            },
          },
        },
      };

      // Act
      const result = isOnActiveTrial(account);

      // Assert
      expect(result).toBeTruthy();
    });
  });
});
