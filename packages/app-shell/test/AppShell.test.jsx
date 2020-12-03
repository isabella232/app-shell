import React from 'react';
import { MockedProvider } from '@apollo/client/testing';
import { act, render } from '@testing-library/react';
import AppShell from '../src/index';
import { QUERY_ACCOUNT } from '../src/graphql/account';

async function renderAppShell(account) {
  const mocks = [{
    request: {
      query: QUERY_ACCOUNT,
    },
    result: {
      data: {
        account,
      },
    },
  }];
  const {container} = render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <AppShell content={
        <h1>Hello world!</h1>
      }/>
    </MockedProvider>,
  );
  await act(async () => {
    await new Promise(resolve => setTimeout(resolve, 0)); // wait for response
  });
  return { mocks, container };
}

describe('App Shell', () => {
  test.todo('retrieves global account information')
})

