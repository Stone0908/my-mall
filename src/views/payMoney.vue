<template>
  <div id="payMoney">
        <div class="payAddress">
			<div class="list" v-if="users.useraddresses.length > 0">
				<div class="left"><span class="icons icon-shouhuodizhi"></span></div>
				<div class="center">
					<div class="name">收货人：{{users.useraddresses[0].cLinkName}} <label>{{users.useraddresses[0].cLinkPhone}}</label><span v-if="users.useraddresses[0].cMakeing !=''">{{users.useraddresses[0].cMakeing}}</span></div>
					<div>{{users.useraddresses[0].cAddressname}}{{users.useraddresses[0].cOther}}</div>
				</div>
				<div class="right"><span class="icons icon-more"></span></div>
			</div>
			<div class="addNewAdress" v-else><span><label>新增地址</label></span><span><i class="icons icon-add"></i></span></div>
		</div>
        <div class="payGoodsList">
			<div class="goodsListTit">订单详情</div>
			<div class="goodsListCon">
				<div class="list" v-for="item in shopCar" :key="item.cid">
					<div class="left"><img :src="item.cThumbnail"></div>
					<div class="right">
						<div class="goodsName">{{item.cGoodsname}}</div>
						<div class="goodsDes">{{item.cDesc}}</div>
						<div class="goodsPrice">
							<div class="price">价格：<span>¥{{item.cPrice}}</span></div>
							<div class="number">数量：<span>×{{item.num}}</span></div>
						</div>
					</div>
				</div>
			</div>
		</div>
        <div class="commonList">
			<div class="list space-between" v-if="users.disCards.length > 0">
				<span>可用卡券：<!-- <label class="box">1个券可用</label> --></span>
				<span class="shake animated" style="color:red"><i class="icons icon-more"></i></span>
			</div>
			<div class="list space-between" v-else>
				<span>可用卡券：</span>
				<span>暂无卡券</span>
			</div>
			<div class="list space-between">
				<span>会员等级：</span>
				<span>￥{{discountMoney}}</span>
			</div>
			<div class="list space-between" v-if="users.disCards.length > 0">
				<span>卡卷：</span>
				<span>￥-2</span>
			</div>
			<div class="list space-between">
				<span>运费：</span>
				<span>￥+{{fee}}</span>
			</div>
			<div class="list space-between">
				<span>买家留言：<input type="text" placeholder="选填：对本次交易的备注说明" style="width: 6rem; font-size:24px;"></span>
			</div>
		</div>
		<div class="pay-text"><span>实际支付：<label class="color-1">{{lastPayMpney}}</label>元</span></div>
		<div class="pay-btn">合计：<span>¥{{lastPayMpney}}</span><a href="javascipt:;" @click="gotoPay()">立即支付</a></div>
  </div>
</template>
<script>
import common from '../utils/common'
export default {
  data () {
      return {
          totalMoney: 0,
          fee: 0,
          lastPayMpney: 0,
          discountMoney: 0
      }
  },
  methods: {
      yunfee () {
          //计算运费
          this.fee = 5;
      },
      lastPay () {
          // 计算最后支付金额
          this.lastPayMpney = this.totalMoney + this.fee + this.discountMoney
      },
      gotoPay (){
          let _this = this;
          //请求参数 支付金额 商品信息 等等。。。。。。
          let dom = {
              "lastPayMpney":this.lastPayMpney,
              "goods":this.shopCar
          }
          // 向服务器发起支付 这里用get模拟，正式开发都用post
          this.$get('pay',dom).then(function(res){
              // 服务器收到请求，返回为 调用微信支付的配置信息
              let wxData = res.pay.wxData;
              console.log(wxData)
              // 调用微信支付没有经过测试，肯有可能会有bug，请慎用
              _this.$chooseWXPay(wxData.appId, wxData.timeStamp, wxData.nonceStr, wxData.signature, wxData.sigpackagesnType, wxData.paySign, wxData.signType).then(function(res){
                  console.log(res)
              });

          })
      }
  },
  computed: {
      shopCar () {
        this.totalMoney = common.getSessionStorage('totalMoney');
        this.discountMoney = -(this.totalMoney * (1-this.users.vipInfo.cDiscount)).toFixed(2);// 计算会员等级打折减免的金额
        return common.getSessionStorage('shopCar');
      },
      users () {
          console.log(common.getSessionStorage('userInfo'))
          return common.getSessionStorage('userInfo');
      }
  },
  mounted () {
      this.yunfee()
      this.lastPay ()
  }
}
</script>
<style lang="scss" scoped>
.icons{
    font-size: 40px;
}
.payAddress{
	background-color: #FFFFFF;
	border-bottom: 1px solid #c6c6c6;
	margin-bottom: 0.30rem;
}
.payAddress .list{
	display: flex;
	justify-content: space-between;
	padding: 0.3rem 0;
}
.payAddress .list .left{
	font-size: 0.45rem;
}
.payAddress .list .left,.payAddress .list .right{
	display: flex;
	align-items:center;
	width: 10%;
	justify-content: center;
}
.payAddress .list .center{
	width: 80%;
}
.payAddress .list .center .name{
	font-weight: bold;
}
.payAddress .list .center .name label{
	padding-left: 0.5rem;
}
.payAddress .list .center .name span{
	border-radius: 10px;
	border: 1px solid #aa7354;
	color: #aa7354;
	padding:0 0.2rem;
	margin-left: 0.2rem;
}
.payAddress .addNewAdress{
	line-height: 1.3rem;
	height: 1.3rem;
	margin: 0 0.3rem;
	display: flex;
	justify-content: space-between;
}
.payAddress .addNewAdress .ion-ios-plus-outline{
	color: #aa7354;
	margin-right: 10px;
}

