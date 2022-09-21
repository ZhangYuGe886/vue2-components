<template>
  <div>
    <div class="content">
      <div class="content-header">导入进度（第{{ data.progressNum }}个/共{{ data.totality }}个）</div>
      <el-progress :text-inside="true" :stroke-width="24" status="success" :percentage="percentage"></el-progress>
    </div>
  </div>
</template>

<script>


export default {
  props: {
    data: {
      type: Object,
      default: function () {
        return {
          diaLogTitle: "测试进度",
          totality: 0,
          doneSum: 0,
          progressNum: 0
        };
      }
    },
    modalVisible: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    data: {
      handler(val) {
        const { totality, progressNum, startImport } = val;
        this.percentage = Number.isNaN(progressNum * 100 / totality) ? 0 : progressNum * 100 / totality;
        if (startImport && progressNum == totality) {
          this.$emit('importSuccess')
        }
      },
      deep: true
    }
  },
  computed: {},
  data() {
    return {
      /**进度 */
      percentage: 0,
      /**最终导入结果 */
      importLastModal: false
    };
  },
  created() { },
  mounted() { },
  methods: {
    clearImportData() {
      this.importLastModal = false
      this.modalVisible = false
    },
    close() {
      this.$emit("closeModal");
      this.$nextTick(() => {
        this.resetData();
      });
    },
    resetData() {
      this.data = {
        diaLogTitle: "测试进度",
        totality: 0,
        doneSum: 0,
        progressNum: 0
      };
    },
    /**继续 */
    continueStep() { },
    /**替换数据 */
    replace() { },
  },
}
</script>

<style lang="scss" scoped>
.content {
  padding: 20px;

  .content-header {
    margin-bottom: 20px;
  }
}
</style>