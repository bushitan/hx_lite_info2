// pages/roster/roster.js
var API = require('../../utils/api.js');
var GP
var pageNO = 1
Page({

    /**
     * 页面的初始数据
     */
    data: {
        rosterList:[],
        industryID:null,
        rows: 10,
        scrollLock: true,
        last:false,
    },
    onLoad: function (options) {
        GP = this
        GP.onInit()
    },

    onShow: function (options) {
        if (GP.data.industryID != wx.getStorageSync(API.KEY_INDUSTRYID))
            GP.onInit()
    },
    onInit(){
        GP.setData({
            rosterList: [],
            industryID: wx.getStorageSync(API.KEY_INDUSTRYID),
            scrollLock: true,
            last: false,
        })
        GP.getRosterList()
    },


    getRosterList(page_no) {

        API.Request({
            url: API.API_ROSTER_GET_LIST,
            method:"POST",
            data: {
                rows: GP.data.rows,
                page_no: pageNO,
                industry_id: wx.getStorageSync(API.KEY_INDUSTRYID),
                // "company_name": "广西华思特国际贸易有限公司",
                // "contact_name": "",
                // "uid": "3" 
            },
            success: function (res) {
                console.log(res.data)
                var rosterList = GP.data.rosterList
                rosterList = rosterList.concat(res.data.data.content) //新增文章拼接
                GP.setData({
                    rosterList: rosterList,
                    last: res.data.data.last,
                    scrollLock: false,
                })
            },
        })
    },
    scrollBottom() {
        if (GP.data.last == false && GP.data.scrollLock == false) {
            GP.setData({scrollLock: true})
            pageNO++
            GP.getRosterList(GP.data.page_no)
        }
    },


    // onInit(){

    //     API.Request({
    //         url: "https://xcx.308308.com/huaxun_2/api/roster/get_list/tag",
    //         data:{
    //             tag_id: GP.data.industryID,
    //             start_index:0,
    //             end_index:100,
    //         },
    //         success: function (res) {
    //             console.log(res.data)
    //             GP.setData({
    //                 rosterList: res.data.article_list
    //             })
    //         },
    //     })
    // },

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