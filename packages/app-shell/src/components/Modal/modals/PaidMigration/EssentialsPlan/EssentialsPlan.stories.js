import React from 'react';
import { EssentialsPlan } from './index';
import { planMigrationPreview } from '../mocks';

export default {
  title: 'Modals/Paid Migration/Essentials Plan',
  component: EssentialsPlan,
};

const Template = (args) => (
  <div style={{ height: '550px' }}>
    <EssentialsPlan {...args} />
  </div>
);

const migrationPreview = planMigrationPreview.data.previewPlanMigration.preview;
const features = migrationPreview.planFeatures.map(feature => ({
  ...feature,
  currentPlan: migrationPreview.currentPlan.supportedFeatures.includes(feature.id),
  suggestedPlan: migrationPreview.suggestedPlan.supportedFeatures.includes(feature.id),
}))

export const EssentialsPlanExample = Template.bind({});
EssentialsPlanExample.args = {
  features,
};
