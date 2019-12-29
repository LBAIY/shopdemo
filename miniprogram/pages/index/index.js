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
    list:[
      {
        id:1,
        src:'https://s3.cdn.xiangha.com/caipu/201510/2415/241543531753.jpg/MjUweDI1MA.webp',
        title:"爱心早餐",
        number:156,
        readed:123,
        collected:666
      },
      {
        id: 2,
        src: 'https://s3.cdn.xiangha.com/caipu/201509/2519/25191649314.jpg/MjUweDI1MA.webp',
        title: "健康夜宵",
        number:263,
        readed: 13,
        collected: 76
      },
      {
        id: 3,
        src: 'https://s3.cdn.xiangha.com/caipu/201604/1916/191710549245.jpg/MjUweDI1MA.webp',
        title: "每日甜点",
        number: 268,
        readed: 123,
        collected: 666
      },
      {
        id: 4,
        src: 'https://s3.cdn.xiangha.com/caipu/201805/0411/041102264562.jpg/MTYweDEyMA',
        title: "营养午餐",
        number: 268,
        readed: 123,
        collected: 666
      },
      {
        id: 5,
        src: 'https://s3.cdn.xiangha.com/videoImg/201509/0721/55ed949bcb4da.JPG/MjUweDI1MA.webp',
        title: "老火靓汤",
        number: 27,
        readed: 123,
        collected: 666
      }
    ],

    snacklist:[]
  },

 getSnackList: function () {
   const db = wx.cloud.database()
     db.collection('snacks').get({
      success: res => {
        this.setData({
          snacklist: res.data
        })
        console.log(res.data);
      },
      fail: console.error


    })
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
  onLoad() {
    var _this=this;
    const db=wx.cloud.database()
    db.collection('snacks').get({
      success:res=>{
        conclose.log(res);
        this.setData({
          snacklist:res.data
        })
      }
    })
    
  }
  
})
