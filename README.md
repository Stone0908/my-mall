# 一个简单的移动端商城

> vue2.0框架，使用 vue-cli + webpack 搭建项目 初学阶段，请多大家多多指点 

#项目目录
#主要讲一下src目录
 assets 下面 icon 存放项目中使用到的icon 这是在 Iconfont平台上找的一些icon 通过该平台生成所有的文件 下载 然后放在项目中
commo文件夹 
    api.js 项目中所有api接口
    axios.js 重新封装了axios的HTTP请求，在vue.prototype添加 get 和 post 请求
    bus.js  一个空的vue实例 ，用于 兄弟组件之间的通讯
    config.js  项目环境 配置
    http.js  原生XMLHttpRequest 请求 只是简单封装了一下 该项目中 主要用 axios.js 发起http请求
    wxsdk.js 封装了微信js sdk 没有测试过，可能有bug
 components 文件夹 公用组件
   loading文件夹 显示正在加载中的一个组件
       loading.js   引入loading.vue模板 创建视图对象 然后挂载到dom下面
       loading.vue
   header.vue  项目中公用的头部
   popup.vue  一个popup组件
 
 router 文件夹 存放路由文件

 utils 主要存放 一些工具类js
   common.js 这是一个公用的js类，里面只写了对 sessionStroage 设置 读取 和 删除
 
 views 文件夹 用于 存放 视图文件
    components 文件夹 存放 单个模块中使用到的组件  （这里我没有分模块创建文件夹）
       selectCopies.vue 是一个商品的 + 和 — 的一个按钮组件 
   index.vue  是商城的首页模板
   payMoney.vue 是支付模板

 main.js  入口文件

 static
   allData.json  项目中 接口数据 用于模拟接口请求返回的数据。
# 


For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

