const useFilteredListOfPlans = (planOptions, planToExclude) => {
  const planOptionsFiltered = planOptions.filter(
    (plan) => plan.planId !== planToExclude
  );

  return planOptionsFiltered;
};

export default useFilteredListOfPlans;
