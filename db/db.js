class db {	
	
	constructor(){
    }
    
    
	/**
	 * @method 1 上传图片
	 * @return 
	 *      []
	 */
	swiperAdd(data) {
	    return new Promise((reslove, reject) => {
	        wx.showLoading()
	        data = data || {}
	        data['action'] = "add"
	        wx.cloud.callFunction({
	            name: 'swiper',
	            data: data,
	            success: res => {
	                wx.hideLoading()
	                if (res.result.code == 0)
	                    reslove(res.result)
	                else
	                    wx.showToast({
	                        icon: "none",
	                        title: res.result.msg,
	                    })
	            },
	            fail: res => {
	                console.log(res.result)
	                wx.hideLoading()
	            },
	        })
	    })
	}

    
	/**
	 * @method 2 获取图片
	 * @return 
	 *      []
	 */
	swiperGetList(data) {
	    return new Promise((reslove, reject) => {
	        wx.showLoading()
	        data = data || {}
	        data['action'] = "get_list"
	        wx.cloud.callFunction({
	            name: 'swiper',
	            data: data,
	            success: res => {
	                wx.hideLoading()
	                if (res.result.code == 0)
	                    reslove(res.result)
	                else
	                    wx.showToast({
	                        icon: "none",
	                        title: res.result.msg,
	                    })
	            },
	            fail: res => {
	                console.log(res.result)
	                wx.hideLoading()
	            },
	        })
	    })
    }
    
    
	/**
	 * @method 3 删除
	 * @return 
	 *      []
	 */
	swiperDelete(data) {
	    return new Promise((reslove, reject) => {
	        wx.showLoading()
	        data = data || {}
	        data['action'] = "delete"
	        wx.cloud.callFunction({
	            name: 'swiper',
	            data: data,
	            success: res => {
	                wx.hideLoading()
	                if (res.result.code == 0)
	                    reslove(res.result)
	                else
	                    wx.showToast({
	                        icon: "none",
	                        title: res.result.msg,
	                    })
	            },
	            fail: res => {
	                console.log(res.result)
	                wx.hideLoading()
	            },
	        })
	    })
    }
    

    swiperGetListByTag(data) {
	    return new Promise((reslove, reject) => {
            var obj = {
                tag_id:data.tag_id,
                start_index:0,
                end_index : 10,
            }
            wx.request({
                url: "https://xcx.308308.com/huaxun_2/api/article/get_list/tag/",
                // url: "https://xcx.308308.com/huaxun_2/api/article/index/",
                data:obj,
                method: "GET",
                // data: { openid: wx.getStorageSync(API.KEY_OPENID),},
                success: function (res) {
                    reslove(res)
                },
            })
        })
    }

}
module.exports = new db()