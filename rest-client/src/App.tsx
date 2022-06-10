import React from 'react';
import './App.css';

import HeaderView from './views/HeaderView';
import ChatView from './views/ChatView';
import LoginView from './views/LoginView';
import { useAppSelector } from './store/selector';

function App() {
  let userIsAuthenticated : boolean = useAppSelector((state) => state.authentication.authenticated)
  return (
    <div id="app">
        <HeaderView/>
        {userIsAuthenticated ? <ChatView/> : <LoginView/>}
    </div>
  );
}

export default App;
