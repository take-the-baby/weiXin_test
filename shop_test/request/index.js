let num = 0;// 发送接口的个数（用于多个接口同时发送）
export const request =  (params)=>{
  num++;
  // 出现请求loading
  wx.showLoading({
    title: '数据请求中',
    mask: true
  })
  // 封装的公共URL地址
  const baseUrl = "https://api-hmugo-web.itheima.net/api/public/v1";
  return new Promise((resolve,reject) =>{
    wx.request({
      ...params,
      url: baseUrl + params.url,
      success:(res) =>{
        resolve(res)
      },
      fail:(err)=>{
        reject(err)
      },
      complete:() =>{
        num--;
        // 当数据都请求回来时关闭loading
        if(!num) {
          wx.hideLoading()
        }
      } 
    })
  })
}