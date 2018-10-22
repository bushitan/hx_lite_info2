// pages/article/article.js
var API = require('../../utils/api.js');
var Auth = require('../../utils/auth.js');
var GP 
Page({

    /**
     * 页面的初始数据
     */
    data: {
    
    },

    getArticle(article_id){
        API.Request({
            url: API.API_INFO_GET_ARTICLE,
            method: "POST",
            data: {
                uid: wx.getStorageSync(API.KEY_HX_UID) || -1,  //用华讯大平台的uid
                // uid:'100175',
                article_id: article_id,
            },
            success: function (res) {
                console.log(res.data)
                if (res.data.status.code == 11107) {
                    Auth.out()
                    return
                } 
                // if (res.data.status.code == 11107){
                //     GP.noPower()
                //     return
                // }
                GP.setData({
                    article: res.data.data,
                })
            },
        })
    },

    noPower(){
        wx.showModal({
            title: '权限不足',
            content: '',
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