// pages/order/order.js
const app = getApp();

// miniprogram/pages/order/order.js
const db = wx.cloud.database();//初始化数据库
//var it = this.RndNum(); //新建订单时需要同时调用三个方法
//var newOrderId=it;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    order:[],
    order_id:null,
    // order:{
    //   order_id:null,
    //   telephone:'',
    //   address_id:'',
    //   total:'',
    //   time:''
    // },
    // order:{
    //   order_id:null,
    //   telephone:'',
    //   address_id:'',
    //   total:'',
    //   time:'',
    //   status:''
    // },
    orderAddress:[],
    orderSnack:[]
  },

  //查看该用户所有订单
  searchOrder: function () {
    wx.cloud.callFunction({
      name: 'login'
    }).then(res => {
      console.log('openid', res.result.openid)
      db.collection('order_info').where({
        _openid: res.result.openid
      }).get().then(res2 => {
        console.log(res2);
        this.setData({
          order: res2.data
        });
      })
    })
  },
  //新增订单
  //新增订单详情
 /* addOrder:function(){
    var time=this.CurrentTime();
    var it = this.RndNum(); //新建订单时需要同时调用三个方法
    var newOrderId = it;
    var addressid = 'dbff9fc75e070b2c080dd1e8706c4816'
    db.collection('order_info').add({
      data: {
        _id:newOrderId,
        telephone:'13788880000',
        address_id:addressid,
        total:'23',
        time:time
      }
    }).then(res => {
        console.log(res)
        for(var i;i<ordersnack.length;i++){  //循环前端传入的商品数组（包括商品_id：值设为snack_id,商品数量quantity：值为quantity）
          var snackId=ordersnack[i].snack_Id
          var quantity=ordersnack[i].quantity
          this.addOrderSnack(newOrderId,snackId,quantity)
        }
      this.addOrderAddress(newOrderId,addressid)
      }).catch(err => {
        console.log(err)
      })
  },
  //新增订单数据同时添加订单-商品数据
  addOrderSnack: function (newOrderId,snackId,quantity){   
    db.collection('snack').doc(snackId).get()
    .then(res=>{
      console.log(res),     
      db.collection('order_snacks').add({
        data: {
          order_id: newOrderId,
          snacks_id: snackId,
          url: res.data.url,
          name: res.data.name,
          price: res.data.price,
          type: res.data.type,
          introduce:res.data.introduce,
          quantity: quantity
        }
      }).then(res2 => {
        console.log(res2),
          this.deleteOrderSnack(snackId)
      }).catch(err => {
        console.log(err)
      })
    });
    
  },
  //新增订单数据同时添加订单-地址数据
  addOrderAddress: function (newOrderId,addressid){
    db.collection('address').doc(addressid).get()
    .then(res=>{
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
        }).catch(err => { console.log(err) })
    }).catch(err=>{
      console.log(err)
    });  
  },
  //删除购物车中对应商品记录
  deleteOrderSnack: function (snackId){
    wx.cloud.callFunction({
      name: 'login'
    }).then(res=>{
      db.collection('cart').where({
        _openid:res.result.openid,
        snacks_id:snackid
      }).remove().then(res2=>{
        console.log(res2)
      }).catch(err=>{
        console.log(err)
      })
    })
  },
*/
  //查看订单详情（三个方法同时进行）
  //查看订单详情(不包商品)
  orderDetail:function(event){
    var orderid=event.target.dataset.orderid;
    wx.navigateTo({
      url: `/pages/orderdetail/orderdetail?orderid=${orderid}`,
    })   
    db.collection('order_info').doc(orderid)
    .get().then(res=>{
      console.log(res);
      this.setData({       
        item:res.data,
      })
      this.orderDetailSnack(orderid);//同时获取订单-商品
      this.orderDetailAddress(orderid);//同时获取订单-地址
    }).catch(err=>{
      console.log(err)
    })

  },
  //查看订单详情-商品
  orderDetailSnack:function(orderid){
    this.orderSnack=[];
    db.collection('order_snacks').where({
      order_id:orderid
    }).get().then(res=>{
      console.log(res),
      this.setData({
        orderSnack:res.data
      })
    }).catch(err=>{
      console.log(err)
      })
  },
  //查看订单详情-地址
  orderDetailAddress:function(orderid){
    db.collection('order_address').where({
      order_id:this.order_id
    }).get().then(res => {
      console.log(res),
        this.setData({
          address: res.data
        })
    }).catch(err => {
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
    
    const cardList = app.globalData.carts;
    cardList.map(item => {
      item.cartSelected = true
    })
    this.setData({
      //页面加载时就给购物车显示商品数量
      goodsList: cardList
    })
    this.searchOrder()
  },
  toSort: function () {
    wx.switchTab({
      url: "../myCart/myCart",
    })
  },
  //计算所有商品的钱数
  sumMoney: function () {
    var count = 0;
    const goods = this.data.goodsList;
    for (let i = 0; i < goods.length; i++) {
      count += goods[i].num * goods[i].price
    }
    this.setData({
      sum: count
    })
  },
  toOrder: function () {
    wx.navigateTo({
      url: "../order/order",
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
    // this.setData({
    //   // 页面加载时就给购物车显示商品数量
    //   goodsList: app.globalData.carts
    // })
    this.sumMoney()
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