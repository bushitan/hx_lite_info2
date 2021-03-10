


var APP_ID = "wx51930c31391cc5cc"
// var host_url = 'https://xcx.308308.com/huaxun_2/api/';
var API_308_URL = 'https://api.308308.com/';

var XCX_308_URL = 'https://xcx.308308.com/huaxun_2/';
// var XCX_308_URL = 'http://127.0.0.1:8000/huaxun_2/api308/';
// var XCX_308_URL = 'http://192.168.199.203:8000/huaxun_2/';

var KEY_OPENID = "openid"
var KEY_SESSION = "session"
var KEY_TOKEN = "token"
var KEY_INDUSTRYID = "industryid"
var KEY_USER = "user"
var KEY_HX_UID = "hx_uid"  //华讯大平台的uid
var request = new Request()
request.init(XCX_308_URL + 'api308/token/login/', APP_ID)

console.log(request)
function addToken(url) {
    return url 
}
function addToken1(url) {
    return url + "?access_token=" + wx.getStorageSync(KEY_TOKEN)
}
module.exports = {
    Request: request.Request,
    //获取行业大类
    API_INFO_GET_ALL_INDUSTRY: addToken(API_308_URL + 'cms/articles/get_all_industry/'),
    //获取行业大类下的子栏目
    API_INFO_GET_CATEGORY_LIST: addToken(API_308_URL + 'cms/articles/get_categories_by_industry/'),
    API_INFO_GET_ARTICLE: addToken(API_308_URL + 'cms/articles/get_article/'),
    API_INFO_GET_ARTICLE_LIST: addToken(API_308_URL + 'cms/articles/get_articles_by_category/'),
    // API_INFO_GET_ARTICLE_LIST: XCX_308_URL + 'api308/cms/get/article_list/',
    // 服务
    API_USER_CHECK: addToken(API_308_URL + 'cms/ca/get_info_by_openid/'),
    API_USER_BIND: addToken(API_308_URL + 'cms/ca/bind/'), //老用户绑定
    API_USER_UNBIND: addToken(API_308_URL + 'cms/ca/unbind/'), //解除绑定
    API_USER_REGISTER: addToken(API_308_URL + 'cms/ca/register/'), //新用户注册
    API_USER_GET_SHORT_MESSAGE: addToken(API_308_URL + 'captcha/short_message/register/'), //获取短信验证码
    MY_SET_WX: XCX_308_URL+'api/my/set/wx/',

    //商圈
    API_ROSTER_GET_LIST: addToken(API_308_URL + 'cms/mall/get_malls/'),
    API_ROSTER_GET_CONTENT: addToken(API_308_URL + 'cms/mall/get_mall_by_uid/'),

    KEY_OPENID: KEY_OPENID,
    KEY_SESSION: KEY_SESSION,
    KEY_INDUSTRYID: KEY_INDUSTRYID,
    KEY_USER: KEY_USER,
    KEY_HX_UID: KEY_HX_UID,
}


function addLog(url,status,desc){
    const db = wx.cloud.database()
    db.collection('log').add({
        data:{
            url:url,
            status:status,
            desc:desc,
            openid:wx.getStorageSync('openid'),
            session:wx.getStorageSync('session'),
            token:wx.getStorageSync('token'),
            hx_uid:wx.getStorageSync('hx_uid'),
            industryid:wx.getStorageSync('industryid'),
            createTime:new Date().toString(),
        }
    })
}




