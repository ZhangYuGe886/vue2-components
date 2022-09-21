<template>
  <div>
    <div class="content">
      <div class="content-header">
        <i class="el-icon-circle-check icon-feedback"></i>
        <span> 导入已完成，</span>
        <span class="tip-success">{{ params.totality - this.page.total }}</span>
        <span> 个导入成功，</span>
        <span class="tip-error">{{ this.page.total }}</span>
        <span> 个导入失败！</span>
      </div>
      <div class="content-body" v-if="this.data.length > 0">
        <avue-crud ref="crud" class="custom-modal-crud" :option="option" :table-loading="loading" :data="data"
          :page.sync="page" @selection-change="selectionChange" @current-change="currentChange"
          @size-change="sizeChange" @search-change="searchChange" @search-reset="searchReset">
        </avue-crud>
      </div>
    </div>
    <div class="footer">
      <el-button :size="'small'" @click="closeStep5">关 闭</el-button>
      <el-button :size="'small'" v-if="this.page.total != 0" type="primary" @click="exportFailData">导出失败数据</el-button>
    </div>
  </div>
</template>

<script>
import { failImportList, exportFailData } from "@/api/downLoad/downLoad";
export default {
  props: {
    importTitle: {
      type: String,
      default: "",
    },
    importItem: {
      type: Object,
      default: () => { },
    },
    params: {
      type: Object,
      default: function () {
        return {
          diaLogTitle: "",
          totality: 0,
          doneSum: 0,
          progressNum: 0,
        };
      },
    },
    stratey: {
      type: Number,
    },
  },
  watch: {},
  data() {
    return {
      page: {
        pageSize: 10,
        currentPage: 1,
        total: 0,
      },
      query: {},
      loading: false,
      data: [],
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
        size: "small",
        index: true,
        indexWidth: 100,
        indexLabel: "序号",
        stripe: true,
        headerAlign: 'left',
        align: 'left',
        column: [
          {
            label: "错误行号",
            prop: "rowindex",
            minWidth: 120,
            overHidden: true,
          },
          {
            label: "失败原因",
            prop: "reason",
            minWidth: 120,
            overHidden: true,
          },
        ],
      },
    };
  },
  created() {
    console.log("created");
  },
  mounted() {
    this.$nextTick(() => this.getList(this.page));
  },
  methods: {
    closeStep5() {
      this.$emit("closeStep5");
    },
    exportFailData() {
      const id = this.importItem.progressId;
      const type = this.stratey;
      exportFailData(id, type).then((res) => {
        let blob = new Blob([res.data], {
          type:
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8",
        });
        let url = window.URL.createObjectURL(blob);
        let a = document.createElement("a");
        document.body.appendChild(a);
        a.href = url;
        a.download = `${this.importTitle}-失败数据`;
        a.click();
        window.URL.revokeObjectURL(url);
      });
    },
    getList(page) {
      this.loading = true;
      const { progressId } = this.importItem;
      failImportList(page.currentPage, page.pageSize, progressId, 0).then((res) => {
        if (res.data.success) {
          this.loading = false;
          const resData = res.data.data;
          this.page.total = resData.total;
          console.log("this.data", this.data);
          this.data = resData.records;
          this.$nextTick(() => {
            this.selectionClear();
            if (this.$refs.crud) this.$refs.crud.doLayout();
          });
        }
      });
    },
    selectionChange(list) {
      this.selectionList = list;
    },
    /**清除选中 */
    selectionClear() {
      this.selectionList = [];
      if (this.$refs.crud) this.$refs.crud.toggleSelection();
    },
    currentChange(currentPage) {
      this.page.currentPage = currentPage;
      this.getList(this.page)
    },
    sizeChange(pageSize) {
      this.page.pageSize = pageSize;
      this.getList(this.page)
    },
    searchChange(params, done) {
      this.onLoad(this.page, params);
      done();
    },
    searchReset() {
      this.query = {};
      this.onLoad(this.page);
    },
  },
};
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

  .el-table__cell {
    padding: 5px;
  }
}

.content {
  .content-header {
    display: flex;
    margin-bottom: 16px;
    align-items: center;

    i,
    span {
      display: inline-block;
    }

    .icon-feedback {
      font-size: 24px;
      color: #66cd7b;
    }

    .tip-success {
      color: #66cd7b;
      font-size: 18px;
      display: contents;
    }

    .tip-error {
      color: #e15a66;
      font-size: 18px;
      display: contents;
    }
  }

  .content-body {
    .a-click {
      text-decoration: underline;
    }
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
