<template>
  <div class="hello">
    <my-popup v-bind:popupData="popupData">
      <div>
        <a href="#">dadasd</a>
        <a href="#">dadasd</a>
        <a href="#">dadasd</a>
        <a href="#">dadasd</a>

      </div>
    </my-popup>
    <button @click="popupData.show = !popupData.show">dadas</button>
    <i class="icons icon-back"></i>

    <button @click="loading()"> dianji </button>
    <button @click="loadings()"> dianji </button>
  </div>

</template>

<script>
import myHeader from './header.vue'
import myPopup from './popup.vue'
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      popupData: {
        show: false,
        height: 50
      }
    }
  },
  methods: {
    loading () {
      this.$loading('jiazai...');
      let that = this;
      setTimeout(function(){
        that.$loading(false);
      },20000)
    }
  },
  components: {
    myHeader,
    myPopup
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.hello{
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.test-enter{
    color: blue;
}
.test-enter-active{
    color: red;
}
button{
  width: 100px;
  height: 40px;
}
</style>
