/* istanbul ignore file */
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import { Provider } from 'react-redux';
import { store } from './app/store';
import Home from './features/Home';

// Wrap the whole app inside the Provider component and pass the store to it to supply the app with this store.
// In this way any data within the store can be found within any component because the application is wrapped by the Provider
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Home />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
