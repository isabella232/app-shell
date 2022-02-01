import React from 'react';
import ChannelConnectionPrompt from './index';

export default {
  title: 'Modals/ChannelConnectionPrompt',
  component: ChannelConnectionPrompt,
};

const Template = () => (
  <div style={{ height: '550px' }}>
    <ChannelConnectionPrompt />
  </div>
);

export const Analyze = Template.bind({});
Analyze.parameters = {
  product: 'analyze',
};

export const Engage = Template.bind({});
Engage.parameters = {
  product: 'engage',
};
