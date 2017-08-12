// pages/detail/detail.js
var app = getApp()
var AV = app.getAV();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    info: null,
    height: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          height: res.windowHeight - 110
        })
      }
    })
    this.setData({
      info: app.globalData.detailInfo
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },
  tapToUndone: function () {
    var that = this
    wx.showModal({
      title: '提示',
      content: '您确定取消完成？',
      success: function (res) {
        if (res.confirm) {
          console.log(that.data.info.id)
          unDone(that.data.info.id)
        } else if (res.cancel) {
          console.log('用户点击取消')
        }

      }
    })
  }
})

function unDone(id) {
  var todo = AV.Object.createWithoutData('Province', id);
  // 修改属性
  todo.set('done', 0);
  // 保存到云端
  todo.save().then(function (todo) {
    wx.showToast({
      title: '完成',
    })
    wx.navigateBack({})
  }, function (error) {
    wx.showToast({
      title: '更改失败',
    })
  });
}