import React from 'react';
import ReactDOM from 'react-dom';

import { HashRouter, BrowserRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux'
import  store  from './store/index'
import App from './App';
// process.env.NODE_ENV  会根据是否是编译还是开发环境进行自动选择  build的时候会切换
const Router = process.env.NODE_ENV === 'production' ? BrowserRouter : BrowserRouter;

// const MyContext = React.createContext(null)
ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App>
      </App>
    </Router>
  </Provider>,
  document.getElementById('root')
);


