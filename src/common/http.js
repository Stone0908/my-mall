import Vue from 'vue';
import api from './api';
// 原生js http请求
const request = (type = 'get',url, data = {}, options = {}) => {

    let apiUrl = api[url]

    // get请求 拼接url参数
    if(type === 'get'){
        let str = "";
        for( let key in data){
            str += ((str.indexOf('?') == -1 ) ? '?' : '&') + key +"="+ data[key];
        }
        apiUrl += str;
    }
    const obj = {
        xhr: null,
        url: apiUrl,
        data: data,
        methodType: type,
        async: true
    }
    return new Promise(function (callback, error) {
        if(window.ActiveXObject) {
            obj.xhr = new ActiveXObject('MSXML2.XMLHTTP');
        }else{
            obj.xhr = new XMLHttpRequest();
        }
        //异步请求
        if(obj.async){
            obj.xhr.onreadystatechange = function () {
                if(obj.xhr.readyState == 4 && obj.xhr.status == 200) {
                    let res = eval("("+obj.xhr.responseText+")");
                    callback(res);
                }
            }
        }
        obj.xhr.open(obj.methodType, obj.url, obj.async);
        
        //设置请求内容类型 -- 和服务器一致
        if(obj.methodType === 'post'){
           obj.xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        }
        obj.methodType === 'get' ? obj.xhr.send() : obj.xhr.send(JSON.stringify(data));
        //同步请求
        if(!obj.async){
            callback(eval("("+obj.xhr.responseText+")"));
        }
    })
}

class Http {
    constructor () {
    }
    get (url, data, options) {
        return request('get', ...arguments);
    }
    post (url, data, options) {
        return request('post', ...arguments);
    }
    install(Vue) {
        Vue.prototype.$get = this.get;
        Vue.prototype.$post = this.post;
    }

}

export default new Http();