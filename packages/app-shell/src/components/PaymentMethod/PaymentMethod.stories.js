import React from 'react';
import PaymentMethod from './index';
import { UserContext } from '../../common/context/User';
import { ModalContext } from '../../common/context/Modal';
import mock from '../../common/mocks/mock';
import { CREATE_SETUP_INTENT } from '../../common/graphql/billing';

export default {
  title: 'Payment Method',
  component: PaymentMethod,
};

const Template = (args) => (
  <UserContext.Provider value={mock.data.account}>
    <ModalContext.Provider value={{
      modal: null,
        data: { plan: mock.data.account.currentOrganization.billing.changePlanOptions[1] }
    }}>
      <PaymentMethod {...args} />
    </ModalContext.Provider>
  </UserContext.Provider>
);

export const AnotherExample = Template.bind({});
AnotherExample.args = {
  user: mock.data.account,
};

AnotherExample.parameters = {
  apolloClient: {
    mocks: [
      {
        request: {
          query: CREATE_SETUP_INTENT,
          variables: {
            organizationId: mock.data.account.currentOrganization.id,
          },
        },
        result: {
          data: {
            billingCreateSetupIntent: {
              success: true,
              clientSecret: 'fooSetupIntent',
            },
          },
        },
      },
      {
        request: {
          query: CREATE_SETUP_INTENT,
          variables: {
            organizationId: mock.data.account.currentOrganization.id,
          },
        },
        result: {
          data: {
            billingCreateSetupIntent: {
              success: true,
              clientSecret: 'fooSetupIntent',
            },
          },
        },
      },
    ]
  }
};
