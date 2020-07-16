import React from 'react';
import './index.css';
import {withUser} from '../../utils/hoc';

class Tea extends React.Component{
    render(){
        
        return (
            <div className = "tea">
                <div className = "box"> 
        	 
                    <span>
                        <a href="category.php?id=7">
                            <em>全部&gt;&gt;</em>
                        </a>
                    </span>  
                
                    <dt><a href="category.php?id=274">茗茶</a></dt> 
                    <dd> 
                        <div className="fenimg">
                 
                            <div className="fen">
                                <a href="category.php?id=301">绿茶</a> 
                            </div>  
       
          
                            <div className="fen">
                                <a href="category.php?id=304">养生茶</a> 
                            </div>  
       
                        </div>
          
                    </dd>
                </div>
            </div>
        )
    }
}

Tea = withUser(Tea); // Home得到的是高阶组件中的OuterComponent

export default Tea;