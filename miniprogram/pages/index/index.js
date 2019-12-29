//index.js
//获取应用实例
import { updateCart } from '../../util/util'
const app = getApp()
const db = wx.cloud.database()

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
    snacklist:[],
    tabList: [
      { id: 0, imgUrl: '../../images/categoryList/shipincanyinzizhi.png', title: '首页食品' },
      { id: 1, imgUrl: '../../images/categoryList/-fen-.png', title: '冷冻食品' },
      { id: 2, imgUrl: '../../images/categoryList/shipin-mangguo.png', title: '水果' },
      { id: 3, imgUrl: '../../images/categoryList/shipin_buding.png', title: '甜点' },
      { id: 8, imgUrl: '../../images/categoryList/chongwushipin.png', title: '宠物食品' },
      { id: 9, imgUrl: '../../images/categoryList/kcb_hangyeicon-.png', title: '行业标准' },
      { id: 10, imgUrl: '', title: '' },
      { id: 11, imgUrl: '', title: '' },
    ],
    tabList1: [
      { id: 4, imgUrl: '../../images/categoryList/shipin_hanbao.png', title: '膨化食品' },
      { id: 5, imgUrl: '../../images/categoryList/shipin_niunai.png', title: '饮品' },
      { id: 6, imgUrl: '../../images/categoryList/shipin_shucai.png', title: '蔬菜' },
      { id: 7, imgUrl: '../../images/categoryList/shipin_tangguo.png', title: '糖果' },
      
    ]
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
        console.log('snacklist:', res.data);
      },
      fail: console.error
    })
  },

  onShareAppMessage: function () {
    return {
      title: '听说今日有极大优惠！快来看看',
      path: '/pages/index/index',
      imageUrl: 'http://pic38.nipic.com/20140302/4719186_233831238384_2.jpg'
    }
  },

  handleSelect(e){
    // const ind = e.currentTarget.dataset.ind
    // const selected = e.currentTarget.dataset.selected
    // const snacklist = this.data.snacklist
    // snacklist[ind].selected = !selected
    // this.setData({
    //   snacklist
    // })
 
    const _id = e.currentTarget.dataset.id
    // this.addToCart(_id)
    updateCart(_id, 1)
    wx.showToast({
      icon: 'none',
      title: '成功加入购物车'
    })
  },

  addToCart:function(id){
    const _ = db.command
    const snack_id = id
    const openid  = app.globalData.openId

    db.collection('cart').where({
      snack_id: snack_id,
      _openid: openid
    }).get({
      success(res) {
        //如果查询到数据,则数量加1
        if (res.data && res.data.length > 0) {
          var id=res.data[0]._id
          db.collection('cart').doc(id)
            .update({
              data: {
                // 表示指示数据库将字段自增 1
                quantity: _.inc(1)
                //自减1为：_.inc(-1)
              },
              success: function (res) {
                wx.showToast({
                  icon: 'none',
                  title: '成功加入购物车'
                })
                console.log('购物车数量+1')
              },
              fail:function(res){
                wx.showToast({
                  icon: 'none',
                  title: '加入购物车失败'
                })
                console.log('购物车数量+1失败')
              }
            })
        }
        //否则插入记录到购物车表:通过查询snack_id零食的信息res合并数量插入购物车记录
        else {
          db.collection('snack').where({
            _id: snack_id
          }).get().then(res=>{ 
            db.collection('cart').add({
              data:{
                snack_id: res.data[0]._id,
                introduce:res.data[0].introduce,
                name: res.data[0].name,
                num: res.data[0].num, //商品数量
                price: res.data[0].price,
                selected:res.data[0].selected,
                stock: res.data[0].stock,
                type: res.data[0].type,
                url: res.data[0].url,
                quantity:1 //加入购物车的数量
              }
            }).then(res => {
              wx.showToast({
                icon: 'none',
                title: '成功加入购物车'
              })
              console.log('成功加入购物车',res);
            }).catch(err => {
              wx.showToast({
                icon: 'none',
                title: '加入购物车失败'
              })
              console.log(err);
            })
          })
        }
      },
      fail(err){
        console.log(err);
      }
    })
  },
  
  handleScanner(){
    wx.scanCode({
      onlyFromCamera: false,
      scanType: ['barCode', 'qrCode', 'datamatrix','pdf417'],
      success: res => {
        if(res.errMsg == 'scanCode:ok'){
          wx.showToast({
            icon: 'none',
            title: '扫码成功',
            // content: res
          })
          // wx.navigateTo({
            // url: '../../pages/search/search?keyword=' + res.result
          // })
        }
      },
      fail: res => {
        wx.showToast({
          icon: 'none',
          title: '网络差劲，请稍后重试！'
        })
      },
      complete: res => {
        console.log(res)
      }
    });
  },
  
})
