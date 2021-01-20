// components/navbar/index.js
import {
  navigateBack
} from '../../utils/wx.js'
const App = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    headColor: {
      type: String,
      value: '#fff'
    },
    title: {
      type: String,
      value: '导航条'
    },
    back: {
      type: Boolean,
      value: true
    },
    home: {
      type: Boolean,
      value: false
    },
    titleColor: {
      type: String,
      value: '#333'
    },
    navbarType: {
      type: Number,
      value: 1
    },
    backgroundColor: {
      type: String,
      value: '#fff'
    },
    tabbar: {
      type: Number,
      value: 0
    },
    isTabbar: {
      type:Boolean,
      value:false
    },
    height: {
      type:String,
      value:'auto'
    }
  },
  options: {
    addGlobalClass: true,
    multipleSlots: true
  },
  /**
   * 组件的初始数据
   */
  data: {
    navHeight: null,
    statusBarHeight: null,
    isPhonex:false,
    tabbarList: [{
        index: 0,
        name: '盈家',
        normal: '/image/tabbar_icon_homeun@2x.png',
        active: '/image/tabbar_icon_home@2x.png'
      },
      {
        index: 1,
        name: '解决方案',
        normal: '/image/tabbar_icon_solveun@2x.png',
        active: '/image/tabbar_icon_solve@2x.png'
      },
      {
        index: 2,
        name: '工程案例',
        normal: '/image/tabbar_icon_projectun@2x.png',
        active: '/image/tabbar_icon_project@2x.png'
      },
      {
        index: 3,
        name: '我的',
        normal: '/image/tabbar_icon_mineun@2x.png',
        active: '/image/tabbar_icon_mine@2x.png'
      }
    ]
  },

  attached() {
    const {
      navHeight,
      statusBarHeight,
      model
    } = App.globalData.navBar
    this.setData({
      navHeight,
      statusBarHeight,
      isPhoneX:model.search('iPhone X') != -1
    })
  },
  /**
   * 组件的方法列表
   */
  methods: {
    goBack() {
      navigateBack(1)
    },
    goHome() {
      wx.reLaunch({
        url: '/pages/index/index',
      })
    },
    tabbarChange(e) {
      let url;
      switch (e.detail) {
        case 0:
          url = "/pages/index/index"
          break;
        case 1:
          url = "/pages/solution/solution"
          break;
        case 2:
          url = "/pages/engineeringCase/engineeringCase"
          break;
        case 3:
          url = "/pages/mine/mine"
          break;
      }
      wx.redirectTo({
        url,
      })
    }
  }
})