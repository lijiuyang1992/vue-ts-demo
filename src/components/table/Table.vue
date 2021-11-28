<!--
 * @Author: 九阳
 * @Date: 2021-11-21 10:14:27
 * @LastEditors: 九阳
 * @LastEditTime: 2021-11-26 15:13:56
-->
<template>
  <a-page-header class="ant-page-header" :title="tableState.title">
    <template #extra>
      <slot name="headerButton"></slot>
      <a-button key="1" type="primary" @click="queryHeader">查询</a-button>
    </template>
    <VueHeader :field="tableState.header" ref="headerFormRef"></VueHeader>
  </a-page-header>
  <a-table
    sticky
    :data-source="data"
    :columns="tableState.columns"
    :scroll="{ x: 1500 }"
    :pagination="false"
    :row-selection="rowSelection"
  >
    <!-- <template v-for="(column, index) in tableColumns" :key="index">
      <template v-if="column['key'] === 'operation'">
        <a-table-column
          :key="column['key']"
          :title="column['title']"
          :fixed="column['fixed']"
        >
        
        </a-table-column>
      </template>
      <template v-else>
        <a-table-column
          :key="column['dataIndex']"
          :title="column['title']"
          :data-index="column['dataIndex']"
        />
      </template>
    </template> -->
    <template v-if="tableState.rowExpanded" #expandedRowRender="{ record }">
      <slot :data="record" name="rowTable"></slot>
    </template>
    <template
      v-for="column in tableState.columns"
      #[column.dataIndex]="{ text }"
      :key="column.dataIndex"
    >
      <template v-if="isValue(column['vsCode'])">
        <VueSpan :dataVule="text" :column="column"></VueSpan>
      </template>
    </template>

    <template #operation="{ record }">
      <slot :data="record" name="tableButton"></slot>
    </template>
  </a-table>
  <a-pagination
    style="margin-top: 24px; text-align: center"
    v-model:current="current"
    :page-size-options="pageSizeOptions"
    :total="total"
    show-size-changer
    :page-size="pageSize"
    @showSizeChange="onShowSizeChange"
    @change="changeSize"
  >
    <template #buildOptionText="props">
      <span v-if="props.value !== '50'">{{ props.value }}条/页</span>
      <span v-else>全部</span>
    </template>
  </a-pagination>
</template>
<script lang="ts">
import { defineComponent, ref, PropType, reactive, toRefs } from "vue";
import VueSpan from "./TableSpan.vue";
import VueHeader from "./TableHeader.vue";
import { ColumnProps } from "ant-design-vue/es/table/interface";
import { TableType } from "@/type/tableType";
type Key = ColumnProps["key"];

export default defineComponent({
  name: "vue-table",
  components: {
    VueSpan,
    VueHeader,
  },
  props: {
    tableType: {
      type: Object as PropType<TableType>,
      required: true,
    },
    tableData: {
      type: Array,
      default: () => [],
    },
  },
  setup(props) {
    const tableState = ref(props.tableType);
    const data = ref(props.tableData);
    // 分页
    const pageSizeOptions = ref<string[]>(["10", "20", "30", "40", "50"]);
    const pageState = reactive({
      current: ref(1),
      pageSize: ref(10),
      total: ref(20),
    });
    // 页数改变
    const onShowSizeChange = (current: number, pageSize: number) => {
      console.log(pageSize);
      pageState.pageSize = pageSize;
    };
    // 页码改变
    const changeSize = (page: number, pageSize: number) => {
      console.log(page);
      console.log(pageSize);
    };
    const isValue = (value: any) => {
      if (value === undefined || value === null || value === "") {
        return false;
      }
      return value;
    };
    const selection = tableState.value.rowSelection;
    let rowSelection = null;
    if (selection) {
      // 列表单选
      rowSelection = {
        onChange: (selectedRowKeys: (string | number)[], selectedRows: []) => {
          console.log(
            `selectedRowKeys: ${selectedRowKeys}`,
            "selectedRows: ",
            selectedRows
          );
        },
        onSelect: (record: any, selected: boolean, selectedRows: []) => {
          console.log(record, selected, selectedRows);
        },
        onSelectAll: (selected: boolean, selectedRows: [], changeRows: []) => {
          console.log(selected, selectedRows, changeRows);
        },
      };
    }
    const headerFormRef = ref();
    const queryHeader = () => {
      console.log("测试查询");
      console.log(headerFormRef.value.formObject);
    };

    return {
      isValue,
      pageSizeOptions,
      ...toRefs(pageState),
      changeSize,
      onShowSizeChange,
      data,
      rowSelection,
      tableState,
      headerFormRef,
      queryHeader,
    };
  },
});
</script>
<style lang="scss" scoped>
#components-table-demo-summary tfoot th,
#components-table-demo-summary tfoot td {
  background: #fafafa;
}
[data-theme="dark"] #components-table-demo-summary tfoot th,
[data-theme="dark"] #components-table-demo-summary tfoot td {
  background: #1d1d1d;
}

.ant-page-header {
  padding: 0px;
  // padding-bottom: 16px;
}
</style>
