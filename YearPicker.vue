<template>
  <!-- 组件相关属性和事件 -->
  <!--
    1. mode 用于设置日期组件显示的类型 这里设置为年份
    2. ref 设置组件引用
    3. fromat 设置年份显示格式
    4. placeholder 按情况设置
    5. class 组件的类名
    6. value 组件值 moment类型
    7. locale 组件中文包
    8. open 年份组件面板打开状态
    9. getCalendarContainer的值是一个函数 作用是决定组件面板挂载的位置 需要return一个el
    10 openChange事件是弹出日历和关闭日历的回调
    11 panelChange事件是日期面板变化时的回调
    12 change事件选择的年份变化的回调
   -->
  <a-date-picker
    mode="year"
    ref="dateYear"
    format="YYYY年"
    placeholder="请选择检索年份"
    class="date-year"
    :value="yearTime"
    :locale="locale"
    :open="panelOfShow"
    :getCalendarContainer="render"
    @openChange="panelOfShow = true"
    @panelChange="onPanelChange"
    @change="onChangeYear"
  />
</template>
<script>
/**
 * do 需要的工具部分
 * *  1.中文包
 * *  2.moment
 */
import locale from 'ant-design-vue/es/date-picker/locale/zh_CN' // 中文包
/**
 * do 这里清除decadeSelect是因为当鼠标放在年份范围上会出现一个"选择年代"的提示
 * do 实际并无作用 我没搞清楚怎么回事 既然没有作用就去掉这个提示 以免误导用户
 * do 没去掉的效果如下图所示
 */
locale.lang.decadeSelect = ''
import moment from 'moment' // 日期工具
export default {
  data() {
    return {
      yearTime: undefined, // * 组件值 moment类型
      lastPicker: '', // * 最后一次选择的年份
      panelOfShow: false, // * 控制日期面板是否打开
      locale, // * 中文包
      moment, // * moment日期工具
    }
  },
  watch: {
    /**
     * @function 监听面板打开状态
     * @param {boolean} newflag 最新变化的面板状态
     * @param {boolean} oldflag 变化之前的面板状态
     */
    panelOfShow(newflag, oldflag) {
      // do 监听面板状态是因为改造后点击面板以外的地方不会关闭年份面板 因此我在window上加了事件 如果点击的不是面板就关闭面板
      let that = this
      if (newflag) {
        window.onclick = (e) => {
          let targetPrevClass = e.target._prevClass
          let clickPanel = targetPrevClass && targetPrevClass.includes('ant-calendar')
          if (!clickPanel) that.panelOfShow = false
        }
      } else {
        window.onclick = null
      }
    },
  },
  methods: {
    /**
     * @function 日期面板发生改变
     * @param {object} value moment日期对象
     * @param {any} mode 暂时没发现什么用 官方文档上给了有mode参数
     */
    onPanelChange(value, mode) {
      let yearNumber = new Date(value._d).getFullYear() // * 年份
      // ? 只有当前选择的年份与上一次选择的年份不同才抛出事件 传递年份数据
      if (yearNumber !== this.lastPicker) {
        this.$emit('pickerYear', {
          yearNumber, // * 数值型年份
          value, // * moment年份
        })
        this.lastPicker = yearNumber
        this.yearTime = value
      }
      this.panelOfShow = false
    },
    /**
     * @function 日期值改变，这里用于抛出年份被清楚的事件
     */
    onChangeYear() {
      this.yearTime = undefined
      this.$emit('removeYear')
    },
    /**
     * @function 渲染面板的挂载位置，方便自定义样式
     */
    render() {
      return this.$refs.dateYear.$el
    },
  },
}
</script>
<style lang="less" scoped>
/deep/.date-year {
  width: 180px;
  /deep/ .ant-input {
    width: 180px;
  }
  /deep/ .ant-calendar-input-wrap {
    height: 50px;
  }
  /deep/ .ant-calendar-date-input-wrap {
    height: 37px;
    line-height: 37px;
  }
  /deep/.ant-calendar-picker-container {
    top: 34px !important;
  }
}
</style>