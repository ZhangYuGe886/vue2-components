<template>
  <div>
    <div class="content">
      <div class="content-header" v-if="importStepParams.titleTip">
        {{  importStepParams.titleTip  }}
      </div>
      <div class="content-body">
        <avue-crud ref="crud" class="custom-modal-crud" :option="option" :data="importStepParams.tipDataList">
        </avue-crud>
      </div>
    </div>
    <div class="footer">
      <div v-if="importStepParams.step === 1">
        <el-button :size="'small'" @click="closeStep2">取 消</el-button>
        <el-button :size="'small'" type="primary" @click="continueStep">继 续</el-button>
      </div>
      <div v-else>
        <el-button :size="'small'" @click="jumpOver">跳过</el-button>
        <el-button :size="'small'" type="primary" @click="replace">替换系统数据</el-button>
      </div>
    </div>
  </div>
</template>

<script>
// import { mergeCrudOption } from "@/util/util";
export default {
  props: {
    importStepParams: {
      type: Object,
      default: function () {
        return {
          step: 1,
          titleTip: '',
          tipDataList: [],
          operatorColumn: [],
          jumpColumn: [],
          typeCode: null,
        }
      }
    },
  },
  watch: {
    importStepParams: {
      handler(val) {
        const { step, operatorColumn, jumpColumn, tipDataList, typeCode } = val
        this.option.column = step === 1 ? operatorColumn : jumpColumn
        if (tipDataList && tipDataList.length > 0) {
          if (typeCode && typeCode === 6) {
            tipDataList.forEach(item => {
              const value = item.chenmicalName ? item.chenmicalName : item.fieldName
              this.$set(item, 'filedChemicalName', value)
            })
          }
        }
      },
      deep: true,
    },
  },
  computed: {},
  data() {
    return {
      dataList: [],
      option: {
        addBtn: false,
        editBtn: false,
        addRowBtn: false,
        cellBtn: false,
        cancelBtn: false,
        delBtn: false,
        menuWidth: 250,
        border: true,
        maxHeight: 300,
        menu: false,
        refreshBtn: false,
        columnBtn: false,
        searchShow: false,
        size: 'small',
        index: true,
        indexLabel: '序号',
        indexWidth: 100,
        stripe: true,
        column: [],
        headerAlign:'left',
        align:'left',
      },
    }
  },
  created() { },
  mounted() { },
  methods: {
    closeStep2() {
      this.$emit('closeStep2')
    },
    /**继续 */
    continueStep() {
      this.$emit('continueStep')
    },
    /**替换数据 */
    replace() {
      this.$emit('replaceData')
    },
    /**跳过 */
    jumpOver() {
      this.$emit('jumpOver')
    },
  }
}
</script>

<style lang="scss" scoped>
::v-deep .custom-modal-crud {
  .avue-crud__menu {
    min-height: 0 !important;
  }

  .el-card {
    box-shadow: none;
    margin-bottom: 0;
  }

  .el-table th.el-table__cell.is-leaf {
    background-color: rgba(0, 0, 0, 0.04) !important;
  }
  .avue-crud__pagination {
    padding: 20px 0 20px 20px;
  }
  .el-table__cell {
    padding: 5px;
  }
}

.content {
  .content-header {
    display: flex;
    width: 100%;
    justify-content: space-between;
    margin-bottom: 16px;

    .content-header-item>.custom-tag {
      padding: 5px 20px;
      background: rgba(167, 209, 255, 0.33);
      border-radius: 4px;
      font-size: 14px;
      font-family: PingFangSC, PingFangSC-Semibold;
      font-weight: 600;
      text-align: center;
      color: #4886e0;
    }
  }

  .content-body {
    .a-click {
      text-decoration: underline;
    }
  }
}

::v-deep .custom-dialog {
  .el-dialog__body {
    padding: 20px 20px 0 20px;
  }
}

.custom-table-header {
  background-color: rgba(0, 0, 0, 0.04) !important;
}

.footer {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
}
</style>