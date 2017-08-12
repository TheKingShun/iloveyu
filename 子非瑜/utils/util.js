function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  // return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
  return [year, month, day].map(formatNumber).join('-')

}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

/////////////////////////////////////////////////////////////
function errorTips(content, time) {
  wx.showToast({
    title: content,
    icon: 'loading',
    duration: time
  })
}
/////////////////////////////////////////////////////////////
function okTips(content, time) {
  wx.showToast({
    title: content,
    icon: 'success',
    duration: time
  })
}
///////////////////////////////////////////////////////////
function happyModal(title, content,yes,no, yesContent) {
  wx.showModal({
    title: title,
    content: content,
    confirmText: yes,
    cancelText: no,
    success: function (res) {
      if (res.confirm) {
        okTips(yesContent, 1000)
      }
    }
  })
}

///////////////////////////////////////////////////////////

function sleep(numberMillis) {
  var now = new Date();
  var exitTime = now.getTime() + numberMillis;
  while (true) {
    now = new Date();
    if (now.getTime() > exitTime)
      return;
  }
} 

module.exports = {
  formatTime: formatTime,
  okTips: okTips,
  errorTips: errorTips,
  happyModal: happyModal,
  sleep:sleep
}
