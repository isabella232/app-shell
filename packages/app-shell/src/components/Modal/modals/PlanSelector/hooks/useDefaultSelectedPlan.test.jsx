import { renderHook } from '@testing-library/react-hooks';
import useFilteredListOfPlans from './useFilteredListOfPlans';
import useDefaultSelectedPlan from './useDefaultSelectedPlan';

jest.mock('./useFilteredListOfPlans');

const listOfFilteredPlanOptions = [
  { planId: 'essentials', planInterval: 'month', isCurrentPlan: false },
  { planId: 'team', planInterval: 'year', isCurrentPlan: true },
];

// TODO:REMOVE_WITH_FF:agencyPlan
const user = {
  featureFlips: ['agencyPlan'],
};

describe('useDefaultSelectedPlan', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should set the default selected plan to the current plan when the current plan is not free', () => {
    const planOptions = [
      { planId: 'free', planInterval: 'month', isCurrentPlan: false },
      ...listOfFilteredPlanOptions,
    ];

    const { result } = renderHook(() =>
      useDefaultSelectedPlan(planOptions, user)
    );

    expect(result.current).toEqual({
      planId: 'team',
      planInterval: 'year',
      isCurrentPlan: true,
    });
  });

  it('should call useFilteredListOfPlans', () => {
    const planOptions = [
      { planId: 'free', planInterval: 'month', isCurrentPlan: true },
      ...listOfFilteredPlanOptions,
    ];

    renderHook(() => useDefaultSelectedPlan(planOptions, user));
    expect(useFilteredListOfPlans).toHaveBeenCalledWith(planOptions, 'free');
  });

  it("should set the default selected plan to the first plan in list when it's a free plan", () => {
    const planOptions = [
      { planId: 'free', planInterval: 'month', isCurrentPlan: true },
      ...listOfFilteredPlanOptions,
    ];

    useFilteredListOfPlans.mockReturnValue(listOfFilteredPlanOptions);
    const { result } = renderHook(() =>
      useDefaultSelectedPlan(planOptions, user)
    );

    expect(result.current).toEqual({
      planId: 'essentials',
      planInterval: 'month',
      isCurrentPlan: false,
    });
  });
});
