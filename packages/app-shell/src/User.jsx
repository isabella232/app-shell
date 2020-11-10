import React from 'react';

export const UserContext = React.createContext({
  name: '...',
  email: '...',
  menuItems: [],
  ignoreMenuItems: [],
  products: [],
  featureFlips: [],
});
