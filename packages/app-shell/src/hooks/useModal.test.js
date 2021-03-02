import useModal, { MODALS } from './useModal'
import { renderHook, act } from '@testing-library/react-hooks'

describe('useModal', () => {
  beforeEach(() => {
      window.history.pushState({}, '', '');
  })

  describe('read modal from hash parameters', () => {
    it('return null if no hash param', () => {
      const { result } = renderHook(() => useModal())
      const { modal } = result.current
      expect(modal).toBeNull()
    })

    it('return a valid modal from hash parameters', () => {

      window.history.pushState({}, '', '#paymentMethod');
      const { result } = renderHook(() => useModal())
      const { modal } = result.current
      expect(modal).toEqual(MODALS.paymentMethod)
    })

    it('return null if hash does not match', () => {

      window.history.pushState({}, '', '#fooBarBaz');
      const { result } = renderHook(() => useModal())
      const { modal } = result.current
      expect(modal).toBeNull()
    })

    it('clean up query parameters after reading the modal', () => {

      window.history.pushState({}, '', '#paymentMethod');
      const { result } = renderHook(() => useModal())
      expect(window.location.hash).toEqual("")
    })
  })

  describe('update the modal', () => {
    it('does not set an undefined modal', () => {
      const { result } = renderHook(() => useModal())
      act(() => {
        result.current.openModal('foo')
      })
      expect(result.current.modal).toBeNull()
    })

    it('set a modal', () => {
      const { result } = renderHook(() => useModal())
      act(() => {
        result.current.openModal(MODALS.planSelector)
      })

      expect(result.current.modal).toEqual(MODALS.planSelector)
    })

    it('set a modal with data', () => {
      const { result } = renderHook(() => useModal())
      const data = { foo: 'bar' }
      act(() => {
        result.current.openModal(MODALS.planSelector, data)
      })

      expect(result.current.data).toEqual(data)
    })
  })
})
