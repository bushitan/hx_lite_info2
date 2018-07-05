// pages/roster/roster.js
var API = require('../../utils/api.js');
var GP
Page({

    /**
     * 页面的初始数据
     */
    data: {
        industryID:null,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        GP = this
        GP.setData({
            // industryID: wx.getStorageSync(API.KEY_INDUSTRYID)
            industryID:1
        })
        GP.onInit()
    },


    onInit(){

        API.Request({
            url: "https://xcx.308308.com/huaxun_2/api/roster/get_list/tag",
            data:{
                tag_id: GP.data.industryID,
                start_index:0,
                end_index:100,
            },
            success: function (res) {
                console.log(res.data)
                GP.setData({
                    rosterList: res.data.article_list
                })
            },
        })
    },

    clearInput: function () {
        this.setData({
            inputVal: "",
            isSearch: false,
        });
    },
    inputTyping: function (e) {
        this.setData({
            inputVal: e.detail.value
        });
    },
    

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {
    
    }
})