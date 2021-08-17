import React from 'react';
import Intro from './index';

export default {
  title: 'Modals/Paid Migration/Intro',
  component: Intro,
};

const Template = (args) => (
  <div style={{ height: '550px' }}>
      <Intro/>
  </div>
);

export const Example = Template.bind({});
Example.args = {
  
};
