// pages/article/article.js
var API = require('../../utils/api.js');
var GP 
Page({

    /**
     * 页面的初始数据
     */
    data: {
    
    },

    getArticle(article_id){
        API.Request({
            url: "https://xcx.308308.com/huaxun_2/api/article/get/id/",
            data: {
                article_id: article_id,
            },
            success: function (res) {
                console.log(res.data)
                GP.setData({
                    article: res.data.article_dict,
                })
            },
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        GP = this 
        var article_id = options.article_id
        GP.getArticle(article_id)
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {
    
    }
})