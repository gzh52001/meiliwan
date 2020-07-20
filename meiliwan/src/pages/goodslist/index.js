import React from 'react';
import './index.css';
import {withUser} from '../../utils/hoc';

class Goodslist extends React.Component{
    render(){
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
                </div>
            </div>
        )
    }
}

Goodslist = withUser(Goodslist); // Home得到的是高阶组件中的OuterComponent

export default Goodslist;