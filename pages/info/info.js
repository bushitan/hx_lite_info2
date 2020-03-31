// pages/info/info.js
var API = require('../../utils/api.js');
var GP
var pageNO = 1
Page({

    /**
     * 页面的初始数据
     */
    data: {
        categoryList:[],
        articleList:[],
        scrollLock:true,
        last:false,
        industryID:null,
        rows:20,
        // pageNO:1,

        swiperList:[],//轮播图列表
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
        GP.getHXUserID()//过去HX大平台的用户id


        GP.switchSwiper()
    },
    //更改轮播图
    switchSwiper(){
        var industryID = GP.data.industryID
        var list
        if (industryID == 1)
            list = [
                { url: "../../images/swiper/2020-3-30-1.jpg" },
            ]
        if (industryID == 2)
            list = [
                { url: "../../images/swiper/2_1.jpg" },
                { url: "../../images/swiper/2_2.jpg" },
            ]
        if (industryID == 3)
            list = [
                { url: "../../images/swiper/3_1.jpg" },
                { url: "../../images/swiper/3_2.jpg" },
                // { url: "../../images/swiper/3_3.jpg" },
            ]
        if (industryID == 4)
            list = [
                { url: "../../images/swiper/2020-3-30-2.jpg" },
                // { url: "../../images/swiper/4_1.jpg" },
                // { url: "../../images/swiper/4_2.jpg" },
                // { url: "../../images/swiper/4_3.jpg" },
            ]
        GP.setData({
            swiperList: list
        })
    },

    getHXUserID(){
        API.Request({
            url: API.API_USER_CHECK,
            method: "POST",
            data: { openid: wx.getStorageSync(API.KEY_OPENID),},
            success: function (res) {
                if (res.data.status.code == 11013)
                    wx.setStorageSync(API.KEY_HX_UID, "")  //没有权限，重置
                else
                    wx.setStorageSync(API.KEY_HX_UID, res.data.data.uid)

            },
        })
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
                    categoryID: res.data.data.categories[0].category_id,
                    
                })
                
                GP.getArticleList()
            },
        })
    },

    scrollBottom(){
        if (GP.data.last == false && GP.data.scrollLock == false) {
            GP.setData({
                scrollLock:true,
            })
            pageNO++
            GP.getArticleList()
        }
    },
    //获取文章列表
    getArticleList(){
        API.Request({
            url: API.API_INFO_GET_ARTICLE_LIST,
            method: "POST",
            data: { 
                industry_id: GP.data.industryID,
                category_id: GP.data.categoryID,
                rows: GP.data.rows,
                page_no: pageNO,
            },
            success: function (res) {
                console.log(res.data)

                var article_list = GP.data.articleList
                article_list = article_list.concat(res.data.data.content) //新增文章拼接
                GP.setData({
                    articleList: article_list,
                    last: res.data.data.last,
                    scrollLock:false,
                })
            },
        })
    },
    clickTag(e){
        var index = e.detail
        GP.setData({ 
            articleList:[],
            categoryID: GP.data.categoryList[index].category_id,
        })
        pageNO = 1
        GP.getArticleList(1)
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

        GP.showDialog()
        // GP.getArticleList(1, 3, 20, 1)
    },
    showDialog(){
        // wx.showModal({
        //     title: '温馨提示',
        //     content: '尊敬的客户，欢迎您使用华讯生物圈微信小程序。为答谢您对本公司业务的支持，方便您及时的查看最新的市场行情资讯，即日起至2019年2月28日，我网为您打开华讯生物圈微信小程序所有的浏览权限，祝您使用愉快!',        
        //     showCancel:false,
        // })  
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