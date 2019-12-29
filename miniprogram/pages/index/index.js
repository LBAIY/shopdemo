//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    banner: [
      {
        id:1,
        url:"https://s3.cdn.xiangha.com/caipu/201707/031210164843.jpg/MHgw"
      },{
        id:2,
        url:"https://s3.cdn.xiangha.com/caipu/201707/031455386879.jpg/MHgw"
      },{
        id:3,
        url:"https://s3.cdn.xiangha.com/caipu/201707/031210164843.jpg/MHgw"
      }
    ],
    snacklist:[]
  },

  /*onLoad() {
    var self = this;
    wx.getStorage({
      key: 'address',
      success: function (res) {
        self.setData({
          address: res.data
        })
      }
    })

  },
  */
  onLoad: async function () {
    const db = wx.cloud.database()
    db.collection('snack').get({
      success: res => {
        this.setData({
          snacklist: res.data
        })
        console.log(res.data);
      },
      fail: console.error
    })
    
  }
  
})
