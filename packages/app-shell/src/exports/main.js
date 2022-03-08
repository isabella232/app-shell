import { MODALS } from '../common/hooks/useModal';
import { EVENT_KEY as ORGANIZATION_EVENT_KEY, ACTIONS as ORGANIZATION_ACTIONS } from '../common/events/orgEvents';
import { EVENT_KEY as MODAL_EVENT_KEY, ACTIONS as MODAL_ACTIONS } from '../common/events/modalEvents';
import { EVENT_KEY as ORCHESTRATOR_EVENT_KEY, ACTIONS as ORCHESTRATOR_ACTIONS } from '../common/events/orchestratorEvents';
import render from './Navigator';
import { COMPONENTS } from './Orchestrator';

window.appshell = {
  eventKeys: {
    MODAL_EVENT_KEY,
    ORCHESTRATOR_EVENT_KEY,
    ORGANIZATION_EVENT_KEY,
  },
  actions: {
    ...MODAL_ACTIONS,
    ...ORCHESTRATOR_ACTIONS,
    ...ORGANIZATION_ACTIONS,
  },
  MODALS,
  COMPONENTS,
}

function injectLayoutStyle() {
  const style = document.createElement('style');
  style.textContent = `
  `
  document.head.append(style);
}

(function init() {
  injectLayoutStyle()
  render()
}())
