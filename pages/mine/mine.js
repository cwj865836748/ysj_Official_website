// pages/mine/mine.js
import api from '../../request/api.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    headColor: 'transparent',
    titleColor: '#fff',
    isAdmin: null,
    company:null,
    listQuery: {
      page: 1,
      pageSize: 10
    },
    totalPage: 0,
    schemeList: [],
    listIndex: 0,
    noData: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  getInit() {
    const company = wx.getStorageSync('user')
    const isAdmin = wx.getStorageSync('user').isAdmin
    const fn = isAdmin ? api.admin.companyList : api.mine.mySolution
    const {
      listQuery,
      listIndex
    } = this.data
    fn(listQuery).then(res => {
      this.setData({
        [`schemeList[${listIndex}]`]: res.data.list,
        totalPage:res.data.totalPage,
        isAdmin,
        company
      })
      !this.data.totalPage && this.setData({
        noData: true
      })
    })
  },
  loginOut(){
    wx.clearStorageSync();
    wx.redirectTo({
      url: '/pages/index/index'
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
    this.getInit()
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
    if (this.data.listQuery.page == this.data.totalPage) {
      return
    }
    this.data.listQuery.page++
    this.data.listIndex++
    this.getInit()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})