function Request() {
    var self = this
    var loginUrl = null
    var APP_ID = null
    this.init = function (_loginUrl, _APP_ID) {

        loginUrl = _loginUrl
        APP_ID = _APP_ID
    }


    var APP
    var GlobalData
    var API_TIME = 5000               //检查进程时间间隔
    var API_LOGIN_NONE = 0       //未登录
    var API_LOGIN_ING = 1           //登陆中
    var API_LOGIN_SUCCESS = 2   //已登录
    var API_LIVE = 3
    var API_LIVE_LOGIN = 3
    //重连次数
    this.Request = function (options) {
        Init() //请求初始化
        InitRequest(options)
    }

    // 初始化
    function Init() {
        APP = getApp()
        // console.log(APP)
        GlobalData = APP.globalData
        //初始化 全局变量
        if (GlobalData.apiIsLogin == undefined) {
            GlobalData.apiIsLogin = 0 //是否经登陆
            GlobalData.apiPreList = [] //未登录前的请求队列 
            GlobalData.apiFailList = [] //请求失败的队列
            GlobalData.apiThread = false
        }

        if (GlobalData.apiThread == false) {
            setInterval(
                function () {
                    var opt = GlobalData.apiFailList.pop()
                    // console.log(opt)
                    if (opt != undefined) {
                        opt['live']--
                        _Request(opt)
                    }
                }, API_TIME)
            GlobalData.apiThread = true
        }
    }

    function InitRequest(options) {

        options['live'] = API_LIVE //请求重连生命周期
        if (GlobalData.apiIsLogin == API_LOGIN_NONE) {     //未登录
            GlobalData.apiPreList.push(options)
            _RequestLogin(options)
            GlobalData.apiIsLogin = API_LOGIN_ING
        }
        else if (GlobalData.apiIsLogin == API_LOGIN_ING) {  //登陆中
            GlobalData.apiPreList.push(options)
        }
        else {                                                                             //登陆成功
            _Request(options)
        }
    }

    function _RequestLogin(options) {

        wx.login({
            success: function (res) {
                // var _session = wx.getStorageSync(KEY_SESSION)
                // _Request({
                //     'live': API_LIVE,
                //     'url': loginUrl,
                //     'data': {
                //         js_code: res.code,
                //         session: _session,
                //     },
                //     'success': function (res) {
                //         var object = res.data
                //         wx.setStorageSync(KEY_OPENID, res.data.openid)
                //         wx.setStorageSync(KEY_SESSION, res.data.session)
                //         wx.setStorageSync(KEY_TOKEN, res.data.token)
                //         // wx.setStorageSync(KEY.USER_INFO, res.data.dict_user)

                //         GlobalData.apiIsLogin = API_LOGIN_SUCCESS //登陆成功
                //         // 执行login == false时的请求
                //         for (var i in GlobalData.apiPreList) {
                //             _Request(GlobalData.apiPreList[i])
                //         }
                //         GlobalData.apiPreList = []

                //     },
                // })

                API_LIVE_LOGIN = API_LIVE_LOGIN - 1

                if(API_LIVE_LOGIN<0)
                    return
 
                    

                wx.cloud.callFunction({
                    name: "login", 
                })
                .then (res =>{
                        var object = res.result
                        console.log(object)
                        
                        wx.setStorageSync(KEY_OPENID, object.data.openid)
                        wx.setStorageSync(KEY_SESSION, object.data.session)
                        wx.setStorageSync(KEY_TOKEN, object.data.token)

                                
                        GlobalData.apiIsLogin = API_LOGIN_SUCCESS //登陆成功
                        // GlobalData.apiPreList = []
                        // 执行login == false时的请求
                        for (var i in GlobalData.apiPreList) {
                            _Request(GlobalData.apiPreList[i])
                        }
                        GlobalData.apiPreList = []

                }) 
                .catch(res=>{
                    if (options.fail != undefined)
                        options.fail(res)
                    if (options['live'] > 0)
                        GlobalData.apiFailList.push(options) //将请求加入失败队列
                })



            },
            fail: function (res) {
                console.log("fail", res)
               addLog("login" ,false,res.toString() )
            },
        });
    }

    // 普通登陆
    function _Request(options) {
        // console.log(options)

        var data = options.data
        if (data == undefined)
            data = {}
        //session 不存在，设置为false
        var _session = wx.getStorageSync(KEY_SESSION)
        if (!_session) //检查session,不存在，为false
            _session = "false"
        // data['session'] = _session  //每个请求都加session
        // data['app_id'] = APP_ID  //每个请求都加session

        
        // wx.request
        //     ({
        //         url: addToken1(options.url),
        //         method: options.method || "GET",
        //         header: options.header || {'content-type': 'application/json'},
        //         data: data,
        //         success: function (res) {                    
        //             addLog(options.url ,true, JSON.stringify(res) )

        //             if (res.data.status.code == 10020){
        //                 GlobalData.apiPreList.push(options)
        //                 _RequestLogin()
        //                 return
        //             }


        //             if (options.success != undefined)
        //                 options.success(res)
        //         },
        //         fail: function (res) {
                    
        //             addLog(options.url ,false, JSON.stringify(res) )
        //             if (options.fail != undefined)
        //                 options.fail(res)
        //             if (options['live'] > 0)
        //                 GlobalData.apiFailList.push(options) //将请求加入失败队列
        //         },
        //         complete: function (res) {
        //             if (options.complete != undefined)
        //                 options.complete(res)
        //         },
        //     })

        
        wx.cloud.callFunction({
            name: "api", 
            data:{
                url: addToken1(options.url),
                method: options.method || "GET",
                header: options.header || {'content-type': 'application/json'},
                data: data,
            },
        })
        .then (r =>{
                var res ={
                    data: r.result
                }
                
                addLog(options.url ,true, JSON.stringify(res) )

                if (res.data.status.code == 10020){
                    GlobalData.apiPreList.push(options)
                    _RequestLogin()
                    return
                }
                if (options.success != undefined)
                    options.success(res)

        }) 
        .catch(res=>{
                addLog(options.url ,false, JSON.stringify(res) )
                if (options.fail != undefined)
                    options.fail(res)
                if (options['live'] > 0)
                    GlobalData.apiFailList.push(options) //将请求加入失败队列
        })

    }



}