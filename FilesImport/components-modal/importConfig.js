const allProps = {
  rowIndex: { label: '行号', prop: 'rowIndex', minWidth: 120, overHidden: true },
  enterpriseName: { label: '企业名称', prop: 'enterpriseName', minWidth: 120, overHidden: true },
  reapeatRowIndex: { label: '重复行号', prop: 'rowIndex', minWidth: 120, overHidden: true },
  year: { label: '年份', prop: 'supplyYear', minWidth: 120, overHidden: true },
  consumptionYear: { label: '年份', prop: 'consumptionYear', minWidth: 120, overHidden: true },
  filedChemicalName: { label: '下游化工品/消费领域', prop: 'filedChemicalName', minWidth: 120, overHidden: true },
  chenmicalName: { label: '化工品名称', prop: 'chenmicalName', minWidth: 120, overHidden: true },
  parkName: { label: '园区名称', prop: 'parkName', minWidth: 120, overHidden: true },
  enterprisManageName: { label: '企业名称', prop: 'enterpriseName', minWidth: 120, overHidden: true },
};
/**化工品管理配置参数 */
const OPERATOR_COLUMN_CHEMICALMANAGE = [allProps['rowIndex'], allProps['chenmicalName']];
const IMPORT_JUMP_COLUMN_CHEMICALMANAGE = [allProps['reapeatRowIndex'], allProps['chenmicalName']];

const importChemicalManagement = {
  /**请求参数 */
  requestParams: {
    url: '/api/spang-chemical-manage/chemicalManagement/import',
    methods: 'post',
  },
  /**导入\下载的模块名称 */
  importTitle: '化工品',
  /**模块框标题*/
  dialogTitle: '导入化工品',
  /**唯一标识code */
  code: 1,
  stratey: 1,
  /**操作提醒弹框tip */
  operatorTip: '化工品信息，导入文件中以下化工品名称系统待审批，请勿重新提交！',
  /**操作提醒弹框列 */
  operatorColumn: OPERATOR_COLUMN_CHEMICALMANAGE,
  /**跳过或替换弹窗tip */
  jumpTip: '化工品信息，导入文件中以下化工品名称系统已存在！',
  /**跳过或替换的列 */
  jumpColumn: IMPORT_JUMP_COLUMN_CHEMICALMANAGE,
  /**填写说明 */
  fillExplainList: [
    '1、红色字段为必填字段，黑色字段为选填字段；',
    '2、所属行业：请到基础数据-化工品行业分布中先添加好，再到本Excel里填入;',
  ],
};
/**园区品管理配置参数 */
const OPERATOR_COLUMN_PARKMANAGE = [allProps['rowIndex'], allProps['parkName']];
const IMPORT_JUMP_COLUMN_PARKMANAGE = [allProps['reapeatRowIndex'], allProps['parkName']];

const importParkManagement = {
  /**请求参数 */
  requestParams: {
    url: '/api/spang-chemical-manage/park/import',
    methods: 'post',
  },
  /**导入\下载的模块名称 */
  importTitle: '园区',
  /**模块框标题*/
  dialogTitle: '导入园区',
  /**唯一标识code */
  code: 2,
  stratey: 2,
  /**操作提醒弹框tip */
  operatorTip: '园区信息，导入文件中以下园区名称系统待审批，请勿重新提交！',
  /**操作提醒弹框列 */
  operatorColumn: OPERATOR_COLUMN_PARKMANAGE,
  /**跳过或替换弹窗tip */
  jumpTip: '园区信息，导入文件中以下园区名称系统已存在！',
  /**跳过或替换的列 */
  jumpColumn: IMPORT_JUMP_COLUMN_PARKMANAGE,
  /**填写说明 */
  fillExplainList: ['1、红色字段为必填字段，黑色字段为选填字段；', '2、园区定位：请下拉选择;'],
};

/**企业管理配置参数 */
const OPERATOR_COLUMN_ENTERPRISMANAGE = [allProps['rowIndex'], allProps['enterprisManageName']];
const IMPORT_JUMP_COLUMN_ENTERPRISMANAGE = [allProps['reapeatRowIndex'], allProps['enterprisManageName']];

const importEnterprisManage = {
  /**请求参数 */
  requestParams: {
    url: '/api/spang-chemical-manage/enterprise/import',
    methods: 'post',
  },
  /**导入\下载的模块名称 */
  importTitle: '企业',
  /**模块框标题*/
  dialogTitle: '导入企业',
  /**唯一标识code */
  code: 3,
  stratey: 3,
  /**操作提醒弹框tip */
  operatorTip: '企业信息，导入文件中以下企业名称系统待审批，请勿重新提交！',
  /**操作提醒弹框列 */
  operatorColumn: OPERATOR_COLUMN_ENTERPRISMANAGE,
  /**跳过或替换弹窗tip */
  jumpTip: '企业信息，导入文件中以下企业名称系统已存在！',
  /**跳过或替换的列 */
  jumpColumn: IMPORT_JUMP_COLUMN_ENTERPRISMANAGE,
  /**填写说明 */
  fillExplainList: [
    '1、红色字段为必填字段，黑色字段为选填字段；',
    '2、所属行业：请到基础数据-化工品行业分布中先添加好，再到本Excel里填入；',
    '3、所属园区：请到基础数据-园区管理中先添加好，再到本Excel里填入。若填写所属园区，不填写省份、城市、区/县时系统将默认为所属园区的省市区数据；',
    '4、原材料：多原材料用英文的“,”隔开；',
    '5、产品：多产品用英文的“,”隔开；',
    '6、营收利润默认导入最新一年数据；',
  ],
};
/**生产企业配置参数 */
const OPERATOR_COLUMN_PRODENTERPRISE = [allProps['rowIndex'], allProps['enterpriseName']];
const IMPORT_JUMP_COLUMN_PRODENTERPRISE = [allProps['reapeatRowIndex'], allProps['enterpriseName']];

