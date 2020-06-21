// pages/category/index.js
import { request } from '../../request/index.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    leftListData: [],// 左边列表数据
    rightListData: [], // 右边列表数据
    cates:[], // 接口返回数据
    activeIndex: 0, 
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 缓存接口数据，如果本地有取本地数据
    const cates = wx.getStorageSync('cates')
    if(!cates) {
      this.getCatesData()
    } else {
      // 如果超过5分钟，重新发送请求
      if(Date.now() - cates.time > 1000*60*5) {
        this.getCatesData()
      } else {
        const resData = cates.data;
        const leftListData = resData.map(item =>{return item.cat_name});
        const rightListData = resData[0].children;
        this.setData({
          cates: resData,
          leftListData: leftListData,
          rightListData: rightListData
        })
      }
    }
  },
  // 获取分类数据
  getCatesData() {
    request({'url':'https://api-hmugo-web.itheima.net/api/public/v1/categories'}).then(res =>{
      if(res.data && res.data.meta.status == 200) {
        wx.setStorageSync('cates', {
          time: Date.now(),
          data:  res.data.message
        })
        const resData = res.data.message;
        const leftListData = resData.map(item =>{return item.cat_name});
        const rightListData = resData[0].children;
        this.setData({
          cates: resData,
          leftListData: leftListData,
          rightListData: rightListData
        })
      }
    })
  },
  // 左侧列表点击事件
  leftListClick(e) {
    const {index} = e.currentTarget.dataset;
    const rightListData = this.data.cates[index].children;
    this.setData({
      activeIndex: index,
      rightListData: rightListData
    })
  }
})