import React from 'react';
import './index.css';
import {withUser} from '../../utils/hoc';

class Furniture extends React.Component{
    render(){
        
        return (
            <div className = "furniture">
                <div className = "box">
        	 
                    <span>
                        <a href="category.php?id=362">
                            <em>全部&gt;&gt;</em>
                        </a>
                    </span>  

                    <dt><a href="category.php?id=377">家具</a></dt> 
                    <dd> 
                        <div className="fenimg">

                            <div className="fen">
                                <a href="category.php?id=408">桌</a> 
                            </div>  
            
            
                            <div className="fen">
                                <a href="category.php?id=409">椅凳</a> 
                            </div>  
            
            
                            <div className="fen">
                                <a href="category.php?id=410">沙发</a> 
                            </div>  
            
            
                            <div className="fen">
                                <a href="category.php?id=411">床</a> 
                            </div>  
            
            
                            <div className="fen">
                                <a href="category.php?id=412">茶几</a> 
                            </div>  
            
            
                            <div className="fen">
                                <a href="category.php?id=414">架子</a> 
                            </div>  
            
            
                            <div className="fen">
                                <a href="category.php?id=413">柜子</a> 
                            </div>  
            
                        </div>
            
                    </dd>
                </div> 
            </div>
        )
    }
}

Furniture = withUser(Furniture); // Home得到的是高阶组件中的OuterComponent

export default Furniture;