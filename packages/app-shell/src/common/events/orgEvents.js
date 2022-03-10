import eventDispatcher from 'utils/eventDispatcher'

export const EVENT_KEY = 'appshell__organization_event'

export const ACTION_KEYS = {
  setCurrentOrganization: 'setCurrentOrganization',
  billingUpdated: 'billingUpdated',
}

export const ACTIONS = {
  setCurrentOrganization(organizationId, options = {}){
    eventDispatcher(
      EVENT_KEY,
      { action: ACTION_KEYS.setCurrentOrganization, organizationId, options }
    )
  },
  billingUpdated(options = {}){
    eventDispatcher(
      EVENT_KEY,
      { action: ACTION_KEYS.billingUpdated,  options }
    )
  }
}
