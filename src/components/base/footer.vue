<template>
    <div class="footer">
      <ul>
        <li class="tmall">
          <a href="https://takecare.tmall.com/" target="_blank">
            <span class="spanBg"></span>
            天猫TMALL.COM
          </a>
        </li>
        <li class="topmom" >
          <a href="http://www.topmom.com.cn/" target="_blank">
            <span class="spanBg" style="width:97px"></span>
            TOPMOM
          </a>
        </li>
        <li class="weibo">
          <el-popover  placement="top" trigger="hover">
            <a href="https://weibo.com/2886435074/profile?rightmod=1&wvr=6&mod=personnumber" target="_blank">
              <div class="weiboCode">
                <img src="../../img/weibocode.png" alt="" style="margin-bottom: 4px"/>
                <p>扫一扫关注微博</p>
                <p>或点击查看微博</p>
              </div>
            </a>
            <p slot="reference"><span class="spanBg"></span>官方微博</p>
          </el-popover>
        </li>
        <li class="weixin">
          <el-popover  placement="top" trigger="hover">
            <div class="weixinCode">
              <img src="../../img/weixincode.jpg" alt=""/>
              <p>扫一扫或搜索微信号</p>
              <p>HZpeikang</p>
            </div>
            <p slot="reference"><span class="spanBg"></span>官方微信</p>
          </el-popover>
        </li>
        <li class="contact">
          <el-popover  placement="top" trigger="hover">
            <div class="contactWay">
              <h5>联系方式</h5>
              <p>电话：<br/> 0571-5688 8866</p>
              <p class="chuanzhen">传真：<br/> 0571-5688 8866</p>
            </div>
            <p slot="reference">
              <span class="spanBg"></span>
              联系我们
            </p>
          </el-popover>
        </li>
        <li class="toTop" @click.prevent="backTop">
          <span class="spanBg"></span>
          返回顶部
        </li>
      </ul>
      <p class="shodow"></p>
      <div>
        <p>版权所有：杭州培康食品有限公司</p>
        <p>地址：杭州市西湖区天目山路313号八号楼 客服热线：0571-5688 8866</p>
        <p>浙公网安备 33010602000540号</p>
      </div>
    </div>
</template>

<script>
    import { backToTop } from '../../js/index.js'
    export default {
      data () {
        return {}
      },
      methods: {
        backTop () {
          backToTop()
        }
      }
    }
</script>
<style>
  .el-popper[x-placement^=top]{
    border-bottom:4px solid #E2047F;
  }
  .el-popover.el-popper .popper__arrow{
    border-top-color:  #E2047F;
  }
  .el-popover.el-popper .popper__arrow::after {
    border-width: 10px;
    border-top-width: 15px;
  }
  .el-popper .popper__arrow, .el-popper .popper__arrow:after{
    bottom: -9px !important;
    border-top-color: #E2047F !important;
    margin-left: -5px !important;
  }
  /*.el-popover.el-popper[x-placement^=top] .popper__arrow::after {*/
    /*bottom: -22px;*/
    /*border-top-color:  #E2047F;*/
    /*margin-left: -10px;*/
  /*}*/
  .el-popover.el-popper{
    min-width: 100px;
    padding:20px;
  }
</style>
<style scoped>
  .footer{
    text-align: center;
    padding-top: 40px;
    padding-bottom: 20px;
    border-top: 1px solid #ddd
  }
  .footer>div{
    font-size: 12px;
    line-height: 25px;
    color: #979797;
  }
  .footer ul{
    overflow: hidden;
    text-align: center;
    margin: 0 auto;
    display: inline-block;
  }
  .footer li{
    float:left;
    padding: 0px 30px 10px 30px;
    cursor: pointer;
    color: #666;
    font-size: 14px;
  }
  .footer li:first-child{
    padding-right: 20px;
  }
  .footer li a{
    color: #666;
  }
  .footer li .spanBg{
    display:block;
    width: 100%;
    height: 56px;
  }
  .weibo .spanBg{
    background: url("../../img/weibo.png") no-repeat center bottom;
  }
  .weixin .spanBg{
    background: url("../../img/weixin.png") no-repeat center bottom;
  }
  .tmall .spanBg{
    background: url("../../img/tmall.png") no-repeat center 8px;
  }
  .topmom .spanBg{
    background: url("../../img/topmom.png") no-repeat 0px 20px;
  }
  .contact .spanBg{
    background: url("../../img/people.png") no-repeat center bottom;
  }
  .toTop .spanBg{
    background: url("../../img/back.png") no-repeat center bottom;
  }
  .weixinCode,.contactWay,.weiboCode{
    font-size: 14px;
    color: #666;
  }
  .weixinCode,.weiboCode{
    text-align: center;
    line-height: 20px;
  }
  .weixinCode img,.weiboCode img{
    width: 136px;
  }
  .contactWay p{
    padding-left:25px;
    background: url('../../img/tel.png') no-repeat 0px 3px;
  }
  .contactWay .chuanzhen{
    background: url('../../img/chuangzhen.png') no-repeat 0px 3px;
    margin-top: 10px;
  }
  .contactWay h5{
    font-size: 18px;
    color: #252525;
    margin-bottom: 10px;
  }
  .shodow{
    height:25px;
    background: url("../../img/11.png") no-repeat center top;
  }
</style>
