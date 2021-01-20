// pages/qrCode/qrCode.js
import api from '../../request/api.js'
import {
  getImageInfo,
  saveImageToPhotosAlbum
} from '../../utils/wx.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
     company:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     this.getInit()
  },
  getInit(){
    api.index.myInfoList().then(res=>{
      this.setData({
        company:res.data
      })
    })
  },
  saveCavans() {
    const {
      company
    } = this.data
    const src = company.infoPublicQR
    wx.showToast({
      title: '生成图片中...',
      mask: true,
      icon: 'loading'
    })
    const logo ='/image/logo@2x.png'
    getImageInfo(src)
      .then(pic => {
          var ctx = wx.createCanvasContext('myCanvas');
          //画布大小
          ctx.setFillStyle("#ffffff")
          ctx.fillRect(0, 0, 321, 347)
          ctx.restore();
          //logo
          ctx.save()
          ctx.drawImage(logo, 119, 32, 84, 35);
          ctx.restore();
          //二维码
          ctx.save()
          ctx.drawImage(pic.path, 66, 123, 189, 188);
          ctx.restore();
          //公司名称
          ctx.save()
          ctx.font = "16px SourceHanSansSC";
          ctx.setFillStyle('#000b1d')
          ctx.fillText('盈盛捷电力科技有限公司', 72, 92);
          ctx.fillText('盈盛捷电力科技有限公司', 72, 92-0.3);
          ctx.fillText('盈盛捷电力科技有限公司', 72-0.3, 92);
          ctx.draw(false, setTimeout(() => {
            wx.canvasToTempFilePath({
              canvasId: 'myCanvas',
              success: (res) => {
                var filePath = res.tempFilePath;
                saveImageToPhotosAlbum(filePath)
              },
              fail: function (res) {
                console.log(res);
              },
              complete: function (res) {
                console.log('所有', res)
              }
            })
          }, 500))
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