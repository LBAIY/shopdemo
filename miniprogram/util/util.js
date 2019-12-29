let db = wx.cloud.database()
let app = getApp()



/*
加入购物车
snack_id：商品的_id
tag:  [0:-  1:+]
*/
const updateCart = function (snack_id,tag) {
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
        if (tag == 0){    //进行-运算
          if (res.data[0].quantity>1){    
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
          }else{       
            console.log('购物车数量-1失败，已经是最小数量---前端反馈')
          }
        }else{            //进行+运算
          if (res.data[0].quantity < res.data[0].num){
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
          }else{
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
}

const addToCart = async function (id) {
  const _ = db.command
  const snack_id = id // 零食的id 0 1 2 3 4 。。。
  const openid = app.globalData.openId
  
  await db.collection('cart').where({
    snack_id: snack_id,
    _openid: openid
  }).get({
    success(res) {
      //如果查询到数据,则数量加1
      if (res.data && res.data.length > 0) {
        var id = res.data[0]._id
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
          fail: function (res) {
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
          id: snack_id
        }).get().then(res => {
          db.collection('cart').add({
            data: {
              snack_id: res.data[0].id,
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
            wx.showToast({
              icon: 'none',
              title: '成功加入购物车'
            })
            console.log('成功加入购物车', res);
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
    fail(err) {
      console.log(err);
    }
  })
  
  app.selectCart()
}
// 减少购物车
const reduceToCart = async function(id) {
  var openid = app.globalData.openId
  const _ = db.command
  var snack_id = id     //前端的data-index
  await db.collection('cart').where({
    snack_id: snack_id,
    _openid: openid
  }).get({
    success(res) {
      //如果查询到数据,且数量为1
      if (res.data && res.data.length > 0 && res.data[0].quantity === 1) {
        let _id = res.data[0]._id
        db.collection('cart')
        .doc(_id)
        .remove()
        .then(res => console.log('删除一条购物车记录', res))
        .catch(err => console.error(err))
      }
      //否则插入记录到购物车表:通过查询snack_id零食的信息res合并数量插入购物车记录
      else {
        let _id = res.data[0]._id
        db.collection('cart').doc(_id)
        .update({
          data: {
            // 表示指示数据库将字段减 1
            quantity: _.inc(-1)
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
  app.selectCart()
  
}


  //新增订单
  /* //新增订单详情
  addressid: 地址的id
  snacks: {
    id:商品的id,
    quantity: 商品的数目
  }
  */
const addOrder = function (addressid, snacks) {
    
    var time = this.CurrentTime();
    var it = this.RndNum(); //新建订单时需要同时调用三个方法
    var newOrderId = it;
    // var addressid = 'dbff9fc75e070b2c080dd1e8706c4816'
    db.collection('order_info').add({
      data: {
        _id: newOrderId,
        telephone: '13788880000',
        address_id: addressid,
        total: '23',
        time: time
      }
    }).then(res => {
      console.log(res)
      //this.addOrderSnack(newOrderId,snackId),
      this.addOrderAddress(newOrderId, addressid)
    }).catch(err => {
      console.log(err)
    })
  }
  // 获取时间戳
const CurrentTime = function () {
    console.log('888888888')
    var now = new Date();
    var year = now.getFullYear();       //年
    var month = now.getMonth() + 1;     //月
    var day = now.getDate();            //日
    var hh = now.getHours();            //时
    var mm = now.getMinutes();          //分
    var ss = now.getSeconds();           //秒

    var clock = year.toString();
    if (month < 10) clock += "0";
    clock += month;
    if (day < 10) clock += "0";
    clock += day;
    if (hh < 10) clock += "0";
    clock += hh;
    if (mm < 10) clock += '0';
    clock += mm;
    if (ss < 10) clock += '0';
    clock += ss;
    return (clock);
  }
  // 随机数生成函数
const RndNum = function () {
    return Math.random().toString(32).substr(2, 15);
  }
  //新增订单数据同时添加订单-地址数据
const addOrderAddress = function (newOrderId, addressid) {
    /* var addressname='';
     var addresstelephone = '';
     var addressprovince = '';
     var addresscity = '';
     var addressarea = '';
     var addressdetail = '';*/
    db.collection('address').doc(addressid).get()
      .then(res => {
        console.log(res),
          /* this.setData({
             addressname:res.data.name,
             addresstelephone: res.data.telephone,
             addressprovince: res.data.province,
             addresscity: res.data.city,
             addressarea: res.data.area,
             addressdetail: res.data.detail,
           })*/
          db.collection('order_address').add({
            data: {
              order_id: newOrderId,
              address_id: addressid,
              name: res.data.name,
              telephone: res.data.telephone,
              province: res.data.province,
              city: res.data.city,
              area: res.data.area,
              detail: res.data.detail,
            }
          }).then(res2 => {
            console.log(res2)
          }).catch(err => { console.log(err) })
      }).catch(err => {
        console.log(err)
      });
  }
export {
  updateCart,
  addToCart,
  reduceToCart,
  addOrder,
  CurrentTime,
  RndNum,
  addOrderAddress
}
