<template>
  <div id="index">
    <my-header></my-header>
    <loading></loading>
    <div class="goodslist">
      <div class="listBox" v-for="items in goodslist" :key="items.cId">
          <div class="left">
            <img :src="items.cThumbnail"/>
          </div>
          <div class="right">
            <div class="tit">{{items.cGoodsname}}</div>
            <div class="coffee-desc">{{items.cDesc}}</div>
            <div class="coffee-price"><label>￥</label>{{items.cPrice}}</div>
            <div class="add-and-reduce"><select-copies v-bind:data="items"></select-copies></div>
          </div>
      </div>
    </div>
    <div class="footModule">
      <div class="left" @click="openGoodsList()">
        <div class="icon-coffeeCup" v-bind:class="{true: 'active', false:''}[isActive]">
          <i class="icons icon-gouwuche"></i>
          <span class="number"  v-bind:class="{true: 'active', false:''}[isActive]">{{numAll}}</span>
        </div>
        <div class="money">总计：<label>{{totalMoney}}</label>元</div>
      </div>
      <div class="right" v-bind:class="{true: 'active', false:''}[isActive]"  @click="gotoPay()">{{btnText}}</div>
    </div>
    <my-popup v-bind:popupData="popupData">
      <div class="isListBox">
        <div v-for="items in goodslist" :key="items.cId">
          <div class="list" v-if="items.num > 0">
            <div class="left">{{items.cGoodsname}}</div>
            <div class="right">
              <div class="price">￥{{items.cPrice}}</div>
              <div class="add-reduce"><select-copies v-bind:data="items"></select-copies></div>
            </div>
          </div>
        </div>
      </div>
    </my-popup>
  </div>
