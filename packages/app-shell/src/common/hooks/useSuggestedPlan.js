import { useEffect, useState } from 'react';

export function useSuggestedPlan(user) {
  const [suggestedPlan, setSuggestedPlan] = useState(null);

  useEffect(() => {
    if (user) {
      let plan = user.currentOrganization?.billing?.changePlanOptions.find(
        (p) => p.isRecommended
      );
      if (!plan) {
        plan = {
          planId: 'team',
          planInterval: 'month',
        };
      }
      setSuggestedPlan(plan);
    }
  }, [user]);

  return { suggestedPlan };
};
