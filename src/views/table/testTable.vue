<!--
 * @Author: 九阳
 * @Date: 2021-11-23 09:01:59
 * @LastEditors: 九阳
 * @LastEditTime: 2021-11-27 10:58:52
-->
<template>
  <vue-table :tableType="columns" :tableData="tableData">
    <!-- 头部按钮 -->
    <template v-slot:headerButton>
      <a-button type="primary" @click="addData">抽屉</a-button>
      <a-button type="primary" @click="addModal">对话框</a-button>
    </template>
    <!-- 列表扩展内容 -->
    <template v-slot:rowTable="slotProps">
      {{ slotProps.data.name }}
    </template>
    <!-- 列表按钮 -->
    <template v-slot:tableButton="slotProps">
      <span>
        <a @click="editRow(slotProps.data)"> 编辑 </a>
      </span>
      <a-divider type="vertical" />
      <span>
        <a-popconfirm
          title="确定要删除这条数据?"
          ok-text="确定"
          cancel-text="取消"
          @confirm="deleteRow(slotProps.data)"
        >
          <a>删除</a>
        </a-popconfirm>
      </span>
    </template>
  </vue-table>
  <vue-drawer
    ref="drawerRef"
    v-model:isVisible="isVisible"
    :modelTitle="modelTitle"
  >
    <template v-slot:drawerBody>
      <vue-form
        ref="formRef"
        v-model:formField="formField"
        v-model:formData="formData"
      ></vue-form>
    </template>
    <template v-slot:drawerFooter>
      <a-button type="primary" @click.prevent="onSubmit">保存</a-button>
      <a-button style="margin-left: 10px" @click="resetFields">取消</a-button>
    </template>
  </vue-drawer>

  <vue-modal
    ref="modalRef"
    v-model:isVisible="isModal"
    :modelTitle="modelTitle"
  >
    <template v-slot:modalBody>
      <vueForms
        ref="formRef"
        :formField="modalField"
        :formData="modalData"
      ></vueForms>
    </template>
    <template v-slot:modalFooter>
      <a-button type="primary" @click.prevent="onSubmit">保存</a-button>
      <a-button style="margin-left: 10px" @click="resetFields">取消</a-button>
    </template>
  </vue-modal>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import { tableColumns, formColumns, vueForm } from "./tableType";
import selectData from "@/data/selectData";
import { createVNode } from "vue";
import { Storage } from "@/store/storage";

export default defineComponent({
  setup() {
    const columns = ref(tableColumns);
    const isVisible = ref(false);
    const isModal = ref(false);
    const modelTitle = ref("新增");
    // 表单
    const formRef = ref();
    const formField = ref(formColumns);
    const modalField = ref(vueForm);
    const formData = ref<any>({});
    const modalData = ref<any>({});

    const tableData = [
      {
        name: "测试",
        name2: "0",
        name3: "测试03",
        name4: "测试04",
        name5: "测试05",
      },
      {
        name: "测试06",
        name2: "1",
        name3: "测试08",
        name4: "测试09",
        name5: "测试10",
      },
      {
        name: "测试11",
        name2: "1",
        name3: "测试13",
        name4: "测试14",
        name5: "测试15",
      },
    ];

    const isValue = (value: boolean) => {
      if (value === undefined) {
        return false;
      }
      return value;
    };

    const editRow = (data: any) => {
      console.log("编辑*********");
      console.log(data);
    };
    const deleteRow = (data: any) => {
      console.log("删除*********");
      console.log(data);
    };
    for (const key in selectData) {
      const select = Storage.get(key);
      if (select === undefined || select === null) {
        Storage.set(key, selectData[key]);
      }
    }
    // 新增
    const addData = () => {
      isVisible.value = true;
      modelTitle.value = "抽屉";
    };
    const addModal = () => {
      isModal.value = true;
      modelTitle.value = "对话框";
    };

    const onSubmit = () => {
      formRef.value.validateForm();
      formData.value = {};
      console.log(formRef.value.ObjectData);
    };
    const resetFields = () => {
      isVisible.value = false;
      formData.value = {};
      formRef.value.resetForm();
    };
    return {
      editRow,
      deleteRow,
      tableData,
      columns,
      isValue,
      isVisible,
      isModal,
      modelTitle,
      addData,
      addModal,

      formRef,
      formField,
      modalField,
      formData,
      onSubmit,
      resetFields,
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
