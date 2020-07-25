import React from 'react';
import './index.css'
import {withUser} from '../../utils/hoc';
import Footer from '../../components/footer'
import Tabbar from "../../components/tabber/tab"
class Mine extends React.Component{
    render(){
        return (
            <div>
                <div className="user_com">
                    <div className="com_top">
                        <h2>
                            <a href="user.php?act=profile">设置</a>
                        </h2>
                        <dl>
                            <dt>
                                <img />
                                <span>用户7246657864</span>
                            </dt>
                            <dd></dd>
                        </dl>
                    </div>
                    <div className="uer_topnav">
                        <ul>
                            <li className="bain">
                                <a href="user.php?act=order_list">
                                    <span>0</span>
                                    我的订单
                                </a>
                            </li>
                            <li className="bain">
                                <a href="user.php?">
                                    <span>0</span>
                                    我的收藏
                                </a>
                            </li>
                            <li>
                                <a href="user.php?">
                                    <span>0</span>
                                    我的评价
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div className="Wallet">
                        <ul>
                            <li className="bain1">
                                <strong>0.00</strong>
                                <span>余额</span>
                            </li>
                            <li className="bain1">
                                <strong>0</strong>
                                <span>红包</span>
                            </li>
                            <li>
                                <strong>0</strong>
                                <span>积分</span>
                            </li>
                        </ul>
                        <a href="user.php?">
                            <em className="Icon Icon1">
                            </em>
                            <dl>
                                <dt>我的钱包</dt>
                                <dd style={{ color:"#aaaaaa" }}>查看我的钱包</dd>
                            </dl>
                        </a>
                    </div>


                    <div className="Wallet">
                        <a href="user.php?act=order_list">
                            <em className="Icon Icon2"></em>
                            <dl class="b">
                                <dt>全部订单</dt>
                                <dd>查看订单</dd>
                            </dl>
                        </a>
                        <a href="user.php?act=bonus">
                            <em className="Icon Icon3"></em>
                            <dl className="b">
                                <dt>我的红包</dt>
                                <dd>&nbsp;</dd>
                            </dl>
                        </a>
                        <a href="user.php?act=my_comment">
                            <em className="Icon Icon4"></em>
                            <dl className="b">
                                <dt>我的评价</dt>
                                <dd>查看评价</dd>
                            </dl>
                        </a>
                        <a href="user.php?act=collection_list">
                            <em className="Icon Icon10"></em>
                            <dl>
                                <dt>我的收藏</dt>
                                <dd>&nbsp;</dd>
                            </dl>
                        </a>
                    </div>
                    <div className="Wallet">
                        <a href="user.php?act=address_list">
                            <em className="Icon Icon5"></em>
                            <dl className="b">
                                <dt>地址管理</dt>
                                <dd>&nbsp;</dd>
                            </dl>
                        </a>
                        <a href="user.php?act=message_list">
                            <em className="Icon Icon7"></em>
                            <dl className="b">
                                <dt>我的留言</dt>
                                <dd>&nbsp;</dd>
                            </dl>
                        </a>
                        <a href="user.php?act=vc_login">
                            <em className="Icon Icon9"></em>
                            <dl>
                                <dt>礼品卡充值</dt>
                                <dd>&nbsp;</dd>
                            </dl>
                        </a>
                    </div>
                    <div className="Wallet">
                        <a href="javascript:void(0)" onclick="window.location.href='user.php?act=logout'">
                            <em className="Icon Icon8"></em>
                            <dl>
                                <dt>注销登录</dt>
                            </dl>
                        </a>
                    </div>
                </div>
                <Footer />
                <Tabbar></Tabbar>
            </div>
        )
    }
}

Mine = withUser(Mine); // Home得到的是高阶组件中的OuterComponent

export default Mine;