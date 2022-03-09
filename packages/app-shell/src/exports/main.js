import { MODALS } from '../common/hooks/useModal';
import { EVENT_KEY as ORGANIZATION_EVENT_KEY, ACTIONS as ORGANIZATION_ACTIONS } from '../common/events/orgEvents';
import { EVENT_KEY as MODAL_EVENT_KEY, ACTIONS as MODAL_ACTIONS } from '../common/events/modalEvents';
import render from './Navigator';

window.appshell = {
  eventKeys: {
    ORGANIZATION_EVENT_KEY,
    MODAL_EVENT_KEY,
  },
  actions: {
    ...MODAL_ACTIONS,
    ...ORGANIZATION_ACTIONS,
  },
  MODALS,
}

function injectLayoutStyle() {
  const style = document.createElement('style');
  style.textContent = `
  `
  document.head.append(style);
}

(function() {
  injectLayoutStyle()
  render()
}())