const importProdEnterprise = {
  /**请求参数 */
  requestParams: {
    url: '/api/spang-chemical-manage/spangEnterpriseData/import',
    methods: 'post',
  },
  /**导入\下载的模块名称 */
  importTitle: '生产企业',
  /**模块框标题*/
  dialogTitle: '导入生产企业',
  /**唯一标识code */
  code: 4,
  stratey: 6,
  /**操作提醒弹框tip */
  operatorTip: '生产企业信息，导入文件中以下企业名称系统待审批，请勿重新提交！',
  /**操作提醒弹框列 */
  operatorColumn: OPERATOR_COLUMN_PRODENTERPRISE,
  /**跳过或替换弹窗tip */
  jumpTip: '生产企业信息，导入文件中以下企业名称系统已存在！',
  /**跳过或替换的列 */
  jumpColumn: IMPORT_JUMP_COLUMN_PRODENTERPRISE,
  /**填写说明 */
  fillExplainList: [
    '1、红色字段为必填字段，黑色字段为选填字段；',
    '2、企业名称：请到基础数据-企业管理中先添加好，再到本Excel里填入；',
    '3、年份请填写数字，例如“2022”；',
  ],
};

/**供给需求配置参数 */

const OPERATOR_COLUMN_SUPPLY = [allProps['rowIndex'], allProps['year']];
const IMPORT_JUMP_COLUMN_SUPPLY = [allProps['reapeatRowIndex'], allProps['year']];

const importSupply = {
  /**请求参数 */
  requestParams: {
    // /spangSupplyDemand/import/{chainId}
    url: '/api/spang-chemical-manage/spangSupplyDemand/import',
    methods: 'post',
  },
  /**导入\下载的模块名称 */
  importTitle: '供给需求',
  /**模块框标题*/
  dialogTitle: '导入供给需求',
  /**唯一标识code */
  code: 5,
  stratey: 4,
  /**操作提醒弹框tip */
  operatorTip: '供给需求，导入文件中以下年份系统待审批，请勿重新提交！',
  /**操作提醒弹框列 */
  operatorColumn: OPERATOR_COLUMN_SUPPLY,
  /**跳过或替换弹窗tip */
  jumpTip: '供给需求，导入文件中以下年份系统已存在！',
  /**跳过或替换的列 */
  jumpColumn: IMPORT_JUMP_COLUMN_SUPPLY,
  /**填写说明 */
  fillExplainList: [
    '1、红色字段为必填字段，黑色字段为选填字段；',
    '2、年份请填写数字，例如“2022”；',
  ],
};

/**消费结构配置 */
const OPERATOR_COLUMN_PAYSTRUCTRE = [allProps['rowIndex'], allProps['consumptionYear'], allProps['filedChemicalName']];
const IMPORT_JUMP_COLUMN_PAYSTRUCTRE = [allProps['reapeatRowIndex'], allProps['consumptionYear'], allProps['filedChemicalName']];

const importPayStructure = {
  /**请求参数 */
  requestParams: {
    url: '/api/spang-chemical-manage/consumptionStructureController/import',
    methods: 'post',
  },
  /**导入\下载的模块名称 */
  importTitle: '消费结构',
  /**模块框标题*/
  dialogTitle: '导入消费结构',
  /**唯一标识code */
  code: 6,
  stratey: 5,
  /**操作提醒弹框tip */
  operatorTip: '消费结构，导入文件中以下年份中下游化工品/消费领域系统待审批，请勿重新提交！',
  /**操作提醒弹框列 */
  operatorColumn: OPERATOR_COLUMN_PAYSTRUCTRE,
  /**跳过或替换弹窗tip */
  jumpTip: '消费结构，导入文件中以下年份中下游化工品/消费领域已存在！',
  /**跳过或替换的列 */
  jumpColumn: IMPORT_JUMP_COLUMN_PAYSTRUCTRE,
  /**填写说明 */
  fillExplainList: [
    '1、红色字段为必填字段，黑色字段为选填字段；',
    '2、年份请填写数字，例如“2022”单位：吨/万吨；',
    '3、每行数据下游化工品、下游消费领域二选一填写；',
  ],
};

const IMPORT_CONFIG = new Map();
IMPORT_CONFIG.set(1, importChemicalManagement);
IMPORT_CONFIG.set(2, importParkManagement);
IMPORT_CONFIG.set(3, importEnterprisManage);
IMPORT_CONFIG.set(4, importProdEnterprise);
IMPORT_CONFIG.set(5, importSupply);
IMPORT_CONFIG.set(6, importPayStructure);
export default IMPORT_CONFIG;
