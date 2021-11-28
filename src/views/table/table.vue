<!--
 * @Author: 九阳
 * @Date: 2021-11-21 10:14:27
 * @LastEditors: 九阳
 * @LastEditTime: 2021-11-25 17:09:43
-->
<template>
  <a-table
    sticky
    :columns="columns"
    :data-source="tableData"
    :scroll="{ x: 1500 }"
  >
    <!-- <template #operation="{ column, data }">
      <template v-if="column.key === 'operation'">
        <span
          v-for="(button, index) in showButton(column, data, '')"
          :key="index"
        >
          <template v-if="isValue(button['isPop'])">
            <a-popconfirm
              :title="button['title']"
              ok-text="确定"
              cancel-text="取消"
              @confirm="actionClick(button['event'], data, '')"
            >
              <span>{{ button["name"] }}</span>
            </a-popconfirm>
          </template>
          <template v-else>
            <span @click="actionClick(button['event'], data, '')">{{
              button["name"]
            }}</span>
          </template>
          <a-divider type="vertical" />
        </span>
      </template>
    </template> -->
  </a-table>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import tableColumns from "./tableData";
// import { createVNode } from "vue";
export default defineComponent({
  setup() {
    const columns = ref(tableColumns);
    const tableData = [
      {
        name: "测试",
        name2: "测试02",
        name3: "测试03",
        name4: "测试04",
        name5: "测试05",
      },
      {
        name: "测试06",
        name2: "测试07",
        name3: "测试08",
        name4: "测试09",
        name5: "测试10",
      },
      {
        name: "测试11",
        name2: "测试12",
        name3: "测试13",
        name4: "测试14",
        name5: "测试15",
      },
    ];
    const butList = [
      {
        name: "编辑",
        icon: "",
        pms: "",
        isPop: false, // 是否需要气泡确认框
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        event: (row: any, index: string) => {},
        // 按钮是否显示
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        showButton: (row: any, index: string) => {},
      },
      {
        name: "删除",
        icon: "",
        pms: "",
        isPop: true, // 是否需要气泡确认框
        title: "确定要删除这条数据?",
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        event: (row: any, index: string) => {
          console.log(row);
        },
        // 按钮是否显示
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        showButton: (row: any, index: string) => {},
      },
    ];
    const isValue = (value: boolean) => {
      if (value === undefined) {
        return false;
      }
      return value;
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    /**
     * 按钮事件
     */
    const actionClick = (actions: any, row: any, index: string) => {
      actions(row, index);
    };
    /**
     * 按钮显示控制
     */
    const showButton = (column: any, row: any, index: any) => {
      const buttonList = [];
      for (const button of column["button"]) {
        buttonList.push(button);
        console.log("******************");
        console.log(row);
        // if (getShowButton(button, row, index)) {
        //   // 按钮权限是否分配
        //   buttonList.push(button);
        //   // if (this.permission.can(key["pms"])) {

        //   // }
        // }
      }
      console.log(buttonList);
      return buttonList;
    };
    /**
     * 状态控制按钮展示
     */
    const getShowButton = (key: any, row: any, index: string) => {
      if (
        key["showButton"] !== undefined &&
        typeof key["showButton"] === "function"
      ) {
        return key["showButton"](row, index);
      }
      return true;
    };
    return {
      tableData,
      butList,
      columns,
      isValue,
      actionClick,
      showButton,
    };
  },
});
</script>
<style scoped>
#components-table-demo-summary tfoot th,
#components-table-demo-summary tfoot td {
  background: #fafafa;
}
[data-theme="dark"] #components-table-demo-summary tfoot th,
[data-theme="dark"] #components-table-demo-summary tfoot td {
  background: #1d1d1d;
}
</style>
