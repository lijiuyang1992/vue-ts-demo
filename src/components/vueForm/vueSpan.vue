<!--
 * @Author: 九阳
 * @Date: 2021-11-27 08:38:44
 * @LastEditors: 九阳
 * @LastEditTime: 2021-11-27 10:13:14
-->
<template>
  <!--  文本-->
  <template v-if="inputField['type'] === 'input'">
    <a-form-item
      :ref="inputField['field']"
      :label="inputField['label']"
      :name="inputField['field']"
    >
      <template v-if="inputField['subType'] === 'textarea'">
        <a-textarea
          v-model:value="inputValue"
          :auto-size="autoSize(inputField['autoSize'])"
          :disabled="true"
        />
      </template>
      <template v-else>
        <a-input v-model:value="inputValue" :disabled="true" />
      </template>
    </a-form-item>
  </template>
  <!-- 选择框-->
  <template v-if="inputField['type'] === 'select'">
    <a-form-item
      :ref="inputField['field']"
      :label="inputField['label']"
      :name="inputField['field']"
    >
      <a-input v-model:value="selectValue" :disabled="true" />
    </a-form-item>
  </template>
  <!-- 日期-->
  <template v-if="inputField['type'] === 'date'">
    <a-form-item
      :ref="inputField['field']"
      :label="inputField['label']"
      :name="inputField['field']"
    >
      <a-input v-model:value="inputValue" :disabled="true" />
    </a-form-item>
  </template>
  <!-- 日期范围-->
  <template v-if="inputField['type'] === 'range'">
    <a-form-item
      :ref="inputField['field']"
      :label="inputField['label']"
      :name="inputField['field']"
    >
      <a-input v-model:value="rangeValue" :disabled="true" />
    </a-form-item>
  </template>
  <!-- 单选框-->
  <template v-if="inputField['type'] === 'radio'">
    <a-form-item
      :ref="inputField['field']"
      :label="inputField['label']"
      :name="inputField['field']"
    >
      <a-input v-model:value="selectValue" :disabled="true" />
    </a-form-item>
  </template>
  <!-- 多选框-->
  <template v-if="inputField['type'] === 'checkbox'">
    <a-form-item
      :ref="inputField['field']"
      :label="inputField['label']"
      :name="inputField['field']"
    >
      <a-input v-model:value="selectValue" :disabled="true" />
    </a-form-item>
  </template>
</template>
<script lang="ts">
import { defineComponent, ref, PropType, watch } from "vue";
import { Storage } from "@/store/storage";
import { FormType } from "@/type/formType";
import { checkBoolean } from "@/utils/method.ts";

function getList(listValue: string, list0ptions: any): string {
  const listString = listValue.split(",");
  const value = [];
  for (const key of listString) {
    for (const option of list0ptions) {
      if (key === option["value"]) {
        value.push(option["label"]);
      }
    }
  }
  return value.join(",");
}
function getSelectValue(value: string, formField: any): string {
  let selectValue = "";
  const options = [].concat(Storage.get(formField["vsCode"]));
  if (formField["type"] === "select") {
    if (formField["subType"] === " select") {
      for (const key of options) {
        if (key["value"] === value) {
          selectValue = key["label"];
        }
      }
    } else {
      selectValue = getList(value, options);
    }
  }
  if (formField["type"] === "radio") {
    for (const key of options) {
      if (key["value"] === value) {
        selectValue = key["label"];
      }
    }
  }
  if (formField["type"] === "checkbox") {
    selectValue = getList(value, options);
  }
  return selectValue;
}
function getRange(start: string, end: string) {
  return start + "至" + end;
}
export default defineComponent({
  name: "vueFormSpan",
  props: {
    dataValue: {
      type: String,
      default: "",
    },
    startValue: {
      type: String,
      default: "",
    },
    endValue: {
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
    const inputValue = ref(props.dataValue);
    const inputField = ref(props.formField);
    const rangeValue = ref("");
    if (inputField.value["type"] === "range") {
      rangeValue.value = getRange(props.startValue, props.endValue);
    }
    const selectValue = ref("");
    if (
      inputField.value["type"] === "select" ||
      inputField.value["type"] === "radio" ||
      inputField.value["type"] === "checkbox"
    ) {
      selectValue.value = getSelectValue(props.dataValue, props.formField);
    }
    watch(
      () => props.dataValue,
      (newValue, oldValue) => {
        inputValue.value = JSON.parse(JSON.stringify(newValue));
        if (
          inputField.value["type"] === "select" ||
          inputField.value["type"] === "radio" ||
          inputField.value["type"] === "checkbox"
        ) {
          selectValue.value = getSelectValue(inputValue.value, props.formField);
        }
      },
      {
        deep: true,
        immediate: true,
      }
    );
    watch(
      () => props.startValue,
      (newValue, oldValue) => {
        const start = JSON.parse(JSON.stringify(newValue));
        if (inputField.value["type"] === "range") {
          rangeValue.value = getRange(start, props.endValue);
        }
      },
      {
        deep: true,
        immediate: true,
      }
    );
    watch(
      () => props.endValue,
      (newValue, oldValue) => {
        const end = JSON.parse(JSON.stringify(newValue));
        if (inputField.value["type"] === "range") {
          rangeValue.value = getRange(props.startValue, end);
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
        inputField.value = JSON.parse(JSON.stringify(newValue));
      },
      {
        deep: true,
        immediate: true,
      }
    );
    // 大文本
    const autoSize = (value: any) => {
      if (value === undefined || value === null) {
        return { minRows: 2, maxRows: 5 };
      }
      return value;
    };
    return {
      inputValue,
      inputField,
      autoSize,
      rangeValue,
      selectValue,
    };
  },
});
</script>
<style lang="scss" scoped>
:deep(.ant-input-disabled) {
  color: #333;
  background-color: #fafafa;
}
</style>
