// app.js
App({
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs) 
    /**
    wx.login({  
      success: function (loginRes) {  
        if (loginRes.code) {  
          // 发送 loginRes.code 到后台换取 openId, sessionKey, unionId  
          wx.request({  
            url: '/**login',  
            method: 'POST',  
            data: {  
              code: loginRes.code  
            },  
            success: function (res) {  
              // 假设 res.data 包含 openId, sessionKey, unionId 等信息  
              const openId = res.data.openId;  
              const sessionKey = res.data.sessionKey;  
              // 将 sessionKey 存储到本地存储中  
              wx.setStorageSync('sessionKey', sessionKey);  
              // 自动登录成功，跳转到用户  
              wx.switchTab({  
                url: 'pages/user/user'  
              });  
            },  
            fail: function (error) {  
              // 处理登录失败的情况，如重新登录等操作  
            }  
          });  
        } else {  
          console.log('获取用户登录态失败！' + loginRes.errMsg);  
        }  
      }  
    },
*/
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
  },

  globalData: {
    userInfo: null,
    openId:null
  },

})
