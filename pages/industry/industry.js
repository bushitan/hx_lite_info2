// pages/meet/meet.js
var API = require('../../utils/api.js');
var GP

var industryData = {
    "data":[
        {"industry_id":1,"industry_name":"松香"},
        {"industry_id":2,"industry_name":"酒精"},
        {"industry_id":3,"industry_name":"糠醛"},
        {"industry_id":4,"industry_name":"活性炭"}
    ],
    "status":
    {
        "code":0,"message":"请求成功"
    }
}
Page({

    /**
     * 页面的初始数据
     */
    data: {
        industryList:industryData.data

        
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
                // GP.setData({
                //     industryList:res.data.data
                // })
                // GP.getCategoryList(1)
            },
        })

        
        var hx_uid = wx.getStorageSync('hx_uid')
        if(hx_uid)
            wx.setNavigationBarTitle({
              title: '华讯生物圈（ID' + hx_uid + "）",
            })
    },
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})