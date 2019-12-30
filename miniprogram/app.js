//app.js
App({
  onLaunch: async function () {

    wx.login({
      success (res) {
        if (res.code) {
          wx.showToast({
            title: '登录成功'
          })
          //发起网络请求
          // wx.request({
          //   url: 'https://test.com/onLogin',
          //   data: {
          //     code: res.code
          //   }
          // })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
    
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        // env 参数说明：
        //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
        //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
        //   如不填则使用默认环境（第一个创建的环境）
        // env: 'my-env-id',;;;;;
        traceUser: true,
      })
    }

    // 获取商品数据
    const db = wx.cloud.database()
    let snacksCollection = db.collection('snack');
    let snacksList = []
    for(let i = 0; i < 5; i++){
      let item = await db.collection('snack')
        .where({
          type: i
        })
        .orderBy('price', 'desc')
        .get().then((res) => {
          return res.data
      })
      snacksList.push(item)
    }
    
    this.globalData = {
     // cloudRoot: "clo140d-voyz-cloud-86f82a/",
      carts: [],
      cartTotal: 0,
      cartTotalPrice: 0,
      classifyList: snacksList, // 商品数据
      tmpNum: 0,
      tempFilePaths: "",
      admin: ["Mr.Voyz"],
      openId: '',
      appid: 'wx0dd8c5c9ebe90a78',
      mch_id: '1519277861',
      apikey: 'James487493259359826923695832443',
      offLine: false,
      school_Arr: [
        "交大",
        "华师大"
      ],
      address_Arr: [
        "宿舍楼", "学院", "图书馆", "餐厅", "教学楼", "其他"
      ],

    },
    
    this.selectCart() //初始化购物车
    this.getOpenId()
  },
  // --------------常用----------------
  
  //查询购物车
  selectCart: function (options) {
    const db = wx.cloud.database()
    wx.cloud.callFunction({
      name: 'login',
      success: res => {
        db.collection('cart').where({
          _openid: res.result.openid
        }).get()
          .then(res => {
            this.globalData.carts = res.data
            //console.log('初始化购物车', res)
          })
          .catch(err => console.error(err))
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
      }
    })
  },


  //获取用户openid
  getOpenId: function () {
    wx.cloud.callFunction({
      name: 'login'
    }).then(res => {
      console.log('res.openID', res.result.openid);
      this.globalData.openId=res.result.openid
    }).catch(err => console.error(err))
  },


  //获取用户openid
    getOpenId: function () {
      wx.cloud.callFunction({
        name: 'login'
      }).then(res => {
        //console.log('res.openID', res.result.openid);
        this.globalData.openId=res.result.openid
        }).catch(err => console.error(err))
  }
})

