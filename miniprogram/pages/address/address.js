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

  //添加新地址
  addAddress:function(){
    wx.navigateTo({
      url: `/pages/addAddress/addAddress?type=0`
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
  updateAddress:function(e){
    const id = e.currentTarget.dataset.addressid
    wx.navigateTo({
      url: `/pages/addAddress/addAddress?type=1&addressid=${id}`
    })
  },

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

  navigateTo(e){
    if(this.data.type !== 2){
      const _id = e.currentTarget.dataset.id
      wx.redirectTo({
        url: `/pages/makeorder/makeorder?addressid=${_id}`
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //应该在页面加载完成后自动获取openid
    options.type && this.setData({type})
  },
  
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.searchAddress()
    
  },

})