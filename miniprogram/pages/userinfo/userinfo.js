// miniprogram/pages/userinfo/userinfo.js
const db = wx.cloud.database();//初始化数据库
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userinfo:[]
  },
  //判断用户是否存在（不存在则调用新建方法）
  searchUser:function(){
    wx.cloud.callFunction({
      name: 'login'
    }).then(res => {
      db.collection('user').where({
        _openid: res.result._openid
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
        _openid: res.result._openid
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