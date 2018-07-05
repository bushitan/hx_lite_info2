// pages/roster/roster.js
var API = require('../../utils/api.js');
var GP
Page({

    /**
     * 页面的初始数据
     */
    data: {
        // user
        loginStatus:1, // 1 登陆中 2已登录 3未登录
        pageStatus:1, //1 引导,2 老,3 新
        user:"",
    },

    setPageStatus(e){
        console.log(e)
        var status = e.currentTarget.dataset.value
        GP.setData({ pageStatus: status})
    },

    getUserInfo(res){
        console.log(res)
        
        wx.setStorageSync(API.KEY_USER, res.detail.userInfo)
        GP.setData({
            user: res.detail.userInfo
        })
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

    onInit(){
        // 1\获取用户信息
        var user = wx.getStorageSync(API.KEY_USER)
        GP.setData({
            user: user
        })
        // 1 验证openid是否已经登录
        // API.Request({
        //     url: "https://xcx.308308.com/huaxun_2/api/roster/get/id/",
        //     data: {
        //         roster_id: roster_id,
        //     },
        //     success: function (res) {
        //         console.log(res.data)
        //         GP.setData({
        //             roster: res.data.roster_dict,
        //         })
        //     },
        // })

        // 2 用户登录，获取用户信息，并展示
        wx.hideLoading()
        GP.setData({
            loginStatus:2
        })
    },


    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        GP = this
        wx.showLoading({
            title: '登陆中',
        })

        GP.onInit()
        // var roster_id = options.roster_id
        // GP.getRoster(roster_id)
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

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})