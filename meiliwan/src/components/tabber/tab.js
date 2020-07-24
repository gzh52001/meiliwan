import React from 'react'
import { Route, Redirect, Switch, Link, NavLink, withRouter } from 'react-router-dom'
import { HomeOutlined, EnvironmentOutlined, BarsOutlined,ShoppingCartOutlined,UserOutlined } from '@ant-design/icons'; 
// import {withRouter} from "react-router-dom";
class Tabbar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            menu: [{
                text: '首页',
                path: '/home',
                icon: <HomeOutlined style={{ fontSize: '20px' }} />
            }, {
                text: '客服',
                path: '/kefu',
                icon: <EnvironmentOutlined style={{ fontSize: '20px' }} />
            }, {
                text: '分类',
                path: '/sort',
                icon: <BarsOutlined style={{ fontSize: '20px' }} />
            }, {
                text: '购物车',
                path: '/cart',
                icon: <ShoppingCartOutlined style={{ fontSize: '20px' }} />
            }, {
                text: '我的',
                path: '/mine',
                icon: <UserOutlined style={{ fontSize: '20px' }} />
            }]
        }
    }
    goto(path) {
        this.props.history.push(path);
    }
    render() {
        let { menu } = this.state;
        console.log(menu)
        return (<div className = "App">
            <nav className="">
                <ul>
                    {
                        menu.map(item => (
                            <li key={item.path} onClick={this.goto.bind(this, item.path)}>
                                <a>{item.icon}<span>{item.text}</span></a></li>))
                    }
                </ul>
            </nav>

        </div>)
    }
}

export default withRouter(Tabbar);
