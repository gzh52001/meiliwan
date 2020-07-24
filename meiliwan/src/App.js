import React from 'react';
import {Route,Redirect,Switch,withRouter} from 'react-router-dom';
import { HomeOutlined, EnvironmentOutlined, BarsOutlined,ShoppingCartOutlined,UserOutlined } from '@ant-design/icons'; 
import './App.css';
import {withUser} from './utils/hoc'

import Home from './pages/home';
import Reg from './pages/reg';
import Login from './pages/login';
import Cart from './pages/cart';
import Sort from './pages/sort';
import Mine from './pages/mine';
import Goodslist from './pages/goodslist';
// import Good from './pages/good';
import Kefu from './pages/kefu';
import Detail from './pages/Detail'
import { connect } from 'react-redux'
function App(props) {
  const menu = [{
    text: '首页',
    path: '/home',
    icon:<HomeOutlined style={{ fontSize: '20px' }}/>
  }, {
    text: '客服',
    path: '/kefu',
    icon:<EnvironmentOutlined style={{ fontSize: '20px' }}/>
  },{
    text:'分类',
    path:'/sort',
    icon:<BarsOutlined style={{ fontSize: '20px' }}/>
  },{
    text:'购物车',
    path:'/cart',
    icon:<ShoppingCartOutlined style={{ fontSize: '20px' }}/>
  },{
    text:'我的',
    path:'/mine',
    icon:<UserOutlined style={{ fontSize: '20px' }}/>
  }];
  const goto = (path)=>{
    props.history.push(path);
  }
  return ( 
    <div className = "App" >
      {/* <nav className = "">
        <ul>
        {
          menu.map(item=>(
          <li key={item.path} onClick={goto.bind(null,item.path)}><a>{item.icon}<span>{item.text}</span></a></li>))
        }
        </ul>
      </nav> */}
      <Switch>
          <Route path='/home' component={Home} />
          <Route path='/reg' component={Reg} />
          <Route path='/login' component={Login} />
          <Route path='/cart' component={Cart} />
          <Route path='/sort' component={Sort} />
          <Route path='/goodslist' component={Goodslist} />
          <Route path='/mine' component={Mine} />
          <Route path='/kefu' component={Kefu} />
          {/* <Route path='/goods/:id' component={Good} /> */}
          <Route path='/detail/:id' component={Detail}></Route>
          <Redirect from='/' to='/home' exact />
        </Switch>
    </div>
  );
}
const mapStateToProps = (state) => {
  // console.log("state",state)
  return {
      cartlist: state.cartlist
  }
}

App = connect(mapStateToProps)(App)
App = withRouter(App); // 传入App组件，返回一个新的组件
App = withUser(App)
export default App;