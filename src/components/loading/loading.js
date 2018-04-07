import Vue from 'vue';

//定义变量保存 已经挂载的视图
var loadMV = null;

//定义变量 保存当前视图显示状态
var showLoad = false;

const load = function (type,text) {
    if(type){
        if(showLoad){
            return;
        }
        if(!loadMV){
            let Profile = Vue.extend(require('./loading.vue').default);
            loadMV = new Profile();
            let html = loadMV.$mount().$el;
            document.body.appendChild(html);
            loadMV.text = text;
        }
    }
    loadMV.show = showLoad = type;
    console.log(type)
    
    
}

class loading {

    loading (text) {
        if(!text){
            return load(false);
        }else{
            return load(true,text);
        }
        
    }

    install (Vue) {
        Vue.prototype.$loading = this.loading;
    }
}

export default new loading();