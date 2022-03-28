export function getSubscriptionData(billingData) {
  return billingData.subscription;
}

export function getSubscriptionPlanData(billingData) {
  return billingData.subscription.plan;
}

export function getSubscriptionInterval(billingData) {
  return billingData.subscription.interval;
}

export function getBillingChannelSlotDetails(billingData) {
  return billingData.channelSlotDetails;
}
