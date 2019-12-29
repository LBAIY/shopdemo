//app.js
App({
  onLaunch: async function () {
    
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
    // 登录

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
          console.log(res.data)
        return res.data
      })
      
      snacksList.push(item)
      console.log(snacksList)
    }
    
    this.globalData = {
      // 购物车数据
      carts: [],
      cartTotal: 0,
      cartTotalPrice: 0,
      classifyList: snacksList // 商品数据
    }
  }
})
