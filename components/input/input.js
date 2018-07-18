
Component({
  /**
   * 组件的属性列表
   */
    properties: {
        mode: {
            type: String,
            value: "normal",
            observer: '_changeMode',
        },
        name: {
            type: String,
            value: "名称",
        },
        placeholder: {
            type: String,
            value: "请输入",
        },
        value: {
            type: String,
            value: "",
        },
        input_type: { 
            type: String,
            value: "text",
        },
        index: {
            type: Number,
            value: 0,
        },
        array:{
            type:Array,
            value:[],
        },
  },

  /**
   * 组件的初始数据
   */
    data: {
        MODE_NORMAL: "normal",
        MODE_CHECK:"check",
        MODE_TEXTAREA: "textarea",
        MODE_SELECT:"select",

        startTime:false,
        inputValue:"",
    },

  /**
   * 组件的方法列表
   */
    methods: {
        _changeMode(_new,_old){
            console.log( _new,_old)
            if( _new == "")
                this.setData({ mode:"normal" })
        },

        //   click(e) {     
        //       this.triggerEvent('click', e.currentTarget.dataset.index);
        //   },
        input(e) {
            // console.log(e)
            this.setData({
                inputValue: e.detail.value
            })
            this.triggerEvent('input', e.detail.value);
        },        
        change(e){
            console.log(e)
            this.setData({
                index: e.detail.value
            })
            this.triggerEvent('change', e.detail.value);
        },

        //60 s 下发短息
        check(e) {
            this.triggerEvent('check');
            return

            //号码为null，返回
            if (this.checkNumber() == false)
                return

            //第一次获取
            var startTime = this.data.startTime
            if (startTime == false) {
                this.resetTime()
                return
            }
            var nowTime = (new Date()).valueOf()
            var duration = parseInt((nowTime - startTime)/1000)
            console.log(duration)

            //60s后重新获取
            if (duration > 60) {
                this.resetTime()
                return
            }else
                wx.showModal({
                    title: '短信已下发',
                    content: '若未收到短信，请' + (60 - duration) + "秒后重新获取",
                })
        },    
        resetTime(){
            wx.showToast({
                title: '短信发送成功',
            })
            this.setData({ startTime: (new Date()).valueOf() })
            this.triggerEvent('check');
        },
        // checkNumber(){
        //     var inputValue = this.data.inputValue 
        //     if (inputValue == "" || inputValue.length != 11){
        //         wx.showModal({
        //             title: '请输入验证码',
        //         })
        //         return false
        //     }
        //     return true
        // },
    }
})
