import React from 'react';
import './index.css';
import {withUser} from '../../utils/hoc';

class Life extends React.Component{
    render(){
        
        return (
            <div className = "life">
                <div className = "box">
                    <span>
                        <a href="category.php?id=363">
                            <em>全部&gt;&gt;</em>
                        </a> 
		            </span>
                    <dt><a href="category.php?id=372">床垫</a></dt> 
                    <dd> 
                        <div className="fenimg">

                            <div className="fen">
                                <a href="category.php?id=394">成人床垫</a> 
                            </div>  


                            <div className="fen">
                                <a href="category.php?id=395">婴儿床垫</a> 
                            </div>  

                        </div>

                    </dd>

                    <dt><a href="category.php?id=373">枕头</a></dt> 
                    <dd> 
                        <div className="fenimg">

                            <div className="fen">
                                <a href="category.php?id=398">U形枕</a> 
                            </div>  


                            <div className="fen">
                                <a href="category.php?id=399">椭圆枕</a> 
                            </div>  


                            <div className="fen">
                                <a href="category.php?id=400">婴儿枕</a> 
                            </div>  


                            <div className="fen">
                                <a href="category.php?id=396">波浪枕</a> 
                            </div>  


                            <div className="fen">
                                <a href="category.php?id=397">抱枕</a> 
                            </div>  

                        </div>

                    </dd>

                    <dt><a href="category.php?id=374">坐靠垫</a></dt> 
                    <dd> 
                        <div className="fenimg">

                            <div className="fen">
                                <a href="category.php?id=401">坐垫</a> 
                            </div>  


                            <div className="fen">
                                <a href="category.php?id=402">靠垫</a> 
                            </div>  

                        </div>

                    </dd>
                </div>
            </div>
        )
    }
}

Life = withUser(Life); // Home得到的是高阶组件中的OuterComponent

export default Life;
