<template>
  <div class="leftBar fl">
    <ul >
      <li v-for="(type,key) in prdTypes" :key="key"  @mouseenter="typeShow(key)" >
        <div>{{type.Name}}</div>
        <transition name="el-zoom-in-top">
          <ul class="prdType" v-show="show[key]">
            <li v-for="(sub,index) in subType[key]" :key="index" :class="[ index ===activeIndex[key]? 'active':'']" @click.prevent="getPrdInfos(key,index,type.Value,sub.Value)">{{sub.Name}}</li>
          </ul>
        </transition>
      </li>
    </ul>
  </div>
</template>

<script>
  import { _reqUrl, _subProductType, _productType } from '../../js/request.js'
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
        prdTypes:[], // 产品的分类
        activeIndex:[0], // 渲染active
        show:[true,false,false,false],
        subType:'',
        leftBarIndex:'', // 产品大类index
        //prdSubId:'' //产品二级分类Id
      }
    },
    mounted: function () {
      if (this.prdType.length == 0) {
        this.getPrdType()
      } else {
        this.prdTypes = this.prdType
        this.getSubPrdType()
      }
    },
    watch:{
      // 健康路由变化
      "$route":'getPrdTypeIndex'
    },
    methods: {
      getPrdInfos (key,index,Id,subId) {
        // 获取 一级分类下标 二级分类下标 一级分类id 二级分类id
        this.activeIndex = []
        this.$set(this.activeIndex,key,index)
        window.sessionStorage.leftBarIndex = JSON.stringify({Id:key,subId:index})
        if (this.$route.path == '/productDetail') {
          this.$router.push({path:'/product',query:{Id:key,subId:index}})
          return
        }
        this.$emit('getPrdInfos',1,Id,subId)
      },
      getPrdType () {

        this.axios.post(_reqUrl,{"AppendixesFormatType":1,"IsIncludeSubtables":false,"IsReturnTotal":true,"Operation": _productType })
            .then((res) => {
          this.prdTypes = res.data.Datas
          this.getSubPrdType()
        }).catch((err) => {
          console.log(err)
        })
      },
      typeShow(index){
        this.show = []
        this.$set(this.show,index,true)
      },
      getSubPrdType () {
        let _this = this
        let indexItemUrl = this.prdTypes
        let promises = indexItemUrl.map(function (type) {
          return _this.axios.post(_reqUrl,{"AppendixesFormatType":1,"Condition":"${Type1Key} == '"+type.Value+"'","IsIncludeSubtables":false,"IsReturnTotal":true,"Operation": _subProductType})

        })
        Promise.all(promises).then(function (posts) {
          let subTypeArr = []
          for (let i=0;i<posts.length;i++) {
            subTypeArr.push(posts[i].data.Datas)
          }
          _this.subType = subTypeArr
          _this.getPrdTypeIndex()
        }).catch(function(reason){
          console.log(reason)
        })
      },
      getPrdTypeIndex () {
        this.leftBarIndex= this.$route.query.Id
        let subIndex = Number(this.$route.query.subId)
        if(this.$route.query.subId == undefined){
          window.sessionStorage.leftBarIndex = JSON.stringify({Id:this.$route.query.Id,subId:0})
        }
        if ( this.leftBarIndex != undefined) {
          this.show =[]
          this.activeIndex = []
          this.$set(this.show,this.leftBarIndex,true)
          if ((this.$route.path == '/product')&& (!subIndex)) {
            // 如果是在产品中心页面 而且 subIndex =0或者没有
            this.$set(this.activeIndex,this.leftBarIndex,0)
            this.$emit('getPrdInfos',1,this.prdTypes[this.leftBarIndex].Value,this.subType[this.leftBarIndex][0].Value,this.leftBarIndex,0)
          }  else if ((this.$route.path == '/product')&& (subIndex)){
            this.$set(this.activeIndex,this.leftBarIndex,subIndex)
            this.$emit('getPrdInfos',1,this.prdTypes[this.leftBarIndex].Value,this.subType[this.leftBarIndex][subIndex].Value,this.leftBarIndex,subIndex)
          } else {
            //this.$emit()
            this.$set(this.activeIndex,this.leftBarIndex,subIndex)
          }
        }
      }
    }
  }
</script>

<style scoped>
  .leftBar{
    width: 192px;
    box-sizing: border-box;
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
    border-radius: 4px;
    overflow: hidden;
  }
  .leftBar>ul>li>div{
    height: 50px;
    line-height: 50px;
    font-size: 20px;
    color: #fff;
    text-align: center;
    cursor: pointer;
  }
  .leftBar>ul>li li{
    height:30px;
    line-height: 30px;
    color: #979797;
    text-align: center;
    font-size: 14px;
    cursor: pointer;
    background: #FFF5F5
  }
  .leftBar>ul>li li:hover,.leftBar>ul>li li.active{
    color:#252525;
  }
  .leftBar>ul>li div{
    background: #F95782;
  }
  .leftBar>ul>li:nth-child(2) div{
    background: #FC7397;
  }
  .leftBar>ul>li:nth-child(3) div{
    background: #FF84A4;
  }
  .leftBar>ul>li:nth-child(4) div{
    background:#FE90AD;
  }
  .leftBar>ul>li:nth-child(5) div{
    background:#FF9FB8;
  }
  .leftBar>ul>li:nth-child(6) div{
    background:#FFACC2;
  }
</style>
