import {  _baseUrl, _attatchmentURL, _session } from './request.js'
// 获取图片
export const getImgs = function (imgId) {
  if (imgId === undefined){
    return false
  } else if(imgId =="00000000-0000-0000-0000-000000000000"){
    return require('../img/default.jpg')
  } else {
    return _attatchmentURL+ '?Id=' + imgId+ '&_SESSION_='+ _session
  }
}
// 排序
export const quickSort = function (arr) {
  for(let i=0;i<arr.length-1;i++){
    for(let j=i+1;j<arr.length;j++){
      if(Number(arr[i].Ordinal)>Number(arr[j].Ordinal)){//如果前面的数据比后面的大就交换
        let temp=arr[i]
        arr[i]=arr[j]
        arr[j]=temp
      }
    }
  }
  return arr
}
// 替换新闻和产品也的图片地址
export const imgSrc = function (img,width) {
  for (let i =0;i< img.length;i++) {
    let str  = img[i].src
    let index = str.indexOf('~/')
    img[i].src = _baseUrl+ str.slice(index+1)+'?&_SESSION_='+ _session
    img[i].parentNode.style.textAlign = 'center'
    img[i].style.width = width
    //img[i].style.maxWidth = '90%'
  }
}

// 生成UUID
export const getUUID = function () {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1)
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4()
}
// 判断是不是移动端
export const  browserRedirect = function () {
  let sUserAgent = navigator.userAgent.toLowerCase()
  let bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
  let bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os"
  let bIsMidp = sUserAgent.match(/midp/i) == "midp";
  let bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4"
  let bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
  let bIsAndroid = sUserAgent.match(/android/i) == "android";
  let bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
  let bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile"
  if (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {
    return true
  } else {
    return false
  }
}

// 返回顶部
export const backToTop = function () {
  document.body.scrollTop = document.documentElement.scrollTop = 0
}