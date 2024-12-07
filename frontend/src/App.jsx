// import React from 'react';
import Login from './components/Login';
import Dashboard from './components/Dashboard';

function App() {
  const token = new URLSearchParams(window.location.search).get('token');

  return <>{token ? <Dashboard /> : <Login />}</>;
}

export default App;
