<!--
 * @Author: 九阳
 * @Date: 2021-11-26 11:05:51
 * @LastEditors: 九阳
 * @LastEditTime: 2021-11-26 17:28:13
-->
<template>
  <!--  单选-->
  <template v-if="selectField['subType'] === 'select'">
    <a-form-item
      :ref="selectField['field']"
      :label="selectField['label']"
      :name="selectField['field']"
      :required="selectField['required']"
      :rules="selectRules"
    >
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
    </a-form-item>
  </template>
  <!--  多选-->
  <template v-if="selectField['subType'] === 'tags'">
    <a-form-item
      :ref="selectField['field']"
      :label="selectField['label']"
      :name="selectField['field']"
      :required="selectField['required']"
      :rules="selectRules"
    >
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
    </a-form-item>
  </template>
  <!--  多选-->
  <template v-if="selectField['subType'] === 'multiple'">
    <a-form-item
      :ref="selectField['field']"
      :label="selectField['label']"
      :name="selectField['field']"
      :required="selectField['required']"
      :rules="selectRules"
    >
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
    </a-form-item>
  </template>
</template>
<script lang="ts">
import { SelectTypes } from "ant-design-vue/es/select";
import { defineComponent, ref, PropType, watch } from "vue";
import { Storage } from "@/store/storage";
import { FormType } from "@/type/formType";
import { checkBoolean } from "@/utils/method.ts";

export default defineComponent({
  name: "vueFormSelect",
  props: {
    dataValue: {
      type: String,
      default: "",
    },
    formField: {
      type: Object as PropType<FormType>,
      default: () => ({}),
    },
  },
  emitValue: ["update:dataValue"],
  emitField: ["update:formField"],
  setup(props, { emit }) {
    let selectValue: any = ref("");
    const selectField = ref(props["formField"]);
    let selectRules: any = ref([]);
    if (selectField.value["required"]) {
      selectRules = ref(selectField.value["rule"]);
    }
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

    watch(
      () => props.dataValue,
      (newValue, oldValue) => {
        const select = JSON.parse(JSON.stringify(newValue));
        if (selectField.value["subType"] === "select") {
          selectValue.value = select;
        }
        if (selectField.value["subType"] === "multiple") {
          if (checkBoolean(select)) {
            const object = select.split(",");
            selectValue.value = object;
          } else {
            selectValue.value = [];
          }
        }
        if (selectField.value["subType"] === "tags") {
          if (checkBoolean(select)) {
            const object = select.split(",");
            selectValue.value = object;
          } else {
            selectValue.value = [];
          }
        }
      },
      {
        deep: true,
        immediate: true,
      }
    );
    watch(
      () => props.formField,
      (newValue, oldValue) => {
        selectField.value = JSON.parse(JSON.stringify(newValue));
        if (selectField.value["required"]) {
          selectRules = ref(selectField.value["rule"]);
        }
      },
      {
        deep: true,
        immediate: true,
      }
    );

    return {
      selectField,
      selectValue,
      selectOptions,
      changeSelect,
      selectRules,
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
