import React from 'react'
import { Row, Col, BackTop } from 'antd';
import { Link } from 'react-router-dom';
import { Input } from 'antd';
import http, { request } from '../../utils/http';
import detail from '../../api/detail';
import { connect } from 'react-redux'
import './index.scss'
class Home extends React.Component {
    constructor() {
        super();
        this.state = {
            // 精品,新品，热销
            excellent: [],
            newPro: [],
            hotSale: [],
            allgoods:[]
        };
    }
    // 点击购物车，将商品加到购物车
    addCart (item) {
        console.log(item)
        console.log(item.iGoodsId)
        // console.log(item.sDetailImg.split(",")[0])
        console.log('商品加到购物车');

        // 判断当前商品是否已经添加到购物车
        const iGoodsId = item.iGoodsId;
        const { dispatch, cartlist } = this.props;
        const currentGoods = cartlist.filter(item => item.iGoodsId == iGoodsId)[0];
        let goodsimg = item.sDetailImg.split(",")[0];
        console.log(goodsimg)
        // 已添加：修改数量
        if (currentGoods) {
            let iTotal = currentGoods.iTotal - 0 + 1
            detail.changegoods(iGoodsId, iTotal).then(res => {
                let p = res.data;
                if (p.code == 200) {
                    dispatch({
                        type: 'change_qty',
                        iGoodsId,
                        iTotal
                    })
                } else {
                    console.log("网络出错了，请稍后重试！！")
                }
            })
        } else {   // 购物车未有该商品：添加该商品到购物车
            console.log(iGoodsId)
            console.log(item.iPrice)
            console.log(item.sMallName)
            let goods = {
                iGoodsId: iGoodsId,
                iTotal: 1,
                iCurrPrice: item.iPrice,
                sMallName: item.sMallName,
                sProfileImg: goodsimg
            }
            detail.addCartGood(goods).then(res => {
                console.log(res)
                let p = res.data;
                console.log(p);
                if (p.code == 200) {
                    dispatch({
                        type: 'add_to_cart',
                        goods
                    })
                    console.log("请求成功")
                } else {
                    console.log("网络出错了，请稍后重试！！")
                }
            })
        }
    }
    // 挂载前，获取数据
    async componentWillMount() {
        //    封装
        detail.gethotgoods().then(res => {
            console.log(res)
            let p = res.data;
            console.log(p);
            if (p.code == 200) {
                // p.data.p.sDetailImg=p.data.p.sDetailImg.split(",")
                console.log("请求成功")
                console.log(p.data.p[0].sDetailImg.split(",")[0])
                let excellent = p.data.p
                // // 新品
                let newPro = p.data.p
                // // 热销
                let hotSale = p.data.p
                this.setState({
                    excellent,
                    newPro,
                    hotSale
                })
            } else {
                console.log("网络出错了，请稍后重试！！")
            }
        })
        // // 精品
        // let excellent = await http.get('/db/home.json')
        // // // 新品
        // let newPro = await http.get('/db/home1.json')
        // // // 热销
        // let hotSale = await http.get('/db/home2.json')
        // this.setState({
        //     excellent,
        //     newPro,
        //     hotSale
        // })
        // 获取全部商品
        detail.getgood().then(res => {
            console.log(res)
            let p = res.data;
            console.log(p);
            if (p.code == 200) {
                // p.data.p.sDetailImg=p.data.p.sDetailImg.split(",")
                console.log("请求成功")
                console.log(p.data.p[0].sDetailImg.split(",")[0])
                // // 新品
                let allgoods = p.data.p
                // // 热销
                this.setState({
                   allgoods
                })
            } else {
                console.log("网络出错了，请稍后重试！！")
            }
        })
    }
    gotop(){
        window.scrollTo({
            left: 0,
            top: 0,
            behavior: 'smooth',
          });
    }
    render() {
        // console.log(this.state.excellent)
        const { excellent } = this.state;
        return (<div className='page'>
            <Row id='header'>
                <Col className='logo' span={24}>美丽湾</Col>
                <Link to="/catalog" className="top_bt" />
                <Link to="/cart" className="user_btn" />
            </Row>

            {/* //   搜索框 */}
            <Row className="index_search">
                <Col className='index_search_mid' span={24}>
                    <span><img alt='nofound' src="./home/icosousuo.png" /></span>
                    <Input type="text" id="search_text" className="search_text" placeholder="请输入您所搜索的商品"></Input>
                </Col>
            </Row>

            {/* 导航 */}
            <Row className="entry-list">
                <nav>
                    <ul>
                        <li>
                            <Link to={{ pathname: 'catalog.php' }}>
                                <img alt="全部商品" src="./home/shop.png" />
                                <span>全部商品</span>
                            </Link>
                        </li>
                        <li>
                            <Link to={{ pathname: 'catalog.php' }}>
                                <img alt="优惠活动" src="./home/preferential.png" />
                                <span>优惠活动</span>
                            </Link>
                        </li>
                        <li>
                            <Link to={{ pathname: 'catalog.php' }}>
                                <img alt="团购" src="./home/tuangou.png" />
                                <span>团购</span>
                            </Link>
                        </li>
                        <li>
                            <Link to={{ pathname: 'catalog.php' }}>
                                <img alt="个人中心" src="./home/mine.png" />
                                <span>个人中心</span>
                            </Link>
                        </li>
                    </ul>
                </nav>
            </Row>
            {/* 修饰 */}
            <Row className='floor_images'></Row>
            <Row className='floor_images'></Row>

            {/* 精品推荐 */}
            <section className="index_floor">
                <div className="floor_body1">
                    <h2><em></em>精品推荐<div className="geng">
                        {/* <a href="#">更多</a> */}
                        <Link to={{ pathname: '#' }}>更多</Link>
                        <span></span></div></h2>
                    <div className="scroll_hot">
                        <div className="tempWrap">
                            <Row>
                                <div className="bd">
                                    {/* 精品推荐 */}
                                    <ul>
                                        {
                                            excellent.map((item) => (
                                                <li key={item.iGoodsId}>
                                                    <div className="index_pro">
                                                        <Link to={{ pathname: '/detail/' + item.iGoodsId }} title="整箱14.5斤开心果 坚果炒货食品 无漂白无添加开心果">
                                                            <div className="products_kuang">
                                                                <img src={item.sDetailImg.split(",")[0]} alt="" /></div>
                                                            <div className="goods_name"> {item.sMallName} </div>
                                                        </Link>
                                                        <div className="price">
                                                            <Link to={{ pathname: '' }} className="btns" onClick={this.addCart.bind(this, {...item})}> <img src="./home/index_flow.png" alt="" /></Link>
                                                            <span className="price_pro"> {item.iPrice}</span>
                                                        </div>
                                                    </div>
                                                </li>
                                            ))
                                        }
                                    </ul>
                                </div>
                            </Row>
                            <Row className="hd">
                                <ul>
                                    <li className="on">1</li>
                                    <li >2</li>
                                    <li >3</li>
                                </ul>
                            </Row>
                        </div>
                    </div>
                </div>
            </section>

            {/* 新品上市 */}
            <section className="index_floor">
                <div className="floor_body1">
                    <h2><em></em>新品上市<div className="geng">
                        {/* <a href="#">更多</a> */}
                        <Link to={{ pathname: '#' }}>更多</Link>
                        <span></span></div></h2>
                    <div className="scroll_hot">
                        <div className="tempWrap">
                            <Row>
                                <div className="bd">
                                    <ul>
                                        {
                                            excellent.map((item) => (
                                                <li key={item.iGoodsId}>
                                                    <div className="index_pro">
                                                        <Link to={{ pathname: '/detail/' + item.iGoodsId }} title={item.sMallName}>
                                                            <div className="products_kuang">
                                                                <img src={item.sDetailImg.split(",")[0]} alt="" /></div>
                                                            <div className="goods_name">{item.sMallName}</div>
                                                        </Link>
                                                        <div className="price">
                                                            <Link to={{ pathname: '' }} className="btns" onClick={this.addCart.bind(this, item.iGoodsId)}> <img src="./home/index_flow.png" alt="" /></Link>
                                                            <span className="price_pro"> {item.iPrice}</span>
                                                        </div>
                                                    </div>
                                                </li>
                                            ))
                                        }
                                    </ul>

                                </div>
                            </Row>
                            <Row className="hd">
                                <ul>
                                    <li className="on">1</li>
                                    <li >2</li>
                                    <li >3</li>
                                </ul>
                            </Row>
                        </div>
                    </div>
                </div>
            </section>

            {/* 热销产品 */}
            <section className="index_floor">
                <div className="floor_body1">
                    <h2><em></em>热销产品<div className="geng">
                        <Link to={{ pathname: '#' }}>更多</Link>
                        <span></span></div></h2>
                    <div className="scroll_hot">
                        <div className="tempWrap">
                            <Row>
                                <div className="bd">
                                    <ul>
                                        {
                                            this.state.hotSale.map((item) => (
                                                <li key={item.iGoodsId}>
                                                    <div className="index_pro">
                                                        <Link to={{ pathname: '/detail/' + item.iGoodsId }} title={item.sMallName}>
                                                            <div className="products_kuang">
                                                                <img src={item.sDetailImg.split(",")[0]} alt="" /></div>
                                                            <div className="goods_name">{item.sMallName}</div>
                                                        </Link>
                                                        <div className="price">
                                                            <Link to={{ pathname: '' }} className="btns" onClick={this.addCart.bind(this, item.iGoodsId)}> <img src="./home/index_flow.png" alt="" /></Link>
                                                            <span className="price_pro">{item.iPrice}</span>
                                                        </div>
                                                    </div>
                                                </li>
                                            ))
                                        }
                                    </ul>
                                </div>
                            </Row>
                            <Row className="hd">
                                <ul>
                                    <li className="on">1</li>
                                    <li >2</li>
                                    <li >3</li>
                                </ul>
                            </Row>
                        </div>
                    </div>
                </div>
            </section>

            {/* 更多 */}
            <Row className='floor_body2'>
                <h2>————&nbsp;精品推荐&nbsp;————</h2>
                {
                    this.state.allgoods.map((item) => (
                        <ul className="product single_item info" id="more_element_2" key={item.iGoodsId}>
                            <li>
                                <div className="index_pro">
                                    <Link to={{ pathname: '/detail/' + item.iGoodsId }} title={item.sMallName}>
                                        <div className="products_kuang">
                                            <img src={item.sDetailImg.split(",")[0]} alt="" /></div>
                                        <div className="goods_name">{item.sMallName}</div>
                                    </Link>
                                    <div className="price">
                                        <Link to={{ pathname: '' }} className="btns" onClick={this.addCart.bind(this, item.iGoodsId)}> <img src="./home/index_flow.png" /></Link>
                                        <span className="price_pro"> {item.iPrice}</span>
                                    </div>
                                </div>
                            </li>

                        </ul>
                    ))
                }
            </Row>

            {/* 返回顶部 */}
            <BackTop>
                <a onClick={this.gotop} className="gotop">
                    <img src="./home/top.png" />
                </a>
            </BackTop>
        </div>
        )
    }
}
const mapStateToProps = (state) => {
    // console.log("state",state)
    return {
        cartCount: state.cartlist.length,
        cartlist: state.cartlist
    }
}
Home = connect(mapStateToProps)(Home)
// Home = withUser(Home); // Home得到的是高阶组件中的OuterComponent
export default Home;