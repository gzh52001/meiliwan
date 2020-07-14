import React from 'react';

import {withUser} from '../../utils/hoc';

class Goodslist extends React.Component{
    render(){
        return (
            <div>
                Goodslist
            </div>
        )
    }
}

Goodslist = withUser(Goodslist); // Home得到的是高阶组件中的OuterComponent

export default Goodslist;