// miniprogram/pages/makeorder/makeorder.js
import utils from '../../util/util.js'
const app = getApp()
const db = wx.cloud.database();//初始化数据库
Page({

  /**
   * 页面的初始数据
   */
  data: {
   /* address: { "_id": "dbff9fc75e070b2c080dd1e8706c4816", "detail": "广东工业大学", "_openid": "oUVpX44G3nG3d6w02phYExSnXLaE", "name": "常常", "telephone": "1378880000", "province": "广东省", "city": "广州市", "area": "天河区" },
    cart: [{ "_id": "b040a67a5e0864960867bf1749f88f71", "snack_id": "b419f243-cb7d-491f-a2e1-75c9b7bf1037", "stock": 1.0, "quantity": 3.0, "name": "费列罗 巧克力", "selected": false, "type": 0.0, "num": 0.0, "_openid": "oUVpX497zSKYGIILM-mxSd1jFhCI", "url": "https://dss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2603383705,19145738\u0026fm=26\u0026gp=0.jpg", "introduce": "金色经典与珍视的人分享", "price": 13.0 },
<<<<<<< HEAD
    { "_id": "b040a67a5e087c780870916d4eba92b9", "_openid": "oUVpX45nNHbe9ELQRSKqlanjaiNE", "snack_id": "UfewxvlikkLcrf9eGG01tvGxAthDrtPKnokUEhZKlhZXZAVb", "selected": false, "type": 1.0, "stock": 1.0, "name": "恰恰 每日坚果7日装", "quantity": 2.0, "introduce": "6种原料；6种果仁；6种味道", "num": 0.0, "price": 23.0, "url": "https://dss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1377619755,3452328444\u0026fm=26\u0026gp=0.jpg" },
    { "_id": "dbff9fc75e08594308648fa827314bf6", "introduce": "优选美味 味道纯正", "url": "https://dss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1927403880,3670572272\u0026fm=26\u0026gp=0.jpg", "num": 1.0, "_openid": "oUVpX45vwJDwot7Rk8jAfy-SqEwY", "cartSelected": true, "price": 23.0, "id": 1.0, "stock": 1.0, "name": "kinder/健达", "type": 0.0 }],
    //初始
    order: [],
=======
{ "_id": "b040a67a5e087c780870916d4eba92b9", "_openid": "oUVpX45nNHbe9ELQRSKqlanjaiNE", "snack_id": "UfewxvlikkLcrf9eGG01tvGxAthDrtPKnokUEhZKlhZXZAVb", "selected": false, "type": 1.0, "stock": 1.0, "name": "恰恰 每日坚果7日装", "quantity": 2.0, "introduce": "6种原料；6种果仁；6种味道", "num": 0.0, "price": 23.0, "url": "https://dss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1377619755,3452328444\u0026fm=26\u0026gp=0.jpg" },
{ "_id": "dbff9fc75e08594308648fa827314bf6", "introduce": "优选美味 味道纯正", "url": "https://dss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1927403880,3670572272\u0026fm=26\u0026gp=0.jpg", "num": 1.0, "_openid": "oUVpX45vwJDwot7Rk8jAfy-SqEwY", "cartSelected": true, "price": 23.0, "id": 1.0, "stock": 1.0, "name": "kinder/健达", "type": 0.0 }],*/
//初始
order: [],
    order_id: null,
    order: {
      order_id: null,
      telephone: '',
      address_id: '',
      total: '',
      time: '',
      status:''
    },
    orderAddress: [],
    orderSnack: [],
    addressid:''
  },

  //新增订单
  //新增订单详情
  addOrder: function (addressid,snacks,total) {
    var time = this.CurrentTime();
    var it = this.RndNum(); //新建订单时需要同时调用三个方法
    var newOrderId = it;

    if(addressid == null){  //未选择地址提示，返回
      wx.showToast({
        icon: 'none',
        title: '请选择地址'
      })
      return
    }

    db.collection('order_info').add({
      data: {
        _id: newOrderId,
        address_id: addressid,
        total: total,
        time: time,
        status:'未支付'
      }
    }).then(res => {
      console.log(res)
      for(var i=0;i<snacks.length;i++){  //循环前端传入的商品数组（包括商品_id：值设为snack_id,商品数量quantity：值为quantity）
        var snackId=snacks[i].snack_id
        var quantity=snacks[i].quantity
        var deleteSnack_id=snacks[i]._id
        console.log(snackId)
        console.log(quantity)
        this.addOrderSnack(newOrderId,snackId,quantity)
        this.deleteOrderSnack(deleteSnack_id)
      }
      this.addOrderAddress(newOrderId, addressid)
    }).catch(err => {
      console.log(err)
    })

    wx.showToast({
      icon: 'none',
      title: '提交订单成功'
    })
  },
  //新增订单数据同时添加订单-商品数据
  addOrderSnack: function (newOrderId, snackId, quantity) {
    db.collection('snack').doc(snackId).get()
      .then(res => {
        console.log(res),
          db.collection('order_snacks').add({
            data: {
              order_id: newOrderId,
              snacks_id: snackId,
              url: res.data.url,
              name: res.data.name,
              price: res.data.price,
              type: res.data.type,
              introduce: res.data.introduce,
              quantity: quantity
            }
          }).then(res2 => {
            console.log(res2)
          }).catch(err => {
            console.log(err)
          })
      });

  },
  //新增订单数据同时添加订单-地址数据
  addOrderAddress: function (newOrderId, addressid) {
    db.collection('address').doc(addressid).get()
      .then(res => {
        console.log(res),
          db.collection('order_address').add({
            data: {
              order_id: newOrderId,
              address_id: addressid,
              name: res.data.name,
              telephone: res.data.telephone,
              province: res.data.province,
              city: res.data.city,
              area: res.data.area,
              detail: res.data.detail,
            }
          }).then(res2 => {
            console.log(res2)
            wx.hideLoading()
            wx.showToast({
              title: '提交成功',
            })
              wx.navigateTo({
                url: '../index/index',
            })
           
          }).catch(err => { 
            console.log(err)
            wx.hideLoading()
            wx.showToast({
              title: '提交出错',
            })
         })
      }).catch(err => {
        console.log(err)
        wx.hideLoading()
      });
  },
  //删除购物车中对应商品记录
  deleteOrderSnack: function (deleteSnack_id) {
    wx.cloud.callFunction({
      name: 'login'
    }).then(res => {
      db.collection('cart').doc(deleteSnack_id).remove().then(res2 => {
        console.log(res2)
      }).catch(err => {
        console.log(err)
      })
    })
  },
  //查看某一地址
  searchOneAddress:function(){
    //var addressid=event.target.dataset.addressid
    db.collection('address').doc(this.data.addressid)
    .get().then(res=>{
      console.log('选择地址',res),
      this.setData({
        orderAddress:res.data
      })
    }).catch(err=>{
      console.log(err)
    })
  },

  // 随机数生成函数
  RndNum: function () {
    return Math.random().toString(32).substr(2, 15);
  },

  // 获取时间戳
  CurrentTime: function () {
    var now = new Date();
    var year = now.getFullYear();       //年
    var month = now.getMonth() + 1;     //月
    var day = now.getDate();            //日
    var hh = now.getHours();            //时
    var mm = now.getMinutes();          //分
    var ss = now.getSeconds();           //秒

    var clock = year.toString();
    if (month < 10) clock += "0";
    clock += month;
    if (day < 10) clock += "0";
    clock += day;
    if (hh < 10) clock += "0";
    clock += hh;
    if (mm < 10) clock += '0';
    clock += mm;
    if (ss < 10) clock += '0';
    clock += ss;
    return (clock);
  },

  CurrentTime_show: function () {
    var now = new Date();
    var year = now.getFullYear();       //年
    var month = now.getMonth() + 1;     //月
    var day = now.getDate();            //日
    var hh = now.getHours();            //时
    var mm = now.getMinutes();          //分
    var ss = now.getSeconds();           //秒

    var clock = year.toString() + "-";
    if (month < 10) clock += "0";
    clock += month + "-";
    if (day < 10) clock += "0";
    clock += day + " ";
    if (hh < 10) clock += "0";
    clock += hh + ":";
    if (mm < 10) clock += '0';
    clock += mm + ":";
    if (ss < 10) clock += '0';
    clock += ss;

    return (clock);
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      cart: app.globalData.carts,
      addressid: options.addressid
      // cartTotalPrice: app.globalData.cartTotalPrice
    })
    this.totalMoney()
    
    //console.log(options.addressid)
  },
  selectAddress: function() {
    wx.navigateTo({
      url: '../address/address?type=2',
    })
  },
  //提交订单
  submitOrder:function() {
    /* //新增订单详情
      addressid: 地址的id
      snacks: {
        snack_id:商品的id,
        quantity: 商品的数目,
        。。。其他信息
      }
    */
    // wx.requestPayment({
    //   timeStamp: Date.now().toString(),
    //   nonceStr: 'Dm5nBZFkyanl7XGZCEkJ5',
    //   package: 'dingdan',
    //   signType: 'MD5',
    //   paySign: '22D9B4E54AB1950F51E0649E8810ACD6',
    //   success (res) {
    //     console.log('成功', res)
    //   },
    //   fail (res) {
    //     console.log('失败', res)

    //   }
    // })
    let addressid = this.data.addressid
    let snacks = this.data.cart
    let total=this.data.cartTotalPrice
    console.log('addressid', addressid)
    console.log('snacks', snacks)
    console.log('total', total)
    wx.showLoading({
      title: '提交订单中',
    })
    this.addOrder(addressid, snacks,total)
  },

  totalMoney() {
    const cart = app.globalData.carts
    let total = 0
    for(let item of cart) {
      console.log(item)
      total += item.quantity*item.price
    }
    this.setData({
      cartTotalPrice: total
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
    this.data.addressid && this.searchOneAddress()
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