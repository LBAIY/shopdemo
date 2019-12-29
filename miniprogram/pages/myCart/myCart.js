// pages/myCart/myCart.js
const app = getApp();

//import { updateCart } from '../../util/util.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cart: [],
    cartAllIn: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("跳转至购物车")
    this.setData({
      cart: app.globalData.carts,
    })
    // console.log(this.data.cart)
    // console.log(app.globalData.carts)
  },

  updateCart: function (snack_id, tag) {
    const app = getApp()
    const db = wx.cloud.database()
    const _ = db.command
    var openid = app.globalData.openId
    db.collection('cart').where({
      snack_id: snack_id,
      _openid: openid
    }).get({
      success(res) {
        //是否查询到数据
        if (res.data && res.data.length > 0) {
          //查询到数据，判断是+还是-
          if (tag == 0) {    //进行-运算
            if (res.data[0].quantity > 1) {
              var id = res.data[0]._id
              db.collection('cart').doc(id)
                .update({
                  data: {
                    // 表示指示数据库将字段自增 1
                    quantity: _.inc(-1)
                  },
                  success: function (res) {
                    console.log('购物车数量-1')

                  },
                  fail: function (res) {
                    console.log('购物车数量-1失败')
                  }
                })
            } else {
              console.log('购物车数量-1失败，已经是最小数量---前端反馈')
            }
          } else {            //进行+运算
            if (res.data[0].quantity < res.data[0].num) {
              var id = res.data[0]._id
              db.collection('cart').doc(id)
                .update({
                  data: {
                    // 表示指示数据库将字段自增 1
                    quantity: _.inc(1)
                    //自减1为：_.inc(-1)
                  },
                  success: function (res) {
                    console.log('购物车数量+1')
                  },
                  fail: function (res) {
                    console.log('购物车数量+1失败')
                  }
                })
            } else {
              console.log('已经达到上限，无法增加数量---前端反馈')
            }
          }
        }
        //否则插入记录到购物车表:通过查询snack_id零食的信息res合并数量插入购物车记录
        else {
          db.collection('snack').where({
            _id: snack_id
          }).get().then(res => {
            db.collection('cart').add({
              data: {
                snack_id: res.data[0]._id,
                introduce: res.data[0].introduce,
                name: res.data[0].name,
                num: res.data[0].num, //商品数量
                price: res.data[0].price,
                selected: res.data[0].selected,
                stock: res.data[0].stock,
                type: res.data[0].type,
                url: res.data[0].url,
                quantity: 1 //加入购物车的数量
              }
            }).then(res => {
              console.log('成功加入购物车', res);
            }).catch(err => {
              console.log(err);
            })
          })
        }
        app.selectCart(); //更新全局变量carts
      },
      fail(err) {
        console.log(err);
      }
    })
  },

  // 点击减号--这里加减号可以都调用这个函数，传过来一个tag值即可
  reduceItems: function (e) {
    const index = e.currentTarget.dataset.index;
    const snack_id ='b419f243-cb7d-491f-a2e1-75c9b7bf1037'//这两个值要从前端获取
    const tag=0// 0表示-, 1表示+
    this.updateCart(snack_id, tag)
    //然后就是要更新页面上加减后的数量,也是获取index可以做的
    wx.navigateTo({
      url: '../myCart/myCart',
    })
    // this.data.cart[index].quantity = this.data.cart[index].quantity-1;
    // this.setData({
    //   cart:this.data.cart
    // })
    /*let carts = app.globalData.carts;
    let classifyList = app.globalData.classifyList;
    let i = 0;
    for (let key of carts) {
      console.log(i);
      if (key.id === e.target.dataset.id) {
        key.cartSelected = true;

        if (key.num === 1) {
          console.log("没了");
          key.num--;
          key.cartSelected = false;
          key.selected = false;
          app.globalData.carts = carts.filter((item) => {
            return item.id != e.target.dataset.id;
          })
        } else {
          key.num--;
          console.log(key.num);
        }
      }
      i++;
    }

    let num = 0;
    let totalPrice = 0;
    for (let key of carts) {
      if (key.cartSelected) {
        num += key.num;
        totalPrice += key.quantity * key.price;
      }
    }
    this.setData({
      cart: app.globalData.carts,
      cartTotal: num,
      cartTotalPrice: totalPrice,

    })
    // 调用数据库减少
    const db = wx.cloud.database()
    var openid = 'oUVpX45nNHbe9ELQRSKqlanjaiNE'
    const _ = db.command
    var snack_id = e.target.dataset.id     //前端的data-index
    db.collection('myCart').where({
      id: snack_id,
      _openid: openid
    }).get({
      success(res) {
        //如果查询到数据,且数量为1
        if (res.data && res.data.length > 0 && res.data[0].num === 1) {
          let _id = res.data[0]._id
          db.collection('myCart')
            .doc(_id)
            .remove()
            .then(res => console.log('删除一条购物车记录', res))
            .catch(err => console.error(err))
        }
        //否则插入记录到购物车表:通过查询snack_id零食的信息res合并数量插入购物车记录
        else {
          let _id = res.data[0]._id
          db.collection('myCart').doc(_id)
            .update({
              data: {
                // 表示指示数据库将字段减 1
                num: _.inc(-1)
              },
              success: function (res) {
                console.log('购物车数量-1')
              },
              fail: function (res) {
                console.log('购物车数量-1失败')
              }
          })
        }
      },
      fail(err) {
        console.log(err);
      }
    })
    })*/

  },
  // 点击加号
  addItems: function (e) {
    let carts = app.globalData.carts;
    for (let key of carts) {
      console.log(carts);
      if (key.id === e.target.dataset.id) {
        key.cartSelected = true;
        console.log("add");
        key.num++;
        console.log(key.num);
        console.log(carts);
      }

    }
    let num = 0;
    let totalPrice = 0;
    for (let key of carts) {
      if (key.cartSelected) {
        num += key.num;
        totalPrice += key.quantity * key.price;
      }
    }
    this.setData({
      cart: app.globalData.carts,
      cartTotal: num,
      cartTotalPrice: totalPrice,
    })
    // 调用数据库增加
    const db = wx.cloud.database()
    const _ = db.command
    var snack_id = e.target.dataset.id     //前端的data-index
    var openid = "oUVpX45nNHbe9ELQRSKqlanjaiNE"
    db.collection('myCart').where({
      id: snack_id,
      _openid: openid
    }).get({
      success(res) {
        //如果查询到数据,则数量加1
        if (res.data && res.data.length > 0) {
          let _id = res.data[0]._id
          db.collection('myCart').doc(_id).update({
              data: {
                // 表示指示数据库将字段自增 1
                num: res.data[0].num + 1
                //自减1为：_.inc(-1)
              },
              success: function (res) {
                console.log('购物车数量+1')
              },
              fail: function (res) {
                console.log('购物车数量+1失败')
              }
            })
        }
        //否则插入记录到购物车表:通过查询snack_id零食的信息res合并数量插入购物车记录
        else {
          db.collection('snack').where({
            id: snack_id
          }).get().then(res => {
            db.collection('myCart').add({
              data: {
                cartSelected: true,
                id: res.data[0].id,
                name: res.data[0].name,
                price: res.data[0].price,
                url: res.data[0].url,
                num: 1,
                stock: res.data[0].stock,
                introduce: res.data[0].introduce,
                type: res.data[0].type,
                selected: true
              }
            }).then(res => {
              console.log('成功加入购物车', res);
            }).catch(err => {
              console.log(err);
            })
          })
        }
      },
      fail(err) {
        console.log(err);
      }
    })
  },
  
  // 购物车添加事件
  cartAdd: function (e) {
    console.log(e);
    let carts = this.data.cart;
    for (let key of carts) {
      if (key.id === e.currentTarget.dataset.id) {

        if (key.cartSelected) {
          key.cartSelected = false;
        } else {
          key.cartSelected = true;
        }
        console.log(key.cartSelected);
      }
    }

    let num = 0;
    let totalPrice = 0;
    for (let key of carts) {
      if (key.cartSelected) {
        num += key.num;
        totalPrice += key.quantity * key.price;
      }
    }
    console.log(totalPrice);
    this.setData({
      cart: carts,
      cartTotal: num,
      cartTotalPrice: totalPrice,
    });
    app.globalData.carts = carts;

  },

  // 购物车全选操作
  cartAllIn: function () {

    for (let key of this.data.cart) {
      if (this.data.cartAllIn) {
        key.cartSelected = false;
      } else {
        key.cartSelected = true;
      }
    }
    if (this.data.cartAllIn) {
      this.data.cartAllIn = false;
      app.globalData.cartAllIn = false;
    } else {
      this.data.cartAllIn = true;
      app.globalData.cartAllIn = true;
    }
    let num = 0;
    let totalPrice = 0;
    let carts = this.data.cart;
    for (let key of carts) {
      if (key.cartSelected) {
        num += key.num;
        totalPrice += key.quantity * key.price;
      }
    }

    this.setData({
      cartAllIn: this.data.cartAllIn,
      cart: this.data.cart,
      cartTotal: num,
      cartTotalPrice: totalPrice,
    });
    app.globalData.carts = this.data.cart;
  },

  // 点击购物车操作
  finishedOrder: function () {
    // wx.showToast({
    //   title: "您好像没钱",
    //   icon: "loading",
    //   duration: 2000,
    // });
    wx.navigateTo({
      url: '/pages/makeorder/makeorder',
    })
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
    this.selectCart({
      success:function(){
        console.log('show',this.data.cart)
      }
    })
  },

  //查询购物车
  selectCart: function (options) {
    const db = wx.cloud.database()
    db.collection('cart').where({
      _openid: app.globalData.openId
      }).get()
      .then(res => {
        app.globalData.carts = res.data
        this.setData({
          cart: res.data
        })
        //console.log('初始化购物车', res)
      })
      .catch(err => console.error(err))
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