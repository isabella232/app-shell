import { renderHook, act } from '@testing-library/react-hooks';
import useInterval from './useInterval';

const freePlans = [
  { planId: 'free', planInterval: 'month', isCurrentPlan: false },
  { planId: 'free', planInterval: 'year', isCurrentPlan: false },
];
const essentialsPlans = [
  {
    planId: 'essentials',
    planInterval: 'month',
    isCurrentPlan: false,
  },
  {
    planId: 'essentials',
    planInterval: 'year',
    isCurrentPlan: false,
  },
];
const teamPlans = [
  { planId: 'team', planInterval: 'month', isCurrentPlan: false },
  { planId: 'team', planInterval: 'year', isCurrentPlan: false },
];
const agencyPlans = [
  { planId: 'agency', planInterval: 'month', isCurrentPlan: false },
  { planId: 'agency', planInterval: 'year', isCurrentPlan: false },
];

describe('useInterval', () => {
  it("should set the current plan's interval as the initial interval", () => {
    const planOptions = [
      ...freePlans,
      {
        planId: 'essentials',
        planInterval: 'month',
        isCurrentPlan: true,
      },
      {
        planId: 'essentials',
        planInterval: 'year',
        isCurrentPlan: false,
      },
      ...teamPlans,
      ...agencyPlans,
    ];

    const { result } = renderHook(() => useInterval(planOptions));

    expect(result.current.monthlyBilling).toBe(true);
  });

  it("should set the initial interval to year if it's a free plan", () => {
    const planOptions = [
      ...freePlans,
      ...essentialsPlans,
      ...teamPlans,
      ...agencyPlans,
    ];

    const { result } = renderHook(() => useInterval(planOptions));

    expect(result.current.monthlyBilling).toBeFalsy();
  });

  it('should change the current interval when updated', () => {
    const planOptions = [
      ...freePlans,
      {
        planId: 'essentials',
        planInterval: 'month',
        isCurrentPlan: true,
      },
      {
        planId: 'essentials',
        planInterval: 'year',
        isCurrentPlan: false,
      },
      ...teamPlans,
      ...agencyPlans,
    ];

    const { result } = renderHook(() => useInterval(planOptions));
    act(() => {
      result.current.setBillingInterval(!result.current.monthlyBilling);
    });
    expect(result.current.monthlyBilling).toBe(false);
  });
});
