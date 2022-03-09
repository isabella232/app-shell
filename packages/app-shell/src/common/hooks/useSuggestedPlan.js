import { useEffect, useState, useMemo } from 'react';

export function useSuggestedPlan(user) {
  const [suggestedPlan, setSuggestedPlan] = useState(null);
  const memoizedUser = useMemo(() => user, [user?.currentOrganization?.id]);

  useEffect(() => {
    if (memoizedUser) {
      let plan = memoizedUser?.currentOrganization?.billing?.changePlanOptions?.find(
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
  }, [memoizedUser]);

  return { suggestedPlan };
};
