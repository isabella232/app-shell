export function isMultiProductCustomer({ currentOrganization }) {
  if (!currentOrganization?.isOneBufferOrganization) {
    if (currentOrganization?.billing?.subscriptions?.length > 1) {
      return true;
    }
  }

  return false;
}

export function isFreePlan(user) {
  const { currentOrganization } = user
  if (currentOrganization?.billing?.subscriptions?.length > 0) {
    return !!currentOrganization?.billing?.subscriptions?.find(
      (sub) => sub.product === 'publish' && sub.plan === 'free'
    )
  }

  return !isOnBufferTrial(user) && currentOrganization?.billing?.subscription?.plan.id === 'free'
}

export function isPayingPublishOrganization(user) {
  const { currentOrganization } = user
  if (currentOrganization?.billing?.subscriptions?.length > 0) {
    return !!currentOrganization?.billing?.subscriptions
      .find(s => s.product === 'publish' && !s?.trial?.isActive && !isFreePlan(user))
  }

  return false;
}

export function isPayingAnalyzeOrganization(user) {
  const { currentOrganization } = user
  if (currentOrganization?.billing?.subscriptions?.length > 0) {
    return !!currentOrganization?.billing?.subscriptions
      .find(s => s.product === 'analyze' && !s?.trial?.isActive)
  }

  return false;
}

export function isPayingBufferOrganization({ currentOrganization }) {
  if (currentOrganization?.isOneBufferOrganization) {
    if (currentOrganization?.billing.subscription.plan.trial?.isActive) { 
      return false;
    }
    return currentOrganization?.billing?.subscription?.plan.id !== 'free'
  }

  return false;
}

function getMPSubscription(currentOrganization, product) {
  if (currentOrganization?.billing?.subscriptions?.length > 0) {
    return currentOrganization?.billing?.subscriptions
      .find(s => s.product === product) || null
  }

  return null;
}

function getPublishSubscription(currentOrganization) {
  return getMPSubscription(currentOrganization, 'publish');
}

function getAnalyzeSubscription(currentOrganization) {
  return getMPSubscription(currentOrganization, 'analyze');
}

export function currentAnalyzePlan({ currentOrganization }) {
  if(!isOnAnalyzeTrial({ currentOrganization })) {
    const subscription = getAnalyzeSubscription(currentOrganization)
    return subscription?.plan || null
  }

  return null;
}

export function isOnAnalyzeTrial({ currentOrganization }) {
    const subscription = getAnalyzeSubscription(currentOrganization)
    return subscription?.trial?.isActive || false
}


export function currentAnalyzeTrialPlan({ currentOrganization }) {
  if (isOnAnalyzeTrial({ currentOrganization })) {
    const subscription = getAnalyzeSubscription(currentOrganization)
    return subscription?.plan || null
  }

  return null;
}

export function isOnPublishTrial({ currentOrganization }) {
    const subscription = getPublishSubscription(currentOrganization)
    return subscription?.trial?.isActive || false
}

export function currentPublishPlan({ currentOrganization }) {
  if(!isOnPublishTrial({ currentOrganization })) {
    const subscription = getPublishSubscription(currentOrganization)
    return subscription?.plan || null
  }

  return null;
}

export function currentPublishTrialPlan({ currentOrganization }) {
  if (isOnPublishTrial({ currentOrganization })) {
    const subscription = getPublishSubscription(currentOrganization)
    return subscription?.plan || null
  }

  return null;
}

export function isOnBufferTrial({ currentOrganization }) {
  return currentOrganization?.billing?.subscription?.plan?.trial?.isActive || false
}

export function billingCycle({ currentOrganization }) {
  if (currentOrganization?.isOneBufferOrganization) {
    return currentOrganization?.billing?.subscription?.plan?.interval || null
  }

  const subscriptions = currentOrganization?.billing?.subscriptions || [];
  const plan = subscriptions.slice(-1)[0];
  return plan?.interval || null
}

export function trialBillingCycle({ currentOrganization }) {
  if (currentOrganization?.isOneBufferOrganization && isOnBufferTrial({ currentOrganization })) {
    return currentOrganization?.billing?.subscription?.plan?.interval || null
  }

  if(isOnPublishTrial({ currentOrganization }) || isOnAnalyzeTrial({ currentOrganization })) {
    const subscriptions = currentOrganization?.billing?.subscriptions || [];
    const plan = subscriptions.find(s => s?.trial?.isActive)
    return plan?.interval || null;
  }

  return null;
}

function bufferPlan({ currentOrganization }) {
  return currentOrganization?.billing?.subscription?.plan?.id || null
}

export function currentBufferPlan(user) {
  if (isOnBufferTrial(user)) {
    return 'free';
  }

  return bufferPlan(user)
}

export function currentBufferTrialPlan(user) {
  if (!isOnBufferTrial(user)) {
    return null;
  }

  return bufferPlan(user)
}

export function organizationUserRole({ currentOrganization }) {
  return currentOrganization?.role || null
}

export function paidSubscriptionAutoRenewEnabled({ currentOrganization }) {
  if (currentOrganization?.isOneBufferOrganization) {
    return Object.prototype.hasOwnProperty.call(currentOrganization?.billing?.subscription, 'isCanceledAtPeriodEnd') ?
      !currentOrganization.billing.subscription.isCanceledAtPeriodEnd :
      null
  }
  return null
}
