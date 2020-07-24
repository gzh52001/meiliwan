import React from 'react';
import './index.css';
import {withRouter} from 'react-router-dom'
import {withUser} from '../../utils/hoc';

function Tea (props){
    const menu = [{
        text:'绿茶',
        id:21,
        path: '/Goodslist'
      },{
        text:'养生茶',
        id:22,
        path: '/Goodslist'
      }];
      const goto = (path)=>{
        console.log(props);
     // this.props.history.push(path);
     props.history.push(path);
   };
        return (
            <div className = "tea">
                <div className = "box"> 
        	 
                    <span>
                        <a onClick={goto.bind(null,'/Goodslist')}>
                            <em>全部&gt;&gt;</em>
                        </a>
                    </span>  
                
                    <dt><a href="category.php?id=274">茗茶</a></dt> 
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

Tea = withRouter(Tea);
Tea = withUser(Tea); // Home得到的是高阶组件中的OuterComponent

export default Tea;