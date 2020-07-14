import React from 'react';

import {withUser} from '../../utils/hoc';
class Mine extends React.Component{
    render(){
        return (
            <div>
                Mine
            </div>
        )
    }
}

Mine = withUser(Mine); // Home得到的是高阶组件中的OuterComponent

export default Mine;