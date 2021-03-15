import React from 'react';
import Summary from './index';
import response from '../mocks/mock';
import { withReactContext } from 'storybook-react-context';

export default {
  title: 'Summary',
  component: Summary,
  decorators: [withReactContext],
};

const Template = (args) => (
  <div style={{ height: '550px' }}>
    <Summary {...args} />
  </div>
);

const planOptions =
  response.data.account.currentOrganization.billing.changePlanOptions;

export const SummaryExample = Template.bind({});

SummaryExample.args = {
  selectedPlan:
    response.data.account.currentOrganization.billing.changePlanOptions[1],
};

SummaryExample.decorators = [
  withReactContext({
    user: {
      currentOrganization: { billing: { changePlanOptions: planOptions } },
    },
  }),
];
