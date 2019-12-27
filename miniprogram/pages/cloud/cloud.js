// miniprogram/pages/cloud/cloud.js
const db=wx.cloud.database();//初始化数据库
Page({

  /**
   * 页面的初始数据
   */
  data: {
    images:[]
  },

insert:function(){
 /* db.collection('user').add({
    data:{
      name:'jerry',
      age:20
    },
    success:res =>{ //箭头函数
    console.log(res);
    },
    fail:err =>{
      console.log(err);
    }
  })*/
    db.collection('user').add({
      data:{
        name:'jack',
        age:18
      }
    }).then(res=>{
      console.log(res);
    }).catch(err=>{
      console.log(err);
    })
},
 update:function(){
   db.collection('user').doc('b040a67a5e049949076951db2dbfaadb').update({
     data:{
       age:21
     }
   }).then(res=>{
     console.log(res);
   }).catch(err=>{
     console.log(err);
   })
 },

  search: function () {
    db.collection('user').where({
      name:'jason'
    }).get().then(res=>{
      console.log(res);
    }).catch(err=>{
      console.log(err);
    })
      
  },

  delete:function(){
    db.collection('user')
    .doc('b040a67a5e049949076951db2dbfaadb')
    .remove()
    .then(res=>{
      console.log(res);
    })
    .catch(err=>{
      console.log(err);
    })
  },

  sum:function(){
    wx.clound.callFunction({
      name:'sum',
      data:{
        a:2,
        b:3
      }
    }).then(res=>{
      console.log(res);
    }).catch(err=>{
      console.log(err);
    })
  },

  getOpenId:function(){
    wx.cloud.callFunction({
      name:'login'
    }).then(res =>{
      console.log(res);
    }).catch(err=>{
      console.log(err);
    })
  },

  batchDelete:function(){
    wx.cloud.callFunction({
      name:'batchDelete'
    }).then(res=>{
      console.log(res);
    }).catch(err=>{
      console.log(err);
    })
  },

  upload:function(){
    //选择图片
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths
        console.log(tempFilePaths);
        wx.cloud.uploadFile({
          cloudPath: new Date().getTime()+'.jpg', // 上传至云端的路径
          filePath: tempFilePaths[0], // 小程序临时文件路径
          success: res => {
            // 返回文件 ID
            console.log(res.fileID)
            db.collection('image').add({
              data:{
                fileID:res.fileID
              }
            }).then(res=>{
              console.log(res);
            }).catch(err=>{
              console.log(err);
            })
          },
          fail: console.error
        })
      }
    })
  },

  getFile:function(){
    wx.cloud.callFunction({
      name:'login',
    }).then(res=>{
      db.collection('image').where({
        _openid:res.result._openid
      }).get().then(res2=>{
        console.log(res2);
        this.setData({
          images:res2.data
        });
      })
    })
  },


  downloadFile:function(){
    wx.clound.downloadFile({
      fileID:event.target.dataset.fileid,
      success:res=>{
        //返回临时文件路径
        console.log(res.tempFilePath)
        //保存图片到手机相册
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success(res){
            wx.showToast({
              title: '保存成功',
            })
          }
        })
      },
      fail:console.error
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