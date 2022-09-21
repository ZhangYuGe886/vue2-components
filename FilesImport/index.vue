<template>
  <div>
    <el-dialog :custom-class="'custom-dialog'" top="0" append-to-body :visible.sync="modalVisible" :modal="true"
      destroy-on-close="true" :title="dialogTitle" :close-on-click-modal="false" @close="close" :width="'650px'">
      <ImportStep1 :loading="loading" :fillExplainList="fillExplainList" :importTitle="importTitle"
        @submitImport="submitImport" v-if="step === 1">
      </ImportStep1>
      <ImportStep2 v-bind="$attrs" :importStepParams="tipParams" v-if="step === 2" @continueStep="continueStep"
        @closeStep2="clearImport">
      </ImportStep2>
      <ImportStep2 :importStepParams="tipParams" v-if="step === 3" @jumpOver="jumpOver" @replaceData="replaceData">
      </ImportStep2>
      <ImportStep4 v-if="step === 4" :importItem="importItem" :data="progressParams" @importSuccess="importSuccess">
      </ImportStep4>
      <ImportStep5 v-if="step === 5" :stratey="stratey" :importTitle="importTitle" :params="progressParams"
        :importItem="importItem" @closeStep5="clearImport">
      </ImportStep5>
    </el-dialog>
  </div>
</template>

<script>
import { importFile, insertExcel, progressEveryTime, clearImportData } from '@/api/downLoad/downLoad'
import ImportStep1 from './components-modal/ImportStep1.vue';
import ImportStep2 from './components-modal/ImportStep2.vue';
import ImportStep4 from './components-modal/ImportStep4.vue';
import ImportStep5 from "./components-modal/ImportStep5.vue";
import IMPORT_CONFIG from './components-modal/importConfig';
export default {
  components: { ImportStep2, ImportStep4, ImportStep1, ImportStep5 },
  props: {
    modalVisible: {
      type: Boolean,
      default: false,
    },
    importCode: {
      type: Number,
      default: null,
    },
    perfTitle: {
      type: String,
    },
    requestOtherParams: {
      type: Object,
      default: () => { }
    }
  },
  watch: {
    importCode: {
      handler(val) {
        if (val) {
          const configParams = IMPORT_CONFIG.get(val)
          if (configParams) {
            const { requestParams, dialogTitle, importTitle, stratey, fillExplainList, operatorTip, jumpTip, operatorColumn, jumpColumn } = configParams
            this.dialogTitle = dialogTitle
            this.importTitle = importTitle
            this.stratey = stratey
            this.fillExplainList = fillExplainList
            this.operatorTip = this.perfTitle ? `正在导入${this.perfTitle}${operatorTip}` : operatorTip
            this.jumpTip = this.perfTitle ? `正在导入${this.perfTitle}${jumpTip}` : jumpTip
            this.operatorColumn = operatorColumn
            this.jumpColumn = jumpColumn
            this.requestImportUrl = requestParams.url
            this.requestMethods = requestParams.methods
          }
        }
      },
    }
  },
  data() {
    return {
      loading: false,
      /**请求地址 */
      requestImportUrl: '',
      /**请求方法 */
      requestMethods: 'post',
      /**模块框标题*/
      dialogTitle: '',
      /**导入\下载的模块名称 */
      importTitle: '',
      stratey: null,
      /**填写说明 */
      fillExplainList: [],
      /**操作提醒弹框tip */
      operatorTip: '',
      /**操作提醒弹框列 */
      operatorColumn: [],
      /**跳过或替换弹窗tip */
      jumpTip: '',
      /**跳过或替换的列 */
      jumpColumn: [],
      step: 1,
      /**文件格式限制 */
      fileFormat: ".xls, .xlsx",
      importItem: {},
      /**操作提醒/替换跳过的参数 */
      tipParams: {
        step: 1,
        titleTip: '',
        tipDataList: [],
        typeCode: null
      },
      /**导入进度模态框 */
      progressParams: {
        totality: 0,
        doneSum: 0,
        progressNum: 0,
        startImport: false
      },
      currentProgressId: '',
      failList: [],
      approvelList: [],
      timer: null,
      afterImportstatus: ''
    };
  },
  methods: {
    clearImport() {
      this.modalVisible = false
      this.clearImportData()
    },
    modalVisibleModal() {
      this.close()
    },
    clearImportData() {
      if (this.importItem && this.importItem.progressId) {
        clearImportData(this.importItem.progressId).then(res => {
          if (res.data.success) {
            console.log();
          }
        })
      }
    },
    close() {
      clearTimeout(this.timer)
      this.clearImport()
      this.$emit('closeModal', this.afterImportstatus)
      this.$nextTick(() => this.resetData())
    },
    resetData() {
      this.step = 1
      this.failList = []
    },
    /**数据导入成功后 */
    importSuccess() {
      setTimeout(() => {
        this.step = 5
        this.dialogTitle = '导入结果'
        this.progressParams.startImport = false
      }, 500);

    },
    handleClose() {
      this.$emit("update:modalVisible", false);
    },
    /**替换数据 */
    replaceData() {
      this.step = 4
      this.afterImportstatus = 'replace'
      this.progressInsert(this.currentProgressId, 1, this.stratey)
    },
    /**跳过 */
    jumpOver() {
      console.log('jumpOverjumpOverjumpOver');
      this.step = 4
      this.progressInsert(this.currentProgressId, 0, this.stratey)
    },
    /**继续 */
    continueStep() {
      if (this.failList.length) {
        this.dialogTitle = '替换或跳过'
        this.tipParams = {
          step: 2,
          titleTip: this.jumpTip,
          tipDataList: this.failList,
          jumpColumn: this.jumpColumn,
          typeCode: this.importCode
        }
        this.step = 3
      } else {
        this.step = 4
        this.progressInsert(this.currentProgressId, 0, this.stratey)
      }
    },
    /**进度导入数据 */
    async progressInsert(progressId, isCover, strategy) {
      this.progressParams.totality = 0
      this.progressParams.progressNum = 0
      try {
        const res = await insertExcel(progressId, isCover, strategy)
        if (!res.data) {
          this.$message.error('导入失败！');
        }
        if (res.data.success) {
          const resData = res.data
          const { totality, doneSum } = resData.data
          this.progressParams.totality = totality
          this.progressParams.doneSum = doneSum
          this.progressParams.startImport = true
          if (this.progressParams.progressNum != this.progressParams.totality) {
            this.getProgressEveryTime(progressId)
          }
        }
      } catch (error) {
        this.$message.error(error || '导入失败！');
      }
    },
    /**导入数据不等于全部数据&&上次导入接口成功的时候继续调用导入接口 */
    getProgressEveryTime(progressId) {
      progressEveryTime(progressId).then(progressRes => {
        if (progressRes.data.success) {
          const progressResData = progressRes.data
          this.progressParams.progressNum = progressResData.data
          if (this.progressParams.progressNum != this.progressParams.totality) {
            this.timer = setTimeout(() => {
              this.getProgressEveryTime(progressId)
            }, 2000);
          } else {
            clearTimeout(this.timer)
          }
        }
      })
    },
    submitImport(file) {
      let formData = new FormData();
      if (file) {
        formData.append("file", file);
        if ([4, 5, 6].includes(this.stratey) && this.requestOtherParams && this.requestOtherParams.chainId) {
          formData.append("chainId", this.requestOtherParams.chainId);
        }
        this.asyncImport(formData)
      } else {
        this.$message.warning('请上传文件！');
      }
    },
    async asyncImport(formData) {
      /**后端返回报错信息 */
      try {
        this.loading = true
        const res = await importFile(this.requestImportUrl, formData, this.requestMethods, {
          headers: { 'Content-Type': 'multipart/form-data' }
        })
        if (!res) {
          this.$message.error('导入失败！');
          return
        }
        if (res.data.success) {
          this.loading = false
          const resData = res.data;
          this.importItem = res.data.data
          const { progressId = '', failList = [], approvalList = [] } = resData.data;
          this.currentProgressId = progressId
          if (failList && failList.length > 0) this.failList = failList
          if (approvalList && approvalList.length > 0) {
            this.dialogTitle = '操作提醒'
            this.tipParams = {
              step: 1,
              titleTip: this.operatorTip,
              tipDataList: approvalList,
              operatorColumn: this.operatorColumn,
              typeCode: this.importCode
            }
            this.step = 2
          } else if (failList && failList.length > 0) {
            this.dialogTitle = '替换或跳过'
            this.tipParams = {
              step: 2,
              titleTip: this.jumpTip,
              tipDataList: failList,
              jumpColumn: this.jumpColumn,
              typeCode: this.importCode
            }
            this.step = 3
          } else {
            setTimeout(() => {
              this.step = 4
              this.progressInsert(this.currentProgressId, 0, this.stratey)
            }, 500);
          }
        } else {
          this.loading = false
          if (res.data.msg) return
          this.$message.error('导入失败！');
        }
      } catch (error) {
        this.loading = false
        if (error) return
        this.$message.error('导入失败！');
      }
    }
  },
}
</script>

