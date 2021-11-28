/* eslint-disable vue/valid-v-model */
<!--
 * @Author: 九阳
 * @Date: 2021-11-26 10:16:10
 * @LastEditors: 九阳
 * @LastEditTime: 2021-11-26 17:32:22
-->
<template>
  <!--  文本-->
  <template v-if="inputField['subType'] === 'input'">
    <a-form-item
      :ref="inputField['field']"
      :label="inputField['label']"
      :name="inputField['field']"
      :required="inputField['required']"
      :rules="inputRules"
    >
      <a-input
        v-model:value="inputValue"
        :placeholder="inputField['placeholder']"
        allowClear
        @change="change"
      />
    </a-form-item>
  </template>
  <!--  大文本-->
  <template v-if="inputField['subType'] === 'textarea'">
    <a-form-item
      :ref="inputField['field']"
      :label="inputField['label']"
      :name="inputField['field']"
      :required="inputField['required']"
      :rules="inputRules"
    >
      <a-textarea
        v-model:value="inputValue"
        :placeholder="inputField['placeholder']"
        allowClear
        :auto-size="autoSize(inputField['autoSize'])"
        @change="change"
      />
    </a-form-item>
  </template>
  <!--  数字-->
  <template v-if="inputField['subType'] === 'number'">
    <a-form-item
      :ref="inputField['field']"
      :label="inputField['label']"
      :name="inputField['field']"
      :required="inputField['required']"
      :rules="inputRules"
    >
      <a-input-number
        v-model:value="inputValue"
        :placeholder="inputField['placeholder']"
        style="width: 100%"
        @change="changeNumber"
      />
    </a-form-item>
  </template>
  <template v-if="inputField['subType'] === 'inputSelect'">
    <a-form-item
      :ref="inputField['field']"
      :label="inputField['label']"
      :name="inputField['field']"
      :required="inputField['required']"
      :rules="inputRules"
    >
      <a-input-group compact>
        <a-select
          v-model:value="inputSelectValue01"
          placeholder="请选择"
          @change="changeSelect"
          style="width: 40%"
        >
          <template
            v-for="(item, index) in selectOptions(inputField['vsCode'])"
            :key="index"
          >
            <a-select-option :value="item['value']">{{
              item["label"]
            }}</a-select-option>
          </template>
        </a-select>
        <a-input
          style="width: 60%"
          v-model:value="inputSelectValue02"
          :placeholder="inputField['placeholder']"
          @change="changeInput"
        />
      </a-input-group>
    </a-form-item>
  </template>
</template>
<script lang="ts">
import { defineComponent, ref, PropType, watch } from "vue";
import { Storage } from "@/store/storage";
import { FormType } from "@/type/formType";
import { checkBoolean } from "@/utils/method.ts";

export default defineComponent({
  name: "vueFormInput",
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
    const inputValue = ref(props.dataValue);
    const inputField = ref(props.formField);
    let inputRules: any = ref([]);
    if (inputField.value["required"]) {
      inputRules = ref(inputField.value["rule"]);
    }
    const inputSelectValue01 = ref("");
    const inputSelectValue02 = ref("");
    if (
      checkBoolean(inputValue.value) &&
      inputField.value["subType"] === "inputSelect"
    ) {
      const valueList = inputValue.value.split(":");
      inputSelectValue01.value = valueList[0];
      inputSelectValue02.value = valueList[1];
    }
    watch(
      () => props.dataValue,
      (newValue, oldValue) => {
        inputValue.value = JSON.parse(JSON.stringify(newValue));
        if (inputField.value["subType"] === "inputSelect") {
          if (checkBoolean(inputValue.value)) {
            const valueList = inputValue.value.split(":");
            inputSelectValue01.value = valueList[0];
            inputSelectValue02.value = valueList[1];
          } else {
            inputSelectValue01.value = "";
            inputSelectValue02.value = "";
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
        inputField.value = JSON.parse(JSON.stringify(newValue));
        if (inputField.value["required"]) {
          inputRules = ref(inputField.value["rule"]);
        }
      },
      {
        deep: true,
        immediate: true,
      }
    );

    const selectOptions = (vsCode: string) => {
      const options = [].concat(Storage.get(vsCode));
      return options;
    };

    const changeInput = (value: any) => {
      const value01 =
        inputSelectValue01.value +
        ":" +
        JSON.parse(JSON.stringify(inputSelectValue02.value));
      emit("update:dataValue", value01);
    };
    const changeSelect = (value: any) => {
      const value01 = value + ":" + inputSelectValue02.value;
      emit("update:dataValue", value01);
    };
    const changeNumber = (value: any) => {
      emit("update:dataValue", String(value));
    };
    const change = (value: any) => {
      emit("update:dataValue", inputValue.value);
    };
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
      inputRules,
      selectOptions,
      autoSize,
      change,
      changeInput,
      changeSelect,
      changeNumber,
      inputSelectValue01,
      inputSelectValue02,
    };
  },
});
</script>
<style lang="scss" scoped></style>
