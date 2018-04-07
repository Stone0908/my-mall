const commons = {
    // 设置本地存储
    setSessionStorage: function (key, val){
        if(typeof val === 'object'){
            val = JSON.stringify(val);
        }
        window.sessionStorage.setItem(key,val);
    },
    //获取本地存储数据
    getSessionStorage: function (key){
        let val = window.sessionStorage.getItem(key); //获取数据
        let data = "";
        try {
            data = JSON.parse(val);  //将数据转换成josn对象，如果val不是json格式，捕获异常 输出原始数据
        } catch (error) {
            data = val;
        }
        return data;
    },

    // 删除本地存储数据
    removeSessionStorage: function(key){
        window.sessionStorage.removeItem(key);
    }
}
export default commons