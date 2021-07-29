import React from 'react';

import Text from '@bufferapp/ui/Text';
import Button from '@bufferapp/ui/Button';
import Link from '@bufferapp/ui/Link';

import { Holder, ButtonContainer } from './style';

const Success = () => {
  const [hostname, envModifier] = window.location.hostname.match(/\w+\.(\w+\.)buffer\.com/) || [null, null];

  return (
    <Holder>
      <Text type="h1">Congrats! Welcome to the Essentials plan</Text>

      <Text type="p">
        You're ready to take your social media strategy to the next level. We
        can't wait to see what you do!
      </Text>

      <ButtonContainer>
        <Button type="primary" label="Great, Let's Go" onClick={() => {}} />
      </ButtonContainer>

      <Text type="p">
        <i>
          You can always access your invoices and billing information{' '}
          <Link href={`https://account.${envModifier ? envModifier : ''}buffer.com/billing`}>here</Link>
        </i>
      </Text>
    </Holder>
  );
};

export default Success;
