import { getSubscriptionPlanData } from 'common/utils/billing';

export function isFreeUser(user) {
  return user?.currentOrganization?.billing?.subscription?.plan?.id === 'free';
}

export function isAgencyUser(user) {
  if (!user) {
    console.warn(
      'Warning: isAgencyUser - user was undefined. This could lead to unexpected behaviour.'
    );
  }

  return (
    user?.currentOrganization?.billing?.subscription?.plan?.id === 'agency'
  );
}

export function userCanStartFreeTrial(user) {
  return Boolean(user?.currentOrganization?.billing?.canStartTrial);
}

export function isOnActiveTrial(user) {
  return user?.currentOrganization?.billing?.subscription?.trial?.isActive;
}

export function isOnAgencyTrial(user) {
  if (!user) {
    console.warn(
      'Warning: isOnAgencyTrial - user was undefined. This could lead to unexpected behaviour.'
    );
  }

  const isOnAgencyPlan = isAgencyUser(user);
  if (isOnAgencyPlan) {
    return isOnActiveTrial(user);
  }

  return false;
}

export function getUsersCurrentChannelSlotDetails(user) {
  return user.currentOrganization.billing.channelSlotDetails;
}

export function hasPaymentDetails(user) {
  return user.currentOrganization.billing.paymentDetails.hasPaymentDetails;
}

export function getUserBillingData(user) {
  return user.currentOrganization.billing;
}

export function getUsersCurrentPlan(user) {
  const billingData = getUserBillingData(user);

  if (!billingData) {
    // eslint-disable-next-line no-console
    console.warn(
      'Warning: getUsersCurrentPlan - billingData undefined. unable to find users current plan'
    );
    return null;
  }

  return getSubscriptionPlanData(billingData);
}
