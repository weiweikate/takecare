<template>
  <div class="newsDatailPage">
    <div class="container">
      <div class="position">
        <div>您当前的位置：</div>
        <div>
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/news' }">资讯中心</el-breadcrumb-item>
            <el-breadcrumb-item>{{news.Heading}}</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
      </div>
      <div class="newsContent">
        <h1>{{news.Heading}}</h1>
        <p>{{"发布时间："+news.CreateTime.slice(0,10)}}</p>
        <div v-html="news.Content" ref="news">
        </div>
        <p class="newsBtn">
          <el-button plain @click.native="getNextNews(0)" :disabled="prevBtn"> &lt; 上一篇</el-button>
          <el-button plain @click.native="getNextNews(1)" :disabled="nextBtn">下一篇 &gt;</el-button>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
  import { _reqUrl, _news, _topNews,_typeNews } from '../../js/request.js'
  import { imgSrc } from '../../js/index.js'
  export default {
    data () {
      return {
        prevBtn:false,
        nextBtn:false,
        newsUrl:{topNews:'',News:'',typeNews:''},
        news:{'CreateTime':'',Heading:''},
        btnNews:{},
        newsType:'', // 新闻类型的名字和router中的query的key对于 置顶新闻（topNews） 最新动态（News） 和品牌上新（typeNews）
        newsTypeUrl:'', // 新闻类型的ID 用来请求url
        newsId:'' // 该条新闻的Id
      }
    },
    watch:{
      // 路由变化
      "$route":'getTotalNews'
    },
    mounted: function () {
      // 获取新闻的名字 id 和请求操作url地址
      this.newsType= this.$route.query.key
      this.newsUrl = {topNews:_topNews,News:_news,typeNews:_typeNews}
      this.newsTypeUrl =this.newsUrl[this.newsType]
      // 请求该条新闻 和总的新闻
      this.getNewsDetail()
      this.getTotalNews()
    },
    methods: {
      getNewsDetail () {
        this.newsId = this.$route.query.Id
        this.axios.post( _reqUrl,{"AppendixesFormatType":1,"Condition":"${Id} == '"+this.newsId+"'","IsIncludeSubtables":false,"IsReturnTotal":true,"Operation": this.newsTypeUrl, IsIncludeLong:true}).then((res) => {
          this.news = res.data.Datas[0]
          this.getImgSrc()
        }).catch((err) => {
          console.log(err)
        })
      },
      getTotalNews () {
        this.newsId = this.$route.query.Id
        this.prevBtn = false
        this.nextBtn = false
        this.axios.post( _reqUrl,{"AppendixesFormatType":1,"IsIncludeSubtables":false,"IsReturnTotal":true,"Operation": this.newsTypeUrl, IsIncludeLong:true}).then((res) => {
          let total = res.data.Datas
          // 得到新闻的前一条新闻 和后一条新闻
          for (let i=0;i<total.length;i++) {
            if( total[i].Id == this.newsId ) {
              this.btnNews = {prev:total[i-1],next:total[i+1]}
              break
            }
          }
          this.isDisabledBtn()
        }).catch((err) => {
          console.log(err)
        })
      },
      getNextNews (obj) {
        if (obj == 0 ){
          this.news = this.btnNews.prev
        } else {
          this.news = this.btnNews.next
        }
        this.getImgSrc()
        this.$router.push({path:'/newsDetail',query:{key:this.newsType,Id:this.news.Id}})
        document.body.scrollTop = document.documentElement.scrollTop = 0
      },
      isDisabledBtn () {
        if(!this.btnNews.prev){
          this.prevBtn = true
        } else if (!this.btnNews.next) {
          this.nextBtn = true
        }
      },
      getImgSrc () {
        this.$nextTick(() => {
          // 获取导航栏的元素
          let img = this.$refs.news.getElementsByTagName("img")
          imgSrc(img,'90%')
        })
      }
    }
  }
</script>
<style>
   .newsBtn .el-button.is-plain:hover{
    background: #E1047F !important;
    border-color: #E1047F !important;
    color: #fff !important;
  }
   .newsBtn .el-button.is-plain:focus{
     border: 1px solid #dcdfe6;
     color: #606266;
   }
   .newsBtn .el-button.is-disabled.is-plain, .newsBtn .el-button.is-disabled.is-plain:focus, .newsBtn .el-button.is-disabled.is-plain:hover {
     background-color: #fff !important;
     border-color: #ebeef5 !important;
     color: #c0c4cc !important;
   }
</style>
<style scoped>
  .newsDatailPage{
    background:#F7F7F7;
    padding: 15px 0 ;
  }
  .container{
    margin:0px auto;
    width: 1300px;
    min-height: 650px;
    background: #fff;
    padding-top: 30px;
  }
  .newsContent{
    padding: 60px 190px;
  }
  .newsContent img{
    max-width: 1056px;
  }
  .newsContent h1{
    font-size: 24px;
    color: #252525;
    text-align: center;
  }
  .newsContent div{
    line-height: 28px;
    color:#979797;
    font-size: 16px;
  }
  .newsContent img{
    display: block;
    margin: 0 auto;
    margin-top: 40px;
    margin-bottom: 20px;
    max-width: 100%;
  }
  .newsContent .newsBtn{
    text-align: center;
    margin-top: 40px;
    margin-bottom: 0px;
  }
  .newsBtn button{
    margin:0 25px;
  }
  .newsContent p{
    margin-top:15px;;
    margin-bottom:60px;
    text-align: center;
    color:#979797;
  }
</style>
