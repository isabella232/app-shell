import React from 'react';

import Text from '@bufferapp/ui/Text';
import Button from '@bufferapp/ui/Button';
import { useSplitEnabled } from '@bufferapp/features';

import { Container } from './FreePlanSection.style';

function FreePlanSection(props) {
  const { ctaAction } = props;
  const { isEnabled: splitSBBEnabled } = useSplitEnabled('slot-based-billing');

  return (
    <Container sbbEnabled={splitSBBEnabled}>
      <Text htmlFor="foo" type="help">
        Looking for basic publishing tools?{''}{' '}
        <Button
          type="text"
          onClick={() => ctaAction()}
          label="Downgrade to our Free plan"
        />
      </Text>
    </Container>
  );
}

export default FreePlanSection;
