// pages/expertIntroduction/expertIntroduction.js
let WxParse = require('../../wxParse/wxParse.js');
import api from '../../request/api.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    expertInfo: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // WxParse.wxParse('bookDescription','html',reservation_description,this,5)
    this.getInit(options.id)
  },
  getInit(id) {
    api.secondPage.expertinfo({
      id
    }).then(res => {
      this.setData({
        expertInfo: res.data
      })
      WxParse.wxParse('expertContent', 'html', res.data.content, this, 5)
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