import { useState, useEffect, useCallback } from 'react';

import eventDispatcher from './utils/eventDispatcher'

export const MODALS = {
  paymentMethod: 'paymentMethod',
  planSelector: 'planSelector',
  success: 'success',
  startTrial: 'startTrial',
  paidMigration: 'paidMigration',
}

export const EVENT_KEY = 'appshell__modal_event'

export const ACTIONS = {
  openModal(modalKey, modalData = null){
    eventDispatcher(
      EVENT_KEY,
      { modal: modalKey, data: modalData }
    )
  }
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

  useEffect(() => {
    window.addEventListener(EVENT_KEY, (e) => {
      const { modal:modalKey, data:modalData } = e.detail
      openModal(modalKey, modalData)
    })
  })

  return {
    data,
    modal,
    openModal,
  }
}

export default useModal
