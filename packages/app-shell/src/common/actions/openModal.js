import { MODALS } from 'common/hooks/useModal';

export function onSuccess(plan, openModal) {
  if (!plan || !openModal) {
    // eslint-disable-next-line no-console
    return console.error('Error: onSuccess - data or openModal is undefined');
  }

  return openModal(MODALS.success, {
    selectedPlan: plan,
    stayedOnSamePlan: true,
  });
}

export function openPaymentMethod(data, openModal) {
  if (!data || !openModal) {
    // eslint-disable-next-line no-console
    return console.error(
      'Error: openPaymentMethod - data or openModal is undefined'
    );
  }

  return openModal(MODALS.paymentMethod, data);
}

export function openPlanSelector(data, openModal) {
  if (!data || !openModal) {
    // eslint-disable-next-line no-console
    return console.error(
      'Error: openPlanSelector - data or openModal is undefined'
    );
  }

  return openModal(MODALS.planSelector, data);
}

export function closeModal(openModal) {
  if (!openModal) {
    // eslint-disable-next-line no-console
    return console.error('Error: closeModal - openModal is undefined');
  }

  return openModal(null);
}
