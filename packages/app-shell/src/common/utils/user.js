export function isFreeUser(user) {
  return user?.currentOrganization?.billing?.subscription?.plan?.id === 'free';
}

export function userCanStartFreeTrial(user) {
  return Boolean(user?.currentOrganization?.billing?.canStartTrial);
}
