import React from 'react';
import './App.css';

import HeaderView from './views/HeaderView';
import AuthView from './views/AuthView';
import ChatView from './views/ChatView';
import { useAppSelector } from './store/selector';

function App() {
  let userIsAuthenticated : boolean = useAppSelector((state) => state.authentication.authenticated)
  console.log(userIsAuthenticated)
  return (
    <div id="app">
        <HeaderView/>
        {userIsAuthenticated ? <ChatView/> : <AuthView/>}
    </div>
  );
}

export default App;
