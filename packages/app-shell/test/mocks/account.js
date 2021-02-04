export const account = {
  id: 'acct-1',
  email: "test@email.com",
  featureFlips: [],
  isImpersonation: false,
  currentOrganization: {
    id: '1',
    name: 'My organization',
    canEdit: true,
    role: 'ADMIN',
    createdAt: '2020-10-11T00:00:00',
  },
  organizations: [{
    id: '1',
    name: 'My organization',
  }, {
    id: '2',
    name: 'My other organization',
  }],
  products: [],
};
