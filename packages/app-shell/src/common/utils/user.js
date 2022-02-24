export function isFreeUser(user) {
  return user?.currentOrganization?.billing?.subscription?.plan?.id === 'free';
}

export function isAgencyUser(user) {
  return (
    user?.currentOrganization?.billing?.subscription?.plan?.id === 'agency'
  );
}

export function userCanStartFreeTrial(user) {
  return Boolean(user?.currentOrganization?.billing?.canStartTrial);
}

export function isOnAgencyTrial(user) {
  const isOnAgencyPlan = isAgencyUser(user);
  if (isOnAgencyPlan) {
    return user?.currentOrganization?.billing?.subscription?.trial?.isActive;
  }

  return false;
}
