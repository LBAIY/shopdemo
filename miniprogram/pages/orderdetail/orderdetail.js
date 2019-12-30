// miniprogram/pages/orderdeail/orderdetail.js
const app = getApp();

// miniprogram/pages/order/order.js
const db = wx.cloud.database();//初始化数据库
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderSnack: [],
    item:[],
    address:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let orderid = options.orderid
      if(options.orderid){
        db.collection('order_info').doc(orderid)
          .get().then(res => {
            console.log(res);
            this.setData({
              item: res.data,
            })
            this.orderDetailSnack(orderid);//同时获取订单-商品
            this.orderDetailAddress(orderid);//同时获取订单-地址
          }).catch(err => {
            console.log(err)
          })
      }
  },
  //查看订单详情-商品
  orderDetailSnack: function (orderid) {
    // this.orderSnack = [];
    db.collection('order_snacks').where({
      order_id: orderid
    }).get().then(res => {
      console.log('orderDetailSnack',res),
        this.setData({
          orderSnack: res.data
        })
    }).catch(err => {
      console.log(err)
    })
  },
  //查看订单详情-地址
  orderDetailAddress: function (orderid) {
    db.collection('order_address').where({
      order_id: this.order_id
    }).get().then(res => {
      console.log(res),
        this.setData({
          address: res.data
        })
    }).catch(err => {
      console.log(err)
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