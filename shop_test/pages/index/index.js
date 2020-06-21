//index.jspa
import { request } from '../../request/index.js';
Page({
  /**
   * 页面的初始数据
   */
  data: {
    swiperList: [], // 轮播图数据
    catesList: [], // 分类导航数据
    floorData: [], // 楼层视图数据
  },
  onLoad: function(options) {
    this.getSwiperData();
    this.getCateData();
    this.getFloorData();
  },
  // 获取轮播图数据
  getSwiperData() {
    request({url:'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata'}).then(res =>{
      if(res.data && res.data.meta.status == 200) {
        this.setData({
        swiperList: res.data.message
        })
      }
    }) 
  },
  // 获取分类导航数据
  getCateData() {
    request({url:'https://api-hmugo-web.itheima.net/api/public/v1/home/catitems'}).then(res =>{
      if(res.data && res.data.meta.status == 200) {
        this.setData({
          catesList: res.data.message
        })
      }
    }) 
  },
  // 获取楼层视图的数据
  getFloorData() {
    request({url:'https://api-hmugo-web.itheima.net/api/public/v1/home/floordata'}).then(res =>{
      if(res.data && res.data.meta.status == 200) {
        this.setData({
          floorData: res.data.message
        })
      }
    }) 
  }
})