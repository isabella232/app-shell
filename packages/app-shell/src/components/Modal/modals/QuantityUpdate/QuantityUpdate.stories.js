import React from 'react';
import QuantityUpdate from './index';
import { UserContext } from '../../../../common/context/User';
import response from '../../../../common/mocks/trialExpiredMock';

export default {
  title: 'Channels Quantity Update',
  component: QuantityUpdate,
};

const Template = (args) => (
  <UserContext.Provider value={response.data.account}>
    <QuantityUpdate {...args} />
  </UserContext.Provider>
);

export const Example = Template.bind({});
Example.args = {};
