
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        article: {
            type: Object,
            value: {
                // title: "123",
                // summary: "123",
                // source: "123",
                // issue_time: "123",
                // click_rate: "123",
                // content:"defiodsfio",
            },
            observer: '_changeContent',
        },
    },

  /**
   * 组件的初始数据
   */
    data: { 
    },

  /**
   * 组件的方法列表
   */
  methods: {
      click(e) {     
          this.triggerEvent('click', e.currentTarget.dataset.index);
      },
  }
})
