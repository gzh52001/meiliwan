// 商品详情页
import React from 'react'
import '../../utils/flexible'
import './detail.scss'
import { Carousel } from 'antd';
// import { Modal, Button } from 'antd';
import { Input } from 'antd';
// import { message } from 'antd';
// import http from '../../utils/http';
// import store from '../../store/index';
import { connect } from 'react-redux'
import detail from '../../api/detail';

class Detail extends React.Component {
    constructor() {
        super();
        this.state = {
            visible: false,
            //  购物车商品的数量
            count: 1,
            // 存储商品信息
            detail: {},
            // 存储轮播图
            sDetailImg: [],
            // 商品图片
            sProfileImg: [],
            // 是否显示返回顶部按钮
            showElem: false,
            // 锚点的标签
            navList: 0,
            // 分类和遮罩层的控制
            display_name: 'none',
            qty: 0,
        };
        this.showModal = this.showModal.bind(this);
        this.goCar = this.goCar.bind(this);
        this.handleOk = this.handleOk.bind(this);
        this.reduce = this.reduce.bind(this);
        this.add = this.add.bind(this);
        this.buyNow = this.buyNow.bind(this)
        this.changeQty = this.changeQty.bind(this)
        this.onClass = this.onClass.bind(this)
        this.onMask = this.onMask.bind(this)
    }
    // 挂载前获取数据
     componentDidMount() {
        // window.addEventListener('scroll', this.handleScroll.bind(this)) //监听滚动
        // 获取商品id
        const { match } = this.props;
        const { id } = match.params;
        console.log(match)
        detail.getgoods(id).then(res=>{
            let p=res.data;
            if (p.code == 200) {
                console.log(p.data.sDetailImg)
                p.data.sDetailImg=p.data.sDetailImg.split(",")
                p.data.sProfileImg=p.data.sProfileImg.split(",")
                this.setState({
                    detail: p.data,
                    // 轮播图
                    sDetailImg: p.data.sDetailImg,
                    //商品图片
                    sProfileImg: p.data.sProfileImg,
                })
            } else {
                console.log("网络出错了，请稍后重试！！")
            }
        })
    }
    componentWillUnmount() { //一定要最后移除监听器，以防多个组件之间导致this的指向紊乱
        // window.removeEventListener('scroll', this.handleScroll.bind(this))
    }

