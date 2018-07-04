// pages/roster/roster.js
var API = require('../../utils/api.js');
var GP
Page({

    /**
     * 页面的初始数据
     */
    data: {
        list: [
            { url: "../../images/member_1.jpg" },
            { url: "../../images/member_2.jpg" },
           
        ],
        checked:1,
        price:3500,
        
    },
    radioChange(e){
        var checked = e.detail.value
        GP.setData({
            checked: checked,
            price: checked==1?3500:1500,
        })
       
    },
    createPayPage(){
        wx.requestPayment({
            timeStamp: '',
            nonceStr: '',
            package: '',
            signType: '',
            paySign: '',
        })
    },
    getRoster(roster_id) {
        API.Request({
            url: "https://xcx.308308.com/huaxun_2/api/roster/get/id/",
            data: {
                roster_id: roster_id,
            },
            success: function (res) {
                console.log(res.data)
                GP.setData({
                    roster: res.data.roster_dict,
                })
            },
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        GP = this
        var article_id = 1508
        // GP.getRoster(21)
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})