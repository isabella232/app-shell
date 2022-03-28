import React from 'react';

import Text from '@bufferapp/ui/Text';
import Button from '@bufferapp/ui/Button';

import { Container } from './AgencyPlanSection.style';

function AgencyPlanSection(props) {
  const { ctaAction } = props;

  return (
    <Container id="agency_plan_section">
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
