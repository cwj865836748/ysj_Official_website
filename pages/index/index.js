// pages/index/index.js
import api from '../../request/api.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    headColor: "transparent",
    titleColor: "#FFF"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     api.secondPage.expertinfo({id:1})
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
  onPageScroll: function (e) {
    const {
      scrollTop
    } = e
    if (scrollTop > 50 && this.data.headColor != '#fff') {
      this.setData({
        headColor: '#fff',
        titleColor: '#333333'
      })
    } else if (scrollTop < 50 && this.data.headColor != 'transparent')
      this.setData({
        headColor: 'transparent',
        titleColor: '#fff'
      })
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