// pages/info/info.js
var API = require('../../utils/api.js');
var GP 
Page({

    /**
     * 页面的初始数据
     */
    data: {
        categoryList:[],
    },

    onInit(options){
        
        API.Request({
            url: API.API_INFO_GET_ALL_INDUSTRY,
            success:function(res){
                console.log(res.data)
                GP.setData({

                })
                GP.getCategoryList(1)
            },
        })
    },

    getCategoryList(industry_id){

        API.Request({
            url: API.API_INFO_GET_CATEGORY_LIST,
            data: { industry_id: industry_id},
            success: function (res) {
                console.log(res.data)
                GP.setData({
                    categoryList: res.data.category_list
                })
                GP.getArticleList(1, 3, 20, 1)
            },
        })
    },

    //获取文章列表
    getArticleList(industry_id, category_id, rows, page_no){


        API.Request({
            url: API.API_INFO_GET_ARTICLE_LIST,
            data: { 
                industry_id: industry_id,
                category_id: category_id,
                rows: rows,
                page_no: page_no,
            },
            success: function (res) {
                console.log(res.data)
                GP.setData({
                    articleList: res.data.article_list,
                    rows: res.data.rows,
                    pageNo: res.data.page_no,
                })
            },
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        GP = this
        GP.onInit()
        GP.getArticleList(1, 3, 20, 1)
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {
    
    }
})