// pages/index/index.js
import api from '../../request/api.js'
import {
  previewImage,
  openLocation,
  showToast
} from '../../utils/wx.js'
let app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    headColor: "transparent",
    titleColor: "#FFF",
    sortList: [{
        image: '/image/technologyPrecipitation@2x.png',
        name: '技术沉淀',
        num: '30'
      },
      {
        image: '/image/customerUseCase@2x.png',
        name: '客户案例',
        num: '50'
      }, {
        image: '/image/professionalTeam@2x.png',
        name: '专家团队',
        num: '20'
      }, {
        image: '/image/certifications@2x.png',
        name: '资质及证书',
        num: '50'
      }, {
        image: '/image/innovativeProducts@2x.png',
        name: '创新产品',
        num: '30'
      }
    ],
    menuList: [{
      id: 'mainBusiness',
      name: '企业介绍'
    }, {
      id: 'corporateCulture',
      name: '专业资质'
    }, {
      id: 'introductionOfExperts',
      name: '专家介绍'
    }, {
      id: 'brandCustomers',
      name: '品牌客户'
    }, {
      id: 'newsCenter',
      name: '新闻中心'
    }, {
      id: 'aboutUs',
      name: '关于我们'
    }],
    companyBusiness: null,
    companyDetail: null,
    swiperList: [],
    swiperIndex: 0,
    certificateList: [],
    brandList: [],
    newsList: [],
    expertList: [],
    toView: '',
    x:0,
    y:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getInit()
  },
  swiperChange(e) {
    this.setData({
      swiperIndex: e.detail.current,
    })
  },
  goView(e) {
    this.setData({
      toView: e.currentTarget.dataset.id
    })
  },
  goWechat(e) {
    app.globalData.news = e.currentTarget.dataset.item
    wx.navigateTo({
        url: '/pages/jump/jump',
      }) 
  },
  goDetail(e) {
    const {jumpName,jumpType,jumpUrl} =e.currentTarget.dataset.item
    if(jumpType==1||jumpType==2){
      wx.navigateTo({
        url: `/pages/soluEngineerPerDetail/soluEngineerPerDetail?id=${jumpUrl}&type=${jumpType}`,
      })
    }else if(jumpType==3) {
      app.globalData.news = {url:jumpUrl,title:jumpName}
      wx.navigateTo({
          url: '/pages/jump/jump',
        }) 
    }
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
  getInit() {
    const { windowWidth,
      windowHeight} = app.globalData.navBar
    const {
      carouselImageList,
      specialtyList,
      brandList,
      expertList,
      myInfoList
    } = api.index
    const {
      newsCenterList,
      companyList
    } = api.common
    Promise.all([
      carouselImageList(),
      specialtyList({
        page: 1,
        pageSize: 8
      }),
      brandList(),
      expertList({
        page: 1,
        pageSize: 6
      }),
      myInfoList(),
      newsCenterList({
        page: 1,
        pageSize: 2
      }),
      companyList()
    ]).then(res => {
      this.setData({
        swiperList: res[0].data,
        certificateList: res[1].data.list,
        brandList: res[2].data,
        expertList: res[3].data.list,
        companyDetail: res[4].data,
        [`newsList[0]`]: res[5].data.list,
        companyBusiness: res[6].data,
        windowWidth,
        windowHeight:windowHeight-50,//底部导航栏50px。
        x:windowWidth-60,
        y:windowHeight-200
      })
    })
  },
  scroll(e) {
    const {
      scrollTop
    } = e.detail
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
  toPreview(e) {

    let {
      img,
      imgindex
    } = e.currentTarget.dataset
    let urls;
    if (imgindex == 0) {
      urls = [img]
    } else if (imgindex == 1) {
      urls = this.data.certificateList.map(item => item.picture)
    } else if (imgindex == 2) {
      urls = this.data.expertList.map(item => item.smallPic)
    }
    previewImage({
      current: img,
      urls
    })
  },
  //开启地图
  openMap() {
    let {
      infoLatitude: latitude,
      infoLongitude: longitude,
      infoAddress: address
    } = this.data.companyDetail
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
      phoneNumber: this.data.companyDetail.infoPhone,
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