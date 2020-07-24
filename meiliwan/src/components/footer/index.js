import React from 'react';
import './index.css';
import {withUser} from '../../utils/hoc';

class Footer extends React.Component{
    render(){
        
        return (
            <div className = "footer">
                <div className="links" id="ECS_MEMBERZONE">           
                    <a href="user.php">
                        <span>用户7246657864</span>
                    </a>
                    <a href="user.php?act=logout">
                        <span>退出</span>
                    </a>
                    <a href="javascript:window.scrollTo(0,0);">
                        <span>回顶部</span>
                    </a>
                </div>
                <ul className="linkss">
                    <li>
                        <a href="#">
                            <i className="footerimg_1"></i>
                            <span>客户端</span></a>
                    </li>
                    <li>
                        <a href="javascript:;">
                            <i className="footerimg_2"></i>
                            <span className="gl">触屏版</span>
                        </a>
                    </li>
                    <li>
                        <a href="index.php?is_c=1" className="goDesktop">
                            <i className="footerimg_3"></i>
                            <span>电脑版</span>
                        </a>
                    </li>
                </ul>
                <p className="mf_o4">© 2005-2020 美丽湾 版权所有，并保留所有权利。</p>
            </div>
        )
    }
}

Footer = withUser(Footer); // Home得到的是高阶组件中的OuterComponent

export default Footer;