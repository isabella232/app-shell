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

export function useUser() {
  const user = React.useContext(UserContext);
  if (user === undefined) {
    throw new Error('useUser must be used within a UserContext.Provider');
  }

  return user;
}
