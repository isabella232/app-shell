import React, { useContext } from 'react';
import AppShell, { UserContext } from '@bufferapp/app-shell';

const AnotherComponentRenderingUserData = () => {
  const user = useContext(UserContext);
  console.log(user);
  return (
    <>
      <h1>Hey there</h1>
      <h2>You are {user.email} with id {user.id} and you have the following feature flips</h2>
      <ul>
        {user.featureFlips.map(flip => <li key={flip}>{flip}</li>)}
      </ul>
    </>
  );
}

const App = () => (
  <div className="App">
    <AppShell
      activeProduct={"publish"}
      content={
        <>
          <AnotherComponentRenderingUserData/>
          <header className="App-header">
            <p>
              Edit <code>src/App.js</code> and save to reload.
            </p>
            <a
              className="App-link"
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn React
            </a>
          </header>
        </>
      }
    >
    </AppShell>
  </div>
);

export default App;
