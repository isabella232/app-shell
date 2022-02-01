import { MockedProvider } from '@apollo/client/testing'; 
import { decorator } from '../__mocks__/getProduct';

export const parameters = {
  apolloClient: {
    MockedProvider,
  },
}

export const decorators = [decorator];
