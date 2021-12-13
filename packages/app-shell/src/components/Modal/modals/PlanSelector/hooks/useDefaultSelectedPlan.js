const useDefaultSelectedPlan = (planOptions, isUpgradeIntent) => {
  const defaultSelectedPlan = isUpgradeIntent
    ? planOptions[1]
    : planOptions.find((plan) => plan.planId === 'essentials');

  return defaultSelectedPlan;
};

export default useDefaultSelectedPlan;
