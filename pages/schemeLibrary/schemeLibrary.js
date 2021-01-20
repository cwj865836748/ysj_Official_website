// pages/schemeLibrary/schemeLibrary.js
import api from '../../request/api.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    schemeList:[],
    schemeIndex: 0,
    schemeQuery: {
      page: 1,
      pageSize: 10,
      id:0
    },
    schemeTotalPage: 0,
    noData: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.schemeQuery.id = parseInt(options.id)
    this.getInit()
  },
  getInit() {
    api.admin.companySolution(this.data.schemeQuery).then(res => {
      this.setData({
        [`schemeList[${this.data.schemeIndex}]`]: res.data.list,
        schemeTotalPage: res.data.totalPage
      })
      !this.data.schemeTotalPage && this.setData({
        noData: true
      })
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
  onReachBottom() {
    if (this.data.schemeQuery.page == this.data.schemeTotalPage) {
      return
    }
    this.data.schemeQuery.page++
    this.data.schemeIndex++
    this.getInit()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})