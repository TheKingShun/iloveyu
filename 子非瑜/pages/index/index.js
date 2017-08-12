var common = require('../../utils/util.js')
let col1H = 0;
let col2H = 0;
var app = getApp();
var AV = app.getAV()
//语音包临时路径
var tempPath
Page({

  data: {
    //输入框文字
    searchInputData: null,
    items: null
  },

  onLoad: function (options) {

    var that = this
    var query = new AV.Query('Province');
    query.addDescending('priority');
    query.notEqualTo("done",1)
    query.find().then(function (province) {
      console.log("province", province)
      that.setData({
        items: province
      })
    });
    query.subscribe().then(function (liveQuery) {
      liveQuery.on('create', function (newDoingItem) {

        console.log("新建了一个项目", newDoingItem)
        if (newDoingItem.attributes.priority == 1) {
          //加急件 需要在列表头部显示
          that.data.items.unshift(newDoingItem)
          console.log("加急件")
        } else {
          //普通件 在列表末尾显示
          that.data.items.push(newDoingItem)
          console.log("普通件")
        }
        console.log("push后数组值为：", that.data.items)
        that.setData({
          items: that.data.items
        })
        //震动提示
        shakeLong();
      });

      liveQuery.on('leave', function (leftDoingItem, updatedKeys) {
        if (leftDoingItem.attributes.done == 1) {
          console.log("订单状态改变 完成...进行数组删除")
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

      liveQuery.on('enter', function (updatedDoingItem, updatedKeys) {
        // 将 doingList 中对应的 doingItem 替换成 updatedDoingItem
        if (updatedDoingItem.attributes.priority == 1){
          that.data.items.unshift(updatedDoingItem)
          that.setData({
            items: that.data.items
          })
        }else{
          that.data.items.push(updatedDoingItem)
          that.setData({
            items: that.data.items
          })
        }
      });
    });


  },
  onReady: function () {

  },
  onShow: function () {

  },
  onHide: function () {

  },
  //输入框的文字获取
  input_search: function (e) {
    this.setData({
      searchInputData: e.detail.value
    })
  },
  //清除输入框中的文字
  clearSearchInput: function () {
    this.setData({
      searchInputData: null
    })
  },
  //点击搜寻
  tapToSearch: function () {
    wx.navigateTo({
      url: '../add/add',
    })
  },
  taoToDetail: function (e) {
    console.log(e)
    console.log(this.data.items[e.currentTarget.id])
    app.globalData.detailInfo = this.data.items[e.currentTarget.id]
    console.log("app.globalData.detailInfo", app.globalData.detailInfo)
    wx.navigateTo({
      url: '../detail/detail',
    })
  }

})

function shakeLong() {
  wx.vibrateLong({})
  wx.playBackgroundAudio({
    dataUrl: 'https://dn-mjzes5yg.qbox.me/762516f09ba1eb7d8886.mp3',
    // success:function(){
    //   console.log("播放")
    //   setTimeout(function () {
    //     wx.stopBackgroundAudio()
    //     console.log("停止播放")
    //   }, 4000)
    // },
    // fail:function(){
    //   console.log("播放失败")
    // }
  })

}
