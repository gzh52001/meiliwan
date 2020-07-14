import React from 'react';

import {withUser} from '../../utils/hoc';

class Kefu extends React.Component{
    render(){
        return (
            <div>
                Kefu
            </div>
        )
    }
}

Kefu = withUser(Kefu); // Home得到的是高阶组件中的OuterComponent

export default Kefu;