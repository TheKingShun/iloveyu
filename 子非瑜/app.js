//引入leancloud云
const AV = require('./libs/av-live-query-weapp-min.js')

App({
  onLaunch: function () {
    var that = this
    //初始化Leancloud
    AV.init({
      appId: 'mJzES5ygOICMS01ySccYzLOw-gzGzoHsz',
      appKey: 'l8g1VlmBNIrwLqP1lcAVAC7S',
    });
    //用leancloud的微信登录模块来登录
    AV.User.loginWithWeapp().then(user => {
      this.globalData.user = user.toJSON();
      wx.getUserInfo({
        success: ({userInfo}) => {
          that.globalData.userInfo = userInfo
          console.log('userInfo', userInfo)
        }
      })
      console.log('globalData.user', this.globalData.user)
    }).catch(console.error);

  },

  //这里是使用leancloud的服务
  getAVUser: function () {
    return AV.User.current()
  },
  getAV: function () {
    return AV
  },

  getUserInfo: function (cb) {
    var that = this
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },
  globalData: {
    userInfo: null,
    //leancloud需要的用户信息
    user: null,
    //跳转详情页面的详细信息
    detailInfo: null
  },
})
