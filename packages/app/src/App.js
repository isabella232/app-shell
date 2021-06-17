import React, { useEffect } from 'react';
import styled from 'styled-components';

const StyledApp = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1 1 0%;
  overflow: auto;
  height: 100%;
`

const Wrapper = styled.div`
  align-items: center;
  flex: 1;
  overflow: auto;
  padding: 36px;
`

const ModalTesting = () => {
  const { MODALS, actions:modalActions } = window?.appshell?.modal || {};

  return (<Wrapper>
      <h3>Render Plan Selector</h3>
      <button onClick={() => {modalActions.openModal(MODALS.planSelector, { cta: 'renderModal', ctaButton: 'renderModal', isUpgradeIntent: false })}}>Render Modal</button>
    </Wrapper>)
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
    <StyledApp>
      <ModalTesting />
    </StyledApp>
  );
}

export default App;
