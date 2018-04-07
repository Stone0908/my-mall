<template>
    <div id="popupModule" v-if="popupData.show">
        <transition name="mask"  v-on:afterLeave="beforeLeave" appear>
            <div class="popup-mask" @click='hide()' v-if="show"></div>
        </transition>
        
        <transition name="popup-fade" appear>
            <div class="popupBox" v-bind:style="{ height: popupBoxH+'%',top: 100-popupBoxH +'%'}" v-if="show" v-bind="initPopup">
                <div class="close">
                    <i class="icons icon-close" @click='hide()'></i>
                </div>
                <div class="content">
                    <slot></slot>
                </div>
                
            </div>
        </transition>
    </div>
</template>
<script>
import eventBus from '../common/bus' // 引用bus 空的vue实例，用于兄弟组件之间的通讯
export default {
  data () {
      return {
          show:true,
          popupBoxH: 50
      }
  },
  methods: {
      hide () {
          this.show = false
      },
      beforeLeave (el) {
          // 过度效果执行完毕后 执行该函数
          this.show = !this.show
          this.popupData.show = !this.popupData.show
      }
  },
  computed: {
    initPopup() {
        if(this.popupData.height){
            this.popupBoxH = this.popupData.height
        }
    }
  },
  props:['popupData'],
  mounted () {
      let that = this;
      // 通过eventBus.$on 监听 兄弟组件中的$emit事件
      eventBus.$on('number', function (e) {
          if(e == 0){
            that.show = false
          }else{
            that.show = true
          }
      })
  }

}
</script>
<style lang="scss" scoped>
#popupModule{
    .text{
        font-size: 40px;
        color: #000000;
    }
    .test-enter{
        transition: all 3s ease;
        color: blue;
    }
    .test-enter-active{
        transition: all 3s ease;
        color: red;
    }
    .test-leave-active{
        transition: all 3s ease;
        color: blue;
    }
    .popup-mask{
        position: fixed;
        z-index: 1000;
        top: 0;
        right: 0;
        left: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.6);
    }
    .popupBox{
        background-color: #ffffff;
        height: 50%;
        position: absolute;
        width: 100%;
        left: 0;
        top: 0;
        z-index: 1001;
        .close{
            height: 70px;
            line-height: 70px;
            text-align: right;
            background-color: #f7f7f8;
            padding: 0 30px;
            position: absolute;
            top: 0px;
            width: 100%;
            z-index: 1000;
            i{
                font-size: 40px;
            }
        }
        .content{
            overflow-y: auto;
            position: absolute;
            height: 100%;
            width: 100%;
            padding-top: 70px;
        }
    }
    .popup-fade-enter-active{
        animation: feadIn .5s;
    }
    .popup-fade-leave-active{
        animation: feadOut .5s;
    }
    @keyframes feadIn{
        from {
            transform:translate(0,100%)
        }
        to {
            transform:translate(0,0%)
        }
    }
    @keyframes feadOut{
        from {
            transform:translate(0,0%)
        }
        to {
            transform:translate(0,100%)
        }
    }
    .mask-enter-active{
        animation: show-alert-mask .5s;
    }
    .mask-leave-active{
        animation: hide-alert-mask .5s;
    }
    @keyframes show-alert-mask {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
    @keyframes hide-alert-mask {
        from {
            opacity: 1;
        }
        to {
            opacity: 0;
        }
    }
}
</style>
