import { useEffect } from 'react';
import { useMutation } from '@apollo/client'
import { BufferTracker } from '@bufferapp/buffer-tracking-browser-ts'

import { QUERY_ACCOUNT, SET_CURRENT_ORGANIZATION } from '../graphql/account'
import eventDispatcher from './utils/eventDispatcher'
import { getActiveProductFromPath } from '../utils/getProduct';

export const EVENT_KEY = 'appshell__organization_event'

export const ACTIONS = {
  setCurrentOrganization(organizationId, options = {}){
    eventDispatcher(
      EVENT_KEY,
      { action: 'setCurrentOrganization', organizationId, options }
    )
  }
}

function useOrgSwitcher() {
  const [setCurrentOrganization] = useMutation(SET_CURRENT_ORGANIZATION);
  function updateCache(organizationId, client) {
    const previousData = client.readQuery({ query: QUERY_ACCOUNT }) || {};
    const organizationSelected = previousData?.account?.organizations?.filter(
      (organization) => organization.id === organizationId
    )[0];
    const updatedData = {
      account: {
        ...previousData.account,
        currentOrganization: organizationSelected,
      },
    };
    client.writeQuery({
      query: QUERY_ACCOUNT,
      data: updatedData,
    });
  };

  async function updateOrganization(organizationId, options = {}) {
    await setCurrentOrganization({
      variables: {
        organizationId,
      },
      update: (client) => updateCache(organizationId, client),
    });

    eventDispatcher(
      EVENT_KEY,
      { organizationId }
    )

    BufferTracker.organizationSwitched({
      organizationId,
      product: getActiveProductFromPath(),
    });

    // Needed, as the onCompleted is not triggered when passed as an option in the mutate function.
    if (options.onCompleted) {
      options.onCompleted(organizationId);
    }
  };

  // set organization from event
  function handleUpdateOrganization({ detail }) {
    const { action, organizationId:orgId, options:updateOptions } = detail

    switch (action) { 
      case 'setCurrentOrganization':
        updateOrganization(orgId, updateOptions)
        break;
      default:
        break;
    }
  }
  useEffect(() => {
    window.addEventListener(EVENT_KEY, handleUpdateOrganization)

    return function cleanup() {
      window.removeEventListener(EVENT_KEY, handleUpdateOrganization)
    }
  }, [])

  return updateOrganization
}

export default useOrgSwitcher;
