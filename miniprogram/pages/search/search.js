const db = wx.cloud.database();
const app = getApp()
Page({
  data: {
    logs: [],
    keyword:'',
    snackList: [],
    searchStatus: true
  },

  //关键字搜索
  onKeywordConfirm:function(event){
  const db = wx.cloud.database()
    var that = this
    console.log(event)
    db.collection('snack').where({
    //使用正则查询，实现对搜索的模糊查询
    name: db.RegExp({
      regexp: event.detail.value,
      //从搜索栏中获取的value作为规则进行匹配。
      options: 'i',
      //大小写不区分
    })
  }).get({
    success: res => {
      console.log(res)
      that.setData({
        snackList: res.data
      })
    }
  })
},
  handleSelect(e) {
    // const ind = e.currentTarget.dataset.ind
    // const selected = e.currentTarget.dataset.selected
    // const snacklist = this.data.snacklist
    // snacklist[ind].selected = !selected
    // this.setData({
    //   snacklist
    // })

    const _id = e.currentTarget.dataset.id
    this.addToCart(_id)
  },
  addToCart: function (id) {
    
    const _ = db.command
    const snack_id = id
    const openid = app.globalData.openId

    db.collection('cart').where({
      snack_id: snack_id,
      _openid: openid
    }).get({
      success(res) {
        //如果查询到数据,则数量加1
        if (res.data && res.data.length > 0) {
          var id = res.data[0]._id
          db.collection('cart').doc(id)
            .update({
              data: {
                // 表示指示数据库将字段自增 1
                quantity: _.inc(1)
                //自减1为：_.inc(-1)
              },
              success: function (res) {
                wx.showToast({
                  icon: 'none',
                  title: '成功加入购物车'
                })
                console.log('购物车数量+1')
              },
              fail: function (res) {
                wx.showToast({
                  icon: 'none',
                  title: '加入购物车失败'
                })
                console.log('购物车数量+1失败')
              }
            })
        }
        //否则插入记录到购物车表:通过查询snack_id零食的信息res合并数量插入购物车记录
        else {
          db.collection('snack').where({
            _id: snack_id
          }).get().then(res => {
            db.collection('cart').add({
              data: {
                snack_id: res.data[0]._id,
                introduce: res.data[0].introduce,
                name: res.data[0].name,
                num: res.data[0].num, //商品数量
                price: res.data[0].price,
                selected: res.data[0].selected,
                stock: res.data[0].stock,
                type: res.data[0].type,
                url: res.data[0].url,
                quantity: 1 //加入购物车的数量
              }
            }).then(res => {
              wx.showToast({
                icon: 'none',
                title: '成功加入购物车'
              })
              console.log('成功加入购物车', res);
            }).catch(err => {
              wx.showToast({
                icon: 'none',
                title: '加入购物车失败'
              })
              console.log(err);
            })
          })
        }
      },
      fail(err) {
        console.log(err);
      }
    })
  }, 
  onLoad: function () {

  }
})