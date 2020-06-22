// pages/goods_list/index.js
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
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

})