import { renderHook, act } from '@testing-library/react-hooks';
import useSelectedPlan from './useSelectedPlan';

const planOptions = [
  { planId: 'essentials', isCurrentPlan: false, planInterval: 'year' },
  { planId: 'team', isCurrentPlan: true, planInterval: 'year' },
  { planId: 'free', planInterval: 'month' },
];

describe('useSelectedPlan', () => {
  it('should set the default as the current plan', () => {
    const { result } = renderHook(() => useSelectedPlan(planOptions));
    expect(result.current.selectedPlan.planId).toBe('team');
  });

  it('should set the default as the essentials plan if the intent is to upgrade', () => {
    const planOptionsForUpgrade = [
      { planId: 'essentials', isCurrentPlan: false, planInterval: 'year' },
      { planId: 'team', isCurrentPlan: false, planInterval: 'year' },
      { planId: 'free', planInterval: 'month' },
    ];
    const { result } = renderHook(() =>
      useSelectedPlan(planOptionsForUpgrade, true)
    );
    expect(result.current.selectedPlan.planId).toBe('essentials');
  });

  it('should update the selected plan', () => {
    const planString = 'essentials_year';

    const { result } = renderHook(() => useSelectedPlan(planOptions));
    act(() => {
      result.current.updateSelectedPlan(planString);
    });
    expect(result.current.selectedPlan.planId).toBe('essentials');
  });

  it('should update the selected plan with a new interval', () => {
    const planString = 'free_month';

    const { result } = renderHook(() => useSelectedPlan(planOptions));
    act(() => {
      result.current.updateSelectedPlan(planString);
    });
    expect(result.current.selectedPlan.planId).toBe('free');
    expect(result.current.selectedPlan.planInterval).toBe('month');
  });
});
