// pages/login/login.js
import api from '../../request/api.js'
import {
  isNull,
} from '../../utils/util.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    query: {
      username: "",
      password: ""
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  login() {
    isNull({
      content: this.data.query.username,
      title: '账号'
    }) && isNull({
      content: this.data.query.password,
      title: '密码'
    }) && api.common.doLogin(this.data.query).then(res => {
      wx.setStorageSync('token', res.data.token)
      wx.setStorageSync('user', res.data.user)
      let pages = getCurrentPages()
      let prevPage = pages[pages.length - 2]
      prevPage.onLoad()
      wx.navigateBack({
        delta: 1
      })
    })
  },
  inputDone(e) {
    const {
      key
    } = e.currentTarget.dataset
    this.setData({
      [`query.${key}`]: e.detail.value
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

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})