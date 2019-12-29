// pages/user/user.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [
      { id: '1', title: '编辑资料', link: '/pages/userinfo/userinfo' },
      { id: '2', title: '账号绑定设置', link: '' },
      { id: '3', title: '清除缓存', link: '' },
      { id: '4', title: '字体大小', link: '' },
      { id: '5', title: '列表显示摘要', link: '' },
      { id: '6', title: '离线下载', link: '' },
      { id: '8', title: '检查版本', link: '' },
      { id: '9', title: '地址管理', link: '/pages/address/address' },
      { id: '10', title: '我的订单', link: '/pages/order/order' },
    ],
    hasAddress: false,
  },

  switchChange(e){
    console.log('switch发生 change 事件，携带值为', e.detail.value)
  },

  sliderchange(e) {
    console.log(`slider发生change事件，携带值为`, e.detail.value)
  },

  navigateTo(e){
    const url = e.currentTarget.dataset.link
    if(url){
      wx.navigateTo({
        url
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
})