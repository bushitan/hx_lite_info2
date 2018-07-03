// pages/roster/roster.js
var API = require('../../utils/api.js');
var GP
Page({

    /**
     * 页面的初始数据
     */
    data: {

    },

    getRoster(roster_id) {
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

        var roster_id = options.roster_id
        GP.getRoster(roster_id)
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})