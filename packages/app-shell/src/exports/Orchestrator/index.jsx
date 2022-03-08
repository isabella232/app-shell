import React, { useEffect, useState, useCallback, useRef } from 'react';
import ReactDOM from 'react-dom';
import { EVENT_KEY, ACTION_KEYS } from 'common/events/orchestratorEvents';

import { StartTrialButton } from './components/StartTrialButton';

export const COMPONENTS = {
  startTrialButton: 'startTrialButton',
}

export function renderComponent({ componentKey, container, options }) {
  switch (componentKey) {
    case COMPONENTS.startTrialButton:
      return ReactDOM.createPortal(<StartTrialButton options={options} />, container)
    default:
      return null;
  }
}

export const Orchestrator = () => {
  const [components, setComponents] = useState([])
  const componentsRef = useRef()

  componentsRef.current = components

  const handleEvents = useCallback(({ detail }) => {
    if (detail.action === ACTION_KEYS.renderComponent) {
      if (detail?.containerId) {
        setComponents([...componentsRef.current, {
          container: document.getElementById(detail.containerId),
          componentKey: detail.componentKey,
          options: detail.options,
        }])
      }
    }
  }, [])

  useEffect(() => {
    window.addEventListener(EVENT_KEY, handleEvents);

    return function cleanup() {
      window.removeEventListener(EVENT_KEY, handleEvents);
    };
  }, [])

  return (<>
    {components.map( component => renderComponent(component))}
  </>)
}
