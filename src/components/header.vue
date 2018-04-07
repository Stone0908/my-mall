<template>
  <div class="mytitle">
    <div class="titleL" v-if="user.vipInfo.cRank > 0">
      <i class="icon-grade"><img :src='user.vipInfo.cPic'/></i>
      <div class="rowupBox"><label class="cdes rowup">{{user.vipInfo.cDes}}</label></div>
    </div>
    <div class="titleL" v-else><label class="wel rowup">{{user.welcome}}</label></div>
    <div class="titleR">
      <i class="icon-coffee-1"></i>{{user.soreName}}<label>{{user.userInfo.cSore}}</label>
      <a href="javascript:;" @click="gotoExchange()">使用</a>
    </div>
  </div>
</template>

<script>
import router from '../router/router'
export default {
  data () {
    return {
      user: {
        "userInfo": {},
        "vipInfo": {},
        "disCards": [],
        "welcome": "",
        "soreName": "",
        "useraddresses": []
      }
    }
  },
  methods: {
    gotoExchange () {
      this.$router.push({name: 'hello'});
    },
    getUserInfo () {
      let that = this;
      //获取用户信息接口参数
      let data = {
        appid: 2,
        openid: 'o5k511mcwwJrpyJdHQhRt5saUQBI'
      }
      this.$get('getUserInfo', data).then(function (res) {
        console.log(res.getUserInfo)
        that.user = res.getUserInfo.data
      });
    }

  },
  mounted () {
    this.getUserInfo();
  }
}
</script>
<style lang="scss" scoped>
$color:#8d8d8d;
.mytitle{
  height: 100px;
  line-height: 100px;
  color: $color;
  position: absolute;
  top: 0px;
	width: 100%;
	background-color: #f7f7f7;
	z-index: 1000;
  a{
    border:1px solid #aa7354;/* on */
	  padding:10px 20px;
	  color: #aa7354;
  	border-radius: 5px;
  }
  .titleL{
    padding-left: 18px;
    display: block;
    float: left;
    width: 50%;
    position: relative;
    overflow: hidden;
    label{
      display: inline-block;
      position: absolute;
      white-space:nowrap;
      left: 15px;
      top: 0;
    }
  }
  .titleR{
    padding-right: 25px;
    display: block;
    float: right;
    width: 50%;
    text-align: right;
  }
  .icon-grade{
    height: 30px;
    width: 40px;
    display: inline-block;
    vertical-align: -7px;
    background-size: contain;
    img{
      width: 100%;
    }
  }
  .icon-coffee-1{
    background: url(../assets/images/icon-coffee-1.png) no-repeat;
    height: 35px;
    width: 35px;
    display: inline-block;
    vertical-align: -7px;
    margin-right: 5px;
    background-size: contain;
  }
  .rowupBox{
    overflow: hidden;
    position: absolute;
    width: 100%;
    left: 70px;
    top: 0;
    height: 100px;
    line-height: 100px;
  }
}
@keyframes rowup {
    0% {
        -webkit-transform: translate3d(0, 0, 0);
        transform: translate3d(0, 0, 0);
    }
    100% {
        -webkit-transform: translate3d(-50%, 0, 0);
        transform: translate3d(-50%, 0, 0);
    }
}
.rowup{
  -webkit-animation: 10s rowup linear infinite alternate;
  animation: 10s rowup linear infinite alternate;
  position: relative;
  animation-delay:2s;
	-webkit-animation-delay:2s;
}
</style>
