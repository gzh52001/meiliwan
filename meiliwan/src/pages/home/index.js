import React from 'react';

import {withUser} from '../../utils/hoc';

class Home extends React.Component{
    render(){
        return (
            <div>
                Home
            </div>
        )
    }
}

Home = withUser(Home); // Home得到的是高阶组件中的OuterComponent

export default Home;