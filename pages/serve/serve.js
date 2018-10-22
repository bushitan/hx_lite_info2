// pages/roster/roster.js
var API = require('../../utils/api.js');
var GP
Page({

    /**
     * 页面的初始数据
     */
    data: {
        // user
        loginStatus:2, // 1 登陆中 2已登录 3未登录
        pageStatus:1, //1 引导,2 老,3 新
        user:"",
        isBind:false,
    },

    getUserInfo(res){
        console.log(res)

        wx.setStorageSync(API.KEY_USER, res.detail.userInfo)
        GP.setData({
            user: res.detail.userInfo
        })
        GP.SetUserInfo(res.detail.userInfo)
    },

    setUserInfo(roster_id) {
        API.Request({
            url: "https://xcx.308308.com/huaxun_2/api/roster/get/id/",
            data: {
                roster_id: roster_id,
            },
            success: function (res) {
                console.log(res.data)
                GP.setData({
                    roster: res.data.roster_dict,
                })
            },
        })
    },
    SetUserInfo: (userInfo) => {
        // wx.getUserInfo({
        //     success: function (res) {
                var userInfo = userInfo
                // var nickName = userInfo.nickName
                // var avatarUrl = userInfo.avatarUrl
                // var gender = userInfo.gender //性别 0：未知、1：男、2：女
                // var province = userInfo.province
                // var city = userInfo.city
                // var country = userInfo.country
                console.log(userInfo)
                GP.setData({
                    logo: userInfo.avatarUrl,
                    name: userInfo.nickName,
                })
                wx.request
                ({
                    url: API.MY_SET_WX,
                    method: "GET",
                    data: {
                        session: wx.getStorageSync(API.KEY_SESSION),
                        logo_url: userInfo.avatarUrl,
                        nick_name: userInfo.nickName,
                    },
                    success: function (res) {
                        var object = res.data
                        console.log(object)
                        if (object.status == "true") //登陆成功
                        {
                            wx.showToast({
                                title: '登陆成功',
                            })
                        }
                        else {

                        }
                    },
                    fail: function (res) {
                    },
                })
                // },
        //     }
        // })
    },




    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        GP = this
        // wx.showLoading({
        //     title: '登陆中',
        // })

        GP.onInit()
        // var roster_id = options.roster_id
        // GP.getRoster(roster_id)
    },


    onInit() {
        // 1\获取用户信息
        var user = wx.getStorageSync(API.KEY_USER)
        GP.setData({
            user: user
        })
        // 1 验证openid是否已经登录
        API.Request({
            url: API.API_USER_CHECK,
            method:"POST",
            data: {
                openid: wx.getStorageSync(API.KEY_OPENID),
                // open_id: "oNUgxv608YVIclrLMz_0egqocXcI",
                // openid: "ozTYA0Qvq6nBc9Fs167X29kW25G0",
                
                
            },
            success: function (res) {
                console.log(res.data)
                var isBind = true
                if (res.data.status.code == 11109)
                    isBind = false
                GP.setData({
                    isBind: isBind,
                })
            },
        })

        // 2 用户登录，获取用户信息，并展示
        // wx.hideLoading()
        // GP.setData({
        //     loginStatus: 2
        // })
    },

    onShow(){
        // wx.showModal({
        //     title: '请选择',
        //     content: '',
        // })
        // wx.showActionSheet({
        //     itemList: ["已有账号","新用户"],
        // })
    },

    bind() {
        wx.redirectTo({
            url: '/pages/serve_bind/serve_bind',
        })
    },

    unbind() {
        API.Request({
            url: API.API_USER_UNBIND,
            method: "POST",
            data: {
                openid: wx.getStorageSync(API.KEY_OPENID),
            },
            success: function (res) {
                console.log(res.data)
                // var isBind = true
                // if (res.data.status.code == 11109)
                //     isBind = false
                GP.setData({
                    isBind: false,
                })
            },
        })
        // wx.redirectTo({
        //     url: '/pages/serve_bind/serve_bind',
        // })
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})