import { MockedProvider } from '@apollo/client/testing'; // Use for Apollo Version 3+

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  apolloClient: {
    MockedProvider,
  },
};