<style lang="scss" scoped>
::v-deep .custom-dialog {
  // position: absolute;
  // left: 50%;
  // top: 50%;
  // transform: translate(-50%, -50%);

  .el-dialog__body {
    padding: 15px 20px 20px 20px !important;
  }
}

.el-dialog__wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
}

.content {
  .content-item {
    .content-item__header {
      display: flex;
      align-items: center;
      justify-content: left;
      border-bottom: 1px solid rgba(0, 0, 0, 0.08);
      padding-bottom: 16px;

      .line {
        width: 4px;
        height: 14px;
        background: #5682dc;
        display: inline-block;
      }

      .text {
        margin-left: 8px;
        font-size: 16px;
        font-family: PingFangSC, PingFangSC-Semibold;
        font-weight: 600;
        text-align: left;
        color: rgba(0, 0, 0, 0.85);
        opacity: 0.85;
      }
    }

    .content-item__body {
      padding: 16px 0;
    }

    .content-item__text {
      font-size: 14px;
      font-family: PingFangSC, PingFangSC-Regular;
      font-weight: 400;
      text-align: left;
      color: rgba(0, 0, 0, 0.85);

      div {
        margin-bottom: 16px;

        &:last-child {
          margin-bottom: 0;
        }
      }
    }
  }

}

::v-deep .custom-step {
  .el-step__main {
    display: flex;

    .el-step__description {
      margin-left: 30px;
    }
  }
}

.upload-demo {
  display: flex;
}
</style>
