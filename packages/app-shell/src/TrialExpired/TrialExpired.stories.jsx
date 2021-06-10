import React from 'react';
import { Modal as TrialExpired } from './index';
import response from '../mocks/mock';

export default {
  title: 'Trial Expired Modal',
  component: TrialExpired,
};

const Template = (args) => <TrialExpired {...args} />;

export const OneExample = Template.bind({});
OneExample.args = {
  plan: response.data.account.currentOrganization.billing.changePlanOptions[0],
  closeModal: () => {},
};
