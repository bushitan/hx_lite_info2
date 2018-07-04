// pages/meet/meet.js
var API = require('../../utils/api.js');
var GP
Page({

    /**
     * 页面的初始数据
     */
    data: {
        industryList:[]
    },
    click(e){
        var id = e.currentTarget.dataset.industry_id
        // wx.navigateTo({
        //     url: '',
        // })

        wx.setStorageSync(API.KEY_INDUSTRYID,id) //保存行业id
        wx.switchTab({
            url: '/pages/info/info?industry_id=' + id,
            // url: '/pages/info/info',
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        GP = this
        GP.onInit()
    },

    onInit() {

        API.Request({
            url: API.API_INFO_GET_ALL_INDUSTRY,
            success: function (res) {
                console.log(res.data)
                GP.setData({
                    industryList:res.data.data
                })
                // GP.getCategoryList(1)
            },
        })
    },
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})