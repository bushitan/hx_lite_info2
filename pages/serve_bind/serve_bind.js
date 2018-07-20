// pages/roster/roster.js
var API = require('../../utils/api.js');
var GP
Page({

    /**
     * 页面的初始数据
     */
    data: {
        // user
        pageStatus:1, //1 引导,2 老,3 新
        user:"",

        oldAccount: "",
        oldPassword: "",

        newPhone: "",
        newCode: "",
        startTime:false,

    },
    //切换页面
    setPageStatus(e){
        console.log(e)
        var status = e.currentTarget.dataset.value
        GP.setData({ pageStatus: status})
    },
    // 老用户绑定
    bindAccount(e) { GP.setData({ oldAccount:e.detail}) },
    bindPassword(e) { GP.setData({ oldPassword: e.detail }) },
    bind(){
        if (GP.data.oldAccount =="" ){
            wx.showModal({title: '请输入账号',})
            return 
        }
        if (GP.data.oldAccount == "") {
            wx.showModal({ title: '请输入密码', })
            return 
        }

        API.Request({
            url: API.API_USER_BIND,
            method:"POST",
            data: {
                "openid": wx.getStorageSync(API.KEY_OPENID),

                // "openid": "1121", 
                "username": GP.data.oldAccount ,
                "password": GP.data.oldPassword ,
                // "account": "zhangsan",
                // "password": "12345678",
            },
            success: function (res) {
                console.log(res.data)
                if (res.data.status.code == 0) {
                    wx.showModal({
                        title: "绑定成功",
                        showCancel: false,
                        success: function () {
                            wx.switchTab({ url: '/pages/serve/serve', })
                        },
                    }) 
                }else{
                    wx.showModal({
                        title: res.data.status.message,
                        showCancel: false, 
                        success: function () {
                            wx.switchTab({ url: '/pages/serve/serve', })
                        },
                    })
                }
            },
        })
    },

    // 新用户注册
    registerPhone(e) { GP.setData({ newPhone: e.detail }) },
    registerCode(e) { GP.setData({ newCode: e.detail }) },
    checkPhone(){ //检测手机号码正确
        var newPhone = GP.data.newPhone
        if (newPhone == "" || newPhone.length != 11) {
            wx.showModal({title: '请输入正确的手机号码'})
            return false
        }else
            return true
    },
    checkCode(){ //检测验证码是否为空
        var newCode = GP.data.newCode
        if (newCode == "") {
            wx.showModal({ title: '请输入验证码' })
            return false
        } else
            return true
    },
    checkCodeDuration(){ //检测是否可以发短信
        var startTime = GP.data.startTime
        //第一次发
        if (startTime == false) {
            wx.showToast({title: '短信发送成功',})
            GP.setData({ startTime: (new Date()).valueOf() })
            return true
        }
        //重置时间
        var nowTime = (new Date()).valueOf()
        var duration = parseInt((nowTime - startTime) / 1000)
        if (duration > 60) {
            wx.showToast({ title: '短信发送成功', })
            GP.setData({ startTime: (new Date()).valueOf() })
            return true
        } else{
            wx.showModal({
                title: '短信已下发',
                content: '若未收到短信，请' + (60 - duration) + "秒后重新获取",
            })
            return false
        }
    },
    registerGetCode(e){ //获取短信验证码
        if (GP.checkPhone() == false)
            return
        if (GP.checkCodeDuration() == false)
            return
        API.Request({
            url: API.API_USER_GET_SHORT_MESSAGE,
            method: "POST",
            data: {
                "mobile": GP.data.newPhone,
            },
            success: function (res) {
                console.log(res.data)
                // if (res.data.status.code != 11104) {
                //     wx.showModal({
                //         title: res.data.status.message,
                //         showCancel: false,
                //     })
                // } else {
                //     wx.showModal({
                //         title: "绑定成功",
                //         showCancel: false,
                //         success: function () {
                //             wx.switchTab({ url: '/pages/serve/serve', })
                //         },
                //     })
                // }
            },
        })
    },
    register(roster_id) {
        if (GP.checkPhone() == false)
            return
        if (GP.checkCode() == false)
            return
        API.Request({
            url: API.API_USER_REGISTER,
            method: "POST",
            data: {
                "openid": wx.getStorageSync(API.KEY_OPENID),
                "mobile": GP.data.newPhone,
                "code": GP.data.newCode,
                "industry_id": 1, //默认松香行业
            },
            success: function (res) {
                console.log(res.data)
                if (res.data.status.code == 11104) {
                    wx.showModal({
                        title: res.data.status.message,
                        showCancel: false,
                    })
                } else {
                    wx.showModal({
                        title: "绑定成功",
                        showCancel: false,
                        success: function () {
                            wx.switchTab({ url: '/pages/serve/serve', })
                        },
                    })
                }
            },
        })
    },


    onInit(){
        // 1\获取用户信息
        var user = wx.getStorageSync(API.KEY_USER)
        GP.setData({
            user: user
        })
    },


    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        GP = this
        GP.onInit()
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})