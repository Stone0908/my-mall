import axios from 'axios'
import Vue from 'vue'
import api from './api'

//默认请求 get方式
const request = function (type = 'get', url, data = {}, options){

    let actionUrl = api[url];
    console.log(actionUrl)
    // 返回一个Promise对象
    return new Promise(function (callback, error){
        axios({
            method: type,
            url: actionUrl,
            params: data,
            data: data,
            timeout: 2000
        }).then(function(response){
            //请求成功 执行回调函数
            callback(response.data);
        },function(response){
            error(response);
        })
    
    })
    
}

class axiosHttp {

    get (url, data, options) {
        return request ('get', ...arguments);
    }

    post () {
        return request ('post', ...arguments);
    }
    // 在Vue原型对象上添加 $get $post 方法
    install (Vue) {
        Vue.prototype.$get = this.get;
        Vue.prototype.$post = this.post;
    }
}

export default new axiosHttp()