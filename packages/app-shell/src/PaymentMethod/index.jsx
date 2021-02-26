import React, { useEffect } from 'react';
import { useMutation } from '@apollo/client';

import { UserContext } from '../context/User';
import { CREATE_SETUP_INTENT } from '../graphql/billing';

const Contet = ({ user }) => {
  const [createSetupIntent, { data:setupIntent, error:setupIntentError }] = useMutation(CREATE_SETUP_INTENT);
  useEffect(() => {
    createSetupIntent({
      variables: {
        organizationId: user.currentOrganization.id
      }
    });
  }, [])
  console.log(setupIntent);
  return (<div>Payment Method</div>)
}

const PaymentMethod = () => {

  return (
    <UserContext.Consumer>{user => (
      <Contet user={user} />
    ) }</UserContext.Consumer>
  )
}

export default PaymentMethod;
