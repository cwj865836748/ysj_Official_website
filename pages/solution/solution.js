// pages/solution/solution.js
import api from '../../request/api.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    titleList: [],
    solutionEngineerList: [],
    listIndex: 0,
    titleIndex: 0,
    listQuery: {
      page: 1,
      pageSize: 10
    },
    totalPage: 0,
    noData:false,
    type:1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getInit()
  },
  getInit() {
    api.solution.solutionCateList().then(res => {
      this.setData({
        titleList: res.data
      })
      this.getList()
    })
  },
  getList() {
    const {
      listQuery,
      titleIndex,
      titleList
    } = this.data
    api.solution.solutionList({
      categoryId: titleList[titleIndex].id,
      ...listQuery
    }).then(res => {
      this.setData({
        ['solutionEngineerList[' + this.data.listIndex + ']']: res.data.list,
        totalPage: res.data.totalPage,
      })
      !this.data.solutionEngineerList[0].length&&this.setData({
        noData:true
      })
    })
  },
  titleChange(e){
    if(e.currentTarget.dataset.index==this.data.titleIndex){
      return
    }
    this.setData({
      titleIndex:e.currentTarget.dataset.index,
      'listQuery.page':1,
      solutionEngineerList:[],
      listIndex:0,
      noData:false
    })
    this.getList()
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
    if (this.data.listQuery.page == this.data.totalPage) {
      return
    }
    this.data.listQuery.page++
    this.data.listIndex++
    this.getList()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})