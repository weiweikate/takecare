<template>
  <div class="indexPage" ref="index">
    <div ref="container">
      <!-- 轮播图片-->
      <div class="indexPicShow">
        <el-carousel :interval="5000" :height="height">
          <el-carousel-item v-for="(indexPicShow,key) in indexPicShows" :key="key" >
            <div class="imgDIV" ref="img" v-if="key == 1">
              <img :src="getPic(indexPicShow.ImgId)" alt=""/>
            </div>
            <div class="imgDIV" v-else>
              <img :src="getPic(indexPicShow.ImgId)"/>
            </div>
          </el-carousel-item>
        </el-carousel>
      </div>
      <div class="aboutTakecare ">
        <div >
          <div class="about fl wow zoomIn" data-wow-offset="210">
            <p class="intrColor">关于培康</p>
            <p class="intrEnColor">ABOUT TAKE CARE</p>
            <div class="aboutContent">
              培康食品（Take Care）2003年成立于杭州，专注品质孕婴童营养膳食，肩负着“致力于营养与健康产业、构建梦想实践平台、为顾客创造价值”的企业使命，致力于打造成为营养与健康产业的整合服务平台，现平台业务覆盖全国市场，并进入国际化战略合作、强强联合发展模式，深受千万孩子和家庭的信赖。
            </div>
          </div>
          <div class="fr wow fadeInRight " data-wow-offset="210">
            <ul >
              <li class="survey">
                <router-link :to="{path:'/about',query:{Id:'aboutUs'}}">
                  <div>企业概况</div>
                </router-link>
              </li>
              <li class="course">
                <router-link :to="{path:'/about',query:{Id:'development'}}">
                  <div>
                    发展历程
                  </div>
                </router-link>
              </li>
              <li class="idea">
                <router-link :to="{path:'/about',query:{Id:'brand'}}">
                  <div>品牌理念</div>
                </router-link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="product">
        <div class="contentDiv">
          <p class="intrColor">产品中心</p>
          <p class="intrEnColor">PRODUCT CENTER</p>
          <ul class="ft-service">
            <li class="wow fadeInUpBig" v-for="(type,key) in prdType" :key="key" :data-wow-delay="0.3*key+'s'">
             <router-link :to="{ path:'/product',query:{Id:key}}">
               <div>
                 <img :src="getPic(type.ImgId)" alt=""/>
                 <p>{{type.Name}}</p>
               </div>
             </router-link>
            </li>
          </ul>
        </div>
      </div>
      <div class="customized">
        <div class="contentDiv">
          <div class="fr">
            <div class="wow rotateInUpRight">
              <p class="intrColor">积分商城</p>
              <p class="intrEnColor">INTEGRAL MALL</p>
              <div class="advantage">
                <p>积分优惠尽在积分商城</p>
                <p> <span></span>积分兑换<span></span>好礼相送</p>
                <p> <span></span>增值服务<span></span>超值体验</p>
              </div>
            </div>
            <a class="wow rollIn" target="_blank" href="http://erp.takecare.com.cn/Libra.Web.Answer.Customized.Do.aspx?R=3de36290-c353-41da-8cdd-9f9c00f3c385">
              点我马上兑换
            </a>
          </div>
        </div>
      </div>
      <div class="news">
        <div class="contentDiv">
          <p class="intrColor">资讯中心</p>
          <p class="intrEnColor">
            NEWS CENTER
            <router-link :to="{path:'/news'}">
              <span class="fr">MORE>> </span>
            </router-link>
          </p>
          <div class="newsContent">
            <div  class="fl leftBar wow fadeInLeft">
              <router-link :to="{path:'/newsDetail',query:{key:'typeNews',Id:typeNews.Id}}">
                <div class="newsImg">
                  <img :src="getPic(typeNews.ImgId)" alt=""/>
                </div>
                <div class="newsInfo ">
                  <h4>{{typeNews.Heading}}</h4>
                  <!--<div style="color: #979797">{{typeNews.Subject}}</div>-->
                  <p>
                    <span class="fl">{{typeNews.CreateTime.slice(0,10)}}</span>
                    <span class="fr">查看全文》</span>
                  </p>
                </div>
              </router-link>
            </div>
            <div class="fr centerBar">
              <div v-for="(newsInfo,key) in newsInfos" :key="key"  :class="newsClass[key]">
                <router-link :to="{path:'/newsDetail',query:{key:'News',Id:newsInfo.Id}}">
                  <div class="newsImg">
                    <img :src="getPic(newsInfo.PhotoId)" alt=""/>
                  </div>
                  <div class="newsInfo ">
                    <h4>{{newsInfo.Heading}}</h4>
                    <div>{{newsInfo.Subject}}</div>
                    <p>
                      <span class="fl">{{newsInfo.CreateTime.slice(0,10)}}</span>
                      <span class="fr">查看全文》</span>
                    </p>
                  </div>
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="join">
        <div class="contentDiv">
          <div>
            <p class="intrColor  wow fadeInRight">招贤纳士</p>
            <p class="intrEnColor wow fadeInLeft ">HUMAN RESOURCE</p>
            <div class="joinUs wow fadeInUp" >
              <p>你用才华撑起野心，</p>
              <p>培康用舞台成就你的梦想！</p>
            </div>
            <router-link :to="{path:'/joinUs'}">
              <span class="btn wow rotateInUpRight">加入我们</span>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import WOW from 'WOW'
  import { _reqUrl, _rotationPicture, _news, _typeNews } from '../../js/request.js'
  import { getImgs , browserRedirect, backToTop } from '../../js/index.js'
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
        height:'630px',
        navTitle:'',
        navHeight:'',
        textChild:'',
        a :'',
        indexPicShows:[],
        newsInfos:[],
        typeNews:{ Heading:'',Subject:'',CreateTime:'2017-10-20'},
        newsClass:['topBar wow fadeInDown','bottomBar wow fadeInUp','rightBar wow fadeInRight'],
      }
    },
    watch: {
      a: 'test2'
    },
    mounted: function () {
      if (this.isPhone()) {
        this.initWow(-200)
      } else {
        window.addEventListener('scroll', this.onScroll,false)
        this.initWow(100)
      }
      this.scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop
      this.resizeImg()
      this.getIndexPicShow ()
      this.getIndexNews(_typeNews,'1')
      this.getIndexNews(_news,'3')
    },
    methods: {
      getIndexPicShow () {
        this.axios.post( _reqUrl,{"AppendixesFormatType":1,"Condition":"${TypeKey} == '1'","IsIncludeSubtables":false,"IsReturnTotal":true,"Operation": _rotationPicture }).then((res) => {
          this.indexPicShows = res.data.Datas
        }).catch((err) => {
          console.log(err)
        })
      },
      getIndexNews (type,count) {
        this.axios.post( _reqUrl,{"AppendixesFormatType":1,"IsIncludeSubtables":false,"IsReturnTotal":true,"MaxCount":count,"Operation": type, IsIncludeLong:true}).then((res) => {
          if (type == _typeNews ){
            this.typeNews = res.data.Datas[0]
          } else {
            this.newsInfos = res.data.Datas
          }
        }).catch((err) => {
          console.log(err)
        })
      },
      animateShow (navTitle,navHeight) {
        // 获取导航栏的元素
        this.navTitle = navTitle
        this.navHeight = navHeight
        this.textChild = this.$refs.container.children
        if (!this.isPhone()) {
          this.a = 1
        }
      },
      onScroll (e) {
        e = window.event||e
        if(document.all){  //只有ie识别
          e.cancelBubble=true
          e.returnValue=false
        }else{
          e.stopPropagation()
          e.preventDefault()
        }
        let _this = this
        let scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop
        for( let i=0;i<_this.navTitle.length;i++){
          if( scrollTop + _this.navHeight>= _this.textChild[i].offsetTop){
            for( let j=0;j<_this.navTitle.length;j++){
              _this.navTitle[j].className = "title"
            }
            _this.navTitle[i].className = "title active"
          }
        }
      },
      handleSelect () {
        for(let i=0;i<this.navTitle.length;i++){
          let _this = this
          let interval
          this.navTitle[i].index = i
          if (!(!!window.ActiveXObject || "ActiveXObject" in window) ) {
            this.navTitle[i].onclick = function(event){
              event = window.event||event
              if(document.all){  //只有ie识别
                event.cancelBubble=true
                event.returnValue=false
              }else{
                event.stopPropagation()
                event.preventDefault()
              }
              let self = this
              clearInterval(interval)
              interval = setInterval(function(){
                //var scrollTop0 = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop
                if( (document.documentElement.scrollTop || document.body.scrollTop) + _this.navHeight<= _this.textChild[self.index].offsetTop){
                  document.body.scrollTop += 100
                  document.documentElement.scrollTop += 100
                  if( (document.documentElement.scrollTop || document.body.scrollTop)+ _this.navHeight>=_this.textChild[self.index].offsetTop){
                    document.body.scrollTop = _this.textChild[self.index].offsetTop-_this.navHeight
                    document.documentElement.scrollTop = _this.textChild[self.index].offsetTop-_this.navHeight
                    clearInterval(interval)
                  }
                }else{
                  document.body.scrollTop /= 1.2
                  document.documentElement.scrollTop /= 1.2
                  if( (document.documentElement.scrollTop || document.body.scrollTop) + _this.navHeight<=_this.textChild[self.index].offsetTop){
                    document.body.scrollTop = _this.textChild[self.index].offsetTop-_this.navHeight
                    document.documentElement.scrollTop= _this.textChild[self.index].offsetTop-_this.navHeight
                    clearInterval(interval)
                  }
                }
              },40)
            }
          }
        }
      },
      initWow (h){
        if (!(/msie [6|7|8|9]/i.test(navigator.userAgent))) {
          let wow = new WOW({
            boxClass: 'wow',
            animateClass: 'animated',
            offset: h,
            mobile: true,
            live: true
          })
          wow.init()
        }
      },
      resizeImg () {
        // 轮播图高度自适应
        if (document.body.clientWidth >= 1200) {
          this.height =  Number(document.body.clientWidth)/3.048+'px'
        } else {
          this.height = 1200/3.048+'px'
        }
        const that = this
        window.onresize = function temp() {
          if (document.body.clientWidth<1200) return
          that.height =  Number(document.body.clientWidth)/3.048+'px'
        }
      },
      isPhone () {
        return browserRedirect()
      },
      getPic (imgId) {
        return getImgs(imgId)
      },
      test2 () {
        if(this.a ==1){
          this. handleSelect()
        }
      }
    },
    destroyed () {
      if (!this.isPhone()) {
        window.removeEventListener('scroll',this.onScroll,false)
        window.onresize = null
        for( let j=0;j<this.navTitle.length;j++){
          this.navTitle[j].className ="title"
          this.navTitle[j].onclick = null
        }
        backToTop()
      }
    }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .imgDIV img{
    width: 100%;
    /*height: 630px;*/
  }
  .aboutTakecare,.product,.customized,.news,.join{
    height:630px;
    box-sizing: border-box;
    padding-top: 93px;
    background:url("../../img/index_bg-1.jpg") no-repeat center center;
  }
  .aboutTakecare>div{
    width: 1120px;
    margin: 0 auto;
  }
  .aboutTakecare> ul{
    border-radius: 4px;
    overflow: hidden;
  }
  .contentDiv{
    width: 1200px;
    margin: 0 auto;
    box-sizing: border-box;
  }
  .about{
    width:384px;
    height: 442px;
    background: #fff;
    box-sizing: border-box;
    padding: 48px 54px;
    font-size: 17px;
    line-height:30px;
    color: #666;
    text-align:justify;
    border-radius: 4px;
  }
  .intrColor{
    font-size: 40px;
    color: #CEBA73;
    margin-bottom: 5px;
  }
  .intrEnColor{
    color: #979797;
    margin-bottom:15px;
    letter-spacing:1px
  }
  .aboutTakecare div.fr li div{
    width:148px;
    height: 148px;
    box-sizing: border-box;
    text-align: center;
    border-bottom:1px solid #eeeeee;
    padding-top: 87px;
    color: #C2BEBF;
    background:#fff url("../../img/gaikuang.png") no-repeat center 46px;
    cursor: pointer;
  }
  .aboutTakecare div.fr li:hover div {
    color:#E2047F;
  }
  .aboutTakecare div.fr ul{
    border-radius: 4px;
    overflow: hidden;
  }
  .aboutTakecare div.fr .survey:hover div{
    background-image:url("../../img/gaikuang-c.png") ;
  }
  .aboutTakecare div.fr .course div{
    background-image:url("../../img/licheng.png") ;
  }
  .aboutTakecare div.fr .course:hover div{
    background-image:url("../../img/licheng-c.png") ;
  }
  .aboutTakecare div.fr .idea:hover div{
    background-image:url("../../img/dengpao-c.png") ;
  }
  .aboutTakecare div.fr .idea div{
    background-image:url("../../img/dengpao.png") ;
  }
  .product{
    background-image: url("../../img/index_bg-2.jpg");
  }
  .product ul{
    height: 330px;
    margin-top: 20px;
  }
  .product li div{
    width:189px;
    height: 328px;
    float: left;
    margin-left: 12px;
    background: #fff;
    border-radius: 6px;
    cursor: pointer;
    box-sizing: border-box;
    border-bottom:6px solid transparent;
  }
  .product li:first-child div{
    margin-left: 0px;
  }
  .product li p{
    margin-top: 24px;
    text-align: center;
    font-size: 17px;
    color: #979797;
  }
  .product li div,.aboutTakecare div.fr li,.btn{
    -webkit-transition: all ease-out .5s;
    -moz-transition: all ease-out .5s;
    -o-transition: all ease-out .5s;
    transition: all ease-out .5s;
    -ms-transition: all ease-out .5s;
  }
  .product li:hover div {
    -webkit-transform: translateY(-20px);
    -moz-transform: translateY(-20px);
    -o-transform: translateY(-20px);
    transform: translateY(-20px);
    -ms-transform: translateY(-20px);
    box-shadow: 0 2px 14px 0 rgba(0,0,0,.2);
    border-bottom:6px solid #CEBA73;
  }
  .product li:hover p{
    color:#CEBA73
  }
  .customized{
    background-image: url("../../img/index_bg-3.jpg") ;
  }
  .customized div.fr>div{
    height: 310px;
    width: 354px;
    margin-right: 120px;
    box-sizing: border-box;
    padding: 54px;
    margin-bottom: 10px;
    border-radius:4px;
    background:rgba(255,255,255,.86);
  }
  .btn{
    display: inline-block;
    width: 214px;
    height: 46px;
    line-height: 46px;
    color: #CEBA73;
    border: 1px solid #CEBA73;
    text-align: center;
    font-size:20px ;
    cursor: pointer;
    border-radius:4px;
  }
  .btn:hover{
    background: #CEBA73;
    border: 1px solid transparent;
    color: #fff;
  }
  .customized div.fr>a{
    display: inline-block;
    width: 354px;
    height: 60px;
    line-height: 60px;
    color: #fff;
    text-align: center;
    font-size:18px ;
    background: #CEBA73;
    border-radius: 4px;
  }
  .advantage p:first-child{
    font-size: 24px;
    color: #252525;
    margin: 15px 0 ;
    margin-top:20px;
  }
  .advantage p{
    color: #979797;
    font-size: 20px;
    margin-bottom: 10px;
  }
  .news{
    background-image: url("../../img/index_bg-4.jpg");
    padding-top: 45px;
  }
  .news .contentDiv{
    width: 1041px;
    padding-top: 10px;
  }
  .newsContent>div{
    height: 431px;
    box-sizing: border-box;
    cursor: pointer;
  }
  .centerBar>div{
    position: absolute;
    width: 505px;
    box-shadow: 0 8px 12px 0 rgba(0,0,0,.1);
    height:210px ;
    box-sizing: border-box;
    background: #ffffff;
    padding:20px;
    border-radius: 4px;
  }
  .centerBar .topBar{
    top:0;
    left:0;
  }
  .centerBar .bottomBar{
    bottom:0;
    left: 0;
    overflow: hidden;
  }
  .centerBar .bottomBar .newsInfo{
    float: left;
  }
  .centerBar .bottomBar .newsImg{
    float: right;
  }
  .centerBar .rightBar{
    right:0;
    top: 0;
    padding:25px 10px;
  }
  .leftBar{
    background: #ffffff;
    width: 252px;
    box-shadow: 0 8px 12px 0 rgba(0,0,0,.1);
    border-radius: 4px;
    overflow: hidden;
  }
  .centerBar{
    width: 774px;
    margin-left: 15px;
    position: relative;
  }
  .centerBar .rightBar{
    height: 431px;
    width: 252px;
  }
  .join{
    background: url("../../img/index_bg-5.jpg");
    padding-top: 160px;
  }
  .join .contentDiv>div{
    padding-left: 140px;
    width:240px;
  }
  .joinUs P:first-child{
    font-size: 24px;
    margin-bottom: 10px;
    padding-top: 10px;
  }
  .joinUs {
    font-size: 20px;
    text-align: justify;
    margin-bottom: 16px;
  }
  .centerBar .newsImg{
    width: 234px;
    height: 170px;
  }
  .leftBar .newsImg{
    width: 100%;
    height: 310px;
  }
  .news .newsImg{
    float: left;
    overflow: hidden;
  }
  .news img:hover {
    -webkit-transform: scale(1.08);
    -o-transform: scale(1.08);
    transform: scale(1.08);
    -ms-transform: scale(1.08)
  }
  .news  img {
    width: 100%;
    height: 100%;
    -webkit-transition: all ease-out .5s;
    -o-transition: all ease-out .5s;
    transition: all ease-out .5s;
    -ms-transition: all ease-out .5s
  }
  .leftBar .newsInfo,.rightBar .newsInfo{
    clear: both;
    float: none;
    margin:0 auto;
    padding:18px 0;
  }
  .leftBar .newsInfo div{
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }
  .leftBar .newsInfo{
    padding: 10px;
    padding-top: 12px;
  }
  .leftBar .newsInfo h4{
    margin-bottom:8px;
  }
  .rightBar .newsInfo>div{
    -webkit-line-clamp:6;
    height: 109px;
  }
  .newsInfo{
    float: right;
    width: 210px;
  }
  .newsInfo>div{
    overflow:hidden;
    text-overflow:ellipsis;
    display:-webkit-box;
    -webkit-box-orient:vertical;
    -webkit-line-clamp:4;
    line-height: 22px;
    font-size: 14px;
    color: #979797;
    box-sizing:border-box;
    text-align: justify;
    height: 90px;
  }
  .newsInfo h4{
    /*height: 43px;*/
    max-height: 43px;
    width: 208px;
    margin:0 auto;
    font-size: 18px;
    margin-bottom:15px;
    color: #666;
    overflow:hidden;
    text-overflow:ellipsis;
    display:-webkit-box;
    -webkit-box-orient:vertical;
    -webkit-line-clamp:2;
    line-height: 22px;
    font-size: 14px;
    color: #666;
  }
  .newsInfo p{
    margin-top: 8px;
    color: #bbb;
    overflow: hidden;
  }
  .newsInfo p span.fr{
    color: #0A98D3;
  }
  .intrEnColor a:hover{
    color: #E2047F;
  }
  .advantage p span{
    display: inline-block;
    width:6px;
    height: 6px;
    border-radius: 6px;
    background: #979797;
    vertical-align: middle;
    margin:0 8px;
  }
  .advantage p span:first-child{
    margin-left: 0px;;
  }
</style>
