import React, { useState, useEffect } from 'react';
import SimpleModal from '@bufferapp/ui/SimpleModal';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { getCookie, setCookie, DATES } from 'utils/cookies';
import { MODALS } from 'hooks/useModal';
import { useUser } from 'context/User';

import Confirmation from './modals/Confirmation';
import ChannelConnectionPrompt from './modals/ChannelConnectionPrompt';
import EssentialsPlan from './modals/PaidMigration/EssentialsPlan';
import EssentialsPricing from './modals/PaidMigration/EssentialsPricing';
import PaidMigration from './modals/PaidMigration';
import PaymentMethod from './modals/PaymentMethod';
import PlanSelector from './modals/PlanSelector';
import StartTrial from './modals/StartTrial';
import StickyModal from './modals/StickyModal';
import Success from './modals/PaidMigration/Success';
import TrialExpired from './modals/TrialExpired';
import QuantityUpdate from './modals/QuantityUpdate';
import { Paywall } from './modals/Paywall';

import {
  shouldShowFreeUserStartTrialPrompt,
  shouldShowChannelConnectionPrompt,
  shouldShowPaywallModal,
} from './utils';

const ModalWrapper = styled.div`
  > div {
    z-index: 1;
  }
`;

function handleFreeUsersStartTrialPrompt(openModal) {
  openModal(MODALS.startTrial, {
    cta: 'freeUserTrialPrompt',
    ctaButton: 'freeUserTrialPrompt',
  });
  setCookie({
    key: 'startTrialPrompt',
    value: true,
    expires: DATES.inMonthsFromNow(12),
  });
}

const ModalContent = ({ modal, closeAction }) => {
  switch (modal) {
    case MODALS.channelConnectionPrompt:
      return (
        <StickyModal closeAction={closeAction}>
          <ChannelConnectionPrompt modal={modal} />
        </StickyModal>
      );
    case MODALS.paymentMethod:
      return (
        <SimpleModal closeAction={closeAction}>
          <PaymentMethod modal={modal} />
        </SimpleModal>
      );
    case MODALS.planSelector:
      return (
        <SimpleModal closeAction={closeAction}>
          <PlanSelector modal={modal} />
        </SimpleModal>
      );
    case MODALS.success:
      return (
        <SimpleModal closeAction={closeAction}>
          <Confirmation modal={modal} />
        </SimpleModal>
      );
    case MODALS.startTrial:
      return (
        <SimpleModal closeAction={closeAction}>
          <StartTrial modal={modal} />
        </SimpleModal>
      );
    case MODALS.paidMigration:
      return (
        <StickyModal closeAction={closeAction}>
          <PaidMigration modal={modal} />
        </StickyModal>
      );
    case MODALS.essentialsPlan:
      return (
        <SimpleModal closeAction={closeAction}>
          <EssentialsPlan modal={modal} />
        </SimpleModal>
      );
    case MODALS.essentialsPricing:
      return (
        <SimpleModal closeAction={closeAction}>
          <EssentialsPricing modal={modal} />
        </SimpleModal>
      );
    case MODALS.upgradeSuccess:
      return (
        <SimpleModal closeAction={closeAction}>
          <Success modal={modal} />
        </SimpleModal>
      );
    case MODALS.trialExpired:
      return (
        <SimpleModal closeAction={closeAction}>
          <TrialExpired modal={modal} />
        </SimpleModal>
      );
    case MODALS.quantityUpdate:
      return (
        <SimpleModal closeAction={closeAction}>
          <QuantityUpdate modal={modal} />
        </SimpleModal>
      );
    case MODALS.paywall:
      return (
        <SimpleModal closeAction={closeAction}>
          <Paywall modal={modal} />
        </SimpleModal>
      );
    default:
      return null;
  }
};

ModalContent.propTypes = {
  modal: PropTypes.objectOf(PropTypes.object).isRequired,
  closeAction: PropTypes.func.isRequired,
};

const Modal = React.memo(({ modal, openModal }) => {
  const [hasModal, setHasModal] = useState(!!modal);
  const user = useUser();

  useEffect(() => {
    //Trial Expired Modal
    const isAwaitingUserAction =
      user?.currentOrganization?.billing?.subscription?.trial
        ?.isAwaitingUserAction || false;
    const hasDismissedTrialModal = getCookie({ key: 'trialOverDismissed' });
    if (!hasDismissedTrialModal && isAwaitingUserAction) {
      openModal(MODALS.trialExpired);
    }

    //Check if Pendo loads on the page - we don't want to show the OB Migration modal if there is a Pendo guide already visible
    const isPendoModalVisible =
      window.pendo &&
      window.pendo.hasOwnProperty('isGuideShown') &&
      window.pendo.isGuideShown();

    //Migrate to OB modal
    const canMigrateToOneBuffer =
      user?.currentOrganization?.canMigrateToOneBuffer?.canMigrate;
    const hasDismissedMigrationModal = getCookie({
      key: 'migrationModalDismissed',
    });
    const shouldShowMigrationModal =
      !hasDismissedMigrationModal &&
      canMigrateToOneBuffer &&
      !isPendoModalVisible;

    if (shouldShowMigrationModal) {
      openModal(MODALS.paidMigration);
    }

    // Start free trail prompt
    if (shouldShowFreeUserStartTrialPrompt(user)) {
      handleFreeUsersStartTrialPrompt(openModal);
    }

    // Show Channel Connection prompt
    if (shouldShowChannelConnectionPrompt(user)) {
      openModal(MODALS.channelConnectionPrompt);
    }

    if (shouldShowPaywallModal(user)) {
      openModal(MODALS.paywall);
    }
  }, [user.loading]);

  useEffect(() => {
    setHasModal(!!modal);
  }, [modal]);

  return (
    <>
      {hasModal && (
        <ModalWrapper>
          <ModalContent modal={modal} closeAction={() => openModal(null)} />
        </ModalWrapper>
      )}
    </>
  );
});

Modal.propTypes = {
  modal: PropTypes.objectOf(PropTypes.object),
  openModal: PropTypes.func.isRequired,
};

export default Modal;
