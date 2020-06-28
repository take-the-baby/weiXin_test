// pages/cart/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address:{}, // 收货地址
  },
  //添加收货地址
  handAddrewss() {
    wx.getSetting({
      success: (res) => {
        // 用户已授权
        const scopeAddress = res.authSetting['scope.address'];
        if(scopeAddress === true || scopeAddress === undefined) {
          wx.chooseAddress({
            success: (res1) => {
              wx.setStorageSync('address', res1)
            },
          })
        } else {
          // 用户拒绝，诱导用户重新获取地址权限
          wx.openSetting({
            success: (result) => {
              wx.chooseAddress({
                success: (res2) => {
                  wx.setStorageSync('address', res2)
                },
              })
            },
          })
        }
      },
    })
  },
  // 给收货地址赋值
  onShow() {
    const data = wx.getStorageSync("address") || {}
    this.setData({
      address:data,
    })
  }
})