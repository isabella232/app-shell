import getTrialBannerCopy from './getTrialBannerCopy';

describe('getTrialBannerCopy', () => {
  it('should the correct trail banner copy', () => {
    expect(getTrialBannerCopy({ planName: 'Essentials + Team Pack', daysRemaining: 1 })).toBe('You are on the Essentials plan with Team pack trial with 1 day left. Add your billing details now to start your subscription.');
    expect(getTrialBannerCopy({ planName: 'Essentials + Team Pack', daysRemaining: 13 })).toBe('You are on the Essentials plan with Team pack trial with 13 days left. Add your billing details now to start your subscription.');
    expect(getTrialBannerCopy({ planName: 'Essentials', daysRemaining: 10 })).toBe('You are on the Essentials plan trial with 10 days left. Add your billing details now to start your subscription.');
    expect(getTrialBannerCopy({ planName: 'Agency', daysRemaining: 10 })).toBe('You are on the Agency plan trial with 10 days left. Add your billing details now to start your subscription.');
    });
});
