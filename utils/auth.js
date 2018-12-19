

// if (res.data.status.code == 11107) {
//     Auth.out()
//     return
// } 

// if (res.data.status.code == 11107) {
//     Auth.out()
//     return
// }
// else {
//     GP.setData({
//         userInfo: res.data.data
//     })

// }
// <view class='header'>
//     <image class='bg_image' src='../../images/roster_bg.jpg'></image>
//     <view class='logo'>
 
//         <image class='logo_image'  src=' {{logo=="null"?"../../images/logo_null.jpg":userInfo.logo}}'></image>
//     </view>
// </view>
// <view style='height:50px'></view>
// <view class='summary'>
//     <view class='node'>
//         <view class='title'>姓名</view>
//         <view class='des'> {{userInfo.contactName}}</view>
//     </view>
//     <view class='node'>
//         <view class='title'>公司</view>
//         <view class='des'>  {{userInfo.companyName}} </view>
//     </view>
//      <view class='node' hidden='{{productionTypeName==""}}'>
//         <view class='title'>产品</view>
//         <view class='des'>  {{userInfo.productionTypeName}} </view>
//     </view>
//     <!-- <view class='node' hidden='{{roster.buy==""}}'>
//         <view class='title'>供应</view>
//         <view class='des'>  {{roster.buy}} </view>
//     </view>  -->
// </view>


function out(){
    wx.showModal({
        title: '权限不足',
        content: '请在"服务"进行会员绑定。若已绑定，请联系管理员开通更高级别会员',

        confirmText:"会员绑定",
        cancelText: "联系客服",
        success: function (res) {
            if (res.confirm) {
                wx.switchTab({
                    url: '/pages/serve/serve',
                })
            } else {
                wx.navigateBack({
                    success:function(){

                        wx.makePhoneCall({
                            phoneNumber: '0771-5553301' //仅为示例，并非真实的电话号码
                            // success
                        })
                    },
                })
            }
        },
    })
}

module.exports = {
    out: out
}
