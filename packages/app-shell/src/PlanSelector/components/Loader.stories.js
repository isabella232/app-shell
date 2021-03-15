import React from 'react';
import Loading from './Loader';

export default {
  title: 'Loading',
  component: Loading,
};

const Template = (args) => <Loading {...args} />;

export const LoadingExample = Template.bind({});
LoadingExample.args = {};
