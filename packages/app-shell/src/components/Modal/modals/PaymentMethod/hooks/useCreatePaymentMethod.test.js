/* eslint-disable import/order */
import useCreatePaymentMethod from './useCreatePaymentMethod';
import { renderHook, act } from '@testing-library/react-hooks';
// import {
//   useStripe,
//   useElements,
//   CardNumberElement,
// } from '@stripe/react-stripe-js';

const mockCreatePaymentMethod = jest.fn();
const mockConfirmCardSetup = jest.fn();
const mockGetElement = jest.fn();
const paymentMethod = { id: 'FooPaymentMethod' };

jest.mock('@stripe/react-stripe-js', () => ({
  useStripe: () => ({
    createPaymentMethod: mockCreatePaymentMethod,
    confirmCardSetup: mockConfirmCardSetup,
  }),
  useElements: () => ({
    getElement: mockGetElement,
  }),
  CardNumberElement: {},
}));

describe.skip('useCreatePaymentMethod', () => {
  const setupIntent = 'fooSetupIntent';
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('submit', () => {
    it('set processing to true', async () => {
      const { result } = renderHook(() => useCreatePaymentMethod(setupIntent));
      act(() => {
        result.current.submit();
      });
      await expect(result.current.processing).toBeTruthy();
    });
  });

  describe('stripe', () => {
    it('call stripe.createPaymentMethod with card element', async () => {
      const { result } = renderHook(() => useCreatePaymentMethod(setupIntent));
      act(() => {
        result.current.submit();
      });
      await expect(mockGetElement).toHaveBeenCalled();
      await expect(mockCreatePaymentMethod).toHaveBeenCalled();
    });

    it('call stripe.confirmCardSetup after createPaymentMethod', async () => {
      const { result } = renderHook(() => useCreatePaymentMethod(setupIntent));
      mockCreatePaymentMethod.mockResolvedValue({
        paymentMethod,
      });

      act(() => {
        // eslint-disable-next-line no-underscore-dangle
        result.current._confirmCardSetup({ paymentMethod });
      });

      await expect(mockConfirmCardSetup).toHaveBeenCalledWith(
        setupIntent,
        expect.objectContaining({
          payment_method: paymentMethod.id,
        })
      );
    });

    it('return paymentMethodError', async () => {
      const { result } = renderHook(() => useCreatePaymentMethod(setupIntent));
      mockConfirmCardSetup.mockResolvedValue({
        paymentMethod,
      });

      act(() => {
        // eslint-disable-next-line no-underscore-dangle
        result.current._confirmCardSetup({ error: 'fooBarError' });
      });

      await expect(result.current.error).toEqual('fooBarError');
    });
  });
});
