import request from '../utils/request';//引入axios对象
const uid=localStorage.getItem("uid")
export default {
    // 获取商品信息
    getgoods(id) {
        return request({
            method: 'get',
            url: '/good/goodlist/'+id,
            // params: {
            //     id
            // }
        })
    },
    //获取购物车商品
    getCarGoods(id) {
        return request({
            method: 'get',
            url: '/good/cart/'+id,
        })
    },
     //获取购物车推荐商品，失败
     getCarGoods_roud(id) {
        return request({
            method: 'get',
            url:  '/good/roundcart',
            // data:{
            //     token
            // }
        });
    },
    // 添加新商品到购物车
    addCartGood(goods) {
        console.log(goods)
        return request({
            method: 'post',
            url:'/good/addgoods',
            data: {
                ...goods,
                uid
            }
        })
    },
    // 修改数量
    changegoods(iGoodsId,iTotal) {
        return request({
            method:'put',
            url:'/good/changegoods',
            data: {
                iTotal,
                iGoodsId,
                uid
            }
        })
    },
    // 删除商品
    delgoods(iGoodsId) {
        return request({
            method:'delete',
            url:'/good/delgoods',
            data: {
                iGoodsId,
                uid
            }
        })
    }
}