<template>
    <div class="navBar">
      <div>
        <el-row :gutter="20">
          <el-col :span="7">
            <div class="logo">
              <img src="../../img/logo.png" alt=""/>
            </div>
          </el-col>
          <el-col :span="13">
            <el-menu  :default-active="activeIndex"  active-text-color="#E2047F" text-color="#666" mode="horizontal" router >
              <el-menu-item index="/index" >
                <div class="title" ref="index">首页
                  <p>HOME</p>
                </div>
              </el-menu-item>
              <el-submenu index="/about">
                <template slot="title">
                  <div class="title" ref="about">
                    关于培康
                    <p>ABOUT US</p>
                  </div>
                </template>
                <el-menu-item index="/about?Id=aboutUs">企业概况</el-menu-item>
                <el-menu-item index="/about?Id=development">发展历程</el-menu-item>
                <el-menu-item index="/about?Id=brand">品牌理念</el-menu-item>
              </el-submenu>
              <el-submenu index="/product">
                <template slot="title">
                  <div class="title" ref="product">
                    产品中心
                    <p>PRODUCTS</p>
                  </div>
                </template>
                <el-menu-item v-for="(type,key) in prdType" :key="key" :index="'/product?Id='+key">
                  {{type.Name}}
                </el-menu-item>
              </el-submenu>
              <el-menu-item  index="/" @click.native="goPage">
                <div class="title">
                  积分商城
                  <p>INTEGRAL</p>
                </div>
              </el-menu-item>
              <el-menu-item index="/news">
                <div class="title">
                  资讯中心
                  <p>NEWS</p>
                </div>
              </el-menu-item>
              <el-menu-item index="/joinUs">
                <div class="title">
                  招贤纳士
                  <p>CAREERS</p>
                </div>
              </el-menu-item>
            </el-menu>
          </el-col>
          <el-col :span="3">
            <div class="phone">
              <!--<div class="version">中/EN</div>-->
              400-628-6698
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
</template>

<script>
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
        navTitle:'',
        activeIndex: '',
      }
    },
    watch:{
      $route(to,from){
        // 解决路由变化 导航栏颜色不变的bug
        if (from.path == '/index') {
          this.$refs.index.parentNode.style.color = 'rgb(102, 102, 102)'
          this.changeActiveIndexColor()
        } else {
          this.$refs.about.parentNode.style.color = 'rgb(102, 102, 102)'
          this.$refs.product.parentNode.style.color = 'rgb(102, 102, 102)'
          if (to.path =='/index') {
            this.$refs.index.parentNode.style.color = 'rgb(226, 4, 127)'
          }
          if (to.path =='/productDetail'|| to.path =='/product') {
            this.$refs.product.parentNode.style.color = 'rgb(226, 4, 127)'
          }
        }
      }
      //"$route":'changeActiveIndex'
    },
    updated: function (){
      this.changeActiveIndex()
    },
    mounted: function () {
      this.changeActiveIndexColor()
    },
    methods: {
      getNavChildren () {
        this.navHeight =  document.getElementsByClassName('navBar')[0].offsetHeight
        this.navTitle = document.getElementsByClassName('title')
        return  { h: this.navHeight,title: this.navTitle}
      },
      goPage () {
        window.open('http://erp.takecare.com.cn/Libra.Web.Answer.Customized.Do.aspx?R=3de36290-c353-41da-8cdd-9f9c00f3c385')
      },
      changeActiveIndex (){
        let path = this.$route.path
        if (path =='/productDetail') {
          this.activeIndex = '/product'
        } else if (path =='/newsDetail') {
          this.activeIndex = '/news'
        } else {
          this.activeIndex = path
        }
      },
      changeActiveIndexColor () {
        // 解决F5刷新的时候 about 和 product 没有active颜色的bug
        if (this.$route.path == '/about') {
          this.$refs.about.parentNode.style.color = 'rgb(226, 4, 127)'
          return
        } else if (this.$route.path == '/product'|| this.$route.path == '/productDetail') {
          this.$refs.product.parentNode.style.color = 'rgb(226, 4, 127)'
          return
        } else {
          this.changeActiveIndex()
        }
      }
    }
  }
</script>
<style>
  .navBar .el-menu--horizontal,.navBar .el-menu--horizontal>.el-menu-item.is-active, .el-menu--horizontal>.el-submenu.is-active .el-submenu__title{
    border-bottom: 0px !important;
    border-bottom-color: transparent !important;
  }
  .navBar .el-icon-arrow-down:before{
    content: '';
  }
  .navBar .el-menu-item, .el-submenu__title{
    padding:0 !important;
    border-bottom-color: transparent !important;
  }
  .navBar .el-submenu .el-menu-item{
    min-width: 130px;
  }
  .navBar .el-menu--horizontal .el-submenu>.el-menu{
    left:-10px;
    padding:0px;
    border-top:4px solid #E2047F;
  }
  .navBar .el-menu--horizontal .el-submenu>.el-menu:before{
    content: '';
    display: inline-block;
    width: 0;
    height: 0;
    border-right: 8px solid transparent;
    border-bottom: 14px solid  #E2047F;
    border-left:8px solid transparent;
    top: -18px;
    position: absolute;
    left: 53px
  }
</style>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .active{
    color:#E2047F;
  }
  .title{
    display: inline-block;
    line-height: 22px;
    padding: 0 19px;
  }
  .phone,.logo{
    line-height: 60px;
    text-align: left;
  }
  .phone{
    padding-left: 20px;
    margin-left:15px;
    background: url("../../img/tel.png") no-repeat left center;
    position: relative;
  }
  .title p{
    font-size: 12px;
    text-align: center;
  }
  .title{
    -webkit-transition: all ease-out .5s;
    -moz-transition: all ease-out .5s;
    -o-transition: all ease-out .5s;
    transition: all ease-out .5s;
    -ms-transition: all ease-out .5s;
  }
  .title:hover{
    color:  #E2047F;
  }
  .navBar{
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
    text-align: center;
    color: #666;
    position: fixed;
    width: 100%;
    left:0;
    top: 0;
    z-index: 999;
    background: #fff;
    /*防止导航栏的抖动*/
    -webkit-transform: translateZ(0);
    -moz-transition: translateZ(0);
    -o-transition: translateZ(0);
    -ms-transition: translateZ(0);
  }
  .navBar>div {
    width: 1200px;
    margin: 0 auto;
    padding: 15px 0 ;
  }
  .el-menu--horizontal .el-submenu .el-menu-item:hover{
    background: #E2047F;
    color: #fff !important;
  }
  .el-menu--horizontal{
    padding-left: 50px;
  }
  .version{
    position: absolute;
    right:15px;
    top:-22px;
    z-index: 999;
    text-align: right;
    font-size: 12px;
  }
</style>
