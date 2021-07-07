import React, { useState, useEffect } from 'react';
import { MODALS } from '../hooks/useModal';
import SimpleModal from '@bufferapp/ui/SimpleModal';
import PaymentMethod from '../PaymentMethod';
import PlanSelector from '../PlanSelector';
import StartTrial from '../StartTrial';
import PaidMigration from '../PaidMigration';
import Confirmation from '../Confirmation';

const ModalContent = ({ modal }) => {
  switch (modal) {
    case MODALS.paymentMethod:
      return <PaymentMethod />;
    case MODALS.planSelector:
      return <PlanSelector />;
    case MODALS.success:
      return <Confirmation />;
    case MODALS.startTrial:
      return <StartTrial />;
    case MODALS.paidMigration:
      return <PaidMigration />;
    default:
      return null;
  }
};

const Modal = ({ modal, openModal, isAwaitingUserAction }) => {
  const [hasModal, setHasModal] = useState(!!modal);

  useEffect(() => {
    if (isAwaitingUserAction) {
      openModal(MODALS.planSelector, {
        cta: 'awaitingUserAction',
        isUpgradeIntent: false,
      });
    }
  }, [isAwaitingUserAction]);

  useEffect(() => {
    setHasModal(!!modal);
  }, [modal]);

  return (
    <>
      {hasModal && (
        <SimpleModal
          closeAction={() => {
            openModal(null);
          }}
        >
          <ModalContent modal={modal} />
        </SimpleModal>
      )}
    </>
  );
};

export default Modal;
