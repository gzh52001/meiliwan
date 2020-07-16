import React from 'react';
import './index.css';
import {withUser} from '../../utils/hoc';

class Food extends React.Component{
    render(){
        
        return (
            <div className = "food">
                <div className = "box">
                    <span>
                        <a href="category.php?id=363">
                            <em>全部&gt;&gt;</em>
                        </a> 
		            </span>
                    <dt><a href="category.php?id=380">休闲零食</a></dt> 
                    <dd> 
                    <div className="fenimg">
                           </div>

                     </dd>

                    <dt><a href="category.php?id=10">坚果炒货</a></dt> 
                    <dd> 
                    <div className="fenimg">

                               <div className="fen">
                    <a href="category.php?id=39">核桃</a> 
                    </div>  


                               <div className="fen">
                    <a href="category.php?id=41">碧根果</a> 
                    </div>  


                               <div className="fen">
                    <a href="category.php?id=42">开心果</a> 
                    </div>  


                               <div className="fen">
                    <a href="category.php?id=43">腰果</a> 
                    </div>  

                    </div>

                     </dd>
                </div>
            </div>
        )
    }
}

Food = withUser(Food); // Home得到的是高阶组件中的OuterComponent

export default Food;