import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, BrowserRouter, } from 'react-router-dom'
import './index.css';
import App from './App';
import { Provider } from 'react-redux'
import  store  from './store/index'
const Router = process.env.NODE_ENV === 'production' ? BrowserRouter : HashRouter;

ReactDOM.render(
  <Provider store={store}>
    <Router>
      {/* <React.StrictMode> */}
        <App />
      {/* </React.StrictMode> */}
    </Router>
  </Provider>
  ,
  document.getElementById('root')
);
