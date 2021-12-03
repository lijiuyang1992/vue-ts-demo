<!--
 * @Author: 九阳
 * @Date: 2021-11-25 13:46:40
 * @LastEditors: 李九阳
 * @LastEditTime: 2021-11-30 16:35:32
-->
<template>
  <template v-if="isObjectEdit">
    <a-form
      ref="formRef"
      :model="ObjectData"
      :label-col="labelCol"
      :rules="formRules"
      layout="vertical"
    >
      <a-row :gutter="24">
        <template v-for="(item, index) in ObjectField" :key="index">
          <a-col class="gutter-row" :span="item['span']">
            <a-form-item
              :ref="item['field']"
              :label="item['label']"
              :name="item['field']"
              :required="item['required']"
            >
              <!--文本 -->
              <template v-if="item['type'] === 'input'">
                <a-input
                  v-model:value="ObjectData[item['field']]"
                  :placeholder="item['placeholder']"
                  allowClear
                />
              </template>
              <!--大文本 -->
              <template v-if="item['type'] === 'textarea'">
                <a-textarea
                  v-model:value="ObjectData[item['field']]"
                  :placeholder="item['placeholder']"
                  allowClear
                  :auto-size="autoSize(item['autoSize'])"
                />
              </template>
              <!--日期 -->
              <template v-if="item['type'] === 'date'">
                <VueDate
                  v-model:formData="ObjectData"
                  :formField="item"
                ></VueDate>
              </template>
              <!--选择 -->
              <template v-if="item['type'] === 'select'">
                <vueSelect
                  v-model:dataValue="ObjectData[item['field']]"
                  :formField="item"
                ></vueSelect>
              </template>
            </a-form-item>
          </a-col>
        </template>
      </a-row>
    </a-form>
  </template>
  <template v-else>
    <a-form ref="formRef" :model="ObjectData" :label-col="labelCol">
      <a-row :gutter="16">
        <template v-for="(item, index) in ObjectField" :key="index">
          <a-col class="gutter-row" :span="item['span']">
            <a-form-item
              :ref="item['field']"
              :label="item['label']"
              :name="item['field']"
            >
            </a-form-item>
          </a-col>
        </template>
      </a-row>
    </a-form>
  </template>
</template>
<script lang="ts">
import { ValidateErrorEntity } from "ant-design-vue/es/form/interface";
import { Moment } from "moment";
import {
  defineComponent,
  reactive,
  ref,
  toRaw,
  UnwrapRef,
  PropType,
  watch,
  toRefs,
} from "vue";
import { FormType } from "@/type/formType";
import VueDate from "./date.vue";
import vueSelect from "./select.vue";

export default defineComponent({
  name: "VueForm",
  components: {
    VueDate,
    vueSelect,
  },
  props: {
    isEdit: {
      type: Boolean,
      default: true,
    },
    formData: {
      type: Object,
      default: () => ({}),
    },
    formField: {
      type: Array as PropType<FormType[]>,
      default: () => [],
    },
  },
  emits: ["update:formData"],
  setup(props) {
    const formRef = ref();
    const state = reactive({
      isObjectEdit: props.isEdit,
      ObjectData: JSON.parse(JSON.stringify(props.formData)),
      ObjectField: props.formField,
    });
    watch(
      () => props.isEdit,
      (newValue, oldValue) => {
        state.isObjectEdit = newValue;
      },
      {
        deep: true,
        immediate: true,
      }
    );
    watch(
      () => props.formData,
      (newValue, oldValue) => {
        state.ObjectData = JSON.parse(JSON.stringify(newValue));
      },
      {
        deep: true,
      }
    );
    watch(
      () => props.formField,
      (newValue, oldValue) => {
        state.ObjectField = JSON.parse(JSON.stringify(newValue));
      },
      {
        deep: true,
        immediate: true,
      }
    );
    const resetForm = () => {
      state.ObjectData = {};
      formRef.value.resetFields();
    };
    const setForm = (obejct: any) => {
      // state.ObjectData = obejct;
      // formRef.value.setFieldsValue(obejct);
    };
    const validateForm = () => {
      formRef.value
        .validate()
        .then(() => {
          return true;
        })
        .catch((error: ValidateErrorEntity) => {
          return false;
        });
    };
    const formRules: any = {};
    for (const key of props.formField) {
      if (key["required"]) {
        formRules[key["field"]] = key["rule"];
      }
    }

    // 大文本
    const autoSize = (value: any) => {
      if (value === undefined || value === null) {
        return { minRows: 2, maxRows: 5 };
      }
      return value;
    };
    return {
      ...toRefs(state),
      labelCol: { style: { width: "120px" } },
      formRef,
      resetForm,
      validateForm,
      formRules,
      autoSize,
      setForm,
    };
  },
});
</script>
<style lang="scss" scoped>
:deep(.ant-form-item-explain.ant-form-item-explain-error) {
  text-align: left;
}
</style>
