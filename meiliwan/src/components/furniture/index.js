import React from 'react';
import './index.css';
import {withRouter} from 'react-router-dom'
import {withUser} from '../../utils/hoc';

function Furniture (props){
  const  menu = [{
        text: '桌',
        id:14,
        path: '/Goodslist'
      }, {
        text: '椅凳',
        id:15,
        path: '/Goodslist'
      },{
        text:'沙发',
        id:16,
        path: '/Goodslist'
      },{
        text:'床',
        id:17,
        path: '/Goodslist'
      },{
        text:'茶几',
        id:18,
        path: '/Goodslist'
      },{
        text:'架子',
        id:19,
        path: '/Goodslist'
      },{
        text:'柜子',
        id:20,
        path: '/Goodslist'
      }];
     const goto = (path)=>{
           console.log(props);
           props.history.push(path);
      };
        
        return (
            <div className = "furniture">
                <div className = "box">
        	 
                    <span>
                        <a onClick={goto.bind(null,'/Goodslist')}>
                            <em>全部&gt;&gt;</em>
                        </a>
                    </span>  

                    <dt><a href="category.php?id=377">家具</a></dt> 
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

Furniture = withRouter(Furniture)
Furniture = withUser(Furniture); // Home得到的是高阶组件中的OuterComponent

export default Furniture;