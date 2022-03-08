export function getSuggestesPlan(user) {
  const plan = {
    planId: 'team',
    planInterval: 'month',
  }

  if (user) {
    const suggestedPlan = user.currentOrganization?.billing?.changePlanOptions.find((p) => p.isRecommended)
    if (suggestedPlan) {
      return suggestedPlan
    }
  }
  return plan
}
