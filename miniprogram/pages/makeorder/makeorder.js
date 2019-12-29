// miniprogram/pages/makeorder/makeorder.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: { "_id": "dbff9fc75e070b2c080dd1e8706c4816", "detail": "广东工业大学", "_openid": "oUVpX44G3nG3d6w02phYExSnXLaE", "name": "常常", "telephone": "1378880000", "province": "广东省", "city": "广州市", "area": "天河区" },
    cart: [{ "_id": "b040a67a5e0864960867bf1749f88f71", "snack_id": "b419f243-cb7d-491f-a2e1-75c9b7bf1037", "stock": 1.0, "quantity": 3.0, "name": "费列罗 巧克力", "selected": false, "type": 0.0, "num": 0.0, "_openid": "oUVpX497zSKYGIILM-mxSd1jFhCI", "url": "https://dss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2603383705,19145738\u0026fm=26\u0026gp=0.jpg", "introduce": "金色经典与珍视的人分享", "price": 13.0 },
{ "_id": "b040a67a5e087c780870916d4eba92b9", "_openid": "oUVpX45nNHbe9ELQRSKqlanjaiNE", "snack_id": "UfewxvlikkLcrf9eGG01tvGxAthDrtPKnokUEhZKlhZXZAVb", "selected": false, "type": 1.0, "stock": 1.0, "name": "恰恰 每日坚果7日装", "quantity": 2.0, "introduce": "6种原料；6种果仁；6种味道", "num": 0.0, "price": 23.0, "url": "https://dss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1377619755,3452328444\u0026fm=26\u0026gp=0.jpg" },
{ "_id": "dbff9fc75e08594308648fa827314bf6", "introduce": "优选美味 味道纯正", "url": "https://dss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1927403880,3670572272\u0026fm=26\u0026gp=0.jpg", "num": 1.0, "_openid": "oUVpX45vwJDwot7Rk8jAfy-SqEwY", "cartSelected": true, "price": 23.0, "id": 1.0, "stock": 1.0, "name": "kinder/健达", "type": 0.0 }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  selectAddress: function() {
    wx.navigateTo({
      url: '../selectaddress/selectaddress',
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