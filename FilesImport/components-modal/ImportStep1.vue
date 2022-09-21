<template>
  <div v-loading="loading" element-loading-text="文件导入中" element-loading-spinner="el-icon-loading"
    customClass="'custom-loading'">
    <div class="content">
      <div class="content-item">
        <div class="content-item__header">
          <span class="line"></span>
          <span class="text">操作流程</span>
        </div>
        <div class="content-item__body">
          <div style="height: 200px;">
            <el-steps direction="vertical" :active="4" class="custom-step">
              <el-step title="下载导入模板">
                <div class="description-content" slot="description">
                  <el-button :size="'small'" type="primary" @click="downTemplate">下载模板</el-button>
                </div>
              </el-step>
              <el-step title="上传本地文件">
                <div class="description-content" slot="description">
                  <el-upload class="upload-demo" :accept="fileFormat" :on-preview="handlePreview"
                    :show-file-list="false" :before-upload="beforeUpload" :on-remove="handleRemove"
                    :on-success="success" :before-remove="beforeRemove" :limit="1" :file-list="fileList">
                    <el-button v-if="!showUpLoadText" :size="'small'" type="primary" @click="upLoadFiles">上传文件
                    </el-button>
                    <div slot="tip" class="el-upload__tip" v-else>
                      <div class="upload-file-content">
                        <span>{{  upLoadFileName  }}</span>
                        <i class="el-icon-delete" @click.stop="delUpLoadFile"></i>
                      </div>
                    </div>

                  </el-upload>
                </div>
              </el-step>
              <el-step title="提交导入文件">
                <div class="description-content" slot="description">
                  <el-button :size="'small'" type="primary" @click="submitImport">提交导入</el-button>
                </div>
              </el-step>
              <el-step title="接收导入结果">
              </el-step>
            </el-steps>
          </div>
        </div>
      </div>
      <div class="content-item">
        <div class="content-item__header">
          <span class="line"></span>
          <span class="text">填写说明</span>
        </div>
        <div class="content-item__body content-item__text">
          <div v-for="(item, i) in fillExplainList" :key="'explain' + i">
            {{  item  }}
          </div>
        </div>
      </div>
      <div class="content-item">
        <div class="content-item__header">
          <span class="line"></span>
          <span class="text">文件要求</span>
        </div>
        <div class="content-item__body content-item__text">
          <div>1、导入文件格式：xls、xlsx。</div>
          <div>2、导入文件的第一个sheet页的表格列数、字段名称、字段顺序必须与导入模板一致。</div>
          <div>3、每次导入标题限制<span class="fill-text-tip">3000条</span>数据。如提交的标题超过3000条，系统仅导入前3000条标题。</div>
          <div>4、上传文件最大为<span class="fill-text-tip">2M</span>。</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { upLoadFile } from '@/api/downLoad/downLoad'
export default {
  props: {
    importTitle: {
      type: String,
      default: '',
    },
    fillExplainList: {
      type: Array,
      default: () => [],
    },
    loading: {
      type: Boolean
    }
  },
  data() {
    return {
      /**文件格式限制 */
      fileFormat: ".xls, .xlsx",
      showUpLoadText: false,
      originalName: '',
      currentFile: null
    };
  },
  methods: {
    beforeUpload(file) {
      const isXlsx = file.name.includes('xls') || file.name.includes('xlsx')
      const isSize2M = file.size / 1024 / 1024 < 2;
      if (!isSize2M) {
        this.$message.warning('导入文件大小不能超过2M');
        return false;
      }
      if (!isXlsx) {
        this.$message.warning('导入文件格式为xls或者xlsx');
        return false;
      }
      this.currentFile = file
      let formData = new FormData();
      formData.append("file", file);
      const url = '/api/spang-system/oss/endpoint/put-file'
      upLoadFile(url, formData, 'post', {
        headers: { 'Content-Type': 'multipart/form-data' }
      }).then(res => {
        if (res.data.success) {
          this.$message.success('导入成功！');
          this.upLoadFileName = file.name
          this.showUpLoadText = true;
        } else {
          this.$message.error('导入失败！');
        }
      }).catch(() => {
        this.$message.error('导入失败！');
      })
      return false
    },
    delUpLoadFile() {
      this.showUpLoadText = false;
      this.currentFile = null
    },
    downTemplate() {
      window.open(`/chemicals/download/导入${this.importTitle}.xlsx`);
    },
    upLoadFiles() {
      if (this.showUpLoadText) return
    },
    submitImport() {
      this.$emit('submitImport', this.currentFile)
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
      this.showUpLoadText = false;
    },
    /**点击文件列表中已上传的文件时的钩子 */
    handlePreview(file) {
      console.log(file);
    },
    beforeRemove(file) {
      if (!this.showUpLoadText) return
      return this.$spangMsgBox({
        title: "删除",
        subTitle: `确定移除 ${file.name}？`,
        customClass: "spang-message-box--modal",
        type: "error",
      }).then(() => {
      }).catch(() => { });
    },
  },
}
</script>

<style lang="scss" scoped>
::v-deep .custom-dialog {
  .el-dialog__body {
    padding: 20px !important;
  }
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
      padding: 16px;

      .fill-text-tip {
        color: #F89928;
        font-size: 16px;
        font-weight: 500;
      }
    }

    .content-item__text {
      font-size: 14px;
      font-family: PingFangSC, PingFangSC-Regular;
      font-weight: 400;
      text-align: left;
      color: rgba(0, 0, 0, 0.85);

      div {
        margin-bottom: 4px;

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
      margin-left: 45px !important;
    }
  }

  .el-step__title {
    color: #000;
    font-size: 14px;
    opacity: 0.7;
    white-space: nowrap;
  }
}

::v-deep .upload-demo {
  display: flex;

  .el-upload-list__item-name {
    color: #1890ff;
  }

  .upload-file-content {
    color: #1890ff;

    span {
      cursor: default;
    }

    i {
      margin-left: 10px;
      margin-top: 2px;
      font-size: 14px;
      cursor: pointer;
    }
  }

}

.description-content__result {
  font-size: 14px;
  font-family: PingFangSC, PingFangSC-Regular;
  font-weight: 400;
  text-align: left;
  color: rgba(0, 0, 0, 0.85);
  margin-top: 6px;
}
</style>