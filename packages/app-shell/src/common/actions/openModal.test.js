import {
  onSuccess,
  openPaymentMethod,
  openPlanSelector,
  closeModal,
} from './openModal';

const openModal = jest.fn();

describe('actions', () => {
  beforeEach(() => {
    openModal.mockReset();
    jest.spyOn(global.console, 'error').mockImplementation(() => {});
  });
  afterEach(() => {
    global.console.error.mockRestore();
  });
  describe('onSuccess', () => {
    it('should call openModal with success and plan', () => {
      const plan = {
        planId: 'team',
        planInterval: 'year',
        isCurrentPlan: true,
      };
      const expectedObjectAgruement = {
        selectedPlan: plan,
        stayedOnSamePlan: true
      };

      onSuccess(plan, openModal);
      expect(openModal).toHaveBeenCalledWith(
        'success',
        expectedObjectAgruement
      );
    });

    it('should log an error when plan is undefined', () => {
      const plan = undefined;
      onSuccess(plan, openModal);
      // eslint-disable-next-line no-console
      expect(console.error).toHaveBeenCalledWith(
        'Error: onSuccess - data or openModal is undefined'
      );
    });

    it('should log an error when openModal is undefined', () => {
      const plan = undefined;
      const undefinedOpenModal = undefined;
      onSuccess(plan, undefinedOpenModal);
      // eslint-disable-next-line no-console
      expect(console.error).toHaveBeenCalledWith(
        'Error: onSuccess - data or openModal is undefined'
      );
    });
  });

  describe('openPaymentMethod', () => {
    it('should call openModal with paymentMethod and data', () => {
      const data = {};

      openPaymentMethod(data, openModal);
      expect(openModal).toHaveBeenCalledWith('paymentMethod', data);
    });

    it('should log an error when data is undefined', () => {
      const data = undefined;
      openPaymentMethod(data, openModal);
      // eslint-disable-next-line no-console
      expect(console.error).toHaveBeenCalledWith(
        'Error: openPaymentMethod - data or openModal is undefined'
      );
    });

    it('should log an error when openModal is undefined', () => {
      const data = undefined;
      const undefinedOpenModal = undefined;
      openPaymentMethod(data, undefinedOpenModal);
      // eslint-disable-next-line no-console
      expect(console.error).toHaveBeenCalledWith(
        'Error: openPaymentMethod - data or openModal is undefined'
      );
    });
  });

  describe('openPlanSelector', () => {
    it('should call openModal with paymentMethod and data', () => {
      const data = {};

      openPlanSelector(data, openModal);
      expect(openModal).toHaveBeenCalledWith('planSelector', data);
    });

    it('should log an error when data is undefined', () => {
      const data = undefined;
      openPlanSelector(data, openModal);
      // eslint-disable-next-line no-console
      expect(console.error).toHaveBeenCalledWith(
        'Error: openPlanSelector - data or openModal is undefined'
      );
    });

    it('should log an error when openModal is undefined', () => {
      const data = undefined;
      const undefinedOpenModal = undefined;
      openPlanSelector(data, undefinedOpenModal);
      // eslint-disable-next-line no-console
      expect(console.error).toHaveBeenCalledWith(
        'Error: openPlanSelector - data or openModal is undefined'
      );
    });
  });

  describe('closeModal', () => {
    it('should call openModal with null', () => {
      closeModal(openModal);
      expect(openModal).toHaveBeenCalledWith(null);
    });

    it('should log an error when openModal is undefined', () => {
      const undefinedOpenModal = undefined;
      closeModal(undefinedOpenModal);
      // eslint-disable-next-line no-console
      expect(console.error).toHaveBeenCalledWith(
        'Error: closeModal - openModal is undefined'
      );
    });
  });
});
