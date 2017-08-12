// pages/logs/logs.js
var app = getApp()
var AV = app.getAV()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    items:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var query = new AV.Query('Province');
    query.addDescending('priority');
    query.equalTo("done", 1)
    query.find().then(function (province) {
      that.setData({
        items: province
      })
    });
    query.subscribe().then(function (liveQuery) {
      liveQuery.on('enter', function (updatedDoingItem, updatedKeys) {
        // 将 doingList 中对应的 doingItem 替换成 updatedDoingItem
        that.data.items.push(updatedDoingItem)
        that.setData({
          items: that.data.items
        })
      });
      liveQuery.on('leave', function (leftDoingItem, updatedKeys) {
        // remove leftDoingItem from doingList
        if (leftDoingItem.attributes.done == 0) {
          console.log("订单状态改变 取消完成...进行数组删除")
          var length = that.data.items.length
          for (var i = 0; i < length; i++) {
            if (leftDoingItem.id == that.data.items[i].id) {
              console.log("数组位置：", i)
              that.data.items.splice(i, 1)
              console.log(that.data.items)
              that.setData({
                items: that.data.items
              })
              return
            }

          }
        }
      });
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },
  taoToDetailOrDelete:function(e){

    app.globalData.detailInfo = this.data.items[e.currentTarget.id]
    console.log("app.globalData.detailInfo", app.globalData.detailInfo)
    wx.navigateTo({
      url: '../detailordelete/detailordelete',
    })
  }
})