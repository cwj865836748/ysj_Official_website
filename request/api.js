 import {request} from './index.js'
 const api = {
  index: {
    carouselImageList(){
      return request({
        url:'/api/index/carouselImageList'
      })
    },
    specialtyList(data){
      return request({
        url:'/api/index/specialtyList',
        method:'POST',
        data
      })
    },
    brandList(){
      return request({
        url:'/api/index/brandList'
      })
    },
    expertList(data){
      return request({
        url:'/api/index/expertList',
        method:'POST',
        data
      })
    },
    myInfoList(){
      return request({
        url:'/api/index/myInfoList'
      })
    }
  },
  common:{
    newsCenterList(data){
      return request({
        url:'/api/common/newsCenterList',
        method:'POST',
        data
      })
    },
    companyList(){
      return request({
        url:'/api/common/companyList'
      })
    },
    doLogin(data){
      return request({
        url:'/api/login/doLogin',
        method:'POST',
        data
      })
    },
    sendFileList(data){
      return request({
        url:'/api/engineering/sendFileList',
        method:'POST',
        data
      })
    }
  },
  secondPage:{
    expertList(data){
      return request({
        url:'/api/secondPage/expertList',
        method:'POST',
        data
      })
    },
    specialtyList(data){
      return request({
        url:'/api/secondPage/specialtyList',
        method:'POST',
        data
      })
    },
    expertinfo(data){
      return request({
        url:'/api/secondPage/expertinfo',
        data
      })
    },
    staffStyleList(){
      return request({
        url:'/api/secondPage/staffStyleList'
      })
    },
    companyCultureList(){
      return request({
        url:'/api/secondPage/companyCultureList'
      })
    },
    milestoneList(){
      return request({
        url:'/api/secondPage/milestoneList'
      })
    }
  },
  solution:{
    solutionCateList(){
      return request({
        url:'/api/solution/solutionCateList'
      })
    },
    solutionList(data){
      return request({
        url:'/api/solution/solutionList',
        method:'POST',
        data
      })
    },
    solutionInfo(data){
      return request({
        url:'/api/solution/solutionInfo',
        data
      })
    },
    solutionFileList(data){
      return request({
        url:'/api/solution/solutionFileList',
        data
      })
    }
  },
  engineering:{
    engineeringCateList(){
      return request({
        url:'/api/engineering/engineeringCateList'
      })
    },
    engineeringList(data){
      return request({
        url:'/api/engineering/engineeringList',
        method:'POST',
        data
      })
    },
    engineeringInfo(data){
      return request({
        url:'/api/engineering/engineeringInfo',
        data
      })
    },
    engineeringFileList(data){
      return request({
        url:'/api/engineering/engineeringFileList',
        data
      })
    }
  },
  card:{
    expertList(data){
      return request({
        url:'/api/card/expertList',
        method:'POST',
        data
      }) 
    },
    salesmanInfo(data){
      return request({
        url:'/api/card/salesmanInfo',
        data
      })
    },
    solutionList(data){
      return request({
        url:'/api/card/solutionList',
        method:'POST',
        data
      })
    }
  },
  mine:{
    mySolution(data){
      return request({
        url:'/api/mine/mySolution',
        method:'POST',
        data
      })
    },
    mySolutionInfo(data){
      return request({
        url:'/api/mine/mySolutionInfo',
        data
      })
    },
    mySolutionFileList(data){
      return request({
        url:'/api/mine/mySolutionFileList',
        data
      })
    }
  },
  admin:{
    companyList(data){
      return request({
        url:'/api/admin/companyList',
        method:'POST',
        data
      })
    },
    companySolution(data){
      return request({
        url:'/api/admin/companySolution',
        method:'POST',
        data
      })
    },
    mySolutionInfo(data){
      return request({
        url:'/api/admin/mySolutionInfo',
        data
      })
    },
    mySolutionFileList(data){
      return request({
        url:'/api/admin/mySolutionFileList',
        data
      })
    }
  }
};
module.exports = api;