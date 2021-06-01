import React from 'react';
import Summary from './index';
import response from '../mocks/mock';
import { UserContext } from '../context/User';

export default {
  title: 'Summary',
  component: Summary,
};

const Template = (args) => (
  <div style={{ height: '550px' }}>
    <UserContext.Provider value={response.data.account}>
      <Summary {...args} />
    </UserContext.Provider>
  </div>
);

export const SummaryExample = Template.bind({});
SummaryExample.args = {
  planOptions:
    response.data.account.currentOrganization.billing.changePlanOptions,
  selectedPlan:
    response.data.account.currentOrganization.billing.changePlanOptions[1],
};
