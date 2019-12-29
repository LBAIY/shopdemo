Page({
  data: {
    logs: [],
    snackList:[]
  },

  //关键字搜索
  searchSnack:function(){
  const db = wx.cloud.database()
    var that = this
    db.collection('snack').where({
    //使用正则查询，实现对搜索的模糊查询
    name: db.RegExp({
      regexp: value,
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
  onLoad: function () {

  }
})