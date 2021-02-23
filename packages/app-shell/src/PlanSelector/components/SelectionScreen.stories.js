import React from 'react';

import { SelectionScreen } from './SelectionScreen';

export default {
  title: 'Selection Screen',
  component: SelectionScreen,
  argTypes: {
    children: "",
  },
};

const Template = (args) => <SelectionScreen {...args} />;

export const OneExample = Template.bind({});
OneExample.args = {
  children: 'Hello world!',
};

export const OneSecondExample = Template.bind({});
OneSecondExample.args = {
  children: 'Goodbye world!',
};