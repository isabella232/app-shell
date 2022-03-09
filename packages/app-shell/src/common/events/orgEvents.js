import eventDispatcher from 'utils/eventDispatcher'

export const EVENT_KEY = 'appshell__organization_event'

export const ACTION_KEYS = {
  setCurrentOrganization: 'setCurrentOrganization',
  currentOrganizationUpdated: 'currentOrganizationUpdated',
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
  }
}
