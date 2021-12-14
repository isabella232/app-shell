import { renderHook } from '@testing-library/react-hooks';
import useFilteredListOfPlans from './useFilteredListOfPlans';
import useDefaultSelectedPlan from './useDefaultSelectedPlan';

jest.mock('./useFilteredListOfPlans');

const listOfFilteredPlanOptions = [
  { planId: 'essentials', planInterval: 'month', isCurrentPlan: false },
  { planId: 'team', planInterval: 'year', isCurrentPlan: true },
];

describe.only('useDefaultSelectedPlan', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should set the default selected plan to the current plan when the current plan is not free', () => {
    const planOptions = [
      { planId: 'free', planInterval: 'month', isCurrentPlan: false },
      ...listOfFilteredPlanOptions,
    ];

    const { result } = renderHook(() => useDefaultSelectedPlan(planOptions));

    expect(result.current).toEqual({
      planId: 'team',
      planInterval: 'year',
      isCurrentPlan: true,
    });
  });

  it.only('should call useFilteredListOfPlans', () => {
    const planOptions = [
      { planId: 'free', planInterval: 'month', isCurrentPlan: true },
      ...listOfFilteredPlanOptions,
    ];

    const isFreePlan = true;

    renderHook(() => useDefaultSelectedPlan(planOptions, isFreePlan));
    expect(useFilteredListOfPlans).toHaveBeenCalledWith(planOptions, 'free');
  });

  it.only("should set the default selected plan to the first plan in list when it's a free plan", () => {
    const planOptions = [
      { planId: 'free', planInterval: 'month', isCurrentPlan: true },
      ...listOfFilteredPlanOptions,
    ];

    useFilteredListOfPlans.mockReturnValue(listOfFilteredPlanOptions);
    const { result } = renderHook(() => useDefaultSelectedPlan(planOptions));

    expect(result.current).toEqual({
      planId: 'essentials',
      planInterval: 'month',
      isCurrentPlan: false,
    });
  });
});