</template>
<script>
import myHeader from '../components/header.vue'
import selectCopies from './components/selectCopies.vue'
import myPopup from '../components/popup.vue'
import common from '../utils/common'
export default {
  name: 'index',
  data() {
    return {
      goodslist: [],  // 商品
      isActive:false,
      btnText: '请先下单',
      totalMoney: 0, // 总金额
      popupData: {   // popup数据
        show: false,
        height: 50
      },
      shopCar:[] // 购物车
    }
  },
  computed: {
    numAll: function () {
      let num = 0, money = 0;
      for(let i = 0;i < this.goodslist.length; i++){
        num += this.goodslist[i].num;
        money += this.goodslist[i].num * this.goodslist[i].cPrice;
      }
      if(num > 0){
        this.isActive = true;
        this.btnText = "结算";
      }else{
        this.isActive = false;
        this.btnText = "请先下单";
      }
      this.totalMoney = money;
      common.setSessionStorage('totalMoney',money);
      return num;
    }
  },
  methods: {
    getGoodsList () {
      let _this = this;
      let dom = {
        appid: 2,
        openid: 'o5k511mcwwJrpyJdHQhRt5saUQBI'
      }
      this.$loading('加载中...');
      this.$get('goodslist',dom).then(function (res) {
        let obj = res.goodsList.data
        for(let i = 0; i< obj.length; i++){
          for(let j = 0;j < obj[i].list.length; j++){
            obj[i].list[j].num = 0;
            _this.goodslist.push(obj[i].list[j]);
          }
        }
        _this.$loading(false);
        console.log(_this.goodslist)
        // 获取本地购物车信息
        _this.shopCar = common.getSessionStorage('shopCar');
        console.log(_this.shopCar)

        //如果购物车中存在商品 将购物车中的商品数量 赋值给商品列表
        if(_this.shopCar.length > 0 ) {
          for(let i=0;i<_this.shopCar.length;i++){
            for(let j=0;j<_this.goodslist.length;j++){
              if(_this.goodslist[j].cGoodsid == _this.shopCar[i].cGoodsid){
                _this.goodslist[j].num = _this.shopCar[i].num;
              }
            }
          }
        }
      })
      
    },
    openGoodsList () {
      console.log(this.numAll)
      if(this.numAll > 0 ){
        this.popupData.show = true;
      }
      console.log(this.popupData.show)
    },
    gotoPay () {
      if(this.numAll > 0 ){
        this.$router.push({name: 'payMoney'});
      }
    },
    getUserInfo () {
      let dom = {
        appid: 2,
        openid: 'o5k511mcwwJrpyJdHQhRt5saUQBI'
      }
      this.$get('getUserInfo',dom).then(function (res) {
        let userInfo = res.getUserInfo.data;
        //将用户信息储存在本地
        common.setSessionStorage('userInfo',userInfo);
      })
    }
  },
  mounted () {
    this.getGoodsList();
    this.getUserInfo();
  },
  components: {
    myHeader,
    selectCopies,
    myPopup
  }
}
</script>
<style lang="scss" scoped>
  #index{
    position: absolute;
    height: 100%;
    width: 100%;
    background: #f3f3f3;
    .goodslist{
      padding: 120px 20px 150px 20px;
      position: absolute;
      height: 100%;
      width: 100%;
      overflow-y: auto;
      .listBox~.listBox{
        margin-top: 20px;
      }
      .listBox{
        height: 340px;
        display: flex;
        background-color: #FFFFFF;
        justify-content: space-between;
        position: relative;
        .left{
          width: 340px;
          height: 340px;
          position: relative;
          img{
            width: 100%;
            height: 100%;
          }
        }
        .right{
          width: 300px;
          .tit {
              font-size: 0.4266rem;
              color: #313131;
              padding-top: 0.56rem;
          }
          .coffee-desc {
              padding-top: 0.1rem;
              padding-bottom: 0.1rem;
              font-size: 0.3rem;
              line-height: 0.35rem;
              color: #818181;
          }
          .coffee-price {
              color: #5b3110;
              font-size: 0.56rem;
              padding-bottom: 0.1rem;
              position: absolute;
              bottom: 1.2rem;
              label{
                font-size: 0.3rem;
              }
          }
          .add-and-reduce {
            position: absolute;
            bottom: 0.2rem;
          }
        }
      }
    }
    .footModule {
        height: 127px;
        width: 100%;
        border-top: 1px solid #c6c6c6;
        background-color: #FFFFFF;
        position: fixed;
        bottom: 0px;
        display: flex;
        justify-content: space-between;
        z-index: 10600;
        .left {
            width: 6rem;
            margin-left: 0.26rem;
            border: 1px solid #c6c6c6;
            border-radius: 10px;
            display: flex;
            height: 1.2rem;
            margin-top: 0.25rem;
            .icon-coffeeCup {
                height: 0.8rem;
                width: 0.8rem;
                /* background: url(../assets/images/cart10.png) no-repeat;
                background-size: contain; */
                margin: 0.2rem 0.2rem 0rem 0.4rem;
                position: relative;
                span {
                    display: block;
                    background-color: #999999;
                    width: 0.4rem;
                    height: 0.4rem;
                    position: absolute;
                    top: 0px;
                    right: -0.1rem;
                    border-radius: 0.4rem;
                    opacity: 0.8;
                    color: #FFFFFF;
                    text-align: center;
                    line-height: 0.4rem;
                }
                span.active {
                    background-color: #fe2c4a;
                    opacity: 1;
                    color: #FFFFFF;
                }
                i {
                  font-size: 0.7rem
                }
            }
            .money {
                line-height: 1.2rem;
                font-size: 0.4rem;
                margin-left: 0.3rem;
                color: #818181;
            }
        }
        .right {
            width: 3.26rem;
            margin-right: 0.26rem;
            text-align: center;
            background-color: #aa7354;
            line-height: 1.2rem;
            border-radius: 10px;
            color: #FFFFFF;
            font-size: 0.4rem;
            opacity: 0.6;
            height: 1.2rem;
            margin-top: 0.25rem;
        }
        .right.active{
          opacity: 1;
        }
    }
    .isListBox{
      padding-bottom: 160px;
      .list{
        display: flex;
        height: 1.333rem;
        line-height: 1.333rem;
        width: 96%;
        margin-left: 2%;
        border-bottom: 1px solid #c6c6c6;
        justify-content: space-between;
        color: #313131;
        .left{
          font-size: 28px;
        }
        .right{
          display: flex;
          .price{
            padding-right: 20px;
            color: #5b3110;
          }
          .add-reduce{
            margin-top: 12px;
          }
        }
      }
    }
  }
  
</style>
