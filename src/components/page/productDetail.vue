<template>
  <div class="productDetailPage">
    <div class="productContainer">
      <div class="position">
        <div>您当前的位置：</div>
        <div>
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path:'/product',query:{Id:0}}">产品中心</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path:'/product',query:{Id:lefBarIndex.Id}}">{{prdDetailInfos.Type1Name}}</el-breadcrumb-item>
            <el-breadcrumb-item :to="{path:'/product',query:{Id:lefBarIndex.Id,subId:lefBarIndex.subId}}">{{prdDetailInfos.Type2Name}}</el-breadcrumb-item>
            <el-breadcrumb-item>{{prdDetailInfos.Name}}</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
      </div>
      <div class="topBar">
        <div class="fl">
          <img :src="getPic(prdDetailInfos.BigPhotoId)" alt=""/>
        </div>
        <div class="fl prdInfo">
          <h1>{{prdDetailInfos.Name}}</h1>
          <p>{{prdDetailInfos.Size}}</p>
          <div class="prdIntr">
            <p>【品名】 {{prdDetailInfos.Name}}</p>
            <p>【适用年龄】{{prdDetailInfos.SYRQ}}</p>
            <p>【保质期】 {{prdDetailInfos.QualityPeriod}}</p>
            <p>价格：<span>¥ {{prdDetailInfos.Money}}元</span></p>
          </div>
          <div>
            <span class="prdBtn" @click.prevent="goToBuyUrl(prdDetailInfos.TaobaoUrl)">立即购买</span>
            <span v-show="showUrl" style="color:#E1047F">*仅限线下店面购买</span>
          </div>
          <ul class="advantage">
            <li>
              <span></span>
              <p>健康营养</p>
            </li>
            <li >
              <span class="ad2"></span>
              <p>成长必备</p>
            </li>
            <li >
              <span class="ad3"></span>
              <p>正品保证</p>
            </li>
            <li >
              <span class="ad4"></span>
              <p>安心首选</p>
            </li>
          </ul>
        </div>
      </div>
      <div class="sharePrd">
        <p>—— 大家都在买 ——</p>
        <ul>
          <li v-for="(prdRecommendInfo,key) in prdRecommendInfos" :key="key">
            <router-link :to="{path:'/productDetail',query:{Id:lefBarIndex.Id,subId:lefBarIndex.subId,prdId:prdRecommendInfo.RecommendProductId}}">
              <img :src="getPic(prdRecommendInfo.ImgId)" alt=""/>
              <p>{{prdRecommendInfo.ProductName}}</p>
            </router-link>
          </li>
        </ul>
      </div>
      <div class="prdContent">
        <div class="fl" style="min-width: 192px;min-height: 100px;">
          <left-bar></left-bar>
        </div>
        <div class="prdDetail fl">
          <p>产品详情</p>
          <div v-html="prdDetailInfos.ProductDescribe" ref="det">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import LeftBar from '../base/leftbar.vue'
  import { _reqUrl, _productInfos, _prdRecommend, _prdRead, _writeURL } from '../../js/request.js'
  import { getImgs, imgSrc } from '../../js/index.js'
  export default {
    data () {
      return {
        showUrl:false,
        prdDetailInfos:{},
        lefBarIndex:{Id:'0',subId:'0'},
        prdRecommendInfos:[]
      }
    },
    watch:{
      // 路由变化
      "$route":'routeChange'
    },
    components: {
      LeftBar
    },
    mounted: function () {
      if(window.sessionStorage.leftBarIndex) {
        this.lefBarIndex = JSON.parse(window.sessionStorage.leftBarIndex)
      }
      this.getPrdDetail()
      this.putPrdRead()
    },
    methods: {
      putPrdRead () {
        let prdId = this.$route.query.prdId
        this.axios.post( _writeURL,{"Items":[{"AddOperationId": _prdRead,"Data":{"EntityName":"ProductRead","Items":{"ProductId":prdId,"Time":"1"},"Status":"New"}}]}).then((res) => {
          if(JSON.stringify(res.data) == "{}"){
            // 大家都在买
            this.getPrdRecommend()
          }
        }).catch((err) => {
          console.log(err)
        })
      },
      getPrdDetail () {
        let prdId = this.$route.query.prdId
        this.axios.post(_reqUrl,{"AppendixesFormatType":1,"Condition":"${Id} == '"+ prdId+"'","IsIncludeSubtables":false,"IsReturnTotal": true,"Operation": _productInfos, IsIncludeLong:true }).then((res) => {
          this.prdDetailInfos = res.data.Datas[0]
          this.$nextTick(() => {
            // 获取导航栏的元素
            let img = this.$refs.det.getElementsByTagName("img")
            imgSrc(img,'100%')
          })
        }).catch((err) => {
          console.log(err)
        })
      },
      getPrdRecommend () {
        this.axios.post(_reqUrl,{"AppendixesFormatType":1,"IsIncludeSubtables":false,"IsReturnTotal": true,"Operation": _prdRecommend,"MaxCount":'5'}).then((res) => {
          this.prdRecommendInfos = res.data.Datas
          //console.log(this.prdRecommendInfos)
        }).catch((err) => {
          console.log(err)
        })
      },
      routeChange () {
        if (this.$route.path == '/productDetail'){
          this.getPrdDetail()
          this.putPrdRead ()
        }
      },
      getPic (id) {
        return getImgs(id)
      },
      goToBuyUrl(url){
        if (url==''){
          this.showUrl = true
          return
        }
        window.open(url)
      }
    }
  }
