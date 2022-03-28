import { useState, useEffect, useCallback } from 'react';

import { EVENT_KEY, ACTIONS } from '../events/modalEvents';

export const MODALS = {
  GEID1FreeTrialPrompt: 'GEID1FreeTrialPrompt',
  channelConnectionPrompt: 'channelConnectionPrompt',
  essentialsPlan: 'essentialsPlan',
  essentialsPricing: 'essentialsPricing',
  paidMigration: 'paidMigration',
  paymentMethod: 'paymentMethod',
  paywall: 'paywall',
  planSelector: 'planSelector',
  quantityUpdate: 'quantityUpdate',
  startTrial: 'startTrial',
  success: 'success',
  trialExpired: 'trialExpired',
  upgradeSuccess: 'upgradeSuccess',
  // This modal will make a decision based on the Organization state if
  // it will render the planSelector or the QuantityUpdate
  subscriptionUpdate: 'subscriptionUpdate'
};

function useModal() {
  const [modal, setModal] = useState(null);
  const [data, setData] = useState(null);

  const openModal = useCallback((modalKey, modalData = null) => {
    const matchingModal = Object.keys(MODALS).find((k) => k === modalKey);
    if (matchingModal) {
      setModal(matchingModal);
      if (modalData) {
        setData(modalData);
      }
    } else {
      setModal(null);
    }
  }, []);

  // Open Modal from url matching
  useEffect(() => {
    const { hash } = window.location;
    const matchingModal = Object.keys(MODALS).find(
      (k) => k === hash.replace('#', '')
    );
    if (matchingModal) {
      setModal(matchingModal);
    }
  }, []);

  useEffect(() => {
    if (modal === MODALS.success) {
      // propagate a modal event on success
      ACTIONS.openModal(modal)
    }
  }, [modal])

  // Open modal from events
  function handleOpenModal({ detail }) {
    const { modal: modalKey, data: modalData } = detail;
    openModal(modalKey, modalData);
  }

  useEffect(() => {
    window.addEventListener(EVENT_KEY, handleOpenModal);

    return function cleanup() {
      window.removeEventListener(EVENT_KEY, handleOpenModal);
    };
  }, []);

  return {
    data,
    modal,
    openModal,
  };
}

export default useModal;
