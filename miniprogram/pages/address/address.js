// miniprogram/pages/address/address.js
const db = wx.cloud.database();//初始化数据库

Page({

  /**
   * 页面的初始数据
   */
  data: {
    openid:null,
    address:[],
    //addressid:null
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
  },
  //添加新地址
  addAddress:function(){
    db.collection('address').add({
      data: {
        name: '菲菲',
        telephone:'1378880000',
        province:'广东省',
        city:'广州市',
        area:'海珠区',
        detail:'xx大厦'       
      }
    }).then(res => {
      console.log(res);
    }).catch(err => {
      console.log(err);
    })
  },
  //查看该用户所有地址
  searchAddress: function () {
    wx.cloud.callFunction({
      name:'login'
    }).then(res=>{
      db.collection('address').where({
        _openid: res.result.openid
      })
      .get().then(res2 => {
        console.log(res2);
        this.setData({
          address: res2.data
        });
      })
    })
  },
  //更新地址页面（先根据前端传入的地址id获取对应地址）
  searchOneAddress:function(event){
    var addressid = event.target.dataset.addressid
    db.collection('addressid').where({
      _id:addressid
    }).get().then(res=>{
      this.setData({
        item:res.data
      })
    })
  },
  //更新地址
  updataAddress:function(e){
    db.collection('address').doc('')
    .update({
      data: {
        name: '',
        telephone: '',
        province: '',
        city: '',
        area: '',
        detail: ''
      }
    }).then(res => {
      console.log(res);
    }).catch(err => {
      console.log(err);
    })
  },
  /*getAddressId(event){
    wx.navigateTo({
      url: '../address/address?addressid=${event.target.dataset.addressid}',
    })
  },
*/
  //删除某一地址
  deleteAddress:function(event){  
    var addressid=event.target.dataset.addressid
    console.log('id', event.target.dataset.addressid)
    db.collection('address')
      .doc(addressid)
      .remove()
      .then(res => {
        console.log(res);
        this.searchAddress();
      })
      .catch(err => {
        console.log(err);
      })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //应该在页面加载完成后自动获取openid
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