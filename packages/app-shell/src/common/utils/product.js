export function getProductPriceCycleText(price, cycle) {
  const cycleAbreviation = cycle === 'month' ? 'mo' : 'yr';
  return `$${price}/${cycleAbreviation}`;
}

// used to look into a plans summary details
// and find the string which references users
export function findPlanUserDetails(summaryDetails) {
  const detailsAboutUserLimit = summaryDetails.find((sentence) =>
    sentence.includes('user')
  );

  return detailsAboutUserLimit;
}
