//app.js
App({
  onLaunch: function () {
    
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        // env 参数说明：
        //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
        //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
        //   如不填则使用默认环境（第一个创建的环境）
        // env: 'my-env-id',
        traceUser: true,
      })
    }

    this.globalData = {
      //用户
      openId:null,
      // 购物车数据
      cart: [],
      carts: [],
      cartTotal: 0,
      cartTotalPrice: 0,
      // 商品数据
      classifyList: [[
        {
          id: 0,
          stock: 1, // 是否下架商品，1为上架，0为下架
          name: '费列罗 巧克力',
          price: 13,
          introduce: '金色经典与珍视的人分享',
          url: 'https://dss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2603383705,19145738&fm=26&gp=0.jpg',
          selected: false,//是否选中
          num: 0 // 数量
        },
        {
          id: 1,
          stock: 1,
          name: 'kinder/健达',
          price: 20,
          introduce: '优选美味 味道纯正',
          url: 'https://dss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1927403880,3670572272&fm=26&gp=0.jpg',
          selected: false,
          num: 0
        }
      ], [
        {
          id: 2,
          stock: 1,
          name: '恰恰 每日坚果7日装',
          price: 13,
          introduce: '6种原料；6种果仁；6种味道',
          url: 'https://dss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1377619755,3452328444&fm=26&gp=0.jpg',
          selected: false,
          num: 0
        },
        {
          id: 3,
          stock: 1,
          name: '沃隆 每日坚果',
          price: 20,
          introduce: '6种原料；6种果仁；6种味道',
          url: 'https://dss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1423547038,3775340237&fm=26&gp=0.jpg',
          selected: false,
          num: 0
        }
      ]]
    }

    
  },

  //获取用户openid
    getOpenId: function () {
    wx.cloud.callFunction({
      name: 'login'
    }).then(res => {
      console.log(res);
      this.setData({
        openid: res.result._openid
      });
    }).catch(err => {
      console.log(err);
    })
  }
  
})
