import React, { useEffect, useState } from 'react';
import Button from '@bufferapp/ui/Button';

import useStartTrial from 'common/hooks/useStartTrial';
import { getSuggestedPlan } from 'utils/getSuggestedPlan';
import { useUser } from 'common/context/User';
import { ModalContext } from 'common/context/Modal';
import { MODALS } from 'common/hooks/useModal';
import { Error } from '../../../components/Modal/modals/PaymentMethod/style';

export const CTA = ({ options, openModal }) => {
  const [modalOpened, setModalOpened] = useState(false)
  const user = useUser()
  const suggestedPlan = getSuggestedPlan(user);
  const { cta } = options || {}

  const { startTrial, trial, error, processing } = useStartTrial({
    user,
    plan: suggestedPlan,
    attribution: { cta },
  })

  useEffect(() => {
    if (trial && trial.billingStartTrial.success && !modalOpened) {
      openModal(MODALS.success, {
        startedTrial: true,
        selectedPlan: suggestedPlan,
      })
      setModalOpened(true)
    }
  }, [trial])

  return (<>
    <Button
    type="primary"
    disabled={!suggestedPlan || processing}
    onClick={() => {
      startTrial();
    }}
    label={processing ? 'Processing ...' : 'Start a 14-day Free Trial'}
    />
    <Error
      error={
        error
          ? {
              message: error.message,
            }
          : null
      }
    />
    </>)
}

export const StartTrialButton = ({ options }) => (<ModalContext.Consumer>
  {({ openModal }) => (
    <CTA options={options} openModal={openModal} />
  )}
</ModalContext.Consumer>)
