import React from 'react';

import {withUser} from '../../utils/hoc';

class Login extends React.Component{
    render(){
        return (
            <div>
                Login
            </div>
        )
    }
}

Login = withUser(Login); // Home得到的是高阶组件中的OuterComponent

export default Login;