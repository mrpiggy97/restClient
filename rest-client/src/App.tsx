import React from 'react';
import { useSelector } from 'react-redux';
import './App.css';

import HeaderView from './views/HeaderView';
import ChatView from './views/ChatView';
import LoginView from './views/LoginView';
import {AppState} from "./store/reducer"

function App() {
  const userIsAuthenticated : boolean = useSelector((state : AppState) => state.Authenticated)
  return (
    <div id="app">
        <HeaderView/>
        {userIsAuthenticated ? <ChatView/> : <LoginView/>}
    </div>
  );
}

export default App;
