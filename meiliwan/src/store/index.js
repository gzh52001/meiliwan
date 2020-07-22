import { createStore } from 'redux'
import detail from '../api/detail';
// 初始状态
const initState = {
    // cartlist: [
    //     {
    //         "iCheck": true,
    //         "isPromote": true,
    //         "iGoodsId": 14336,
    //         "iTotal": "1",
    //         "iCurrPrice": 599.00,
    //         "sMallName": "源计划 艾瑞莉娅 中型雕塑",
    //         "sProfileImg": "https://game.gtimg.cn/images/zb/x5/uploadImg/goods/202006/20200611211952_44398.jpg"
    //     },
    //     {
    //         "iCheck": true,
    //         "isPromote": true,
    //         "iGoodsId": 13243,
    //         "iTotal": "2",
    //         "iCurrPrice": 249.00,
    //         "sMallName": "柯基库奇 毛绒",
    //         "sProfileImg": "https://game.gtimg.cn/images/zb/x5/uploadImg/goods/202003/20200331135548_84130.jpg"
    //     },
    //     {
    //         "iCheck": true,
    //         "isPromote": true,
    //         "iGoodsId": 12862,
    //         "iTotal": "3",
    //         "iCurrPrice": 419.00,
    //         "sMallName": "NIKE X LPL 战队IG比赛男子球衣",
    //         "sProfileImg": "https://game.gtimg.cn/images/zb/x5/uploadImg/goods/202001/20200113160828_34014.jpg"
    //     },
    //     {
    //         "iCheck": true,
    //         "isPromote": true,
    //         "iGoodsId": 12805,
    //         "iTotal": "5",
    //         "iCurrPrice": 220.00,
    //         "sMallName": "约德尔人迷你手办套装",
    //         "sProfileImg": "https://game.gtimg.cn/images/zb/x5/uploadImg/goods/202001/20200102120303_37392.jpg"
    //     }
    // ],
    cartlist: [],
    totalPrice: 0,
    step: 0,
}

let uid = localStorage.getItem("uid")
detail.getCarGoods(uid).then(res => {
    console.log(res)
    let list = []
    if (res.data.flag) {
        for (let i = 0; i < res.data.data.p.length; i++) {
            list.push(res.data.data.p[i])
        }
        console.log(list)
        for (let i = 0; i < list.length; i++) {
            let goodsd = list[i]
            store.dispatch({
                type: 'add_to_cart',
                goods: {
                    Id: goodsd.Id,
                    iCheck: false,
                    iCurrPrice: goodsd.iCurrPrice,
                    iGoodsId: goodsd.iGoodsId,
                    iTotal: goodsd.iTotal,
                    isPromote: true,
                    uid: localStorage.getItem("uid"),
                    sMallName: goodsd.sMallName,
                    sProfileImg: goodsd.sProfileImg,
                }
            });
        }
    }
})
// console.log(p.data)
// if(p.data.code=='200'){
//     arr.push(p.data)
//     console.log(arr)
//     return arr
// }
// .then(res=>{
//     let p=res.data;
//     if (p.code == 200) {
//         arr.push(p.data)
//         console.log(arr)
//         return arr
//     }
// })
// return []

// 指定state的修改逻辑
function reducer(state = initState, action) {
    switch (action.type) {
        // 添加商品
        case 'add_to_cart':
            return {
                ...state,
                cartlist: [action.goods, ...state.cartlist]
            }
        // 删除商品
        case 'remove_from_cart':
            return {
                ...state,
                cartlist: state.cartlist.filter(item => item.iGoodsId != action.iGoodsId)
            }
        // 修改数量
        case 'change_qty': {
            console.log(action)
            return {
                ...state,
                cartlist: state.cartlist.map(item => {
                    if (item.iGoodsId == action.iGoodsId) {
                        item.iTotal = action.iTotal
                    }
                    return item;

                })
            }
        }
        // 清空数量
        case 'clear_cart':
            return {
                ...state,
                cartlist: []
            }
        // 选中商品，以及反向判断是否满足全选条件
        case 'select_cart':
            console.log(5555)
            return {
                ...state,
                cartlist: state.cartlist.map(item => {
                    if (item.iGoodsId == action.iGoodsId) {
                        item.iCheck = !item.iCheck
                    }
                    return item;
                })
            }
        // 全选按钮的效果
        case 'all_select_cart':
            console.log(6666)
            return {
                ...state,
                cartlist: state.cartlist.map(item => {
                    item.iCheck = action.allchoose;
                    return item;
                })
            }
        // 哪个选项显示删除按钮
        case 'del_select_cart':
            return {
                ...state,
                cartlist: state.cartlist.map(item => {
                    if (item.iGoodsId == action.iGoodsId) {
                        item.isPromote = !item.isPromote
                    } else {
                        item.isPromote = true
                    }
                    return item;
                })
            }
        case 'all_price':{
            let p=0;
            state.cartlist.filter(item => {
                if (item.iCheck) {
                    p = p + (item.iTotal * item.iCurrPrice);
                }
                // return p;
            })
            console.log(p)
            return {
                totalPrice:p.toFixed(2)
            }
        }
        default:
            return state
    }

}

const store = createStore(reducer);

export default store;

// console.log('store', store)


// // 获取state
// store.getState();

// // 修改State
// // 添加商品
// store.dispatch({type:'add_to_cart',goods:{}})
// // 修改商品
// store.dispatch({ type: 'onChangeCount' })
// // 删除商品
// // store.dispatch({ type: 'remove_from_cart', iGoodsId })

// // 修改数量
// store.dispatch({ type: 'change_qty', iGoodsId:0, goods_qty:0 })