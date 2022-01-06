import React from 'react';

import Link from '@bufferapp/ui/Link';
import Text from '@bufferapp/ui/Text';

import { Container } from './FreePlanSection.style';

function FreePlanSection() {
  return (
    <Container>
      <Text htmlFor="foo" type="help">
        Looking for basic publishing tools?{''}{' '}
        <Link newTab href="http://buffer.com" fontWeight={700}>
          Downgrade to our Free plan
        </Link>
      </Text>
    </Container>
  );
}

export default FreePlanSection;
