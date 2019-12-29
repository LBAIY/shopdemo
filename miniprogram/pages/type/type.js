// miniprogram/pages/type.js
const db = wx.cloud.database()
const app = getApp()
var openid = ''
Page({

  /**
   * 页面的初始数据
   */
  data: {
    allType:[],
    resByType:[],
    resOrByPrice:[],
    num:446
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },
  //零食种类列表：分组查询（去重）
  allType:function(){
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
        success:res=>{
          this.setData({
            allType:res.list
          })
          console.log(res);
        },
         fail: err => {
           console.log(err);
         }
      }
      )
  },

  //按零食类别查询：拿到前端的点击类别--返回类型为数组
  selectByType: function (e) {
    const db = wx.cloud.database()
    const type = e.currentTarget.dataset.index
    db.collection('snacks').where({
      type: this.data.allType[type]._id
    })
    .get({
      success: res => {
        this.setData({
          //queryResult: JSON.stringify(res.data, null, 2)
          resByType:res.data
        })
        console.log('[数据库] [查询记录] 成功: ', res)
      },
      fail: err => {
        console.error('[数据库] [查询记录] 失败：', err)
      }
        })
    // db.collection('snacks').where({
    //   type: "糖果"
    // }).get().then(res => {
    //   console.log(res);
    // }).catch(err => {
    //   console.log(err);
    // })
  },

  //按价格排序（升序）
  orderByPrice:function(){
    db.collection('snack')
      .where({
        type:"干果"
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

  //计算价格
  onPay:function(){
    for(var i=0;i<cart.length;i++){
      console.log(cart[i].num*cart[i].price)
    }
  },
  
  /*加入购物车
  1.判断是否登陆(onload)
  2.判断其购物车是否有该商品（有：数量+1；否则，新增记录）
  */
  addToCart:function(e){
    const _ = db.command
    var snack_id = e.currentTarget.dataset.index     //前端的data-index
    this.setData({
      openid: app.globalData.openId
    })
    db.collection('cart').where({
      snack_id: snack_id,
      _openid: openid
    }).get({
      success(res) {
        //如果查询到数据,则数量加1
        if (res.data && res.data.length > 0) {
          var id=res.data[0]._id
          db.collection('cart').doc(id)
          .update({
            data: {
              // 表示指示数据库将字段自增 1
              quantity: _.inc(1)
              //自减1为：_.inc(-1)
            },
            success: function (res) {
              console.log('购物车数量+1')
            },
            fail:function(res){
              console.log('购物车数量+1失败')
            }
          })
        } 
        //否则插入记录到购物车表:通过查询snack_id零食的信息res合并数量插入购物车记录
        else {
          db.collection('snack').where({
            _id: snack_id
          }).get().then(res=>{ 
            db.collection('cart').add({
              data:{
                snack_id: res.data[0]._id,
                introduce:res.data[0].introduce,
                name: res.data[0].name,
                num: res.data[0].num,  //商品数量
                price: res.data[0].price,
                selected:res.data[0].selected,
                stock: res.data[0].stock,
                type: res.data[0].type,
                url: res.data[0].url,
                quantity:1  //加入购物车的数量
              }
            }).then(res => {
              console.log('成功加入购物车',res);
            }).catch(err => {
              console.log(err);
            })
          })
        }
      },
      fail(err){
        console.log(err);
      }
      })
  },
  
//查询购物车  
  selectCart:function(e){
    wx.cloud.callFunction({
      name: 'login',
      success: res => {
        db.collection('cart').where({
          _openid: res.result.openid       
        }).get()
          .then(res => console.log(res))
          .catch(err => console.error(err))
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
      }
    })
    //------查询购物车:需要云函数
    /*var $ = db.command.aggregate
    db.collection('cart').aggregate()
      .lookup({
        from: "snacks",
        localField: "snack_id",
        foreignField: "_id",
        as: "snackList"
      })
      .replaceRoot({
        newRoot: $.mergeObjects([$.arrayElemAt(['$snackList', 0]), '$$ROOT'])
      })
      .project({
        snackList: 0
      })
      .end()
      .then(res => console.log(res))
      .catch(err => console.error(err))*/
  },

  //清空购物车记录--云函数
  removeAllCart: function (e) {
    const _ = db.command
    wx.cloud.callFunction({
      name: 'cartDelete',
      success: res => {
        console.log('清空购物车',res)
      },
      fail: err => {
        console.error('[云函数] [cartDelete] 调用失败', err)
      }
    })
  },
  //删除一条购物车记录
  removeCart: function (e) {
    const _ = db.command
    var _id = e.currentTarget.dataset.index     //前端的data-index
    db.collection('cart')
      .doc(_id)
      .remove()
    .then(res=>console.log('删除一条购物车记录',res))
    .catch(err => console.error(err))
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  var _this=this
  this.allType()
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