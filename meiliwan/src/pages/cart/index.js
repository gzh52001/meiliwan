import React from 'react';

import {withUser} from '../../utils/hoc';

class Cart extends React.Component{
    render(){
        return (
            <div>
                Cart
            </div>
        )
    }
}

Cart = withUser(Cart); // Home得到的是高阶组件中的OuterComponent

export default Cart;