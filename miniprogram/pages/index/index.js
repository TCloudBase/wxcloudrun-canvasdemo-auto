const app = getApp()
let that = null
Page({
  data: {
    inputValue: 'https://developers.weixin.qq.com/miniprogram/dev/wxcloud/guide/container/',
    imagePath: null
  },
  onLoad: function () {
    that = this
    that.init()
  },
  oninput: function (e) {
    that.setData({
      inputValue: e.detail.value
    })
  },
  async init () {
    wx.showLoading({
      title: '生成中',
      mask: true
    })
    const res = await wx.cloud.callContainer({
      path: '/',
      method: 'GET',
      data: {
        inputValue: that.data.inputValue
      },
      header: {
        // 服务名字要在这里标明，可以针对于每个服务单独创建API类，具体按照自身业务实现
        'X-WX-SERVICE': 'wxcloudrun-canvasdemo-auto' // 这里默认写的是一键部署的命名，可以根据自己的服务变更
      },
      config: {
        // 微信云托管环境，注意不是云开发环境
        env: ''
      }
    })
    wx.hideLoading()
    that.setData({
      imagePath: res.data
    })
  }
})
