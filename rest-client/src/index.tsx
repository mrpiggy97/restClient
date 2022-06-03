import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';


import { configureStore,applyMiddleware, ConfigureStoreOptions } from '@reduxjs/toolkit';
import {Provider} from 'react-redux'
import promise from 'redux-promise-middleware';
import Reducer,{AuthReducer} from './store/reducer';

const middlewares = applyMiddleware(promise)

const rootReducer = () => {
  return {
    authentication : Reducer
  }
}

const storeConfig : ConfigureStoreOptions = {
  reducer : AuthReducer,
  enhancers:[middlewares]
}
const store = configureStore(storeConfig)

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={store}>
      <React.Fragment>
        <App />
      </React.Fragment>      
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
