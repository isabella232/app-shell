import { renderHook, act } from '@testing-library/react-hooks';
import useCreatePaymentMethod from './useCreatePaymentMethod';

const mockCreatePaymentMethod = jest.fn(() => Promise.resolve());
const mockConfirmCardSetup = jest.fn(() => Promise.resolve());
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

describe('useCreatePaymentMethod', () => {
  const setupIntent = 'fooSetupIntent';
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('submit', () => {
    const { result } = renderHook(() => useCreatePaymentMethod(setupIntent));
    it('set processing to true', async () => {
      mockConfirmCardSetup.mockResolvedValue({
        paymentMethod,
        error: new Error('whoops'),
      });
      mockCreatePaymentMethod.mockResolvedValue({
        paymentMethod,
        error: null,
      });
      act(() => {
        result.current.submit();
      });
      await expect(result.current.processing).toBeTruthy();
    });
  });

  describe('stripe', () => {
    it('call stripe.createPaymentMethod with card element', async () => {
      const { result } = renderHook(() => useCreatePaymentMethod(setupIntent));
      mockCreatePaymentMethod.mockResolvedValue({
        paymentMethod,
        error: new Error('whoops'),
      });
      mockCreatePaymentMethod.mockResolvedValue({
        paymentMethod,
        error: new Error('whoops'),
      });
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
        error: null,
      });
      mockConfirmCardSetup.mockResolvedValue({
        paymentMethod,
        error: null,
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
        error: new Error('whoops'),
      });
      mockCreatePaymentMethod.mockResolvedValue({
        paymentMethod,
        error: null,
      });

      act(() => {
        // eslint-disable-next-line no-underscore-dangle
        result.current._confirmCardSetup({ error: 'fooBarError' });
      });

      await expect(result.current.error).toEqual('fooBarError');
    });
  });
});
