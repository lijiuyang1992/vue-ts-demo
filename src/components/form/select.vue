<!--
 * @Author: 九阳
 * @Date: 2021-11-25 13:34:57
 * @LastEditors: 九阳
 * @LastEditTime: 2021-11-25 19:29:31
-->
<template>
  <!--  单选-->
  <template v-if="selectField['subType'] === 'select'">
    <a-select
      v-model:value="selectValue"
      :placeholder="selectField['placeholder']"
      allowClear
      @change="changeSelect"
    >
      <template
        v-for="(item, index) in selectOptions(selectField['vsCode'])"
        :key="index"
      >
        <a-select-option :value="item['value']">{{
          item["label"]
        }}</a-select-option>
      </template>
    </a-select>
  </template>
  <!--  多选-->
  <template v-if="selectField['subType'] === 'tags'">
    <a-select
      v-model:value="selectValue"
      :placeholder="selectField['placeholder']"
      allowClear
      mode="tags"
      @change="changeSelect"
    >
      <template
        v-for="(item, index) in selectOptions(selectField['vsCode'])"
        :key="index"
      >
        <a-select-option :value="item['value']">{{
          item["label"]
        }}</a-select-option>
      </template>
    </a-select>
  </template>
  <!--  多选-->
  <template v-if="selectField['subType'] === 'multiple'">
    <a-select
      v-model:value="selectValue"
      :placeholder="selectField['placeholder']"
      allowClear
      mode="multiple"
      @change="changeSelect"
    >
      <template
        v-for="(item, index) in selectOptions(selectField['vsCode'])"
        :key="index"
      >
        <a-select-option :value="item['value']">{{
          item["label"]
        }}</a-select-option>
      </template>
    </a-select>
  </template>
</template>
<script lang="ts">
import { SelectTypes } from "ant-design-vue/es/select";
import { defineComponent, ref, PropType, watch } from "vue";
import { Storage } from "@/store/storage";
import { FormType } from "@/type/formType";

export default defineComponent({
  name: "vueSelect",
  props: {
    dataValue: {
      type: String,
      default: "",
    },
    formField: {
      type: Object as PropType<FormType>,
      required: true,
    },
  },
  emits: ["update:dataValue"],
  setup(props, { emit }) {
    let selectValue: any;
    const selectField = ref(props["formField"]);
    const selectData = () => {
      const select = props["dataValue"];
      if (selectField.value["subType"] === "select") {
        selectValue = ref(select);
      }
      if (selectField.value["subType"] === "multiple") {
        const object = select.split(",");
        selectValue = ref(object);
      }
      if (selectField.value["subType"] === "tags") {
        const object = select.split(",");
        selectValue = ref(object);
      }
    };
    const changeSelect = (value: any) => {
      let selValue = "";
      if (selectField.value["subType"] === "select") {
        selValue = value;
      }
      if (selectField.value["subType"] === "multiple") {
        selValue = value.join(",");
      }
      if (selectField.value["subType"] === "tags") {
        selValue = value.join(",");
      }
      emit("update:dataValue", selValue);
    };

    const selectOptions = (vsCode: string) => {
      const options = [].concat(Storage.get(vsCode));
      return options;
    };

    return {
      selectField,
      selectValue,
      selectOptions,
      changeSelect,
    };
  },
});
</script>
<style lang="scss" scoped>
:deep(.ant-select-selection-placeholder) {
  text-align: left;
}
:deep(.ant-select-selection-search) {
  text-align: left;
}
:deep(.ant-select-selection-item) {
  text-align: left;
}
</style>
