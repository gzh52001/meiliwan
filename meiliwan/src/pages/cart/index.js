import React from 'react'
import http, { request } from '../../utils/http';
import { connect } from 'react-redux'
import '../../utils/flexible'
import './cart.scss'
import { Input, InputNumber } from 'antd';
import detail from '../../api/detail';
class Cart extends React.Component {
    constructor() {
        super()
        this.state = {
            // 推荐商品信息
            goods: [],
            // 没有商品时显示
            NoGoodsVisible: false,
            // 购物车商品信息
            // goodsList: [],
            // 计算总价
            totalPrice: 0.00,
            // 判断是否全选
            allSelect: false
        }
        this.UnSelectAll = this.UnSelectAll.bind(this)
    }
    // 请求数据
    componentDidMount() {
        // 获取购物车的信息
        //  判断是否满足全选条件
        this.check_all();
        // 计算总价，判断是否全选
        // this.onSelect()
        // this.totalPrice()
    }

    // 修改商品数量
    onChangeCount(iGoodsId, e) {
        let iTotal = parseInt(e.target.value)
        console.log(iTotal)
        if (iTotal == '' || iTotal == "NaN") {
            iTotal = 1
        }
        const { dispatch } = this.props;
        dispatch({
            type: 'change_qty',
            iGoodsId,
            iTotal
        })
        this.totalPrice()
    }
    // 判断是否显示删除选项
    onEdit(iGoodsId) {
        this.props.dispatch({
            type: 'del_select_cart',
            iGoodsId
        })
    }
    // 删除商品
    onDel(iGoodsId) {
        detail.delgoods(iGoodsId).then(res => {
            let p = res.data;
            if (p.code == 200) {
                const { dispatch } = this.props;
                dispatch({
                    type: 'remove_from_cart',
                    iGoodsId
                })
            }
            console.log(p);
        })
    }
    //  判断是否满足全选条件
    check_all() {
        let p = this.props.cartlist.every(item => {
            return item.iCheck === true
        })
        if (p) {
            this.props.dispatch({
                type: 'all_select_cart',
                allSelect: true
            })
        } else {
            this.props.dispatch({
                type: 'all_select_cart',
                allSelect: false
            })
        }
    }
    // 选中商品
    onSelect(iGoodsId) {
        // 当数组中元素是值类型，map不会改变原数组；当是引用类型，则可以改变原数组
        console.log(iGoodsId)
        this.props.dispatch({
            type: 'select_cart',
            iGoodsId
        })
        this.check_all()
        // this.UnSelectAll()
        this.totalPrice()
    }
    // 点击全选按钮的时候
    UnSelectAll() {
        //  判断是否满足全选条件
        let p = this.props.cartlist.every(item => {
            return item.iCheck == true
        })
        console.log(p)
        if (p) {
            this.props.dispatch({
                type: 'all_select_cart',
                allchoose: false
            })
            this.setState({
                allSelect: false
            })
        } else {
            this.props.dispatch({
                type: 'all_select_cart',
                allchoose: true
            })
            this.setState({
                allSelect: true
            })
        }
        this.totalPrice()
    }
    // 计算总价
    totalPrice() {
        // 遍历
        let p = 0.00;
        console.log(666666)
        console.log("11111",this.props.cartlist)
        this.props.cartlist.filter(item => {
            if (item.iCheck) {
                p = p + (item.iTotal * item.iCurrPrice);
                console.log('里面的PPP',p)
            }
            return p;
        })
        console.log("22222",this.props.cartlist)
        console.log(p)
        this.setState({
            totalPrice: p.toFixed(2)
        })
        // this.props.dispatch({
        //     type:'all_price'
        // })
        // console.log(this.props.totalPrice);
    }
    // 点击减号，数量减少
    onMix(iGoodsId) {
        const currentGoods = this.props.cartlist.filter(item => item.iGoodsId == iGoodsId)[0];
        if (currentGoods.iTotal <= 1) {
            console.log("不能再少了")
            currentGoods.iTotal = 1
        }

        let iTotal = currentGoods.iTotal - 1

        detail.changegoods(iGoodsId, iTotal).then(res => {
            let p = res.data;
            if (p.code == 200) {
                this.props.dispatch({
                    type: 'change_qty',
                    iGoodsId,
                    iTotal
                })
            } else {
                console.log("网络出错了，请稍后重试！！")
            }
        })

        // this.props.dispatch({
        //     type: 'change_qty',
        //     iGoodsId,
        //     iTotal
        // })
        this.totalPrice()

    }
    // 点击加号，数量添加
    onAdd(iGoodsId) {
        const currentGoods = this.props.cartlist.filter(item => item.iGoodsId == iGoodsId)[0];
        let iTotal = currentGoods.iTotal - 0 + 1
        detail.changegoods(iGoodsId, iTotal).then(res => {
            let p = res.data;
            if (p.code == 200) {
                this.props.dispatch({
                    type: 'change_qty',
                    iGoodsId,
                    iTotal
                })
            } else {
                console.log("网络出错了，请稍后重试！！")
            }
        })
        // this.props.dispatch({
        //     type: 'change_qty',
        //     iGoodsId,
        //     iTotal
        // })
        this.totalPrice()
    }
    render() {
        console.log(this.props)
        // const { goodsList } = this.state;
        let goodsList = this.props.cartlist;
        return (
            <div style={{ height: "100%", background: "#fff" }}>
                <section style={{ height: "100%" }}>
                    {/* 购物车部分 */}
                    {/* 没有商品的时候 */}
                    <div className="com-msgbox" style={{ display: this.state.NoGoodsVisible ? "block" : "none" }}>
                        <i className="ico-mall i-cart"></i>
                        <div className="msg">购物车好空呀，快去选购吧~</div>
                        <a href="/lol" className="btn-com nuxt-link-active">去逛逛</a>
                    </div>

                    {/* 有商品的时候 */}
                    <div className="cart-list" style={{ display: this.state.NoGoodsVisible ? "none" : "block" }}>
                        <div className="cart-item">
                            <div className="item-hd">
                                <a className="btn-check">
                                    <i className={this.state.allSelect ? "ico-mall i-check i-checked" : "ico-mall i-check"} onClick={this.UnSelectAll}></i>
                                </a>
                                <div className="item-hdimg">
                                    <img src="https://game.gtimg.cn/images/daoju/base/logo/biz/lol.png" lazy="loaded" />
                                </div>
                                <p className="item-hdname">英雄联盟供应商：合泰文化</p>
                            </div>

                            {/* 商品列表 */}
                            {
                                goodsList.map(item => (
                                    < div className="item-order" key={item.iGoodsId}>
                                        <div>
                                            <div className="order-good">
                                                <div className="good-item">
                                                    <a className="btn-check">
                                                        <i className={item.iCheck ? "ico-mall i-check i-checked" : "ico-mall i-check"} onClick={this.onSelect.bind(this, item.iGoodsId)}></i>
                                                    </a>
                                                    <a className="good-img">
                                                        <img src={item.sProfileImg} lazy="loaded" />
                                                    </a>

                                                    {/* 右边规格，切换 */}
                                                    <div className="good-info" style={{ display: item.isPromote ? "block" : "none" }}>
                                                        <div className="info-hd">
                                                            <a href={`#/detail/${item.iGoodsId}`} className="info-name">{item.sMallName}</a>
                                                            <a className="ico-mall btn-edit" onClick={this.onEdit.bind(this, item.iGoodsId)}>编写</a>
                                                        </div>
                                                        <span className="info-size">颜色：彩色 </span>
                                                        <span className="info-size">尺码：XL </span>
                                                        <p className="info-tip"></p>
                                                        <div className="info-bd">
                                                            <div className="info-price">
                                                                <h4 >¥ {item.iCurrPrice}</h4>
                                                                <i className="i-primark">特价</i>
                                                            </div>
                                                            <div className="amount-counter">
                                                                <a title="-" className="amount-minus" onClick={this.onMix.bind(this, item.iGoodsId)}>-</a>
                                                                {/* <input type="number" className="amount-text" value={item.iTotal} onChange={this.onChangeCount.bind(this, item.iGoodsId)} /> */}
                                                                <Input min={1} type='number' className="amount-text" value={item.iTotal} onChange={this.onChangeCount.bind(this, item.iGoodsId)} />
                                                                <a title="+" className="amount-plus" onClick={this.onAdd.bind(this, item.iGoodsId)}>+</a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {/* 点击编辑效果 */}
                                                    <div className="good-editbox test" style={{ display: item.isPromote ? "none" : "flex" }}>
                                                        <div className="edit-info"><div className="amount-counter">
                                                            <a title="-" className="amount-minus" onClick={this.onMix.bind(this, item.iGoodsId)}>-</a>
                                                            <input type="number" className="amount-text" value={item.iTotal} onChange={this.onChangeCount.bind(this, item.iGoodsId)} />
                                                            <a title="+" className="amount-plus" onClick={this.onAdd.bind(this, item.iGoodsId)}>+</a>
                                                        </div>
                                                            <div className="goods-edit">
                                                                <div className="editbr">
                                                                    <span >彩色</span>
                                                                    <span >XL</span>
                                                                    <i className="ico-mall i-arrdown">
                                                                    </i>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="edit-action">
                                                            <a title="完成" className="btn-finish" onClick={this.onEdit.bind(this, item.iGoodsId)}>完成</a>
                                                            <a title="删除" className="btn-del" onClick={this.onDel.bind(this, item.iGoodsId)}>删除</a>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* 右滑，移入，收藏效果 预留 */}
                                                <div className="good-action">
                                                    <a title="移入收藏" className="btn-remove">移入<br />收藏</a>
                                                    <a title="删除" className="btn-del">删除</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>


                                ))
                            }
                            {/* 结算 */}
                            <div className="cart-btnbox">
                                <div className="balance">
                                    <a className="btn-check">
                                        <i className={this.state.allSelect ? "ico-mall i-check i-checked" : "ico-mall i-check"} onClick={this.UnSelectAll}></i>
                                    </a>
                                    <p className="bal-txt">全选</p>
                                    <div className="totalpri">
                                        <p className="pri">合计：
                                                <span className="red">
                                                <strong>¥ {this.state.totalPrice}</strong>
                                            </span>
                                        </p>
                                        <p className="pritip">不含运费</p>
                                    </div>
                                    <a className="btn btn-com btn-balance">去结算</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 推荐 */}
                <section className="goods-listbox cartRecommend">
                    <section className="listbox">
                        <div className="list-tit">
                            <h3>为你推荐</h3>
                        </div>
                        <ul className="goods-list">
                            {
                                this.state.goods.map(item => (
                                    <li key={item.iMallId}>
                                        <a href={`/lol/detail/${item.iMallId}`} className="list-link">
                                            <div className="list-img">
                                                <img src={item.sProfileImg} lazy="loaded" />
                                            </div>
                                            <div className="list-bd">
                                                <div className="name">
                                                    <h5>{item.sMallName}</h5>
                                                </div>
                                                <div className="price">
                                                    <p className="new-pri">¥ {item.iPrice}</p>
                                                </div>
                                            </div>
                                        </a>
                                    </li>
                                ))
                            }

                        </ul>
                    </section>
                </section>
            </div>
        )

    }
}


const mapStateToProps = (state) => {
    // console.log("state",state)
    return {
        cartlist: state.cartlist
    }
}
Cart = connect(mapStateToProps)(Cart)
export default Cart;