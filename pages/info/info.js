// pages/info/info.js
var API = require('../../utils/api.js');
var GP 
Page({

    /**
     * 页面的初始数据
     */
    data: {
        categoryList:[],
        articleList:[],
        scrollLock:true,
        industryID:null,
        rows:20,
        pageNO:1,
    },
    change() {
        wx.redirectTo({
            url: '/pages/industry/industry',
        })
        // wx.navigateTo({
        //     url: '/pages/industry/industry',
        // })
    },

    onInit(options){
        GP.getCategoryList(GP.data.industryID)
    },

    getCategoryList(industry_id){
        API.Request({
            url: API.API_INFO_GET_CATEGORY_LIST,
            method: "POST",
            data: { industry_id: industry_id},
            success: function (res) {
                console.log(res.data)
                GP.setData({
                    categoryList: res.data.data.categories,
                })
                GP.getArticleList( 3, 20, 1)
            },
        })
    },

    scrollBottom(){
        if (GP.data.last == false && GP.data.scrollLock == false) {
            GP.getArticleList(3, 20, GP.data.pageNo + 1)
            GP.setData({
                pageNo: GP.data.pageNo + 1,
                scrollLock:true,
            })
            console.log('OK')
        }
    },
    //获取文章列表
    getArticleList( category_id, rows, page_no){
      

        API.Request({
            url: API.API_INFO_GET_ARTICLE_LIST,
            method: "POST",
            data: { 
                industry_id: GP.data.industryID,
                category_id: category_id,
                rows: rows,
                page_no: page_no,
            },
            success: function (res) {
                console.log(res.data)

                var article_list = GP.data.articleList
                article_list = article_list.concat(res.data.data.content) //新增文章拼接
                GP.setData({
                    articleList: article_list,
                    rows: res.data.rows,
                    pageNo: res.data.page_no,
                    last: res.data.data.last,
                    scrollLock:false,
                })
            },
        })
    },
    clickTag(e){
        var index = e.detail
        GP.setData({ articleList:[]})
        GP.getArticleList(GP.data.categoryList[index].category_id, 20, 1)
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        GP = this
        if (options.industry_id == undefined){
            var industry_id = wx.getStorageSync(API.KEY_INDUSTRYID)
            if (industry_id == ""){
                GP.change()
                return
            }
            else
                GP.setData({ industryID: industry_id})
        }else
            GP.setData({ industryID: options.industry_id })
        
        wx.showToast({
            icon:"loading",
            title: '登陆中',
        })
        GP.onInit()
        // GP.getArticleList(1, 3, 20, 1)
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {
        return {
            imageUrl:"../../images/share.png", 
        }
    }
})


// API.Request({
//     url: API.API_INFO_GET_CATEGORY_LIST,
//     method:"POST",
//     data: { industry_id:1},
//     // header: {
//     //     'content-type': 'application/x-www-form-urlencoded' // 默认值
//     // },

//     success: function (res) {
//         console.log(res.data)
//         // GP.setData({

//         // })
//         // GP.getCategoryList(1)
//     },
// })
// GP.getCategoryList(GP.data.industryID)

        //临时文章
        // API.Request({
        //     url: "https://xcx.308308.com/huaxun_2/api/article/index/?tag_id=21&start_index=0&end_index=10&app_id=wx51930c31391cc5cc",
        //     success: function (res) {
        //         console.log(res.data)
        //         GP.setData({
        //             articleList: res.data.article_list,
        //         })
        //     },
        // })