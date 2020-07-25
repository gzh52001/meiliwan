import React from 'react';
import {Route,Redirect,Switch,withRouter} from 'react-router-dom';
import './index.css';
import {withUser} from '../../utils/hoc';
import Food from '../../components/food';
import Life from '../../components/life';
import Furniture from '../../components/furniture';
import Tea from '../../components/tea';
import Goodslist from '../goodslist'
import Tabbar from "../../components/tabber/tab"
function Sort(props){
        const menu = [{
            text: '休闲食品',
            path: '/sort/food',
          }, {
            text: '家居生活',
            path: '/sort/life',
          },{
            text:'红木文博',
            path:'/sort/furniture',
          },{
            text:'茶酒冲饮',
            path:'/sort/tea',
          }];
          const goto = (path)=>{
            props.history.push(path);
          };
          
        return (
            <div>
                <div className="category1">
                    <ul className="clearfix" >
                    {
                        menu.map(item=>(
                        <li key={item.path} onClick={goto.bind(null,item.path)}><a>{item.text}</a></li>))
                    }
                    </ul>
                </div>
                <Switch>
                  <Route path='/sort/food' component={Food} />
                  <Route path='/sort/life' component={Life} />
                  <Route path='/sort/furniture' component={Furniture} />
                  <Route path='/sort/tea' component={Tea} />
                  <Route path='/goodslist' component={Goodslist} />
                  <Redirect from='/sort' to='/sort/food' exact />
                </Switch>
                <Tabbar></Tabbar>
            </div>
        )
};
Sort = withRouter(Sort);
Sort = withUser(Sort); // Home得到的是高阶组件中的OuterComponent

export default Sort;