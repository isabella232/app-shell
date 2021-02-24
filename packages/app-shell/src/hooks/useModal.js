import { useState, useEffect, useCallback } from 'react';

export const MODALS = {
  paymentMethod: 'paymentMethod',
  planSelector: 'planSelector',
}

function useModal() {
  const [modal, setModal] = useState(null)

  useEffect(() => {
    const { hash } = window.location
    const matchingModal = Object.keys(MODALS).find(k => k === hash.replace('#', ''))
    if (matchingModal) {
      window.history.pushState({}, '', '');
      setModal(matchingModal)
    }
  }, [])

  const updateModal = useCallback((modalKey) => {
    const matchingModal = Object.keys(MODALS).find(k => k === modalKey)
    if (matchingModal) {
      setModal(matchingModal)
    }
  }, [])

  return { modal, updateModal }
}

export default useModal
