import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { ActionCableProvider } from 'react-actioncable-provider'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import rootReducer from './reducers/index'
import { BrowserRouter } from 'react-router-dom'
import thunk from 'redux-thunk'
// import { composeWithDevTools } from 'redux-devtools-extension';

import adapter from './services/adapter'

const store = createStore(
  rootReducer, applyMiddleware(thunk)
)

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <ActionCableProvider url={adapter.webSocket()}>
        <App />
      </ActionCableProvider>
    </Provider>
  </BrowserRouter>
  , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
