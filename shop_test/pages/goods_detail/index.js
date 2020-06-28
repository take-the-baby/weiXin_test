import { request } from '../../request/index.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goods_id: '', // 传过来的商品id
    goodsDetail: {}, // 商品详情数据
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      goods_id: options.goods_id
    })
    this.getGoodsDetail()
  },
  async getGoodsDetail() {
    const res = await request({url:'/goods/detail',data:{goods_id:this.data.goods_id}})
    if(res.data && res.data.meta.status == 200) {
      this.setData({
        goodsDetail: res.data.message
      })
    }
  },
  // 图片点击放大
  handPreviewIamge(e) {
    let urls = this.data.goodsDetail.pics.map(item =>{return item.pics_mid})
    wx.previewImage({
      urls: urls,
      current: e.currentTarget.dataset.url
    })
  },
  // 应用小程序缓存添加
  addShopping() {
    let cart = wx.getStorageSync("cart") || [];
    let index = -1;
    cart.forEach((v,i) =>{
      if(v.goods_id == this.data.goods_id){
        index = i
      }
    })
    if(index > -1) {
      cart[index].num++;
    } else {
      this.data.goodsDetail.num = 1;
      cart.push(this.data.goodsDetail)
    }
    wx.setStorageSync("cart", cart)
    wx.showToast({
      title: "加入购物车成功",
      icon: 'success',
      mask: true
    })
  },
})