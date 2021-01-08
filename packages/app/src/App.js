import React, { useContext } from 'react';
import AppShell, { UserContext, useOrgSwitcher } from '@bufferapp/app-shell';

const AnotherComponentRenderingUserData = () => {
  const user = useContext(UserContext);
  const switchOrganization = useOrgSwitcher()
  return (
    <>
      <h2>You are {user.email} with id {user.id} and you have the following feature flips</h2>
      <ul>
        {user.featureFlips.map(flip => <li key={flip}>{flip}</li>)}
      </ul>
      {user.currentOrganization &&
        <h3>You also have selected the organization named {user.currentOrganization.name}</h3>
      }
      {user.organizations.map(organization => <button onClick={() => switchOrganization(organization.id)}>Select organization {organization.name}</button>)}
    </>
  );
}

const App = () => (
  <div className="App">
    <AppShell
      activeProduct={"publish"}
      onOrganizationSelected={console.info}
      content={
        <>
          <AnotherComponentRenderingUserData/>
        </>
      }
    >
    </AppShell>
  </div>
);

export default App;
