// pages/secondPage/secondPage.js
import api from '../../request/api.js'
import {
  previewImage
} from '../../utils/wx.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    vanTabsActive: 0,
    //企业简介
    companyBusiness: null,
    milePostList: [],
    //企业文化
    staffList: [],
    //专业资质
    qualificationActive: 1,
    qualificationList: [],
    qualificationIndex: 0,
    qualificationQuery: {
      page: 1,
      pageSize: 10
    },
    qualificationTotalPage: 0,
    //专家介绍
    expertList: [],
    expertIndex: 0,
    expertQuery: {
      page: 1,
      pageSize: 10
    },
    expertTotalPage: 0,
    noData:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      vanTabsActive: parseInt(options.tabIndex)
    })
    this.getInit()
  },
  getInit() {
    const {
      companyList
    } = api.common
    const {
      staffStyleList,
      milestoneList,
    } = api.secondPage
    Promise.all([companyList(),
      staffStyleList(),
      milestoneList()
    ]).then(res => {
      this.setData({
        companyBusiness: res[0].data,
        staffList: res[1].data,
        milePostList: res[2].data
      })
      this.getQualification()
      this.getExpert()
    })
  },
  getQualification() {
    const {
      qualificationActive: category,
      qualificationQuery,
      qualificationIndex
    } = this.data
    api.secondPage.specialtyList({
      category,
      ...qualificationQuery
    }).then(res => {
      this.setData({
        [`qualificationList[${qualificationIndex}]`]: res.data.list,
        qualificationTotalPage: res.data.totalPage
      })
      !this.data.qualificationTotalPage&&this.setData({
        noData:true
      })
    })
  },
  qualificationTab(e) {
    this.setData({
      qualificationActive: e.currentTarget.dataset.index,
      qualificationList: [],
      qualificationIndex: 0,
      'qualificationQuery.page': 1,
      noData:false
    })
    this.getQualification()
  },
  getExpert() {
    const {
      expertQuery,
      expertIndex
    } = this.data
    api.secondPage.expertList(expertQuery).then(res => {
      this.setData({
        [`expertList[${expertIndex}]`]: res.data.list,
        expertTotalPage: res.data.totalPage
      })
    })
  },
  vanTabsChange(e) {
    this.setData({
      vanTabsActive: e.detail.index
    })
  },
  toPreview(e) {
    let {
      img,
      imgindex
    } = e.currentTarget.dataset
    let urls;
    if (imgindex == 0) {
      urls = [img]
    } else if (imgindex == 1) {
      urls = this.data.staffList.map(item => item.url)
    } else if (imgindex == 2) {
      urls = this.data.qualificationList.reduce((a, b) => a.concat(b)).map(item=>item.picture);
    } else if (imgindex == 3) {
      urls = this.data.expertList.reduce((a, b) => a.concat(b)).map(item=>item.avatar);
    }
    previewImage({
      current: img,
      urls
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
    if (this.data.vanTabsActive == 2) {
      if (this.data.qualificationQuery.page == this.data.qualificationTotalPage) {
        return
      }
      this.data.qualificationQuery.page++
      this.data.qualificationIndex++
      this.getQualification()
    } else if (this.data.vanTabsActive == 3) {
      if (this.data.expertQuery.page == this.data.expertTotalPage) {
        return
      }
      this.data.expertQuery.page++
      this.data.expertIndex++
      this.getExpert()
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})