export function getProductPriceCycleText(price, cycle) {
  const cycleAbreviation = cycle === 'month' ? 'mo' : 'yr';
  return `$${price}/${cycleAbreviation}`;
}
