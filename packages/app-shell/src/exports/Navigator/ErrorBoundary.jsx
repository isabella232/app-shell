import React from 'react';
import Bugsnag from '@bugsnag/js';
import BugsnagPluginReact from '@bugsnag/plugin-react';

Bugsnag.start({
  apiKey: '9edffce18cc87b968f0fcb654c020b65',
  plugins: [new BugsnagPluginReact()],
  releaseStage: process.env.NODE_ENV,
  enabledReleaseStages: ['production', 'staging'],
});

const ErrorBoundary = Bugsnag.getPlugin('react').createErrorBoundary(React);

export default ErrorBoundary;
