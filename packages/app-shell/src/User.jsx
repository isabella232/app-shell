import React from 'react';

export const UserContext = React.createContext({
  name: '...',
  email: '...',
  products: [],
  featureFlips: [],
  organizations: [],
  currentOrganization: {},
  isImpersonation: false,
});
