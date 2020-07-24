import React from 'react';
import '../../css/login.css'
import {withUser} from '../../utils/hoc';
import{LeftOutlined } from '@ant-design/icons'
class Login extends React.Component{
  constructor(){
    super();
    this.goto=this.goto.bind(this)
  }
   goto(add){
    this. props.history.push(add)
   }
   
    render(){
        return (
            <div>
            <div className="top">
                <LeftOutlined className="left" onClick={this.goto.bind(null,'/mine')}/>
                <div className="h-mid">会员登录</div>
            </div>
            <div className="login">
           <dl>
               <dt>用户名:</dt>
               <dd><input type="text" name="username" placeholder="请输入用户名"></input></dd>
           </dl>
           <dl style={{ marginTop:'15px'}}>
                                <dt>密码：</dt>
								<dd><input type="password" name="password" placeholder="密码"></input></dd>
                                </dl>
                                <button onClick={this.goto.bind(null,'/mine')}>登录</button>
            </div>
            <div className="ng-foot">
              <div className="ng-cookie-area">
                <label className="bf1 login_ffri">
										<input type="checkbox" name="remember"  ></input> &nbsp;自动登录 
									</label>
              </div>
              <div className="ng-link-area">
                <span style= {{marginRight:'5px', borderRight:'1px solid #eeeeee'}}>
                  <a onClick={this.goto.bind(null,'/reg')}>免费注册</a>
                </span>
                 <span className="user_line"></span>
                   <span>
                  <a href="findPwd.php">忘记密码？</a>
                </span>
              </div>
              <div className="third-area ">
                
            <div className="pic"><img src={require('./images/loginpic5_02.png')}></img></div>  
              </div>
              </div>
            </div>
        )
    }
}

Login = withUser(Login); // Home得到的是高阶组件中的OuterComponent

export default Login;