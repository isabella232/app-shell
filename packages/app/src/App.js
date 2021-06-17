import React, { useEffect } from 'react';

const ModalTesting = () => {
  const { MODALS, actions:modalActions } = window?.appshell?.modal || {};

  return (<>
      <h2>Render Plan Selector</h2>
      <button onClick={() => {modalActions.openModal(MODALS.planSelector, { cta: 'renderModal', ctaButton: 'renderModal', isUpgradeIntent: false })}}>Render Modal</button>
    </>)
}

const App = () => {

  function handleOrgSwitch(e) {
    console.log(e.detail);
  }

  useEffect(() => {
    const { eventKey:organizationEventKey } = window?.appshell?.organization || {};

    window.addEventListener(organizationEventKey, handleOrgSwitch)

    return function cleanup() {
      window.removeEventListener(organizationEventKey, handleOrgSwitch)
    };
  }, [])

  return (
    <div className="App">
      <ModalTesting />
    </div>
  );
}

export default App;
