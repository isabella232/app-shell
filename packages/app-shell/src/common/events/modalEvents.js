import eventDispatcher from 'utils/eventDispatcher'

export const EVENT_KEY = 'appshell__modal_event';

export const ACTIONS = {
  openModal(modalKey, modalData = null) {
    eventDispatcher(EVENT_KEY, { modal: modalKey, data: modalData });
  },
};
