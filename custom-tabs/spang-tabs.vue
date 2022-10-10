<template>
  <div class="spang-tabs-panel">
    <div class="tabs-panel-header">
      <span class="tab-operator-icon tab-icon__pre" :class="[prevIsDisabled?'is-disabled':'']" @click="scrollPrev">
        <i class="el-icon-arrow-left"></i>
      </span>
      <span class="tab-operator-icon tab-icon__next" :class="[!prevIsDisabled?'is-disabled':'']" @click="scrollNext">
        <i class="el-icon-arrow-right"></i>
      </span>
      <div class="tabs-wrap-scroll">
        <div class="tabs-nav" ref="tabsNav" :style="`transform: translateX(${tabContentScrollLeft}px);`">
          <div :style="activeBarStyle" class="tabs__active-bar"></div>
          <div class="tab-nav__item" :class="[item.name===currentTab? 'tab-item__active':'tab-item__default']"
            v-for="(item,i) in tabList" :key="'tabItem'+i" @click="clickTabItem($event,item)">
            {{item.label}}
          </div>
        </div>
      </div>
    </div>
    <transition name="fade" mode="out-in">
      <div class="tabs-panel-content">
        <slot></slot>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  props: {
    currentTab: String
  },
  data() {
    return {
      tabList: [],
      activeBarStyle: '',
      tabContentScrollLeft: 0,
      prevIsDisabled: true
    }
  },
  computed: {},
  created() {},
  mounted() {
    this.calcPaneInstances();
  },
  methods: {
    scrollPrev() {
      this.tabContentScrollLeft = 0
      this.prevIsDisabled = true
    },
    scrollNext() {
      this.prevIsDisabled = false
      const { scrollWidth, clientWidth } = this.$refs.tabsNav
      this.tabContentScrollLeft = -(scrollWidth - clientWidth)
    },
    clickTabItem(clickEvent, item) {
      this.currentTab = item.name
      const { offsetLeft, clientWidth } = clickEvent && clickEvent.target && clickEvent.target
      this.activeBarStyle = `transform: translateX(${offsetLeft}px);width:${clientWidth}px;`
    },
    calcPaneInstances() {
      if (this.$slots.default) {
        this.$slots.default.forEach((vnode, i) => {
          if (vnode && vnode.componentInstance) {
            const { label, name } = vnode.componentInstance
            if (label && name) {
              const item = { label: label, name: name }
              this.tabList.push(item)
            }
            setTimeout(() => {
              if (name === this.currentTab) {
                this.initBarStyle(i);
              }
            }, 0);
          }
        });
      }
    },
    initBarStyle(index) {
      const box = this.$refs.tabsNav
      if (box && box.childNodes && box.childNodes.length > 1) {
        /**第一个子元素为bar */
        const initTabNode = box.childNodes[index + 1]
        const { offsetLeft, clientWidth } = initTabNode
        this.activeBarStyle = `transform: translateX(${offsetLeft}px);width:${clientWidth}px;`
      }
    }
  },
}
</script>

<style lang="scss" scoped>
.spang-tabs-panel {
  width: 100%;
  height: auto;

  .tabs-panel-header {
    position: relative;
    padding: 0 20px;

    .tab-operator-icon {
      position: absolute;
      top: 0;
      z-index: 2;
      line-height: 40px;
      font-size: 12px;
      cursor: pointer;
    }

    .tab-icon__pre {
      left: 0;
    }

    .tab-icon__next {
      right: 0;
    }

    .is-disabled {
      cursor: not-allowed;
    }

    .tabs-wrap-scroll {
      width: 100%;
      overflow: hidden;
    }

    .tabs-nav {
      width: 100%;
      display: flex;
      white-space: nowrap;
      position: relative;
      transition: transform .3s;

      .tabs__active-bar {
        position: absolute;
        bottom: 0;
        height: 4px;
        background: #5e97f9;
        transition: transform .3s cubic-bezier(.645, .045, .355, 1);
      }

      .tab-nav__item {
        height: 40px;
        line-height: 40px;
        padding: 0 12px;
        font-size: 14px;
        font-weight: 400;
        cursor: pointer;
      }

      .tab-item__default {
        color: rgba(0, 0, 0, 0.65);
      }

      .tab-item__active {
        color: #4a87e0;
      }
    }
  }

  .tabs-panel-content {
    transition: transform .3s cubic-bezier(.645, .045, .355, 1);
  }

  .fade-out-in {
    transition: transform .3s cubic-bezier(.645, .045, .355, 1);
  }
}
</style>