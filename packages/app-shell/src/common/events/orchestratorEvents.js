import eventDispatcher from 'utils/eventDispatcher'

export const EVENT_KEY = 'appshell__modal_event';

export const ACTION_KEYS = {
  renderComponent: 'renderComponent',
}

export const ACTIONS = {
  renderComponent({ componentKey, containerId, options }) {
    eventDispatcher(EVENT_KEY, { action: ACTION_KEYS.renderComponent, componentKey, containerId, options });
  },
};

