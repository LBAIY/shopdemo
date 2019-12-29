Page({

  /**
   * 页面的初始数据
   */
  data: {
    //数组 
    type:[],
    allType: [],
    resByType: [],
    resOrByPrice: [],
  },
    //分类信息存储
  //   classify:[
  //     {
  //       url: "http://img1.imgtn.bdimg.com/it/u=228757436,1698566375&fm=27&gp=0.jpg",
  //       class: '新鲜水果',
  //       where: 'fruits',
  //     },
  //     {
  //       url: "http://img3.imgtn.bdimg.com/it/u=3977131877,3939061076&fm=200&gp=0.jpg",
  //       class: '肉类蛋品',
  //       where: 'meat',
  //     },
  //     {
  //       url:"http://img0.imgtn.bdimg.com/it/u=2643138296,454739920&fm=27&gp=0.jpg",
  //       class: '粮油干货',
  //     },

  //     {
  //       url: "http://img4.imgtn.bdimg.com/it/u=1467212894,102176156&fm=27&gp=0.jpg",
  //       class: '休闲零食',
  //     },
  //     {
  //       url:"http://img1.imgtn.bdimg.com/it/u=3747107757,1957790606&fm=27&gp=0.jpg",
  //       class: '酒水饮料',
  //     },
  //     {
  //       url: "http://img4.imgtn.bdimg.com/it/u=485778917,1868567867&fm=27&gp=0.jpg",
  //       class: '厨卫百货',
  //     },
  //   ]
  // },

  //已知分类 查看分类下所有商品
  searchBySort: function () {
    db.collection('snack').where({
      type: '干果'
    }).get({
      success: res => {
        this.setData({
          commodity: res.data
        })
        console.log(res.data);
      },
      fail: console.error
    })
  },
  //零食种类列表：分组查询（去重）
  allType: function () {
    const db = wx.cloud.database()
    const $ = db.command.aggregate
    db.collection('snacks').aggregate()
      .group({
        // 按 type 字段分组
        _id: '$type',
        // 每组有一个 totalAmount 字段，其值是组内所有记录的 Amount 字段的总和
        totalAmount: $.sum('$amount')
      })
      .end(
        {
          success: res => {
            this.setData({
              allType: res.list
            })
            console.log(res);
          },
          fail: err => {
            console.log(err);
          }
        }
      )
  },

  //按价格排序（升序）
  orderByPrice: function () {
    db.collection('snacks')
      .where({
        type: "干果"
      })
      .orderBy('price', 'asc')
      .get({
        success: res => {
          this.setData({
            resOrByPrice: res.data
          })
          console.log('[数据库] [查询记录] 成功: ', res)
        },
        fail: err => {
          console.error('[数据库] [查询记录] 失败：', err)
        }
      })
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