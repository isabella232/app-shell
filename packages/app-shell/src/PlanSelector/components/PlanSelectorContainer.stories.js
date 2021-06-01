import React from 'react';
import { PlanSelectorContainer } from './PlanSelectorContainer';
import { UserContext } from '../../context/User';
import response from '../../mocks/mock';

export default {
  title: 'Plan Selector',
  component: PlanSelectorContainer,
};

const Template = (args) => (
  <UserContext.Provider value={response.data.account}>
    <PlanSelectorContainer {...args} />
  </UserContext.Provider>
);

export const AnotherExample = Template.bind({});
AnotherExample.args = {
  user: response.data.account,
  changePlanOptions:
    response.data.account.currentOrganization.billing.changePlanOptions,
};
