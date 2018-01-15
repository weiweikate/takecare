<template>
  <div class="joinUsPage">
    <div class="joinUs">
      <img src="../../img/join-bg.png" alt=""/>
      <div>
        每一个培康人的梦想凝聚在一起，<br/>
        就是培康均衡营养提升人类生活品质的大梦想！<br/>
        培康坚信－－－<br/>
        “不断培养具有创新能力的新生力量”和“坚持选择具备持续发展能力的共赢合作伙伴”，<br/>
        是培康未来在中国占据婴幼儿食品及营养保健品<br/>
        领先地位的原动力与最大的资本。<br/>
      </div>
    </div>
    <div class="comProvide" >
      <div>
        <p class="intr">我们提供</p>
        <span class="intrEn">WE PROVIDE</span>
        <ul>
          <li>
            <div>
              <img src="../../img/com-1.png" alt=""/>
            </div>
            <p>良好的办公环境</p>
          </li>
          <li>
            <div>
              <img src="../../img/com-2.png" alt=""/>
            </div>
            <p>友好的办公氛围</p>
          </li>
          <li>
            <div>
              <img src="../../img/com-3.png" alt=""/>
            </div>
            <p>巨大的发展空间</p>
          </li>
          <li>
            <div>
              <img src="../../img/com-4.png" alt=""/>
            </div>
            <p>享不完的公司福利</p>
          </li>
        </ul>
      </div>
    </div>
    <div class="job">
      <p class="intr">加入我们</p>
      <span class="intrEn">JOIN US</span>
      <div class="jobItems">
        <div class="leftbar fl">
          <ul>
            <li>招聘岗位</li>
            <li v-for="(jobInfo,key) in jobInfos" :key="key" @click.prevent="getJob(key)">
              {{jobInfo.Job}}
              <div class="bage" v-show="show[key]" >
                <span></span>
              </div>
            </li>
          </ul>
        </div>
        <div class="rightbar fr" ref="jobItems">
          <div v-for="(jobInfo,key) in jobInfos" :key="key" v-show="show[key]">
           <div v-html=" jobInfo.Content"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { _reqUrl, _joinUs} from '../../js/request.js'
  export default {
    data () {
      return {
        show:[true,false,false],
        jobInfos:[]
      }
    },
    mounted: function () {
      this.getJobInfos ()
    },
    methods: {
      getJob (key) {
        this.show = []
        this.show[key] = true
      },
      getJobInfos () {
        this.axios.post( _reqUrl,{"AppendixesFormatType":1,"IsIncludeSubtables":false,"IsReturnTotal":true,"Operation": _joinUs, IsIncludeLong:true}).then((res) => {
          this.jobInfos = res.data.Datas
        }).catch((err) => {
          console.log(err)
        })
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .joinUs img{
    width: 100%;
  }
  .joinUs>div{
    padding: 80px 0;
    text-align: center;
    line-height: 30px;
    font-size: 16px;
    color: #979797;
  }
  .comProvide{
    background:#F7F7F7;
  }
  .comProvide>div{
    width: 1200px;
    margin:0 auto;
    padding:74px 0;
  }
  .comProvide ul{
    height: 350px;
    margin-top:70px;
  }
  .comProvide ul li{
    float: left;
    width: 266px;
    height: 349px;
    padding: 10px;
    text-align: center;
    box-sizing: border-box;
    margin:0  22px;
    background: #fff;
    cursor: pointer;
    -webkit-transition: all ease-out .5s;
    -moz-transition: all ease-out .5s;
    -o-transition: all ease-out .5s;
    transition: all ease-out .5s;
    -ms-transition: all ease-out .5s;
  }
  .comProvide ul li:first-child{
    margin-left: 0px;
  }
  .comProvide ul li:last-child{
    margin-right:0;
  }
  .comProvide ul li p{
    margin: 27px 0;
    font-size: 18px;
    color: #979797;
  }
  .comProvide ul li:hover{
    box-shadow: 0 2px 14px 0 rgba(0,0,0,.1);
    -webkit-transform: translateY(-20px);
    -moz-transform: translateY(-20px);
    -o-transform: translateY(-20px);
    transform: translateY(-20px);
    -ms-transform: translateY(-20px);
  }
  .comProvide ul li:hover p{
    color: #666666;
  }
  .intr{
    font-size: 22px;
    color:#252525;
    margin-bottom: 5px;
    padding-left: 10px;
  }
  .intrEn{
    font-size:10px;
    color:#979797;
    padding-left: 10px;
    letter-spacing:1px
  }
  .job{
    width: 1200px;
    margin: auto;
    padding-top: 50px;
    padding-bottom: 30px;
  }
  .jobItems{
    overflow: hidden;
    margin-top:42px;
  }
  .jobItems .leftbar ul{
    width:260px;
    box-sizing: border-box;
    padding: 0 18px;
    border:1px solid #DCDCDC;
  }
  .jobItems .leftbar ul li{
    height:75px;
    line-height: 75px;
    border-top:1px solid #DCDCDC;
    font-size:19px;
    width: 100%;
    text-align: center;
    position: relative;
    cursor: pointer;
    color:#979797;
  }
  .jobItems .leftbar ul li:first-child:hover{
    color:#979797;
    font-weight: normal;
  }
  .jobItems .leftbar ul li.active,.jobItems .leftbar ul li:hover{
    color:#666666;
    font-weight: bold;
  }
  .jobItems .leftbar ul li:first-child{
    border-top:0;
  }
  .jobItems{
    position: relative;
  }
  .bage span{
    display: inline-block;
    width: 20px;
    height:28px;
    background:url("../../img/bage.png") no-repeat center center;
  }
  .bage{
    position: absolute;
    right: -36px;
    top: 5px;
  }
  .rightbar{
    width: 900px;
    box-sizing: border-box;
    padding:50px 90px;
    padding-right: 55px;
    line-height:40px;
    background: #F7F7F7;
    min-height: 500px;
  }
  .jobInfos{
    font-size:18px;
    color: #979797;
    margin-bottom:30px;
  }
  .jobName{
    font-size:31px;
    color: #666;
    margin-right: 15px;
  }
  .jobContact{
    line-height: 50px;
  }
  .jobContact span{
    color: #E1047F ;
  }
  .jobContent{
    font-size: 16px;
    color:#848383;
  }
</style>
