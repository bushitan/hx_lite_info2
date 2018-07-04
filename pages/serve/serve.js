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
    },

    setPageStatus(e){
        console.log(e)
        var status = e.currentTarget.dataset.value
        GP.setData({ pageStatus: status})
    },

    getUserInfo(res){
        console.log(res)
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

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        GP = this
        wx.showLoading({
            title: '登陆中',
        })
        var roster_id = options.roster_id
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