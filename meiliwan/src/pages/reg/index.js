import React from 'react';

import {withUser} from '../../utils/hoc';

class Reg extends React.Component{
    render(){
        return (
            <div>
                Reg
            </div>
        )
    }
}

Reg = withUser(Reg); // Home得到的是高阶组件中的OuterComponent

export default Reg;