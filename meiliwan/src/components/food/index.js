import React from 'react';
import './index.css';
import {withRouter} from 'react-router-dom'
import {withUser} from '../../utils/hoc';

function Food (props){
  const  menu = [{
        text: '核桃',
        id:1,
        path: '/Goodslist'
      }, {
        text: '碧根果',
        id:2,
        path: '/Goodslist'
      },{
        text:'开心果',
        id:3,
        path: '/Goodslist'
      },{
        text:'腰果',
        id:4,
        path: '/Goodslist'
      }];
   const goto = (path)=>{
           console.log(props);
        // this.props.history.push(path);
        props.history.push(path);
      };
    
        return (
            <div className = "food">
                <div className = "box">
                    <span>
                        <a onClick={goto.bind(null,'/Goodslist')}>
                            <em>全部&gt;&gt;</em>
                        </a> 
		            </span>
                    <dt><a>休闲零食</a></dt> 
                    <dd> 
                        <div className="fenimg"> </div>
                     </dd>

                    <dt><a>坚果炒货</a></dt> 
                    <dd>
                        <div className="fenimg">
                            {
                                menu.map(item=>(
                                    <li className = "fen" key={item.path} onClick={goto.bind(null,item.path)}><a>{item.text}</a></li>)) 
                            }                    
                         </div>               
                     </dd>
                </div>
            </div>
        )
    }
Food = withRouter(Food);
Food = withUser(Food); // Home得到的是高阶组件中的OuterComponent

export default Food;