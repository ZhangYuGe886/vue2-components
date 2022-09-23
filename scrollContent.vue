<template>
  <div class="container-left">
    <div class="scroll" v-if="dataList.length > 0">
      <div class="list" ref="scrollContainer" @mouseenter.self="mouseenterBox" @mouseleave.self="mouseoutBox">
        <div class="item" v-for="(item, i) in dataList" :key="i" @click.stop="itemClick(i, item)">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  watch: {
    scrollByclick: {
      handler (val) {
        if (val) {
          setTimeout(() => {
            this.scrollByclick = false
            // 2分钟后鼠标点击状态取消，数据重新滚动。scrollBymouse默认切换成鼠标移入状态
            if (this.scrollBymouse === 'hasClick') {
              this.scrollBymouse = 'mouseEnter'
              this.startScroll()
            }
          }, 120000)
        }
      }
    }
  },
  data () {
    return {
      dataList: [],
      timer: null,
      scrollByclick: false, // 通过点击控制滚动
      scrollBymouse: 'mouseOut' // 通过鼠标移入移出控制滚动,三个状态：mouseEnter,mouseOut,hasClick
    }
  },
  methods: {
    mounted () {
      this.startScroll()
    },
    destroyed () {
      clearTimeout(this.timer)
    },
    startScroll () {
      // 清除定时器
      clearTimeout(this.timer)
      // 定时器触发周期
      this.timer = setInterval(this.scroll, 20)
    },
    scroll () {
      if (this.$refs.scrollContainer) {
        const box = this.$refs.scrollContainer
        // 组件进行滚动
        box.scrollTop += 1
        // 判断滚动条是否滚动到底部
        if (box.scrollTop == box.scrollHeight - box.clientHeight) {
          // 获取组件第一个节点
          const firstNode = box.childNodes[0]
          // 删除节点
          box.removeChild(firstNode)
          // 将该节点拼接到组件最后
          box.append(firstNode)
        }
      }
    },
    itemClick (index, item) {
      this.scrollByclick = true
      this.scrollBymouse = 'hasClick'
      clearTimeout(this.timer)
    },
    // 鼠标移入盒子
    mouseenterBox () {
      if (this.scrollBymouse === 'hasClick') {
        return
      }
      this.scrollBymouse = 'mouseEnter'
      clearTimeout(this.timer)
    },
    // 鼠标移出盒子
    mouseoutBox () {
      if (this.scrollBymouse === 'hasClick') {
        return
      }
      this.startScroll()
    }
  }
}
</script>

<style>

</style>
