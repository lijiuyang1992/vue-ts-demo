<!--
 * @Author: 九阳
 * @Date: 2021-11-26 12:35:50
 * @LastEditors: 九阳
 * @LastEditTime: 2021-11-26 16:33:41
-->
<template>
  <!--  单选-->
  <template v-if="radioField['subType'] === 'button'">
    <a-form-item
      :ref="radioField['field']"
      :label="radioField['label']"
      :name="radioField['field']"
      :required="radioField['required']"
      :rules="radioRules"
    >
      <a-radio-group
        v-model:value="radioValue"
        :buttonStyle="radioField['styleType']"
        @change="change"
      >
        <template
          v-for="(item, index) in selectOptions(radioField['vsCode'])"
          :key="index"
        >
          <a-radio-button :value="item['value']">{{
            item["label"]
          }}</a-radio-button>
        </template>
      </a-radio-group>
    </a-form-item>
  </template>
  <!--  单选-->
  <template v-if="radioField['subType'] === 'radio'">
    <a-form-item
      :ref="radioField['field']"
      :label="radioField['label']"
      :name="radioField['field']"
      :required="radioField['required']"
      :rules="radioRules"
    >
      <a-radio-group v-model:value="radioValue" @change="change">
        <template
          v-for="(item, index) in selectOptions(radioField['vsCode'])"
          :key="index"
        >
          <a-radio :value="item['value']">{{ item["label"] }}</a-radio>
        </template>
      </a-radio-group>
    </a-form-item>
  </template>
</template>
<script lang="ts">
import { defineComponent, ref, PropType, watch } from "vue";
import { Storage } from "@/store/storage";
import { FormType } from "@/type/formType";

export default defineComponent({
  name: "vueFormRadio",
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
    const radioValue = ref(props.dataValue);
    const radioField = ref(props.formField);
    let radioRules: any = ref([]);
    if (radioField.value["required"]) {
      radioRules = ref(radioField.value["rule"]);
    }

    const selectOptions = (vsCode: string) => {
      const options = [].concat(Storage.get(vsCode));
      return options;
    };
    const change = (value: any) => {
      emit("update:dataValue", radioValue.value);
    };

    watch(
      () => props.dataValue,
      (newValue, oldValue) => {
        radioValue.value = JSON.parse(JSON.stringify(newValue));
      },
      {
        deep: true,
        immediate: true,
      }
    );
    watch(
      () => props.formField,
      (newValue, oldValue) => {
        radioField.value = JSON.parse(JSON.stringify(newValue));
        if (radioField.value["required"]) {
          radioRules = ref(radioField.value["rule"]);
        }
      },
      {
        deep: true,
        immediate: true,
      }
    );

    return {
      radioField,
      radioValue,
      selectOptions,
      radioRules,
      change,
    };
  },
});
</script>
<style lang="scss" scoped></style>
