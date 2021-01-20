// pages/cardDetail/cardDetail.js
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
        personData: null
      },

      /**
       * 生命周期函数--监听页面加载
       */
      onLoad: function (options) {
        this.getInit(options)
      },
      getInit(options) {
        api.card.salesmanInfo({
          id: options.id
        }).then(res => {
          this.setData({
            personData: res.data
          })
        })
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
      saveCavans() {
        const {
          personData
        } = this.data
        const src = personData.cardPicture
        const src1 =personData.wechatQrCode
        wx.showToast({
          title: '生成图片中...',
          mask: true,
          icon: 'loading'
        })
        Promise.all([getImageInfo(src), getImageInfo(src1)])
          .then(pic => {
              var ctx = wx.createCanvasContext('myCanvas');
              //画布大小
              ctx.setFillStyle("#ffffff")
              ctx.fillRect(0, 0, 345, 434)
              ctx.restore();
              //名片
              ctx.save()
              ctx.drawImage(pic[0].path, 0, 0, 345, 260);
              ctx.restore();
              //二维码
              ctx.save()
              ctx.drawImage(pic[1].path, 258, 340, 72, 72);
              ctx.restore();
              //名字
              ctx.save()
              ctx.font = "20px SourceHanSansSC";
              ctx.setFillStyle('#000b1d')
              ctx.fillText(personData.name, 15, 300);
              ctx.fillText(personData.name, 15, 300-0.5);
              ctx.fillText(personData.name, 15-0.5, 300);
              ctx.restore();
              //职位
              ctx.save()
              ctx.font = "13px SourceHanSansSC";
              ctx.setFillStyle('#000b1d')
              ctx.fillText(personData.position, 15, 324);
              ctx.restore();

              ctx.save()
              ctx.font = "12px SourceHanSansSC";
              ctx.setFillStyle('#a6abb5')
              ctx.fillText('电话', 15, 367);
              ctx.restore();
              //电话号码
              ctx.save()
              ctx.font = "16px SourceHanSansSC";
              ctx.setFillStyle('#0077cb')
              ctx.fillText(personData.phone, 15, 390);
              ctx.fillText(personData.phone, 15, 390-0.3);
              ctx.fillText(personData.phone, 15-0.3, 390);
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
            onReady: function () {},

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