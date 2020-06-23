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
    console.log(res)
    if(res.data && res.data.meta.status == 200) {
      this.setData({
        goodsListData: res.data.message.goods
      })
    } 
  }
})