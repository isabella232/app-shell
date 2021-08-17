import React from 'react';
import Success from './index';

export default {
  title: 'Modals/Paid Migration/Success',
  component: Success,
};

const Template = (args) => (
  <div style={{ height: '550px' }}>
      <Success {...args} />
  </div>
);

export const Example = Template.bind({});
Example.args = {
};
