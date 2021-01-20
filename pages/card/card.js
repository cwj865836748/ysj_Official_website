// pages/card/card.js
import api from '../../request/api.js'
import {
  previewImage,
  openLocation,
  showToast
} from '../../utils/wx.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    personId: 0,
    personData: null,
    companyData: null,
    solutionList: [],
    expertList: [],
    // contactShow: false,
    wechatShow: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.personId = options.id
    this.getInit()
  },
  getInit() {
    const {
      companyList
    } = api.common
    const {
      expertList,
      salesmanInfo,
      solutionList
    } = api.card
    Promise.all([
        companyList(),
        expertList({
          page: 1,
          pageSize: 8
        }),
        salesmanInfo({
          id: this.data.personId
        }),
        solutionList({
          page: 1,
          pageSize: 6
        })
      ])
      .then(res => {
        this.setData({
          companyData: res[0].data,
          expertList: res[1].data.list,
          personData: res[2].data,
          solutionList: res[3].data.list
        })
      })
  },
  //开启地图
  openMap() {
    let {
      latitude,
      longitude,
      address
    } = this.data.personData
    latitude = parseFloat(latitude)
    longitude = parseFloat(longitude)
    const mapDetail = {
      latitude,
      longitude,
      address,
      name: '厦门盈盛捷电力科技有限公司'
    }
    openLocation(mapDetail)
  },
  //打电话
  toPhone() {
    wx.makePhoneCall({
      phoneNumber: this.data.personData.phone,
      success: function () {
        console.log("拨打电话成功！")
      },
      fail: function () {
        console.log("拨打电话失败！")
      }
    })
  },
  //复制功能
  copyText(e) {
    wx.setClipboardData({
      //准备复制的数据内容
      data: e.currentTarget.dataset.text,
      success: function (res) {
        showToast({
          title: '复制成功',
        });
      }
    });
  },
  toPreview(e) {
    let {
      img,
      imgindex
    } = e.currentTarget.dataset
    let urls;
    if (imgindex == 2) {
      urls = this.data.expertList.map(item => item.smallPic)
    } else {
      urls = [img]
    }
    previewImage({
      current: img,
      urls
    })
  },
  popupShow(e) {
    const {
      show
    } = e.currentTarget.dataset
     this.setData({
      wechatShow: show
    }) 
  },
  doSaveMsg() {
    const {personData} =this.data
    wx.addPhoneContact({
      firstName: personData.name,
      mobilePhoneNumber: personData.phone,
      weChatNumber: personData.wechatNum,
      organization: '厦门盈盛捷电力科技有限公司', //公司
      title: personData.position, //职位
      email: personData.email
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
     return {
       title:`厦门盈盛捷电力科技有限公司 ${this.data.personData.name}为您提供服务`,
       path:`/pages/card/card?id=${this.data.personData.id}`,
       imageUrl:this.data.personData.sharePicture
     }
  }
})