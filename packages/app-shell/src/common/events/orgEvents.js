import { useEffect } from 'react';
import eventDispatcher from 'utils/eventDispatcher'
import { useSuggestedPlan } from '../hooks/useSuggestedPlan';

export const EVENT_KEY = 'appshell__organization_event'
export const MISSING_USER_ERROR = 'Missing options.user';

export const ACTION_KEYS = {
  currentOrganizationUpdated: 'currentOrganizationUpdated',
  setCurrentOrganization: 'setCurrentOrganization',
  startTrial: 'startTrial',
}

export const ACTIONS = {
  setCurrentOrganization(organizationId, options = {}){
    eventDispatcher(
      EVENT_KEY,
      { action: ACTION_KEYS.setCurrentOrganization, organizationId, options }
    )
  },
  currentOrganizationUpdated(options = {}){
    eventDispatcher(
      EVENT_KEY,
      { action: ACTION_KEYS.currentOrganizationUpdated,  options }
    )
  },
  startTrial(options = {}){
    if (!options?.user) {
       throw new TypeError(MISSING_USER_ERROR);
    }

    eventDispatcher(
      EVENT_KEY,
      { action: ACTION_KEYS.startTrial,  options }
    )
  }
}

export function getActionFromEvent({ detail }) {
  switch(detail.action) {
    case ACTION_KEYS.startTrial:
        if (!detail?.options?.user) {
           throw new TypeError(MISSING_USER_ERROR);
        }
        return ACTION_KEYS.startTrial
    default:
      return null
  }
}

export function useOrgEventsListener(user) {
  const { suggestedPlan } = useSuggestedPlan(user)
  console.log('suggestedPlan', suggestedPlan);

  function handleEvent(event) {
    const actionToProcess = getActionFromEvent(event)
    switch(actionToProcess) {
      case ACTION_KEYS.startTrial:
        console.log('user', user);
        break;
      default:
        break;
    }
  }

  useEffect(() => {
    ACTIONS.currentOrganizationUpdated({ user })
  }, [user]);

  useEffect(() => {
    window.addEventListener(EVENT_KEY, handleEvent)

    return function cleanup() {
      window.removeEventListener(EVENT_KEY, handleEvent)
    };
  }, []);
}
