import React from 'react';
import { MockedProvider } from '@apollo/client/testing';
import { act, render, screen } from '@testing-library/react';
import AppShell from '../src/index';
import { QUERY_ACCOUNT } from '../src/graphql/account';
import {account} from "./mocks/account";

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
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <AppShell content={
        <h1>Hello world!</h1>
      }/>
    </MockedProvider>,
  );
  await act(async () => {
    await new Promise(resolve => setTimeout(resolve, 0)); // wait for response
  });
}

describe('App Shell', () => {
  it('retrieves global account information', () => {
     renderAppShell(account)
     screen.findByText(account.email)
  })
})

