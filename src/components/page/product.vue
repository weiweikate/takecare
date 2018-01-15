<template>
  <div class="productPage">
    <div class="productImg">
      <img :src="getPic(indexPicShows.ImgId)"  alt=""/>
    </div>
    <div class="productContainer">
      <left-bar :prdType="prdType" @getPrdInfos="changeStartType"></left-bar>
      <div class="rightBar fr">
        <ul>
          <li v-for="(prdInfo,key) in prdInfos" :key="key">
            <router-link :to="{path:'/productDetail',query:{Id:leftIndex,subId:leftsubIndex,prdId:prdInfo.Id}}">
            <div>
              <img :src="getPic(prdInfo.BigPhotoId)" alt=""/>
            </div>
            <p>{{prdInfo.Name}}</p>
              查看详情 >>
            </router-link>
          </li>
        </ul>
        <div class="pagination" v-if="totalCount>0">
          <el-pagination  background  layout="prev, pager, next" :page-size="pageSize" :total="totalCount" :current-page="currentPage" @current-change="getPrdInfos">
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import LeftBar from '../base/leftbar.vue'
  import { _reqUrl, _rotationPicture, _productInfos } from '../../js/request.js'
  import { getImgs } from '../../js/index.js'
  export default {
    props: {
      prdType: {
        type: Array,
        default: function () {
          return []
        }
      }
    },
    data () {
      return {
        indexPicShows:'', // 海报图片
        imgHeight:'',
        startIndex:0, // 从第几条开始请求
        totalCount:0, // 总条数
        pageSize:8, // 每页显示的页数
        currentPage:1, // 当前页数
        prdInfos:[], // 产品信息
        prdTypeId:'', // 1级分类ID
        prdSubTypeId:'', // 二级分类ID
        leftIndex:'',
        leftsubIndex:''
      }
    },
    components: {
      LeftBar
    },
    mounted: function () {
      this.getPicShow()
    },
    computed:{

    },
    methods: {
      getPrdInfos (index) {
        this.startIndex = (index-1)* this.pageSize
        this.axios.post(_reqUrl,{"AppendixesFormatType":1,"Condition":"${Type1Key} == '"+ this.prdTypeId+"' && ${Type2Key} == '"+this.prdSubTypeId+"'","StartIndex":String(this.startIndex),MaxCount:String(this.pageSize),"IsIncludeSubtables":false,"IsReturnTotal": true,"Operation": _productInfos }).then((res) => {
          //console.log(res.data)
          this.currentPage = index
          this.prdInfos = res.data.Datas
          this.totalCount = Number(res.data.Total)
        }).catch((err) => {
          console.log(err)
        })
      },
      changeStartType (start,Id,subId,leftIndex,leftsubIndex) {
        this.startIndex = 0
        this.prdTypeId = Id
        this.prdSubTypeId  = subId
        this.leftIndex  = leftIndex
        this.leftsubIndex  = leftsubIndex
        this.getPrdInfos(start)
      },
      getPicShow () {
        this.axios.post( _reqUrl,{"AppendixesFormatType":1,"Condition":"${TypeKey} == '2'","IsIncludeSubtables":false,"IsReturnTotal":true,"Operation": _rotationPicture }).then((res) => {
          this.indexPicShows = res.data.Datas[0]
        }).catch((err) => {
          console.log(err)
        })
      },
      getPic (id) {
        return getImgs(id)
      }
    }
  }
</script>
<style>

</style>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .productContainer,.productPage{
    width:100%;
  }
  .productImg{
    min-height: 393.75px;;
  }
  .productImg img{
   width: 100%;
 }
  .productContainer{
    width:1160px;
    margin: 0 auto;
    padding: 30px 0 50px 0;
    overflow: hidden;
  }
  .rightBar{
    width:952px;
    overflow: hidden;
    min-height:800px;;
  }
 .rightBar ul li{
   width: 188px;
   overflow: hidden;
   text-align: center;
   float: left;
   margin:0 25px;
   margin-bottom: 30px;
 }
 .rightBar ul li p{
   padding:15px 5px;
   font-size: 14px;
   color: #252525;
   overflow: hidden;
   text-overflow:ellipsis;
   white-space: nowrap;
 }
 .rightBar ul{
   overflow: hidden;
   min-height: 478px;
 }
 .rightBar ul li a{
   color: #F95782;
 }
 .rightBar ul li img{
   width: 100%;
   height: 188px;
 }
  .rightBar li div{
    border: 1px solid #DCDCDC;
  }
</style>
