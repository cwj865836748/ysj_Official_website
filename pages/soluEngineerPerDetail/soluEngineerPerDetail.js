// pages/soluEngineerPerDetail/soluEngineerPerDetail.js
let WxParse = require('../../wxParse/wxParse.js');
import api from '../../request/api.js'
import {
  checkEmail
} from '../../utils/util.js'
let app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detail: null,
    fileList: [],
    show: false,
    sendForm: {
      tableId: '', //方案id
      type: '', //方案种类  1工程案例 2解决方案 3我的解决方案
      idArr: [], //附件id数组
      email: '', //要发送的邮箱
      name: '', //姓名
      phone: '', //手机号
      positionName: '', //职位
      companyName: ''
    },
    step: 1,
    isAuth: true,
    // isComplete: false,
    rule: {
      name: false,
      phone: false,
      companyName: false,
      positionName: false,
      email: false
    },
    okShow: false,
    options:null,
    isIphoneX:false 
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //type:1解决方案 2工程案例 3普通用户方案库详情 4总帐号方案库详情
    if(options){
      this.data.options=options
    }
    this.getInit(this.data.options)
  },
  getInit(options) {
    const {
      type,
      id
    } = options
    this.data.sendForm.tableId = id
    let detailUrl, downListUrl;
    if (type == 1) {
      detailUrl = api.solution.solutionInfo
      downListUrl = api.solution.solutionFileList
    } else if (type == 2) {
      detailUrl = api.engineering.engineeringInfo
      downListUrl = api.engineering.engineeringFileList
    } else if (type == 3) {
      detailUrl = api.mine.mySolutionInfo
      downListUrl = api.mine.mySolutionFileList
    } else {
      detailUrl = api.admin.mySolutionInfo
      downListUrl = api.admin.mySolutionFileList
    }
    Promise.all([
      detailUrl({
        id
      }),
      downListUrl({
        id
      })
    ]).then(res => {
      this.setData({
        detail: res[0].data,
        'sendForm.type': res[1].data.length ? res[1].data[0].tableType : '',
        fileList: res[1].data.length ? res[1].data.map((item) => {
          item.isCheck = false
          return item
        }) : [],
        isIphoneX:app.globalData.navBar.model.search('iPhone X') != -1
      })
      WxParse.wxParse('detailContent', 'html', res[0].data.details, this, 5)
    })
  },
  downloadFileSelect(e) {
    const {
      index,
      id
    } = e.currentTarget.dataset
    const idArrIndex = this.data.sendForm.idArr.findIndex(item => item == id)
    idArrIndex == -1 ? this.data.sendForm.idArr.push(id) : this.data.sendForm.idArr.splice(idArrIndex, 1)
    this.setData({
      [`fileList[${index}]isCheck`]: !this.data.fileList[index].isCheck
    })
  },
  openShow(e) {
    const {
      show
    } = e.currentTarget.dataset
    show && this.setData({
      show
    }) 
    !show && this.setData({
      show,
      fileList: this.data.fileList.map((item) => {
        item.isCheck = false
        return item
      }),
      step: 1,
      sendForm: {
        ...this.data.sendForm,
        idArr: [], //附件id数组
        email: '', //要发送的邮箱
        name: '', //姓名
        phone: '', //手机号
        positionName: '', //职位
        companyName: ''
      },
      rule: {
        name: false,
        phone: false,
        companyName: false,
        positionName: false,
        email: false
      }
    })
  },
  goStep(e) {
    const {
      step
    } = e.currentTarget.dataset
    const {
      sendForm,
      detail,
      isAuth
    } = this.data
    let isConfirm = true
    const user = wx.getStorageSync('user')
    if (!sendForm.idArr.length) {
      return wx.showToast({
        title: '请选择所需下载的资料',
        icon: 'none'
      })
    }
    //下载文件进表单
    step == 1 && this.setData({
      step: 2,
      isAuth: user || !detail.isVerify ? false : true,
      'sendForm.email': user || !detail.isVerify ? user.email : ''
    })
    //提交
    if (step == 2 && isAuth) {
      for (let key in sendForm) {
        if (this.data.rule.hasOwnProperty(key)) {
          this.data.rule[key] = false
          if(!sendForm[key]||(key == 'email' && !checkEmail(sendForm[key]))){
            this.data.rule[key] = true
            isConfirm = false
          }
        } 
      }
      this.setData({
        rule: this.data.rule
      })
    } else if (step == 2 && !isAuth) {
      this.data.rule.email=false
      if (!checkEmail(sendForm.email)) {
        isConfirm = false
        this.setData({
          'rule.email': true
        })
      }
    }
    step == 2 && isConfirm && !isAuth && wx.showLoading({
      title: '发送中，请稍等',
      mask: true
    })
    step == 2 && isConfirm && api.common.sendFileList(sendForm).then(res => {
      this.setData({
        show: false,
        okShow: true
      })
      wx.hideLoading()
    })
  },
  onInput(e) {
    const {
      key
    } = e.currentTarget.dataset
    this.setData({
      [`sendForm.${key}`]: e.detail.value
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