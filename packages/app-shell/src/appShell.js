import render from './index';
import { MODALS, ACTIONS as MODAL_ACTIONS, EVENT_KEY as MODAL_EVENT_KEY } from './hooks/useModal';
import { EVENT_KEY as ORGS_EVENT_KEY } from './hooks/useOrgSwitcher';

window.appshell = {
  modal: {
    MODALS,
    actions: MODAL_ACTIONS,
    eventKey: MODAL_EVENT_KEY,
  },
  organization: {
    eventKey: ORGS_EVENT_KEY,
  }
}

render()
