// miniprogram/pages/detail/detail.js
import { updateCart } from '../../util/util'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    detail: {
      img: 'https://dss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1377619755,3452328444&fm=26&gp=0.jpg',
      title: '每日坚果大礼包孕妇儿童款30包混合坚果750g干果仁零食组合装礼盒',
      subtitle: '一盒30包礼盒装 净重750g 30天量 每日新鲜',
      price: '23',
      mouthNum: '1451',
      list: [
        { title: '配料表', content: '腰果 核桃仁 扁桃仁 榛子仁 蔓越莓 芒果干 红提干 芒果干' },
        { title: '储藏方法', content: '常温存放，冷藏存放口感更佳' },
        { title: '保质期', content: '270天' },
        { title: '净含量', content: '750g' },
      ]
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const id = options.id
    console.log(id)
    this.setData({
      id
    })
  },

  handleAdd(){
    const _id = this.data.id
    updateCart(_id, 1)
    wx.showToast({
      icon: 'none',
      title: '成功加入购物车'
    })
  }

})