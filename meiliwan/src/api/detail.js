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
    getCarGoods() {
        return request({
            method: 'get',
            url: `/good/cart/${uid}`,
             // params: {
            //     id
            // }
        })
        // return request.get(`/good/cart/${uid}`)
    },
     //获取购物车推荐商品
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
    },
    // 获取热销商品
    gethotgoods() {
        return request({
            method:'get',
            url:'/good/gethotgoods'
        })
    },
    // 获取新品商品
    // 获取热销商品
    // 获取全部商品
    getgood() {
        return request({
            method:'get',
            url:'/good/getgood'
        })
    }
}