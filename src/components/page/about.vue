<template>
  <div class="aboutPage">
    <div class="aboutContainer" ref="about">
      <div class="aboutUs">
        <img src="../../img/aboutImg.jpg" alt=""/>
        <div class="aboutIntr">
          <div class="fl">
            <p class="aboutIntrTitele">企业概况</p>
            <span class="enIntrTitele">TAKE CARE PROFILE</span>
          </div>
          <div class="fr">
            培康食品（Take Care）2003年成立于杭州，是一家集研发、生产、营销为一体的婴童食品企业，主要经营自主培康品牌营养米粉、面条、磨牙棒饼干等婴幼儿辅助食品，也涵盖了肉绒、溶溶豆、水果豆、口水饼、小馒头等儿童健康食品，业务覆盖全国市场，企业所属工厂已通过国家HACCP食品安全管理体系认证与有机产品认证。 培康食品肩负着“致力于营养与健康产业、构建梦想实践平台、为顾客创造价值”的企业使命，经过十余年的发展积累及沉淀，致力于打造成为营养与健康产业的整合服务平台，现平台业务涵盖食品研发及生产、营销管理、国际贸易、跨境电商、互联网经营等领域。秉承“信任、创新、分享” 的价值观，培康食品赢得了大批精英的青睐，目前企业员工超过400人。 培康食品一直坚持拓展国际视野，已进入国际化战略合作、强强联合发展模式，目前，已同韩国、日本、台湾、澳大利亚、新西兰、德国等跨国企业建立业务合作关系。 因为同一份热爱与责任，我们用心前行；因为同一个梦想，我们全力以赴；与千万孩子和家庭分享最好的，成就你我的成就！
          </div>
        </div>
      </div>
      <div class="development">
       <div>
         <p class="aboutIntrTitele">发展历程</p>
         <p class="enIntrTitele">DEVELOPMENT</p>
         <div>
           <img src="../../img/timeLine.png" alt=""/>
         </div>
       </div>
      </div>
      <div class="brand">
        <div>
          <p class="aboutIntrTitele">品牌理念</p>
          <span class="enIntrTitele">BRAND CONCEPT</span>
        </div>
        <div>
          <div class="fl">
            <img src="../../img/about-bg-2.png" alt=""/>
          </div>
          <div class="fr">
            <h4>精粹自然 . 均衡营养</h4>
            <p>
              培康相信，自然是健康成长的源泉。因此，培康坚持用绿色原料，从自然中获得滋养生命成长的恩惠，精粹蕴含其中的营养，优异生产工艺全程保障纯净品质，以完善的产品系列呵护宝宝每一成长阶段。传递给钟情绿色生活方式，注重自然营养的年轻妈妈们。
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { backToTop } from '../../js/index.js'
  export default {
    data () {
      return {
        index:'',
      }
    },
    mounted: function () {
      // 1=企业概况，2=发展历程，3= 品牌理念
      // this.getAboutInfos(1)
    },
    methods: {
      onScrollTop (navHeight) {
        this.index = this.$route.query.Id
        let anchor = this.$refs.about.querySelector("."+this.index)
        document.body.scrollTop = anchor.offsetTop - navHeight
        // 火狐浏览器
        document.documentElement.scrollTop = anchor.offsetTop - navHeight
      }
//      getAboutInfos (type) {
//        this.axios.post( _reqUrl,{"AppendixesFormatType":1,"Condition":"${ColumnKey} == '"+type+"'","IsIncludeSubtables":false,"IsReturnTotal":true,"Operation": _about, IsIncludeLong:true}).then((res) => {
//          console.log(res.data)
//        }).catch((err) => {
//          console.log(err)
//        })
//      }
    },
    destroyed () {
      backToTop()
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .aboutContainer{
    /*width: 1300px;*/
    margin:0 auto;
  }
  .aboutIntr{
    width: 1140px;
    margin: 0 auto;
    padding: 75px 0;
    overflow: hidden;
  }
  .aboutIntr div.fr{
    width: 966px;
    height: 190px;
    line-height: 29px;
    text-align: justify;
    color: #979797;
    font-size: 16px;
  }
  .aboutIntrTitele{
    font-size: 22px;
    color: #252525;
    margin-bottom:8px;
    padding-top: 4px;
  }
  .enIntrTitele{
    color: #979797;
    font-size: 10px;
    letter-spacing:1px
  }
  .development{
    height: 1410px;
    box-sizing: border-box;
    padding: 72px 92px 0 92px;
    background: #F7F7F7;
  }
  .development>div{
    text-align: center;
    width: 1140px;
    margin: 0 auto;
  }
  .development p{
    text-align: left;
  }
  .brand>div:first-child{
    padding:58px 90px 30px 90px;
  }
  .brand>div:last-child{
    overflow: hidden;
    margin-bottom: 60px;
  }
  .aboutUs img{
    width: 100%;
  }
  .brand div.fr{
    width:646px;
    height: 429px;
    background: #F7F7F7;
    padding:113px 47px 0 47px;
    box-sizing: border-box;
    line-height: 29px;
    color: #979797;
    font-size: 16px;
  }
  .brand div.fr h4{
    margin-bottom: 30px;
    color: #666666 ;
    font-size: 25px;
  }
  .brand{
    width: 1300px;
    margin: 0 auto;
  }
</style>
