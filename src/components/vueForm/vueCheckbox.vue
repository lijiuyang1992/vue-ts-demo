<!--
 * @Author: 九阳
 * @Date: 2021-11-26 12:35:50
 * @LastEditors: 九阳
 * @LastEditTime: 2021-11-26 17:17:46
-->
<template>
  <!--  多选-->
  <a-form-item
    :ref="checkboxField['field']"
    :label="checkboxField['label']"
    :name="checkboxField['field']"
    :required="checkboxField['required']"
    :rules="checkboxRules"
  >
    <a-checkbox-group
      style="text-align: left"
      v-model:value="checkboxValue"
      @change="changeBox"
    >
      <template
        v-for="(item, index) in selectOptions(checkboxField['vsCode'])"
        :key="index"
      >
        <a-checkbox :value="item['value']">{{ item["label"] }}</a-checkbox>
      </template>
    </a-checkbox-group>
  </a-form-item>
</template>
<script lang="ts">
import { defineComponent, ref, PropType, watch } from "vue";
import { Storage } from "@/store/storage";
import { FormType } from "@/type/formType";

export default defineComponent({
  name: "vueFormCheckbox",
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
    const value = props.dataValue.split(",");
    const checkboxValue = ref(value);
    const checkboxField = ref(props.formField);
    let radioRules: any = ref([]);
    if (checkboxField.value["required"]) {
      radioRules = ref(checkboxField.value["rule"]);
    }

    const selectOptions = (vsCode: string) => {
      const options = [].concat(Storage.get(vsCode));
      return options;
    };

    watch(
      () => props.dataValue,
      (newValue, oldValue) => {
        const value = JSON.parse(JSON.stringify(newValue));
        checkboxValue.value = value.split(",");
      },
      {
        deep: true,
        immediate: true,
      }
    );
    watch(
      () => props.formField,
      (newValue, oldValue) => {
        checkboxField.value = JSON.parse(JSON.stringify(newValue));
        if (checkboxField.value["required"]) {
          radioRules = ref(checkboxField.value["rule"]);
        }
      },
      {
        deep: true,
        immediate: true,
      }
    );
    const changeBox = (value: any) => {
      const selValue = value.join(",");
      emit("update:dataValue", selValue);
    };
    return {
      checkboxField,
      checkboxValue,
      selectOptions,
      radioRules,
      changeBox,
    };
  },
});
</script>
<style lang="scss" scoped></style>
