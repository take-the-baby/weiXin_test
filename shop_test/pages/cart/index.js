// pages/cart/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address:{}, // 收货地址
    cart: [], // 购物车数据
    allChecked: false, // 全选
    totalPrice: 0, // 总价格
    totalNum:0, // 总数
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
  // 列表的勾选事件
  checkboxChange(e) {
    console.log(e)
    let index = e.currentTarget.dataset.id
    let data = this.data.cart;
    data[index].checked = !data[index].checked
    wx.setStorageSync('cart',data)
    // this.setData({
    //   cart: data
    // })
    this.isAllChecked()
  },
  // 全选
  allChecked() {
    let {cart,allChecked} = this.data;
    allChecked = !allChecked
    cart.forEach(item =>{item.checked = allChecked})
    wx.setStorageSync('cart',cart)
    this.isAllChecked()
  },
  // 计算商品数量
  handlerFun(e) {
    let {id,operation} = e.currentTarget.dataset;
    let {cart} = this.data;
    let index = cart.findIndex(item => item.goods_id === id);
    if(index > -1) {
      if(cart[index].num === 1 && operation == -1) {
        wx.showModal({
          title: '提示',
          content: '您是否要删除该商品？',
          success: (res) =>{
            if (res.confirm) {
              cart.splice(index,1)
              wx.setStorageSync('cart', cart)
              this.isAllChecked()
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          },
        })
        return
      }
      cart[index].num += Number(operation);
    }
    wx.setStorageSync('cart', cart)
    this.isAllChecked()
  },
  // 结算
  settlement() {
    let {address, totalNum} = this.data;
    if(!Object.keys(address).length) {
      wx.showToast({
        title: '您还没有添加收货地址~',
        icon: 'none'
      })
      return
    }
    if(!totalNum) {
      wx.showToast({
        title: '您还没有添加要结算的商品喔~',
        icon: 'none'
      })
      return
    }
    wx.navigateTo({
      url: '/pages/pay/index',
    })
  },
  // 判断是否全勾
  isAllChecked() {
    // 获取购物车数据
    const cart = wx.getStorageSync('cart') || [];
    let allChecked = cart.length ? cart.every(v => v.checked) : false
    let totalPrice = 0;
    let totalNum = 0;
    if(cart.length) {
      cart.forEach(item =>{
        if(item.checked) {
          totalPrice += item.goods_price*item.num;
          totalNum += item.num;
        } 
      })
    }
    this.setData({
      cart,
      allChecked,
      totalPrice,
      totalNum
    })
  },
  onShow() {
    this.isAllChecked()
    //获取收货地址
    const data = wx.getStorageSync("address") || {};
    this.setData({
      address:data,
    })
  }
})