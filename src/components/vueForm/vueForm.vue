<!--
 * @Author: 九阳
 * @Date: 2021-11-26 10:13:26
 * @LastEditors: 九阳
 * @LastEditTime: 2021-11-28 16:52:58
-->
<template>
  <template v-if="isObjectEdit">
    <a-form
      ref="formRef"
      :model="objectData"
      :label-col="labelCol"
      layout="vertical"
    >
      <a-row :gutter="24">
        <template v-for="(item, index) in objectField" :key="index">
          <a-col class="gutter-row" :span="item['span']">
            <template v-if="item['disable']">
              <template v-if="item['type'] === 'range'">
                <vueFormSpan
                  :startValue="objectData[item['startDate']]"
                  :endValue="objectData[item['endDate']]"
                  :formField="item"
                ></vueFormSpan>
              </template>
              <template v-else>
                <vueFormSpan
                  :dataValue="objectData[item['field']]"
                  :formField="item"
                ></vueFormSpan>
              </template>
            </template>
            <a-config-provider :locale="zhCN" v-else>
              <!-- 多选框 -->
              <template v-if="item['type'] === 'checkbox'">
                <vueFormCheckbox
                  v-model:dataValue="objectData[item['field']]"
                  :formField="item"
                ></vueFormCheckbox>
              </template>
              <!-- 单选框 -->
              <template v-if="item['type'] === 'radio'">
                <vueFormRadio
                  v-model:dataValue="objectData[item['field']]"
                  :formField="item"
                ></vueFormRadio>
              </template>
              <!-- 文本框 -->
              <template v-if="item['type'] === 'input'">
                <vueFormInput
                  v-model:dataValue="objectData[item['field']]"
                  :formField="item"
                ></vueFormInput>
              </template>
              <!-- 选择框 -->
              <template v-if="item['type'] === 'select'"
                ><vueFormSelect
                  v-model:dataValue="objectData[item['field']]"
                  :formField="item"
                ></vueFormSelect>
              </template>
              <!-- 日期-->
              <template v-if="item['type'] === 'date'"
                ><vueFromDate
                  v-model:dataValue="objectData[item['field']]"
                  :formField="item"
                ></vueFromDate>
              </template>
              <!-- 日期范围 -->
              <template v-if="item['type'] === 'range'"
                ><vueFormRange
                  v-model:startValue="objectData[item['startDate']]"
                  v-model:endValue="objectData[item['endDate']]"
                  :formField="item"
                ></vueFormRange>
              </template>
              <!-- 附件 -->
              <template v-if="item['type'] === 'upload'">
                <vueFormUpload
                  v-model:dataValue="objectData[item['field']]"
                  :formField="item"
                ></vueFormUpload
              ></template>
            </a-config-provider>
          </a-col>
        </template>
      </a-row>
    </a-form>
  </template>
  <template v-else>
    <a-form
      ref="formRef"
      :model="objectData"
      layout="vertical"
      :label-col="labelCol"
    >
      <a-row :gutter="24">
        <template v-for="(item, index) in objectField" :key="index">
          <a-col class="gutter-row" :span="item['span']">
            <template v-if="item['type'] === 'range'">
              <vueFormSpan
                :startValue="objectData[item['startDate']]"
                :endValue="objectData[item['endDate']]"
                :formField="item"
              ></vueFormSpan>
            </template>
            <template v-else>
              <vueFormSpan
                :dataValue="objectData[item['field']]"
                :formField="item"
              ></vueFormSpan>
            </template>
          </a-col>
        </template>
      </a-row>
    </a-form>
  </template>
</template>
<script lang="ts">
import zhCN from "ant-design-vue/es/locale/zh_CN";
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
import vueFormCheckbox from "./vueCheckbox.vue";
import vueFromDate from "./vueDate.vue";
import vueFormInput from "./vueInput.vue";
import vueFormRadio from "./vueRadio.vue";
import vueFormRange from "./vueRange.vue";
import vueFormSelect from "./vueSelect.vue";
import vueFormUpload from "./vueUpload.vue";
import vueFormSpan from "./vueSpan.vue";

export default defineComponent({
  name: "vueForms",
  components: {
    vueFormCheckbox,
    vueFromDate,
    vueFormInput,
    vueFormUpload,
    vueFormSelect,
    vueFormRange,
    vueFormRadio,
    vueFormSpan,
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
      objectData: JSON.parse(JSON.stringify(props.formData)),
      objectField: props.formField,
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
        state.objectData = JSON.parse(JSON.stringify(newValue));
      },
      {
        deep: true,
      }
    );
    watch(
      () => props.formField,
      (newValue, oldValue) => {
        state.objectField = JSON.parse(JSON.stringify(newValue));
      },
      {
        deep: true,
        immediate: true,
      }
    );
    const resetForm = () => {
      state.objectData = {};
      formRef.value.resetFields();
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
    return {
      zhCN,
      ...toRefs(state),
      labelCol: { style: { width: "120px" } },
      formRef,
      resetForm,
      validateForm,
    };
  },
});
</script>
<style lang="scss" scoped>
:deep(.ant-form-item-explain.ant-form-item-explain-error) {
  text-align: left;
}
</style>
