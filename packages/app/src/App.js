import React from 'react';

const ModalTesting = () => {
  const { MODALS, actions:modalActions } = window?.appshell?.modal || {};

  return (<>
      <h2>Render Plan Selector</h2>
      <button onClick={() => {modalActions.openModal(MODALS.planSelector, { cta: 'renderModal', ctaButton: 'renderModal', isUpgradeIntent: false })}}>Render Modal</button>
    </>)
}

const App = () => {
  return (
    <div className="App">
      <ModalTesting />
    </div>
  );
}

export default App;