.payGoodsList{
	margin-bottom: 0.30rem;
	background-color: #FFFFFF;
}
.payGoodsList .goodsListTit{
	height: 1.2rem;
	line-height: 1.2rem;
	border-bottom: 1px solid #c6c6c6;
	margin-left: 3%;
	background-size: 0.5rem;
	font-weight: bold;
	font-size: 0.37rem;
	position: relative;
}
.goodsListTit .order-edit{
	position: absolute;
	height: 1.2rem;
	line-height: 1.2rem;
	top: 0px;
	right: 0;
	padding: 0 0.5rem;
}
.goodsListTit .order-edit i{
	padding-right: 0.2rem;
}
.payGoodsList .goodsListCon .list{
	display: flex;
	justify-content: space-between;
	padding: 0.2rem 0;
	background-color: #F8F8F8;
}
.payGoodsList .goodsListCon .list~.list{
	margin-top: 0.2rem;
}
.payGoodsList .goodsListCon .list .left{
	margin-left: 3%;
	width: 30%;
	/*padding: 1rem 0;*/
}
.payGoodsList .goodsListCon .list .left img{
	width: 100%;
}
.payGoodsList .goodsListCon .list .right{
	margin-right: 3%;
	width: 60%;
	position: relative;
}
.payGoodsList .goodsListCon .list .right .goodsName{
	font-size: 0.37rem;
}

.payGoodsList .goodsListCon .list .right .goodsDes{
	color: #757575;
	padding-top: 0.3rem;
}
.payGoodsList .goodsListCon .list .right .goodsPrice{
	height: 1rem;
	line-height: 1rem;
	display: flex;
	justify-content: space-between;
	width: 100%;
}
.payGoodsList .goodsListCon .list .right .goodsPrice span{
	color: red;
}

.commonList{
	background-color: #FFFFFF;
}
.commonList+.commonList{
	margin-top: 0.3rem;
}
.commonList .list{
	height: 1.3333rem;
	line-height: 1.3333rem;
	border-bottom: 1px solid #c6c6c6;
	width: 97%;
	margin-left: 3%;
	font-size: 0.37rem;
	display: flex;
}
.commonList .list .text-l{
	padding-right: 0.2rem;
}
.commonList .list .text-r{
	padding-left: 0.2rem;
}
.commonList .list:last-child{
	border-bottom: none;
}
.commonList .list span:nth-child(1) .icon{
	color: #AA7354;
	font-size: 0.5rem;
}

.commonList .list.space-between{
	justify-content: space-between;
}
.commonList .list.space-between span:nth-child(2){
	padding-right: 3%;
}
.commonList .list input[type=text],.commonList .list input[type=password],.commonList .list input[type=number],.commonList .list input[type=email]{
	border: none;
	height: 60%;
	margin-left: 1em;
}
.commonList .list span label.box{
	border:1px solid #aa7354;
	color:#aa7354;
	border-radius: 3px;
	padding: 5px 15px;
}
.pay-text{
	text-align: right;
	padding-right: 3%;
	padding-top: 20px;
	padding-bottom: 2rem;
}
.pay-text span{
	font-size: 0.4rem;
}
.pay-text label.color-1{
	color:#fe2c4a;
}
.pay-text label.color-2{
	color:#aa7354;
}
.pay-btn{
	width: 100%;
	left: 0;
	position: fixed;
	bottom: 0rem;
	background-color: #FFFFFF;
	height: 1.35rem;
	line-height: 1.35rem;
	border-top: 1px solid #c6c6c6;
	text-align: right;
	font-size: 0.37rem;
	z-index: 1010;
}
.pay-btn span{
	color: red;
}
.pay-btn a{
	display: inline-block;
	background-color: #aa7354;
	color: #FFFFFF;
	padding: 0 0.7rem;
    margin-left: 0.5rem;
    text-decoration: none
}
</style>
