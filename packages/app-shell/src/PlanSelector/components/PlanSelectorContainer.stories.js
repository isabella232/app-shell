import React from 'react';
import { PlanSelectorContainer } from './PlanSelectorContainer';
import response from '../../mocks/mock';
import { UserContext } from '../../context/User';

export default {
  title: 'Plan Selector',
  component: PlanSelectorContainer,
};

const planOptions =
  response.data.account.currentOrganization.billing.changePlanOptions;

const user = {
  currentOrganization: {
    billing: {
      changePlanOptions: planOptions,
    },
  },
};

const Template = (args) => (
  <UserContext.Provider value={user}>
    <PlanSelectorContainer {...args} />
  </UserContext.Provider>
);

export const AnotherExample = Template.bind({});
AnotherExample.args = {
  planOptions: planOptions,
  user: {
    currentOrganization: {
      id: 'foo',
      billing: { changePlanOptions: planOptions },
    },
  },
  openPaymentMethod: () => {},
  hasPaymentDetails: false,
  isActiveTrial: false,
};
