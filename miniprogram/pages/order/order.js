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
    order:{
      order_id:null,
      telephone:'',
      address_id:'',
      total:'',
      time:''
    },
    orderAddress:[],
    orderSnack:[]
  },

  //查看该用户所有订单
  searchOrder: function () {
    wx.cloud.callFunction({
      name: 'login'
    }).then(res => {
      db.collection('order_info').where({
        _openid: res.result._openid
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
  addOrder:function(){
    var time=this.CurrentTime();
    var it = this.RndNum(); //新建订单时需要同时调用三个方法
    var newOrderId = it;
    db.collection('order_info').add({
      data: {
        _id:this.newOrderId,
        telephone:'',
        address_id:'',
        total:'',
        time:time
      }
    }).then(res => {
        console.log(res)
      this.addOrderSnack(newOrderId),
      this.addOrderAddress(newOrderId)
      }).catch(err => {
        console.log(err)
      })
  },
  //新增订单数据同时添加订单-商品数据
  addOrderSnack: function (newOrderId){   
    db.collection('order_snacks').add({
      data:{
        order_id:newOrderId,
        snacks_id:'',
        fileID:'',
        name:'',
        price:'',
        type:'',
        quantity:'',
      }
    }).then(res => {
      console.log(res)
    }).catch(err => {
      console.log(err)
    })
  },
  //新增订单数据同时添加订单-地址数据
  addOrderAddress: function (newOrderId,event){
  //   var addressid=event.target.dataset.addressid;
  //   var addressname=null;
  //   var addresstelephone = null;
  //   var addressprovince = null;
  //   var addresscity = null;
  //   var addressarea = null;
  //   var addressdetail = null;
  //   db.collection('address').where({
  //     _id=addressid
  //   }).then(res=>{
  //     console.log(res),
  //     this.setData({
  //       addressname=name,
  //       addresstelephone=telephone,
  //       addressprovince=province,
  //       addresscity=city,
  //       addressarea=area,
  //       addressdetail=detail,
  //     })
  //   }).catch.log(err=>{
  //     console.log(err)
  //   })

  //   db.collection('')
  },

  //查看订单详情（三个方法同时进行）
  //查看订单详情(不包商品)
  orderDetail:function(event){
    var orderid=event.target.dataset.orderid;   
    db.collection('order_info').where({
      _id:orderid
    }).get().then(res=>{
      console.log(res);
      this.setData({       
        //不会获取数据
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
          orderAddress: res.data
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