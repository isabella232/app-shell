import React from 'react';
import Bugsnag from '@bugsnag/js';
import BugsnagPluginReact from '@bugsnag/plugin-react';

Bugsnag.start({
  apiKey: '34dc7834c1bea7ec57f9c365a12eb779',
  plugins: [new BugsnagPluginReact()],
  releaseStage: process.env.NODE_ENV,
  enabledReleaseStages: ['production', 'staging'],
});

const ErrorBoundary = Bugsnag.getPlugin('react').createErrorBoundary(React);

export default ErrorBoundary;
