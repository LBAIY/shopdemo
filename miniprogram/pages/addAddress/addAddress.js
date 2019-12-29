// miniprogram/pages/addAddress.js
const app = getApp()
const db = wx.cloud.database();//初始化数据库

Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: {
      name: '',
      telephone:'',
      province:'',
      city:'',
      area:'',
      detail:''
    },
    buttonText: '新增'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    options.type == 1 && this.fetch(options.addressid)  // 0新增，1修改

    this.setData({
      type: options.type,
      addressid: options.addressid,
      buttonText: options.type == 0 ? '新增' : '修改'
    })
    // wx.navigateTo({
      //   url: '/pages/addAddress/addAddress'
      // })
      
    },
    
    fetch(_id) {
      const _this = this

      db.collection('address').where({
          _id,
        // _id: 'e8f863ba5e0896c4087b4c1c471698cd',
        // _openid: openid
      }).get({
        success(res) {
          console.log(res)
          _this.setData({
            address: res.data[0]
          })
        },
        fail(err){
          console.log(err);
        }
      })
  },

  updateAddress: function(){
    const { type, addressid, address } = this.data
    if(type == 0){
      db.collection('address').add({  // 0新增
        data: {
          ...address
        }
      }).then(res => {
        console.log('新增成功', res);
        wx.showToast({
          icon: 'none',
          title: '新增成功'
        })
        setTimeout(() => {
          wx.navigateBack({
            delta: 1, // 回退前 delta(默认为1) 页面
          })
        }, 300)
      }).catch(err => {
        console.log('新增失败', err);
        wx.showToast({
          icon: 'none',
          title: '新增失败'
        })
      })
    } else {
      console.log('addressid',addressid)
      const { name, telephone, province, city, area, detail } = address
      db.collection('address').doc(addressid).update({  // 1修改
        data: {
          name,
          telephone,
          province,
          city,
          area,
          detail,
        },
        success: function (res) {
          console.log('更新成功', res)
          wx.showToast({
            icon: 'none',
            title: '更新成功'
          })
          setTimeout(() => {
            wx.navigateBack({
              delta: 1, // 回退前 delta(默认为1) 页面
            })
          }, 300)
        },
        fail:function(res){
          console.log('更新失败', res)
          wx.showToast({
            icon: 'none',
            title: '更新失败'
          })
        }
      })
    }
    
  },

  handleInput(e){
    const key = e.currentTarget.dataset.key
    const address = {
      ...this.data.address,
    }
    address[key] = e.detail.value
    this.setData({
      address
    })
  }
})