export function getCurrentPlanFromPlanOptions(planOptions) {
  const currentPlan = planOptions.find((plan) => plan.isCurrentPlan);

  if (!currentPlan) {
    // eslint-disable-next-line no-console
    console.warn(
      'Warning: getCurrentPlanFromPlanOptions - currentPlan undefined. Could not find a plan marked as isCurrentPlan '
    );
  }

  return currentPlan;
}
