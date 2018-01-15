<template>
  <div id="app">
    <nav-bar ref="navbar" :prdType="productType"></nav-bar>
    <router-view ref="myView" :prdType="productType" keep-alive/>
    <div class="back" @click.prevent="backTop" ref="backBtn" v-show="showBack"></div>
    <v-footer></v-footer>
  </div>
</template>

<script>
  import VFooter from './components/base/footer.vue'
  import NavBar from './components/base/navbar.vue'
  import { _loginURL, _reqUrl, _productType} from './js/request.js'
  import { quickSort, backToTop } from './js/index.js'
  export default {
    data () {
      return {
        path:'', // 监听路由的变化
        IndexNavHeight: '', // 导航栏高度
        IndexNavTitle: '', // 导航栏的标题
        productType: [],
        showBack: false
      }
    },
    watch:{
      $route(){
        if( this.$route.path == '/index') {
          this.indexPage ()
        } else if (this.$route.path == '/about') {
          this.aboutPage()
        }
      }
    },
    components: {
      VFooter,
      NavBar
    },
    mounted: function () {
      window.addEventListener('scroll', this.backTopScroll,false)
      this.getPrdType ()
      this.$nextTick(() => {
        // 获取导航栏的元素
        this.IndexNavTitle = this.$refs.navbar.getNavChildren().title
        this.IndexNavHeight = this.$refs.navbar.getNavChildren().h
        this.indexPage ()
        let right =Math.abs(( Number(document.body.clientWidth) -1300)/2 -50)
        this.$refs.backBtn.style.right = right+'px'
      })
    },
    methods: {
      indexPage () {
        this.$nextTick(() => {
          if (this.$route.path == '/index') {
            this.$refs.myView.animateShow(this.IndexNavTitle,this.IndexNavHeight)
          }
        })
      },
      aboutPage () {
        this.$nextTick(() => {
          this.$refs.myView.onScrollTop(this.IndexNavHeight)
        })
      },
      getPrdType () {
        this.axios.post(_reqUrl,{"AppendixesFormatType":1,"IsIncludeSubtables":false,"IsReturnTotal":true,"Operation": _productType })
            .then((res) => {
          this.productType = quickSort(res.data.Datas)
        }).catch((err) => {
          console.log(err)
        })
      },
      backTopScroll (e) {
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
        if( scrollTop >= 630){
          this.showBack = true
        } else {
          this.showBack = false
        }
      },
      backTop () {
        backToTop()
      }
    }
  }
</script>

<style scoped>
  #app{
    padding-top: 91px;
    width:100%;
  }
  .back{
    width:50px;
    height: 50px;
    position: fixed;
    bottom: 100px;
    right: 4.2%;
    background: url("img/top.png") no-repeat center center;
    cursor: pointer;
  }
  .back:hover{
    background-image: url("img/top-c.png");
  }
</style>
