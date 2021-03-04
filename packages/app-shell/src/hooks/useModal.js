import { useState, useEffect, useCallback } from 'react';

export const MODALS = {
  paymentMethod: 'paymentMethod',
  planSelector: 'planSelector',
  success: 'success',
}

function useModal() {
  const [modal, setModal] = useState(null)
  const [data, setData] = useState(null)

  useEffect(() => {
    const { hash } = window.location
    const matchingModal = Object.keys(MODALS).find(k => k === hash.replace('#', ''))
    if (matchingModal) {
      window.location.hash = '';
      setModal(matchingModal)
    }
  }, [])

  const openModal = useCallback((modalKey, modalData = null) => {
    const matchingModal = Object.keys(MODALS).find(k => k === modalKey)
    if (matchingModal) {
      setModal(matchingModal)
      if (modalData) {
        setData(modalData)
      }
    } else {
      setModal(null)
    }
  }, [])

  return { data, modal, openModal }
}

export default useModal
