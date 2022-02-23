import React from 'react';

import Text from '@bufferapp/ui/Text';
import Button from '@bufferapp/ui/Button';
import { useSplitEnabled } from '@bufferapp/features';

import { Container } from './AgencyPlanSection.style';

function AgencyPlanSection(props) {
  const { ctaAction } = props;
  const { isEnabled: splitSBBEnabled } = useSplitEnabled('slot-based-billing');

  return (
    <Container sbbEnabled={splitSBBEnabled}>
      <Text htmlFor="agencyPlan" type="agency">
        Need more than 10 channels?{''}{' '}
        <Button
          type="text"
          onClick={() => ctaAction()}
          label="Try our Agency plan"
        />
      </Text>
    </Container>
  );
}

export default AgencyPlanSection;
