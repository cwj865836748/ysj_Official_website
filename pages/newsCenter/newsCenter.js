// pages/newsCenter/newsCenter.js
import api from '../../request/api.js'
let app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    newsList: [],
    newsIndex: 0,
    newsQuery: {
      page: 1,
      pageSize: 10
    },
    newsTotalPage: 0,
    noData:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getInit()
  },
  getInit() {
    api.common.newsCenterList(this.data.newsQuery).then(res => {
      this.setData({
        [`newsList[${this.data.newsIndex}]`]: res.data.list,
        newsTotalPage: res.data.totalPage
      })
      !this.data.newsTotalPage&&this.setData({
        noData:true
      })
    })
  },
  goWechat(e) {
    app.globalData.news = e.currentTarget.dataset.item
    wx.navigateTo({
        url: '/pages/jump/jump',
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
    if (this.data.newsQuery.page == this.data.newsTotalPage) {
      return
    }
    this.data.newsQuery.page++
    this.data.newsIndex++
    this.getInit()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})