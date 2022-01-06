import { renderHook, act } from '@testing-library/react-hooks';
import useInterval from './useInterval';

const user = {
  featureFlips: ['featureFlips'],
};

describe('useInterval', () => {
  it("should set the current plan's interval as the initial interval", () => {
    const planOptions = [
      { planId: 'free', planInterval: 'month', isCurrentPlan: true },
      { planId: 'team', planInterval: 'month', isCurrentPlan: false },
      { planId: 'team', planInterval: 'year', isCurrentPlan: false },
    ];
    const isFreePlan = false;

    const { result } = renderHook(() =>
      useInterval(planOptions, isFreePlan, user)
    );

    expect(result.current.monthlyBilling).toBe(true);
  });
  it("should set the initial interval to year if it's a free plan", () => {
    const planOptions = [
      { planId: 'free', planInterval: 'month', isCurrentPlan: true },
      { planId: 'essentials', planInterval: 'month', isCurrentPlan: false },
      { planId: 'team', planInterval: 'month', isCurrentPlan: false },
    ];

    const isFreePlan = true;

    const { result } = renderHook(() =>
      useInterval(planOptions, isFreePlan, user)
    );

    expect(result.current.monthlyBilling).toBeFalsy();
  });
  it('should change the current interval when updated', () => {
    const planOptions = [
      { planId: 'free', planInterval: 'month', isCurrentPlan: true },
      { planId: 'team', planInterval: 'month', isCurrentPlan: false },
      { planId: 'team', planInterval: 'year', isCurrentPlan: false },
    ];
    const isFreePlan = false;

    const { result } = renderHook(() =>
      useInterval(planOptions, isFreePlan, user)
    );
    act(() => {
      result.current.setBillingInterval(!result.current.monthlyBilling);
    });
    expect(result.current.monthlyBilling).toBe(false);
  });
});
