// pages/goods_list/index.js
import { request } from '../../request/index.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabsData:[ // tabs切换页数据
      {
        id: 1,
        name: '综合',
        isActive: true,
      },
      {
        id: 2,
        name: '销量',
        isActive: false,
      },
      {
        id: 3,
        name: '价格',
        isActive: false,
      }
    ],
    querySendData:{ // 接口发送参数
      query:'', // 关键字
      cid: '', // 分类id
      pagenum: 1, // 页码
      pagesize: 10, // 页容量
    },
    totalData: 0, // 总页数
    goodsListData: [], // 商品列表数据
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const tempData = {
      query:'', // 关键字
      cid: options.cid, // 分类id
      pagenum: 1, // 页码
      pagesize: 10, // 页容量
    }
    this.setData({
      querySendData: tempData
    })
    this.getGoodsListData()
  },
  // tabs组件的点击事件
  tabsClick(e) {
    const index = e.detail;
    let tempTabsData = JSON.parse(JSON.stringify(this.data.tabsData));
    tempTabsData.forEach((item,i) =>{
      i === index ? item.isActive = true : item.isActive = false 
    })
    this.setData({
      tabsData: tempTabsData
    })
  },
  // 获取商品列表数据
  async getGoodsListData() {
    const res = await request({url:'/goods/search',data:this.data.querySendData});
    if(res.data && res.data.meta.status == 200) {
      let temp = {
        query:'', // 关键字
        cid: this.data.querySendData.cid, // 分类id
        pagenum: Number(res.data.message.pagenum), // 页码
        pagesize: 10, // 页容量
      }
      let total = res.data.message.total
      this.setData({
        goodsListData: [...this.data.goodsListData,...res.data.message.goods],
        totalData: total,
        querySendData: temp,
      })
      // 数据请求完毕后，关闭刷新
      wx.stopPullDownRefresh()
    } 
  },
  // 页面触底事件
  onReachBottom() {
    // 如果还有分页数据继续请求，没有提示没有了
    if(this.data.querySendData.pagenum * this.data.querySendData.pagesize <= this.data.totalData) {
      let tempPageNnm = this.data.querySendData.pagenum;
      tempPageNnm++;
      let temp = {
        query:'', // 关键字
        cid: this.data.querySendData.cid, // 分类id
        pagenum: tempPageNnm, // 页码
        pagesize: 10, // 页容量
      }
      this.setData({
        querySendData: temp
      })
      this.getGoodsListData()
    } else {
      wx.showToast({
        title: '没有数据了',
        icon: 'none'
      })
    }
  },
  // 下拉刷新
  onPullDownRefresh	() {
    let temp = { // 接口发送参数
      query:'', // 关键字
      cid: this.data.querySendData.cid, // 分类id
      pagenum: 1, // 页码
      pagesize: 10, // 页容量
    }
    this.setData({
      goodsListData: [],
      querySendData: temp
    })
    this.getGoodsListData()
  }
})