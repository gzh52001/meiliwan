import React from 'react';

import {withUser} from '../../utils/hoc';

class Sort extends React.Component{
    render(){
        return (
            <div>
                Sort
            </div>
        )
    }
}

Sort = withUser(Sort); // Home得到的是高阶组件中的OuterComponent

export default Sort;