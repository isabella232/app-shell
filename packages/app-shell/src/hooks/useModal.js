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
      window.location.hash = '';
      setModal(matchingModal)
    }
  }, [])

  const openModal = useCallback((modalKey) => {
    const matchingModal = Object.keys(MODALS).find(k => k === modalKey)
    if (matchingModal) {
      setModal(matchingModal)
    } else {
      setModal(null)
    }
  }, [])

  return { modal, openModal }
}

export default useModal
