// pages/myCart/myCart.js
import { updateCart } from '../../util/util'
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cart: [],
    cartAllIn: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("跳转至购物车")
    this.data.cart=app.globalData.carts
    //console.log("res", this.data.cart)
  },

  // 点击减号
  reduceItems: function (e) {
    // 调用数据库减少
    // console.log(e.target.dataset.id)
    // utils.reduceToCart(e.target.dataset.id)
    const snack_id = e.currentTarget.dataset.id;//这两个值要从前端获取
    const tag = 0// 0表示-, 1表示+
    const index = e.currentTarget.dataset.index
    const cart = this.data.cart
    const _id = e.currentTarget.dataset.cid 
    if (cart[index].quantity==1){
      //删除一条记录
      cart.splice(index, 1)
      this.sumTotalPrice()
      const db=wx.cloud.database()
      const _ = db.command   
      db.collection('cart')
        .doc(_id)
        .remove({
          success:function(){
            console.log('删除一条购物车记录', res)
          },
          fail:function(){
            err => console.error(err)
          }
        })
    }else{
      cart[index].quantity = cart[index].quantity-1;
      this.sumTotalPrice()
      updateCart(snack_id, tag)
    }
    this.setData({
      cart:cart
    })

  },
  // 点击加号
  addItems: function (e) {
    const snack_id = e.currentTarget.dataset.id;//这两个值要从前端获取
    const tag = 1// 0表示-, 1表示+
    const index = e.currentTarget.dataset.index
    const cart = this.data.cart
    if (cart[index].quantity <cart[index].num) {
      cart[index].quantity = cart[index].quantity + 1;
      this.sumTotalPrice()
    }
    this.setData({
      cart: cart
    })
    updateCart(snack_id, tag)
  },
  
  // 购物车添加事件
  cartAdd: function (e) {
    // console.log(e);
    let carts = this.data.cart;
    const ind = e.currentTarget.dataset.ind
    const selected = e.currentTarget.dataset.selected
    carts[ind].selected = !selected
    // for (let key of carts) {
    //   if (key.id === e.currentTarget.dataset.id) {

    //     if (key.cartSelected) {
    //       key.cartSelected = false;
    //     } else {
    //       key.cartSelected = true;
    //     }
    //     console.log(key.cartSelected);
    //   }
    // }

    let num = 0;
    let totalPrice = 0;
    for (let key of carts) {
      if (key.selected) {
        num += key.num;
        totalPrice += key.quantity * key.price;
      }
    }
    // console.log(totalPrice);
    this.setData({
      cart: carts,
      cartTotal: num,
      cartTotalPrice: totalPrice,
    });
    // app.globalData.carts = carts;

  },

  // 购物车全选操作
  cartAllIn: function () {

    for (let key of this.data.cart) {
      if (this.data.cartAllIn) {
        key.selected = false;
      } else {
        key.selected = true;
      }
    }
    if (this.data.cartAllIn) {
      this.data.cartAllIn = false;
      // app.globalData.cartAllIn = false;
    } else {
      this.data.cartAllIn = true;
      // app.globalData.cartAllIn = true;
    }
    let num = 0;
    let totalPrice = 0;
    let carts = this.data.cart;
    for (let key of carts) {
      if (key.selected) {
        num += key.num;
        totalPrice += key.quantity * key.price;
      }
    }

    this.setData({
      cartAllIn: this.data.cartAllIn,
      cart: this.data.cart,
      cartTotal: num,
      cartTotalPrice: totalPrice,
    });
    app.globalData.carts = this.data.cart;
  },

  //计算总价
  sumTotalPrice:function(){
    let num = 0;
    let totalPrice = 0;
    let carts = this.data.cart;
    for (let key of carts) {
      if (key.selected) {
        num += key.num;
        totalPrice += key.quantity * key.price;
      }
    }
    this.setData({
      cartAllIn: this.data.cartAllIn,
      cart: this.data.cart,
      cartTotal: num,
      cartTotalPrice: totalPrice,
    });
    app.globalData.carts = this.data.cart;
  },


  // 点击购物车操作
  finishedOrder: function () {
    wx.navigateTo({
      url: '/pages/makeorder/makeorder',
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.selectCart()
    app.globalData.carts=this.data.cart
    //console.log("res2", this.data.cart)
  },

  selectCart: function (options) {
    const db = wx.cloud.database()
    db.collection('cart').where({
      _openid: app.globalData.openId
    }).get()
      .then(res => {
        app.globalData.carts = res.data
        this.setData({
          cart: res.data
        })
        //console.log('初始化购物车', res) 
      })
      .catch(err => console.error(err))
  }, 

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})