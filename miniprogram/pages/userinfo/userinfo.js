// miniprogram/pages/userinfo/userinfo.js
const db = wx.cloud.database();//初始化数据库
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userinfo:[],
    user: {
      name: '',
      age:''
    },
    buttonText: '新增'
  },
  //判断用户是否存在（不存在则调用新建方法）
  searchUser:function(){
    wx.cloud.callFunction({
      name: 'login'
    }).then(res => {
      db.collection('user').where({
        _openid: res.result.openid
      }).get().then(res2 => {
        console.log(res2);
        this.setData({
          userinfo: res2.data
        });
      }).catch(err=>{
        this.addUser()
      })
    })
  },
  //新建用户
  addUser:function(){
   db.collection('user').add({
     data:{
       name:'',
       age:'',
       telephone:''
     }
   }).then(res=>{
     console.log(res)
   }).catch(err=>{
     console.log(err)
   })
  },

  //查看用户信息
  searchAddress: function () {
    wx.cloud.callFunction({
      name: 'login'
    }).then(res => {
      db.collection('user').where({
        _openid: res.result.openid
      }).get().then(res2 => {
        console.log(res2);
        this.setData({
          userinfo: res2.data
        });
      }).catch(err=>{
        console.log(err)
      })
    })
  },
  //更新用户信息
  updateUser:function(){
    db.collection('user').doc('')
      .update({
        data: {
          name: '',
          telephone: '',
          age:''
        }
      }).then(res => {
        console.log(res);
      }).catch(err => {
        console.log(err);
      })
  },

  fetch() {
    const _this = this
    wx.cloud.callFunction({
      name: 'login'
    }).then(res => {
    db.collection('user').where({
      _openid:res.result.openid
      // _id: 'e8f863ba5e0896c4087b4c1c471698cd',
      // _openid: openid
    }).get({
      success(res) {
        console.log(res)
        _this.setData({
          user: res.data[0]
        })
      },
      fail(err) {
        console.log(err);
      }
    })
    })
  },

  updateUserInfo: function () {
      const { name, age } = this.data.user
    wx.cloud.callFunction({
      name: 'login'
    }).then(res => {
      db.collection('user').where({
        _openid:res.result.openid})
        .update({  // 修改
        data: {
          name:name,
          age:age
        },
        success: function (res) {
          console.log('更新成功', res)
         /*wx.showToast({
            icon: 'none',
            title: '更新成功'
          })
          setTimeout(() => {
            wx.navigateBack({
              delta: 1, // 回退前 delta(默认为1) 页面
            })
          }, 300)*/
        },
        fail: function (res) {
          console.log('更新失败', res)
          /*wx.showToast({
            icon: 'none',
            title: '更新失败'
          })*/
        }
      })
    })
  },

  handleInput(e) {
    const key = e.currentTarget.dataset.key
    const user = {
      ...this.data.user,
    }
    user[key] = e.detail.value
    this.setData({
      user
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    options.type == 1 && this.fetch()  // 0新增，1修改

    this.setData({
      type: options.type,
      //addressid: options.addressid,
      buttonText: options.type == 0 ? '新增' : '修改'
    })
    // wx.navigateTo({
    //   url: '/pages/addAddress/addAddress'
    // })

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