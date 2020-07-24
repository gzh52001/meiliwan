import React from 'react';
import './index.css';
import {withRouter} from 'react-router-dom'
import {withUser} from '../../utils/hoc';
import Tabbar from "../../components/tabber/tab"
function Goodslist (props){
        const menu = [{
            id:1,
            price:"300.0",
            title:'散装薄壳盐焗核桃20斤/件',
            path: '/Good'
        }];
        const goto = (path)=>{
            console.log(props);
         // this.props.history.push(path);
         props.history.push(path);
       };
        return (
            <div>
                <div className = "goodslist">
                    <header id="head_search_box" style={{position: "fixed" , top: "0px", width: "100%"}}>
                        <div className="search_header">
                            <a href="javascript:history.back(-1)" className="back search_back"></a>
                            <div className="search">
                                <form id="searchForm" name="searchForm" method="get" action="search.php" onsubmit="return                      checkSearchForm()">
                                <div className="text_box" name="list_search_text_box" onclick="return 1;">
                                    <input id="keyword" name="keywords" type="text" placeholder="请输入商品名称 货号" className="text" value="" />
                                </div>
                                <input type="submit" value="" className="submit" id="list_search_submit" />
                            </form>
                            </div>
                            <a className="menu filtrate" name="list_go_filter" style= {{color:"#666"}}>筛选</a>
                        </div>
                    </header>
                    <div style={{height:"51px"}} className="empty_div">&nbsp;</div>
                    <section className="filtrate_term" id="product_sort" style={{width: "100%;"}}>
                        <ul>
                            <li className="on">
                                <a href="category.php?category=380&amp;display=grid&amp;brand=0&amp; price_min=0&amp; price_max=0&amp;filter_attr=0&amp;page=1&amp;   sort=goods_id&amp;order=ASC#goods_list">最新</a>
                            </li>
                            <li className="">
                                <a     href="category.php?category=380&amp;display=grid&amp;brand=0&amp;price_min=0&amp;   price_max=0&amp; filter_attr=0&amp;page=1&amp;sort=salenum&amp;  order=DESC#goods_list">销量</a>
                            </li>
                            <li className="">
                                <a href="category.php? category=380&amp;display=grid&amp;brand=0&amp;price_min=0&amp;price_max=0&amp; filter_attr=0&amp;page=1&amp;sort=last_update&amp;order=DESC#goods_list">更新</a>
                            </li>
                            <li className="">
                                <a href="category.php?category=380&amp;display=grid&amp;  brand=0&amp;price_min=0&amp;price_max=0&amp; filter_attr=0&amp;page=1&amp;   sort=shop_price&amp;order=ASC#goods_list">价格
                                <span className="arrow_up "></span>
                                <span className="arrow_down "></span>
                                </a>
                            </li>
                            <li className="">
                                <a href="javascript:;"  className="show_type show_list">&nbsp;</a>
                            </li>
                        </ul>
                    </section>
                    <div className = "list">
                        <div className = "list_table">
                        {
                            menu.map(item=>(
                                <li className = "bar" key={item.path} onClick={goto.bind(null,item.path)}>
                                    <a className = "tab">
                                        <div className="pic_box">
                                            <div className="active_box">
                                                <span style={{ background_position:"0px -70px" }}>精品</span>
                                            </div>
                                            <img />
                                        </div>
                                        <div className="title_box">{item.title}</div>
                                        <div className="price_box">
                                            <span className="new_price">
                                                <i>{item.price}</i>
                                            </span>
                                        </div>    
                                    </a>
                                    <div className="ui-number"> 
                                        <a className="decrease" onclick="goods_cut(458);">-</a>
                                        <input className="num" id="number_458" type="text" onblur="changePrice();" value="1" />
                                        <a className="increase" onclick="goods_add(458)">+</a> 
                                    </div>
                                    <span className="bug_car" onclick="addToCart(458)">
                                        <i className="icon-shop_cart"></i>
                                    </span>
                                </li>))
                        }   
                        </div>
                    </div>
                    <a className="gotop" style= {{z_index:"9999"}}><img /></a>
                </div>
                <Tabbar></Tabbar>
            </div>
        )
    }
Goodslist = withRouter(Goodslist);
Goodslist = withUser(Goodslist); // Home得到的是高阶组件中的OuterComponent

export default Goodslist;