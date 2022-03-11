import React, { useEffect } from 'react';
import styled from 'styled-components';

const StyledApp = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1 1 0%;
  overflow: auto;
  height: 100%;
`;

const Portal = styled.div`
  display: flex;
  background-color: #ffefc0;
  align-items: center;
  justify-content: space-around;
  flex: 1;
  overflow: auto;
  padding: 36px;
  border: 6px solid #decd9c;

  &:before {
    content: "#components_container";
    font-size: 64px;
    font-weight: bold;
    color: #decd9c;
    position: fixed;
  }
`;

const Wrapper = styled.div`
  align-items: center;
  flex: 1;
  overflow: auto;
  padding: 36px;
`;

const ModalTesting = () => {
  return (
    <Wrapper>
      <h3>Render Plan Selector</h3>
      <button
        onClick={() => {
          const { MODALS, actions } = window?.appshell || {};
          actions.openModal(MODALS.planSelector, {
            cta: 'renderModal',
            ctaButton: 'renderModal',
            isUpgradeIntent: false,
          });
        }}
      >
        Render Modal
      </button>

      <h3>Paid Migration Flow</h3>
      <button
        onClick={() => {
          const { MODALS, actions } = window?.appshell || {};
          actions.openModal(MODALS.paidMigration, {
            cta: 'renderModal',
            ctaButton: 'renderModal',
            isUpgradeIntent: false,
          });
        }}
      >
        Render Modal
      </button>

      <h3>Render Quantity Update</h3>
      <button
        onClick={() => {
          const { MODALS, actions } = window?.appshell || {};
          actions.openModal(MODALS.quantityUpdate, {
            cta: 'renderModal',
            ctaButton: 'renderModal',
            isUpgradeIntent: false,
          });
        }}
      >
        Render Modal
      </button>
      <h3>Render Component with Orchestrator</h3>
      <button
        onClick={() => {
          const { COMPONENTS, actions } = window?.appshell || {};
          actions.renderComponent({
            componentKey: COMPONENTS.startTrialButton,
            containerId: 'components_container',
            options: {
              cta: 'orchestrator_trial',
              ctaButton: 'orchestrator_button'
            }
          })
        }}
      >
        Render Start Trial Button
      </button>
    </Wrapper>
  );
};

const App = () => {
  function handleOrgSwitch(e) {
    console.log(e.detail);
  }

  useEffect(() => {
    const { ORGANIZATION_EVENT_KEY } = window.appshell?.eventKeys || {};
    console.log('ORGANIZATION_EVENT_KEY', ORGANIZATION_EVENT_KEY);

    window.addEventListener(ORGANIZATION_EVENT_KEY, handleOrgSwitch);

    return function cleanup() {
      window.removeEventListener(ORGANIZATION_EVENT_KEY, handleOrgSwitch);
    };
  }, []);

  return (
    <StyledApp>
      <ModalTesting />
      <Portal id="components_container" />
    </StyledApp>
  );
};

export default App;
