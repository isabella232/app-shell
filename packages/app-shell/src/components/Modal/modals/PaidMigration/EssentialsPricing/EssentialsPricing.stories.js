import React from 'react';
import { Content as PricingModal } from './index';
import { planMigrationPreview  } from '../mocks';

export default {
  title: 'Modals/Paid Migration/Essentials Pricing',
  component: PricingModal,
};

const Template = (args) => (
  <div style={{ height: '550px' }}>
    <PricingModal {...args} />
  </div>
);

export const Example = Template.bind({});
Example.args = {
  handleDismiss() {console.log('dismiss')},
  handleMigrate() {console.log('migrate')},
  migrationPreview: planMigrationPreview.data.previewPlanMigration.preview,
};
