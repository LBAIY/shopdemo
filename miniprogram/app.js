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
      cart: [],
      carts: [],
      cartTotal: 0,
      cartTotalPrice: 0,
      classifyList: {
        fruits: [[
          {
            id:0,
            stock:1,
            name: '新鲜橙子',
            price: 13,
            introduce: '橙子起源于东南亚。橙树属小乔木。',
            url: 'https://dss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=4056467868,1274190614&fm=26&gp=0.jpg',
            selected: false,
            num:0
          },
          {
            id:1,
            stock: 1,
            name: '蓝莓',
            price: 20,
            introduce: '蓝莓本身营养丰富,食用之后有益于身体健康,是世界粮农组织推荐的五大健康水果之一。',
            url: 'https://dss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2441061435,3917792559&fm=26&gp=0.jpg',
            selected: false,
            num: 0
          }
        ], [
          {
            id: 2,
            stock: 1,
            name: '新鲜橙子',
            price: 13,
            introduce: '橙子起源于东南亚。橙树属小乔木。',
            url: 'https://dss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=4056467868,1274190614&fm=26&gp=0.jpg',
              selected: false,
              num: 0
          },
          {
            id: 3,
            stock: 1,
            name: '蓝莓',
            price: 20,
            introduce: '蓝莓本身营养丰富,食用之后有益于身体健康,是世界粮农组织推荐的五大健康水果之一。',
            url: 'https://dss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2441061435,3917792559&fm=26&gp=0.jpg',
            selected: false,
            num: 0
          }
        ]]
      }
    }

  }
})
