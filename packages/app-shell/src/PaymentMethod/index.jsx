import React from 'react';

import { MODALS } from '../hooks/useModal';
import { UserContext } from '../context/User';
import { ModalContext } from '../context/Modal';

import StripeProvider from './components/StripeProvider'
import Form from './components/Form'

const PaymentMethod = () => {
  return (<UserContext.Consumer>
    {user => (<ModalContext.Consumer>
      {modal => (<StripeProvider>
          <Form
            openPlans={() => {modal.openModal(MODALS.planSelector)}}
            openSuccess={(data) => {modal.openModal(MODALS.success, data)}}
            user={user}
          />
        </StripeProvider>)
      }</ModalContext.Consumer>)
    }
  </UserContext.Consumer>)
}

export default PaymentMethod;
