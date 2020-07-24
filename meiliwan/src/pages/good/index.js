import React from 'react';

import {withUser} from '../../utils/hoc';
import Tabbar from "../../components/tabber/tab"
class Good extends React.Component{
    render(){
        return (
            <div>
                Good
                <Tabbar></Tabbar>
            </div>
        )
    }
}

Good = withUser(Good); // Home得到的是高阶组件中的OuterComponent

export default Good;