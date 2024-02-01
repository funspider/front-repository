// pages/index/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    
  },

  //匹配救护车
  getData(){
    let that=this
    wx.request({
      url: 'url/**/',
      succes(res){
        console.log("请求成功",res.data)
        that.setData({
          dataList:res.data
        })
      },
      fail(res){
        console.log("请求失败",res)
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
    onLoad: function(){  
      // 检查地理位置授权状态  
      this.checkLocationAuth();  
    },  
    
    // 检查地理位置授权状态  
    checkLocationAuth: function () {  
      wx.getSetting({  
        success: (res) => {  
          if (!res.authSetting['scope.userLocation']) {  
            // 未授权，弹出授权窗口  
            this.requestLocationAuth();  
          } else {  
            // 已授权，执行进入首页的逻辑  
            this.enterHomePage();  
          }  
        },  
        fail: () => {  
          // 获取设置失败，处理失败逻辑  
        }  
      });  
    },  

    // 请求地理位置授权  
    requestLocationAuth: function () {  
      wx.authorize({  
        scope: 'scope.userLocation',  
        success: () => {  
          // 用户点击了允许授权按钮，执行进入首页的逻辑  
          this.enterHomePage();  
        },  
        fail: () => {  
          // 用户点击了拒绝授权按钮，展示提示信息，引导用户开启授权  
          wx.showModal({  
            title: '提示',  
            content: '需要获取您的地理位置信息以提供更好的服务，请在设置中开启授权。',  
            showCancel: false,  
            confirmText: '去设置',  
            success: (res) => {  
              if (res.confirm) {  
                // 用户点击了“去设置”按钮，跳转到设置页面  
                wx.openSetting({  
                  success: (settingRes) => {  
                    if (settingRes.authSetting['scope.userLocation']) {  
                      // 用户在设置中开启了授权，执行进入首页的逻辑  
                      this.enterHomePage();  
                    } else {  
                      // 用户未开启授权
                      wx.navigateBack({  
                        delta: 1 // 回退前一页 
                      });  
                    }  
                  }  
                });  
              }  
            }  
          });  
        }  
      });  
    },     
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})