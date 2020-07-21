import React from 'react'
import { Route,Redirect,Switch,Link,NavLink,withRouter } from 'react-router-dom'
import Home from './pages/Home';
import Cart from './pages/Cart'
import Classify from './pages/Classify'
import Customer from './pages/Customer';
import Mine from './pages/Mine'
import Detail from './pages/Detail'
import {connect} from 'react-redux'
class App extends React.Component{
    render(){
        console.log("app.props=",this.props)
        return (<div>
            <Switch>
            <Route path='/home' component={Home}></Route>
           <Route path='/cart' component={Cart}></Route>
           <Route path='/classify' component={Classify}></Route>
           <Route path='/mine' component={Mine}></Route>
           <Route path='/customer' component={Customer}></Route>
           <Route path='/detail/:id' component={Detail}></Route>
           {/* <Redirect from='/' to='/home' exact /> */}
           </Switch>
        </div>)
    }
}

const mapStateToProps=(state)=>{
    // console.log("state",state)
    return {
        cartlist:state.cartlist
    }
}

App=connect(mapStateToProps)(App)
export default App;
