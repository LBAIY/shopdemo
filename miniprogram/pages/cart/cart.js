// page/component/new-pages/cart/cart.js
const app = getApp()
var openid=''

Page({
  data: {
    carts: [],               // 购物车列表
    hasList: false,          // 列表是否有数据
    totalPrice: 0,           // 总价，初始为0
    selectAllStatus: true,    // 全选状态，默认全选
    obj: { name: "hello" }
  },

  //获取用户openid
  getOpenid() {
    let that = this;
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        //console.log('[云函数] [login] user openid: ', res.result.openid)
        openid = res.result.openid
        //console.log('openid1',openid)
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
      }
    })
  },

  onLoad(e) {
    //------获取初始化购物车----
    var self = this
    const db = wx.cloud.database()
    wx.cloud.callFunction({
      name: 'login'
    }).then(res => {
      db.collection('cart').where({
        _openid: res.result.openid
      }).get().then(res2 => {
        console.log('res2', res2);
        if (res2.data.length != 0)
          this.setData({
            carts: res2.data,
            hasList: true
          });
      })
    })
    app.globalData.carts = this.carts
    this.getTotalPrice()
  },

  onShow() {
    //------获取初始化购物车----
     var self = this
     const db = wx.cloud.database()
    wx.cloud.callFunction({
      name: 'login'
    }).then(res => {
      db.collection('cart').where({
        _openid: res.result.openid
      }).get().then(res2 => {
        console.log('res2',res2);
        if(res2.data.length!=0)
        this.setData({
          carts: res2.data,
          hasList: true
        });
      })
    })
    app.globalData.carts=this.carts
    /*this.getOpenid()
    //不知道怎么获取openid
    //this.getOpenid() //onload已经设置全局变量openid
    app.getInfoWhere('cart', { _openid: openid },
      res => {
        console.log('res',res.data)
        console.log('openid2', openid)
        if(!res.data && res.data.length<=0){
          console.log("购物车没有商品")
        }
        self.data.carts = res.data
        app.globalData.carts = self.data.carts
        //console.log('openid',app.globalData._openid)
      }
    )*/
    //if (app.globalData.carts.length != 0) {
    // if (carts.length!=0){
    //   self.setData({
    //     hasList: true,
    //   });
    // }
    self.selectAll();
    self.getTotalPrice();
  },

  onHide: function () {
    var self = this
    self.getTotalPrice();
    self.selectAll();
  },

  /**
   * 当前商品选中事件
   */
  selectList(e) {
    var self = this
    const index = e.currentTarget.dataset.index;
    let carts = this.data.carts;
    const selected = carts[index].selected;
    carts[index].selected = !selected;
    this.setData({
      carts: carts
    });
    app.globalData.carts = carts
    this.getTotalPrice();
  },

  /**
   * 删除购物车当前商品
   */
  deleteList(e) {
    const index = e.currentTarget.dataset.index;
    let carts = this.data.carts;
    carts.splice(index, 1);
    this.setData({
      carts: carts
    });
    app.globalData.carts = carts
    if (!carts.length) {
      this.setData({
        hasList: false
      });
    } else {
      this.getTotalPrice();
    }
  },

  /**
   * 购物车全选事件
   */
  selectAll(e) {
    let selectAllStatus = this.data.selectAllStatus;
    selectAllStatus = !selectAllStatus;
    let carts = this.data.carts;

    for (let i = 0; i < carts.length; i++) {
      carts[i].selected = selectAllStatus;
    }
    this.setData({
      selectAllStatus: selectAllStatus,
      carts: carts
    });
    app.globalData.carts = carts
    this.getTotalPrice();
  },
  
  //购物车加减数量
  updataCartNum:function(e){
    
  },

  /**
   * 绑定加数量事件
   */
  addCount(e) {
    const index = e.currentTarget.dataset.index;
    let carts = this.data.carts;
    let num = carts[index].num;
    num = num + 1;
    carts[index].num = num;
    this.setData({
      carts: carts
    });
    app.globalData.carts = carts
    this.getTotalPrice();
  },

  /**
   * 绑定减数量事件
   */
  minusCount(e) {
    const index = e.currentTarget.dataset.index;
    const obj = e.currentTarget.dataset.obj;
    let carts = this.data.carts;
    let num = carts[index].num;
    if (num <= 1) {
      return false;
    }
    num = num - 1;
    carts[index].num = num;
    this.setData({
      carts: carts
    });
    app.globalData.carts = carts
    this.getTotalPrice();
  },

  /**
   * 计算总价
   */
  getTotalPrice() {
    let carts = this.data.carts;                  // 获取购物车列表
    let total = 0;
    for (let i = 0; i < carts.length; i++) {         // 循环列表得到每个数据
      if (carts[i].selected) {                     // 判断选中才会计算价格
        total += carts[i].num * carts[i].price;   // 所有价格加起来
      }
    }
    this.setData({                                // 最后赋值到data中渲染到页面
      carts: carts,
      totalPrice: total.toFixed(1)
    });
    app.globalData.carts = carts
  }

})