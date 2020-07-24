import React from 'react';
import '../../css/reg.css'
import {withUser} from '../../utils/hoc';
import{LeftOutlined } from '@ant-design/icons'

class Reg extends React.Component{
	
	constructor(){
		super();
		this.goto=this.goto.bind(this)
	}
	goto(addr){
		this.props.history.push(addr)
	}
    render(){
        return (
            <div>
            <div className="top">
                <LeftOutlined className="left" onClick={this.goto.bind(null,'/login')}/>
                <div className="h-mid">用户注册</div>
            </div>
            <div className="reg">
            <form action="register.php" id="mobileForm" name="mobileForm" method="post">
						
					
								<div className="field phone">
									<input type="text" id="mobile_phone" name="mobile_phone" placeholder="手机号" className="c-form-txt-normal" 
									/>
									<div className="tips">
										<span id="mobile_phone_notice"></span>
									</div>
								</div>
								<div className="field pwd">
									<input type="password" id="password" name="password" placeholder="密码" className="c-form-txt-normal" />
									<div className="tips">
										<span id="password_notice"></span>
									</div>
								</div>
								<div className="field pwd">
									<input type="password" id="confirm_password" name="confirm_password" placeholder="确认密码" className="c-form-txt-normal" />
									<div className="tips">
										<span id="confirm_password_notice"></span>
									</div>
								</div>
																
                              
								<input type="submit" id="btn_submit" name="Submit" className="btn_big1" value="注 册" onClick={this.goto.bind(null,'/login')}/>
									
						</form>
                        <div><img src={require('./regpic.png')}></img></div>
            </div>
            </div>
        )
    }
}

Reg = withUser(Reg); // Home得到的是高阶组件中的OuterComponent

export default Reg;