</script>

<style scoped>
  .productContainer{
    width: 1150px;
    margin: 0 auto;
    padding: 50px 0;
    position: relative;
    min-height:1000px;
  }
  .prdContent{
    overflow: hidden;
  }
  .position>div:last-child {
    left: 105px;
  }
  .position{
    padding-left: 0;
  }
  .topBar{
    overflow: hidden;
    margin-top: 30px;
    margin-bottom: 40px;
  }
  .topBar div.fl{
    width:418px;
    height: 418px;
    border: 1px solid #DCDCDC;
  }
  .topBar div.fl img{
    width: 100%;
    height: 100%;
  }
  .topBar div.prdInfo{
    width: 510px;
    margin-left: 22px;
    border: 0;
    font-size: 14px;
    color:#979797;
    height: 420px;
    position: relative;
  }
  .topBar div.prdInfo h1{
    color: #252525;
    font-size: 20px;
  }
  .topBar div.prdInfo>p{
    color: #E1047F;
    margin-top: 5px;
  }
  .topBar div.prdInfo .prdIntr{
    padding:20px;
    box-sizing: border-box;
    line-height: 25px;
    color: #666;
    margin-top: 20px;
    background: rgba(241,241,241,1);
  }
  .prdBtn{
    display: inline-block;
    width:180px;
    height:40px;
    line-height: 40px;
    background:rgba(255,237,237,1);
    margin-top: 20px;
    margin-right: 16px;
    color:#F4299A;
    text-align: center;
    border: 1px solid #F4299A;
    font-size: 16px;
    cursor: pointer;
    -webkit-transition: all ease-out .5s;
    -o-transition: all ease-out .5s;
    transition: all ease-out .5s;
    -ms-transition: all ease-out .5s
  }
  .prdBtn:hover{
    background: #F4299A;
    color: #fff;
  }
  .topBar div.prdInfo ul{
    position: absolute;
    overflow: hidden;
    bottom: 0px;
    left: 0;
  }
  .topBar div.prdInfo ul li{
    float:left;
    width: 62px;
    margin-right: 50px;
    text-align: center;
  }
  .advantage span{
    display:inline-block;
    height:60px;
    width: 60px;
    border: 1px solid #DCDCDC;
    background: url("../../img/ad-1.png") no-repeat center center;
    margin-bottom: 10px;
    margin-right:50px;
  }
  .advantage span.ad2{
    background-image: url("../../img/ad-2.png");
  }
  .advantage span.ad3{
    background-image: url("../../img/ad-3.png");
  }
  .advantage span.ad4{
    background-image: url("../../img/ad-4.png");
  }
  .sharePrd{
    position: absolute;
    right: 10px;
    top: 50px;
    text-align: center;
    font-size: 12px;
  }
  .sharePrd li{
    position: relative;
    width: 148px;
    height: 148px;
    color: #666;
    font-size: 16px;
    margin-bottom: 20px;
    border: 1px solid #DCDCDC;
  }
  .sharePrd li img{
    height: 100%;
    width: 100%;
  }
  .sharePrd>p{
    color: #979797;
    margin-bottom:15px;
  }
  .sharePrd li p{
    position: absolute;
    bottom: 0px;
    width: 100%;
    background: rgba(255,255,255,.8);
    height: 32px;
    line-height: 32px;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
    padding:0 8px;
    box-sizing: border-box;
  }
  .prdDetail{
    width: 750px;
    margin-left: 18px;
    background:#E7E7E7;
    padding-bottom: 100px;
    min-height: 600px;
    border:1px solid #DCDCDC;
  }
  .prdDetail img{
    width: 100%;
  }
  .prdDetail p{
    height: 60px;
    line-height: 60px;
    font-size: 14px;
    box-sizing: border-box;
    padding-left: 20px;
    color:#979797;
    border-bottom: 1px solid #DCDCDC;
    background: #fff;
  }
  .prdIntr span{
    color:#E1047F;
    font-size: 22px;
  }
  .prdIntr p:last-child{
    margin-top: 5px;
    padding-left: 5px;
  }
</style>
