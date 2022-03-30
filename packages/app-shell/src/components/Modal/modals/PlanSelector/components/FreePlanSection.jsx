import React from 'react';

import Text from '@bufferapp/ui/Text';
import Button from '@bufferapp/ui/Button';

import { Container } from './FreePlanSection.style';

function FreePlanSection(props) {
  const { ctaAction } = props;

  return (
    <Container id="free_plan_section">
      <Text htmlFor="foo" type="help">
        Looking for basic publishing tools?{''}{' '}
        <Button
          id="try_free_plan"
          type="text"
          onClick={() => ctaAction()}
          label="Downgrade to our Free plan"
        />
      </Text>
    </Container>
  );
}

export default FreePlanSection;
