export const request =  (params)=>{
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
      } 
    })
  })
}