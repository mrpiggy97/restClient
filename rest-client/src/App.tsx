import React from 'react';
import { Routes,Route } from 'react-router-dom';
import './App.css';

import HeaderView from './views/HeaderView';
import ChatView from './views/ChatView';
import LoginView from './views/LoginView';
import { useAppSelector } from './store/Selector';

function Home(){
  const userIsAuthenticated : boolean = useAppSelector((state) => state.authentication.authenticated)
  if(userIsAuthenticated){
    return (
      <ChatView/>
    )
  }
  return(
    <LoginView/>
  )
}

function App() {
  return (
    <div id="app">
        <HeaderView/>
        <Routes>
          <Route path='/' element={Home()}/>
          <Route path="/login" element={<LoginView/>}/>
          <Route path='/chat' element={<ChatView/>}/>
        </Routes>
    </div>
  );
}

export default App;
