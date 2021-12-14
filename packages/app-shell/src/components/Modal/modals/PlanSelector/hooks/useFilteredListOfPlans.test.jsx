import { renderHook } from '@testing-library/react-hooks';
import useFilteredListOfPlans from './useFilteredListOfPlans';

const listOfPlanOptions = [
  { planId: 'free', planInterval: 'month', isCurrentPlan: false },
  { planId: 'essentials', planInterval: 'month', isCurrentPlan: false },
  { planId: 'team', planInterval: 'year', isCurrentPlan: true },
];

const listOfFilteredPlanOptions = [
  { planId: 'essentials', planInterval: 'month', isCurrentPlan: false },
  { planId: 'team', planInterval: 'year', isCurrentPlan: true },
];

describe('useFilteredListOfPlans', () => {
  it('should remove all plans which match the passed in value to filter', () => {
    const { result } = renderHook(() =>
      useFilteredListOfPlans(listOfPlanOptions, 'free')
    );

    expect(result.current).toEqual(listOfFilteredPlanOptions);
  });

  it('should return original list if no plans match the passed in value to filter', () => {
    const { result } = renderHook(() =>
      useFilteredListOfPlans(listOfPlanOptions, 'unknown plan')
    );

    expect(result.current).toEqual(listOfPlanOptions);
  });

  it('should return empty array if all plans match the passed in value to filter', () => {
    const { result } = renderHook(() =>
      useFilteredListOfPlans(
        [
          { planId: 'free', planInterval: 'month', isCurrentPlan: false },
          { planId: 'free', planInterval: 'yearly', isCurrentPlan: false },
        ],
        'free'
      )
    );

    expect(result.current).toEqual([]);
  });
});
