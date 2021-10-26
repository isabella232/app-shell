/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { MockedProvider } from '@apollo/react-testing';
import { renderHook, act } from '@testing-library/react-hooks';

import useMigrateToOB, { MIGRATE_TO_OB } from './useMigrateToOB';

describe.skip('useMigrateToOB', () => {
  const mockSuccessMutation = jest.fn(() => {
    return {
      data: {
        billingMigrateToOneBuffer: {
          billing: {},
        },
      },
    };
  });

  const mockErrorMutation = jest.fn(() => {
    return {
      data: {
        billingMigrateToOneBuffer: {
          userFriendlyMessage: 'Whoops',
        },
      },
    };
  });

  const user = {
    currentOrganization: {
      id: '123FooOrganization',
    },
  };

  const userWithError = {
    currentOrganization: {
      id: '123FooError',
    },
  };

  const mocks = [
    {
      request: {
        query: MIGRATE_TO_OB,
        variables: {
          organizationId: user.currentOrganization.id,
        },
      },
      newData: mockSuccessMutation,
    },
    {
      request: {
        query: MIGRATE_TO_OB,
        variables: {
          organizationId: userWithError.currentOrganization.id,
        },
      },
      newData: mockErrorMutation,
      error: new Error('Whoops'),
    },
  ];

  function testHook(params) {
    const { result, waitForNextUpdate } = renderHook(
      () => useMigrateToOB(params),
      {
        wrapper: ({ children }) => (
          <MockedProvider mocks={mocks}>{children}</MockedProvider>
        ),
      }
    );

    return {
      result,
      waitForNextUpdate,
    };
  }

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('does not execute the mutation if missing user', async () => {
    // eslint-disable-next-line no-unused-vars
    const { result } = testHook({
      user: null,
    });
    await expect(mockSuccessMutation).not.toHaveBeenCalled();
  });

  // it('run the mutation and return the migration success', async () => {
  //   const { result, waitForNextUpdate } = testHook(user);
  //   act(() => {
  //     result.current.migrateToOB();
  //   });
  //   await expect(mockSuccessMutation).toHaveBeenCalled();
  //   await waitForNextUpdate();
  //   await expect(result.current.success).toBeTruthy();
  // });

  // it('run the mutation and return a user friendly error', async () => {
  //   const { result, waitForNextUpdate } = testHook(userWithError);
  //   act(() => {
  //     result.current.migrateToOB();
  //   });
  //   await expect(mockErrorMutation).toHaveBeenCalled();
  //   await waitForNextUpdate();
  //   await expect(result.current.success).toBeFalsy();
  //   await expect(result.current.error).toEqual(mocks[1].error);
  // });
});
