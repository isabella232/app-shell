import { grayLighter } from '@bufferapp/ui/style/colors';

import render from './index';
import { MODALS, ACTIONS as MODAL_ACTIONS, EVENT_KEY as MODAL_EVENT_KEY } from './hooks/useModal';
import { EVENT_KEY as ORGANIZATION_EVENT_KEY } from './hooks/useOrgSwitcher';

window.appshell = {
  eventKeys: {
    ORGANIZATION_EVENT_KEY,
    MODAL_EVENT_KEY,
  },
  actions: {
    ...MODAL_ACTIONS,
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
