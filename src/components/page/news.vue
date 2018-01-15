<template>
  <div class="newsPage">
    <div class="newsContainer">
      <div class="newsShow">
        <div class="newsPicShowDiv  fl">
          <el-carousel :autoplay="autoplay" height="420px" @change="changeNews" ref="carousel">
            <el-carousel-item v-for="(news,key) in topNews" :key="key" name="key">
              <router-link :to="{path:'/newsDetail',query:{key:'topNews',Id:news.Id}}">
                <img :src="getPic(news.PhotoId)" alt=""/>
              </router-link>
            </el-carousel-item>
          </el-carousel>
        </div>
        <div class="fr">
          <ul>
            <li v-for="(news,key) in topNews" :key="key" :class="{'active':activeClass[key]}" @mouseenter="setActiveItem(key)" @mouseleave="autoplay = true">
              <router-link :to="{path:'/newsDetail',query:{key:'topNews',Id:news.Id}}">
                <h4>{{news.Heading}}</h4>
                <p>{{news.Subject}}</p>
              </router-link>
            </li>
          </ul>
        </div>
      </div>
      <div class="news">
        <h3>最新动态</h3>
        <ul>
          <li v-for="(newsInfo,key) in newsInfos" :key="key">
           <router-link :to="{path:'/newsDetail',query:{key:'News',Id:newsInfo.Id}}">
             <div class="fl">
               <img :src="getPic(newsInfo.PhotoId)" alt=""/>
             </div>
             <div class="fr">
               <h4>{{newsInfo.Heading}}</h4>
               <p>{{newsInfo.Subject}}</p>
               <span class="fr">查看全文》</span>
               <span class="fl">{{newsInfo.CreateTime.slice(0,10)}}</span>
             </div>
           </router-link>
          </li>
        </ul>
        <div class="pagination" v-if="totalNews>0">
          <el-pagination  background  :page-size="pageSize"
            layout="prev, pager, next"
            :total="totalNews" @current-change="getIndex">
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { _reqUrl, _news, _topNews } from '../../js/request.js'
  import { getImgs } from '../../js/index.js'
  export default {
    data () {
      return {
        index:'',
        autoplay: true,
        newsInfos: [],
        topNews:[],
        activeClass:[true,false,false],
        startIndex:0, // 从第几条开始请求
        totalNews:0, // 总条数
        pageSize:6 // 每页显示的页数
      }
    },
    mounted: function () {
      this.getNews(_topNews,'3',1)
      this.getNews(_news,this.pageSize,1)
    },
    methods: {
      changeNews (key) {
        this.activeClass = []
        this.$set(this.activeClass,key,true)
      },
      getNews (type,count,startIndex) {
        // 获取新闻 新闻类型 每次获取的条数 从第几条开始获取
        let index = (startIndex-1)* count
        this.axios.post( _reqUrl,{"AppendixesFormatType":1,"StartIndex":String(index),MaxCount:String(this.pageSize),"IsIncludeSubtables":false,"IsReturnTotal":true,"MaxCount":count,"Operation": type, IsIncludeLong:true}).then((res) => {
          if( type == _topNews ) {
            this.topNews = res.data.Datas
          } else {
            this.newsInfos = res.data.Datas
            this.totalNews = res.data.Total
          }
        }).catch((err) => {
          console.log(err)
        })
      },
      setActiveItem (index) {
        this.autoplay = false
        this.$refs.carousel.setActiveItem(index)
      },
      getIndex (index) {
        // 点击分页器的时候 加载新闻
        this.getNews(_news,this.pageSize,index)
      },
      getPic (id) {
        return getImgs(id)
      }
    }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .newsPage{
    background: #F7F7F7;
    padding: 10px 0;
  }
  .newsContainer{
    width: 1200px;
    margin: 0 auto;
    box-sizing: border-box;
  }
  .newsShow{
    overflow:hidden;
    height:420px;
  }
  .newsPicShowDiv{
    width: 750px;
  }
  .newsPicShowDiv img{
    width: 100%;
    height: 420px;
  }
  .newsShow div.fr{
    width:450px;
    height: 420px;
    box-sizing: border-box;
    border-top: 1px solid #DCDCDC;
    border-bottom: 1px solid #DCDCDC;
    background: #fff;
  }
  .newsShow ul{
    width: 100%;
    min-height:500px;
  }
  .newsShow ul li{
    height: 140px;
    width: 100%;
    border-right: 1px solid #DCDCDC;
    border-bottom: 1px solid #DCDCDC;
    box-sizing: border-box;
    cursor: pointer;
    color: #979797;
    font-size: 16px;
    padding:36px 33px;
  }
  .newsShow ul li.active,.newsShow ul li:hover{
    border-right: 8px solid #E1047F;
  }
  .newsShow ul li h4,.news li div.fr h4{
    font-size: 22px;
    color: #666;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
    margin-bottom: 8px;
  }
  .newsShow ul li.active h4,.newsShow ul li:hover h4{
    color: #252525;
  }
  .newsShow ul li p,.news li div.fr p{
    overflow:hidden;
    text-overflow:ellipsis;
    display:-webkit-box;
    -webkit-box-orient:vertical;
    -webkit-line-clamp:2;
    line-height: 22px;
    height:42px;
  }
  .news{
    margin-top: 10px;
    padding:42px 48px;
    box-sizing: border-box;
    background: #fff;
    min-height: 600px;
  }
  .news h3{
    font-size:20px;
    margin-left: 20px;
    border-left:6px solid #E1047F;
    color:#252525;
    margin-bottom: 20px;
    padding-left: 12px;
  }
  .news ul{
    overflow: hidden;
    border-top: 1px solid #DCDCDC;
    padding: 0 20px;
  }
  .news ul li{
    float: left;
    box-sizing: border-box;
    padding:30px 0;
    color: #979797;
    font-size: 16px;
    border-bottom: 1px solid #DCDCDC;
  }
  .news ul li:nth-child(odd){
    margin-right: 30px;
  }
  .news ul li:nth-child(even){
    margin-left: 30px;
  }
  .news li div.fl{
    width: 178px;
    height: 100px;
    overflow:hidden;
    margin-right: 19px;
    padding-top:3px;
  }
  .news li div.fl img{
    width: 100%;
  }
  .news li div.fr{
    width: 305px;
    text-align: justify;
  }
  .news li div.fr p{
    margin-bottom: 8px ;
  }
  .news li div.fr span.fr{
    color:cornflowerblue;
  }
  .pagination{
    margin-top: 50px;
  }
</style>
