<template>
    <div class="select-copies">
        <span class="select-reduce" @click="reduce()"><i class="icons icon-minus"></i></span>
        <span class="select-input"><input type="text" pattern="[0-9]*" placeholder="0" v-model="data.num"/></span>
        <span class="select-add" @click="add()"><i  class="icons icon-add"></i></span>
    </div>
</template>
<script>
import eventBus from '../../common/bus'  // 引用bus 空的vue实例，用于兄弟组件之间的通讯
import common from '../../utils/common'
export default {
  data () {
      return {
          shopCar: this.$parent.shopCar == undefined ? this.$parent.$parent.shopCar : this.$parent.shopCar // 获取父组件 购物车数据
      }
  },
  props:{
      data: Object,
  },
  methods:{
      reduce () {
        // 当数量大于0的时候 才能减
        if(this.data.num>0){
            this.data.num --;
            // 获取父组件 已选商品总数量
            let number = this.$parent.numAll == undefined ? this.$parent.$parent.numAll : this.$parent.numAll
            eventBus.$emit('number', number)

            // 判断购物车中该商品的数量，如果为0 则移除该商品
            if(this.data.num == 0){
                let index = 0;
                for(let i=0;i<this.shopCar.length;i++){
                    // 如果购物车中的商品id 等于当前商品id 获取到当前商品在购物车中的位置，并且退出循环
                    if(this.shopCar[i].cGoodsid == this.data.cGoodsid){
                        index = i;
                        break;
                    }
                }
                this.shopCar.splice(index,1);
                console.log(this.shopCar)
            }
            // 每次操作加和减 都更新购物车信息
            common.setSessionStorage('shopCar',this.shopCar);
        }
      },
      add () {
        // 当数量小于该商品的库存时，才能加
        if(this.data.num < this.data.cleftNumber){
            this.data.num ++;
            let number = this.$parent.numAll == undefined ? this.$parent.$parent.numAll : this.$parent.numAll
            
            // 在空的vue实例中 添加$emit事件,用于兄弟组件之间的通讯
            eventBus.$emit('number', number)

            // 判断当前购物车中是否有该商品
            if(JSON.stringify(this.shopCar).indexOf(this.data.cGoodsid) == -1){
                this.shopCar.push(this.data)
            }
            // 每次操作加和减 都更新购物车信息
            common.setSessionStorage('shopCar',this.shopCar);
        }
      }
  }
}
</script>

<style lang="scss" scoped>
    .select-copies{
        height: 75px;
        line-height: 75px;
        border: 1px solid #c6c6c6;
        border-radius: 5px;
        width: 3.3rem;
        display: flex;
        text-align: center;
        .select-reduce,.select-add{
            width: 1rem;
            color: #818181;
            i{
                font-size: 30px;
            }
        }
        .select-input{
            width: 1.3rem;
            border-left: 1px solid #c6c6c6;
            border-right: 1px solid #c6c6c6;
            input {
                width: 100%;
                height: 1rem;
                border: none;
                background: none;
                text-align: center;
                outline: 0;
                line-height: normal;
                color: inherit;
                font: inherit;
                margin: 0;
            }
        }
    }
</style>

