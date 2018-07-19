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
            url: API.API_ROSTER_GET_CONTENT,
            method: "POST",
            data: {
                search_uid: roster_id,
                uid: wx.getStorageSync(API.KEY_HX_UID)
            },
            success: function (res) {
                console.log(res.data)
                // var rosterList = GP.data.rosterList
                // rosterList = rosterList.concat(res.data.data.content) //新增文章拼接
                // GP.setData({
                //     rosterList: rosterList,
                //     last: res.data.data.last,
                //     scrollLock: false,
                // })
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