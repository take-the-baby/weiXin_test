// components/tabs/tabs.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    tabsData:{
      type: Array,
      value: []
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
    tabsItemClick(e) {
      const {index} = e.currentTarget.dataset;
      // 向父组件传递数据
      this.triggerEvent('tabsClick',index)
    }
  }
})
