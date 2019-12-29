// pages/myCart/myCart.js
import utils from '../../util/util.js'
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
    this.setData({
      cart: app.globalData.carts,
    })
  },


  // 点击减号--这里加减号可以都调用这个函数，传过来一个tag值即可
  reduceItems: function (e) {
    const index = e.currentTarget.dataset.index;
    const snack_id ='b419f243-cb7d-491f-a2e1-75c9b7bf1037'//这两个值要从前端获取
    const tag=0// 0表示-, 1表示+
    this.updateCart(snack_id, tag)
    //然后就是要更新页面上加减后的数量,也是获取index可以做的
    wx.navigateTo({
      url: '../myCart/myCart',
    })
    // this.data.cart[index].quantity = this.data.cart[index].quantity-1;
  },
  // 点击减号
  reduceItems: function (e) {
    // 调用数据库减少
    console.log(e.target.dataset.id)
    utils.reduceToCart(e.target.dataset.id)
  },
  // 点击加号
  addItems: function (e) {
    console.log(e.target.dataset.id)
    utils.addToCart(e.target.dataset.id)
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
    console.log(1);
    this.setData({
      cart: app.globalData.carts,
    })
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