    //监听滚动
    handleScroll = e => {
        if (e.srcElement.scrollingElement.scrollTop >= 1500) {
            this.setState({
                showElem: true
            })
        } else {
            this.setState({
                showElem: false
            })
        }
        let Apptop = document.getElementById('app').offsetTop - 50;
        let appraiseTop = document.getElementById('appraise').offsetTop - 50;
        let detailsTop = document.getElementById('details').offsetTop - 50;
        if (e.srcElement.scrollingElement.scrollTop >= appraiseTop && e.srcElement.scrollingElement.scrollTop < detailsTop) {
            this.setState({
                navList: 1
            })
        } else if (e.srcElement.scrollingElement.scrollTop >= detailsTop) {
            this.setState({
                navList: 2
            })
        } else {
            this.setState({
                navList: 0
            })
        }
    }
    // 点击加入购物车按钮，样式效果
    showModal = () => {
        this.setState({
            count: 1,
            visible: true,
        });
    };
    // Modal 完全关闭后的回调
    handleOk = () => {
        this.setState({
            count: 1
        });
    };
    // 点击确定，隐藏弹窗，加入购物车,添加商品
    goCar = () => {
        this.setState({
            visible: false,
        });
        // 不生效了
        // message.success('添加成功！', 2.5);

        // 获取用户ID和商品ID，商品数量
        console.log(this.state.detail)
        let iGoodsId = this.state.detail.iGoodsId;
        let shopCount = this.state.count;
        console.log(this.state.sDetailImg[0])
        // 判断当前商品是否已经添加到购物车
        const { dispatch, cartlist } = this.props;
        const currentGoods = cartlist.filter(item => item.iGoodsId == iGoodsId)[0];

        // 商品的信息sProfileImg
        let goodsimg = this.state.sDetailImg[0];//iCheck,isPromote,iGoodsId,iTotal,iCurrPrice,sMallName
        // 已添加：修改数量
        if (currentGoods) {
            let iTotal = currentGoods.iTotal - 0 + shopCount
            detail.changegoods(iGoodsId,iTotal).then(res=>{
                let p=res.data;
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
            let goods={
                // iCheck: true,
                // isPromote: true,
                iGoodsId: iGoodsId,
                iTotal: shopCount,
                iCurrPrice: this.state.detail.iPrice,
                sMallName: this.state.detail.sMallName,
                sProfileImg: goodsimg
            }
            detail.addCartGood(goods).then(res=>{
                console.log(res)
                let p=res.data;
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
    // 选择商品点击减号的时候
    reduce() {
        if (this.state.count <= 1) {
            console.log("不能再少了")
            this.setState({
                count: 1
            })
            return
        }
        this.setState({
            count: this.state.count - 1
        })
        // }
    }
    // 选择商品点击加号的时候
    add() {
        this.setState({
            count: this.state.count + 1
        })
    }
    // 立即购买
    buyNow() {
        // 数量要加1
        // 判断当前商品是否已经添加到购物车
        const iGoodsId = this.state.detail.iGoodsId;
        console.log(this.state.detail)
        const { dispatch, cartlist } = this.props;
        const currentGoods = cartlist.filter(item => item.iGoodsId == iGoodsId)[0];
        let goodsimg = this.state.sDetailImg[0];
        // 已添加：修改数量
        if (currentGoods) {
            let iTotal = currentGoods.iTotal - 0 + 1
            detail.changegoods(iGoodsId,iTotal).then(res=>{
                let p=res.data;
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
            let goods={
                // iCheck: true,
                // isPromote: true,
                iGoodsId: iGoodsId,
                iTotal: 1,
                iCurrPrice: this.state.detail.iPrice,
                sMallName: this.state.detail.sMallName,
                sProfileImg: goodsimg
            }
            detail.addCartGood(goods).then(res=>{
                console.log(res)
                let p=res.data;
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
        const { history } = this.props;
        history.push('/cart')

    }
    // 修改商品数量
    changeQty(e) {
        // console.log('changeQty=',goods_id,goods_qty)
        console.log("这里", e.target.value)
        this.setState({
            count: parseInt(e.target.value)
        })
        // dispatch({
        //     type:'CHANGE_QTY_ASYNC',
        //     goods_id,
        //     goods_qty
        // })
    }
    // 锚点
    scrollToAnchor(id, index) {
        let Top = document.getElementById(id).offsetTop - 50;//这是离顶部
        if (Top <= 0) {
            Top = 0
        }
        window.scrollTo({ top: Top, left: 0, behavior: 'smooth' });
    }
    // 点击分类
    onClass() {
        this.setState({
            display_name: 'block'
        })
    }
    // 点击遮罩层，关闭
    onMask() {
        this.setState({
            display_name: 'none',
            visible: false
        })
    }
    render() {
        // console.log(this.props)
        const { detail } = this.state;
        const { cartCount } = this.props;
        // console.log(cartCount)
        // const {goodslist}=store.getState();
        // console.log(this.props)
        return (
            <div className='mall-container'>
                <div className='content' id="app">
                    {/* 头部的导航 */}
                    <div className="fixedbar">
                        <div className="fixedbar-con">
                            <div className="detail-head">
                                <a href="#" className="back">
                                    <i className="ico-mall ico-addr i-back"></i>
                                </a>
                                <div className="cate">
                                    <div className={this.state.navList === 0 ? "item item-cur" : "item"}>
                                        <a onClick={() => this.scrollToAnchor('app', 0)} title="商品">商品</a>
                                    </div>
                                    <div className={this.state.navList === 1 ? "item item-cur" : "item"}>
                                        <a onClick={() => this.scrollToAnchor('appraise', 1)} title="评价">评价</a>
                                    </div>
                                    <div className={this.state.navList === 2 ? "item item-cur" : "item"}>
                                        <a onClick={() => this.scrollToAnchor('details', 2)} title="详情">详情</a>
                                    </div></div> <div className="cate-right">
                                    <a href="#cart" className="cate-cart" title="购物车">
                                        <i className="ico-mall ico-cart"></i>
                                        <span className="cart-point">
                                            <i>{cartCount}</i>
                                        </span>
                                    </a>
                                    <a className="ico-mall cate-class" onClick={this.onClass}>分类</a>

                                    <div className="pop-mask pop-mask-index pop-mask-hide" style={{ display: this.state.display_name }} onClick={this.onMask}></div>
                                    <div className="drop-menu" style={{ display: this.state.display_name }}>
                                        <i className="drop-arrow"></i>
                                        <ul>
                                            <li className="border">
                                                <a href="/lol/notice" className="">商城公告</a>
                                            </li>
                                            <li className="border">
                                                <a href="/lol/tucao" className="">意见反馈</a>
                                            </li>
                                            <li>
                                                <a href="/" className="nuxt-link-active">聚诚品</a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                    {/* 内容区 */}
                    <div className="hasfixedbar content-wrap">
                        <div className="good-detail">
                            <div className="goodpic-roller">
                                {/* 图片 */}
                                <div className='roller-portrait'>
                                    <div className='roller-portrait'>
                                        {/* 轮播图 */}
                                        <Carousel effect="fade" autoplay={true} autoplaySpeed={4000} dots={false}>
                                            {
                                                this.state.sDetailImg.map(item => (
                                                    <div className='lubo' key="item">
                                                        <img src={item} alt="商品图" />
                                                    </div>
                                                ))
                                            }
                                            {/* 轮播指示测试 */}

                                        </Carousel>
                                        <div className="swiper-scrollbar">
                                            <div className="swiper-scrollbar-drag" style={{ transform: "translate3d(0px, 0px, 0px)", transitionDuration: 0, width: "22px" }}>
                                            </div>
                                        </div>
                                    </div>
                                    {/* 标题 */}
                                    <div className="good-info">
                                        <div className="base">
                                            <h3 className="title">{detail.sMallName}</h3>
                                            <p className="sub-tit"></p>
                                            <div className="price">
                                                <div className="pribox">
                                                    <span className="new-pri">¥ {detail.iPrice}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="actions">
                                            <div className="act-item act-gitem">
                                                <label>已选</label>
                                                <div className="item-txt">限定组合，彩色</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 选择规格商品下面的区域 */}
                    <div className='good-content'>
                        {/* 官方周边0 */}
                        <div className="good-yhbox" >
                            <div className="actions" >
                                <div className="tags" >
                                    <span className="tags-genu" >官方周边</span>
                                    <span className="tags-th" >售后保障</span>
                                </div>
                            </div>
                        </div>

                    </div>
                    {/* 用户评价 */}
                    <div className='good-cmnt' id='appraise'>
                        <div className='cmnt-wrap'>
                            <div className="comment-head">
                                <div className="chead-left">用户评价
                        <span className="cmnt-num">(4)</span>
                                </div> <div className="chead-right">
                                    <span>综合评分</span>
                                    <i className="ico-mall ico-scores ico-point10"></i>
                                </div>
                            </div>
                            <div className="comment-list">
                                <div className="cmnt-item">
                                    <div className="cmnt-hd">
                                        <div className="cmnt-info">
                                            <div className="avatar">
                                                <img src="https://game.gtimg.cn/images/zb/comm/jcp.png" alt="头像" />
                                            </div>
                                            <div className="info-detail">
                                                <h4>匿名用户</h4>
                                                <div className="info-scores">
                                                    <span>综合评分</span>
                                                    <i className="ico-mall ico-scores ico-point10"></i>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="cmnt-time">
                                            <span>2020-04-16 12:58:56</span>
                                        </div>
                                    </div>
                                    <div className="cmnt-box">
                                        <p className="cmnt-txt">可以</p>
                                    </div>
                                </div>
                            </div>
                            <div className="cmnt-action">
                                <a href="#" className="btn-all" title="查看全部评价">
                                    查看全部评价
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* 商品详细信息介绍 */}
                    <div className="good-section" id='details'>
                        <div className="sec-bd">
                            <div className="img-box">
                                {
                                    this.state.sProfileImg.map((item, index) => (
                                        <img src={item} key={index} />
                                    ))
                                }
                            </div>
                        </div>
                    </div>

                    {/* 加入购物车尾行 */}
                    <div className="good-action" >
                        <div className="item action-kf-fav" >
                            <a href="/lol" title="首页" className="kf-nav-index nuxt-link-active" >
                                <div className="cell" >
                                    <span className="ico-mall i-home" ></span>
                                    <p >首页</p>
                                </div>
                            </a>
                            <a title="客服" className="nav-service" >
                                <div className="cell" >
                                    <span className="ico-mall i-service" ></span>
                                    <p >客服</p>
                                </div>
                            </a>
                            <a title="收藏" >
                                <div className="cell" >
                                    <span className="ico-mall i-collect" >
                                    </span>
                                    <p >收藏</p>
                                </div>
                            </a>
                        </div>
                        <div className="item action-buy action-presale" style={{ display: "none" }} >
                            <a title="预计11.11发货" className="presale-info" >
                                <span >预计11.11发货</span>
                            </a>
                            <a title="立即购买" >
                                <span >立即购买</span>
                            </a>
                        </div>
                        <div style={{ height: "100%" }} >
                            <div className="item action-cart" onClick={this.showModal}>
                                <a title="加入购物车" >
                                    <span >加入购物车</span>
                                </a>
                            </div>
                            <div className="item action-buy" >
                                <a title="立即购买" onClick={this.buyNow}>
                                    <span >立即购买</span>
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* 返回顶部 */}
                    {
                        this.state.showElem ? (
                            <div className="gototop" onClick={() => this.scrollToAnchor('app')}></div>
                        ) : null
                    }


                </div>

                {/* 选择商品规则 */}
                <div className="pop-cart" style={{ display: this.state.visible ? "block" : "none" }}>
                    <div className="pop-cart-area">
                        <div className="area-bd"><div className="pop-cart-hd">
                            <div className="pop-good-img">
                                <img src="https://game.gtimg.cn/images/zb/x5/uploadImg/goods/201912/20191231200059_22287.jpg" alt="商品图" />
                                <div className="pop-good-zoom">
                                    <i className="ico-mall btn-search"></i>
                                </div>
                            </div>
                            <div className="pop-cart-info">
                                <p className="pop-cart-pri">¥ 280.00</p>
                                <p className="pop-cart-kc">库存充足</p>
                                <p className="pop-cart-result">已选：限定组合，彩色</p>
                            </div></div> <div className="good-spec">
                                <div className="area-item">
                                    <p className="item-label">规格</p>
                                    <div className="item-panel">
                                        <ul>
                                            <li className="cur">限定组合</li>
                                            <li className="">常规款</li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="area-item">
                                    <p className="item-label">颜色</p>
                                    <div className="item-panel">
                                        <ul>
                                            <li className="cur">彩色</li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="area-amount">
                                    <label>数量</label>
                                    <div className="amount-counter">
                                        <a title="-" className="amount-minus" onClick={this.reduce}>-</a>
                                        {/* <input type="text" className="amount-text" /> */}
                                        <Input min={1} max={10} type="number" value={this.state.count} className="amount-text" onChange={this.changeQty.bind(this)} />
                                        <a title="+" className="amount-plus" onClick={this.add}>+</a>
                                    </div>
                                </div>
                                <div className="pop-cart-zw">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="pop-cart-act">
                        <a className="btn-sure" onClick={this.goCar}>确定</a>
                    </div>
                </div>
                <div className="pop-preview" style={{ display: "none" }}>
                    <div className="pro-prebg">
                    </div>
                    <img src="" alt="商品名称" className="pro-preimg" />
                </div>
                <div className="pop-mask pop-mask-index" style={{ display: this.state.visible ? "block" : "none" }} onClick={this.onMask}>
                </div>
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
Detail = connect(mapStateToProps)(Detail)
export default Detail;