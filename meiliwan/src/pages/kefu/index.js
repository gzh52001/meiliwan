import React from 'react';

import {withUser} from '../../utils/hoc';
import Tabbar from "../../components/tabber/tab"
class Kefu extends React.Component{
    render(){
        return (
            <div>
                Kefu
                <Tabbar></Tabbar>
            </div>
        )
    }
}

Kefu = withUser(Kefu); // Home得到的是高阶组件中的OuterComponent

export default Kefu;