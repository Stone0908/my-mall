import wx from 'weixin-js-sdk'
import Vue from 'vue'

const request = function (action, appId, timeStamp, nonceStr,signature, packages, paySign, signType) {
    wx.config({
        debug: false,
        appId: appId,
        timestamp: timeStamp,
        nonceStr: nonceStr,
        signature: signature,
        jsApiList: [
          'checkJsApi',
          'onMenuShareTimeline',
          'onMenuShareAppMessage',
          'chooseWXPay'
        ]
    });
    return new Promise(function(callback,error){
        wx.ready(function () {
            if(action ==  'onMenuShareAppMessage'){
                wx.onMenuShareAppMessage({
                    title: '互联网之子',
                    desc: '在长大的过程中，我才慢慢发现，我身边的所有事，别人跟我说的所有事，那些所谓本来如此，注定如此的事，它们其实没有非得如此，事情是可以改变的。更重要的是，有些事既然错了，那就该做出改变。',
                    link: 'http://movie.douban.com/subject/25785114/',
                    imgUrl: 'http://demo.open.weixin.qq.com/jssdk/images/p2166127561.jpg',
                    trigger: function (res) {
                        // 不要尝试在trigger中使用ajax异步请求修改本次分享的内容，因为客户端分享操作是一个同步操作，这时候使用ajax的回包会还没有返回
                        alert('用户点击发送给朋友');
                    },
                    success: function (res) {
                        callback('已分享');
                    },
                    cancel: function (res) {
                        callback('已取消');
                    },
                    fail: function (res) {
                        error(JSON.stringify(res));
                    }
                  });
            }else if(action ==  'onMenuShareTimeline'){
                wx.onMenuShareTimeline({
                    title: '互联网之子',
                    link: 'http://movie.douban.com/subject/25785114/',
                    imgUrl: 'http://demo.open.weixin.qq.com/jssdk/images/p2166127561.jpg',
                    trigger: function (res) {
                      // 不要尝试在trigger中使用ajax异步请求修改本次分享的内容，因为客户端分享操作是一个同步操作，这时候使用ajax的回包会还没有返回
                      alert('用户点击分享到朋友圈');
                    },
                    success: function (res) {
                        callback('已分享');
                    },
                    cancel: function (res) {
                        callback('已取消');
                    },
                    fail: function (res) {
                        error(JSON.stringify(res));
                    }
                  });
            }else if(action ==  'chooseWXPay'){
                wx.chooseWXPay({
                    timestamp: timeStamp,
                    nonceStr: nonceStr,
                    package: packages,
                    signType: signType, // 注意：新版支付接口使用 MD5 加密
                    paySign: paySign,
                    success: function (res){
                        callback(res)
                    },
                    fail:function(res){
                        error(res);
                    }
                });
            }
        });
        wx.error( function(res) {
            alert("config信息验证失败");
        });
  });
  
}


class weixin {

    // 分享到朋友圈
    onMenuShareTimeline (appId, timeStamp, nonceStr,signature) {
        return request('onMenuShareTimeline', ...arguments)
    }
    // 分享到朋友
    onMenuShareAppMessage (appId, timeStamp, nonceStr,signature, packages, paySign, signType) {
        return request('onMenuShareAppMessage', ...arguments);
    }
    // 微信支付
    chooseWXPay (appId, timeStamp, nonceStr,signature, packages, paySign, signType) {
        return request('chooseWXPay', ...arguments);
    }

    install (Vue) {
        Vue.prototype.$chooseWXPay = this.chooseWXPay;
    }

}
export default new weixin()
