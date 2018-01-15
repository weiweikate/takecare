import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

import index from '../components/page/index.vue'
import product from '../components/page/product.vue'
import productDetail from '../components/page/productDetail.vue'
import about from '../components/page/about.vue'
import news from '../components/page/news.vue'
import newsDetail from '../components/page/newsDetail.vue'
import joinUs from '../components/page/joinUs.vue'

let router = new VueRouter({
  routes: [
    { path: '/', redirect: '/index' },// 首页
    { path: '/index', name:'index', component: index }, // 首页
    { path: '/about', name:'about', component: about }, // 关于培康
    { path: '/news', name:'news', component: news }, // 新闻中心
    { path: '/newsDetail', name:'newsDetail', component: newsDetail }, // 新闻详情页
    { path: '/joinUs', name:'joinUs', component: joinUs }, // 加入我们
    { path: '/product', name:'product', component: product }, // 产品中心
    { path: '/productDetail', name:'productDetail', component: productDetail } // 产品详情页
  ]
})
export default router
