import React from 'react';
import './index.css';
import {withRouter} from 'react-router-dom'
import {withUser} from '../../utils/hoc';

function Life (props){
    const  menu1 = [{
        text: '成人床垫',
        id:5,
        path: '/Goodslist'
      }, {
        text: '婴儿床垫',
        id:6,
        path: '/Goodslist'
      }];
    const menu2 = [{
        text:'U形枕',
        id:7,
        path: '/Goodslist'
      },{
        text:'椭圆枕',
        id:8,
        path: '/Goodslist'
      },{
        text:'婴儿枕',
        id:9,
        path: '/Goodslist'
      },{
        text:'波浪枕',
        id:10,
        path: '/Goodslist'
      },{
        text:'抱枕',
        id:11,
        path: '/Goodslist'
      }];
    const menu3 = [{
        text:'坐垫',
        id:12,
        path: '/Goodslist'
      },{
        text:'靠垫',
        id:13,
        path: '/Goodslist'
      }]
   const goto = (path)=>{
           console.log(props);
        // this.props.history.push(path);
        props.history.push(path);
      };
        
        return (
            <div className = "life">
                <div className = "box">
                    <span>
                        <a onClick={goto.bind(null,'/Goodslist')}>
                            <em>全部&gt;&gt;</em>
                        </a> 
		            </span>
                    <dt><a href="category.php?id=372">床垫</a></dt> 
                    <dd> 
                        <div className="fenimg">

                        {
                            menu1.map(item=>(
                                <li className = "fen" key={item.path} onClick={goto.bind(null,item.path)}><a>{item.text}</a></li>))
                        } 

                        </div>

                    </dd>

                    <dt><a href="category.php?id=373">枕头</a></dt> 
                    <dd> 
                        <div className="fenimg">

                        {
                            menu2.map(item=>(
                                <li className = "fen" key={item.path} onClick={goto.bind(null,item.path)}><a>{item.text}</a></li>))
                        }   

                        </div>

                    </dd>

                    <dt><a href="category.php?id=374">坐靠垫</a></dt> 
                    <dd> 
                        <div className="fenimg">

                        {
                            menu3.map(item=>(
                                <li className = "fen" key={item.path} onClick={goto.bind(null,item.path)}><a>{item.text}</a></li>))
                        }   

                        </div>

                    </dd>
                </div>
            </div>
        )
    }
Life = withRouter(Life);
Life = withUser(Life); // Home得到的是高阶组件中的OuterComponent

export default Life;
