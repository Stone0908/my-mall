import config from './config'

//使用本地开发环境地址
let baseUrl = config.local.apiPath;

/* api 列表 
*/
export default {
    //使用本地json文件模拟接口请求,正式开发 请把地址换证接口地址
    goodslist: baseUrl+"static/allData.json",
    updateuseraddr: baseUrl+"static/allData.json",
    getUserInfo: baseUrl+"static/allData.json",
    pay: baseUrl+"static/allData.json"
}