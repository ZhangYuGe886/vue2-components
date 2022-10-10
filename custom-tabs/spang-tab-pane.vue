<template>
  <div class="tab-content" v-show="active">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "spangTabPane",
  props: {
    label: String,
    name: String
  },
  mounted() {
  },
  computed: {
    active() {
      return this.name === this.$parent.currentTab
    }
  }
}
</script>

<style lang="scss" scoped>
.tab-content {
  transition: transform .3s cubic-bezier(.645, .045, .355, 1);
}

.tab-content-default {
  display: none;
}

.tab-content-active {
  display: block;
}
</style>