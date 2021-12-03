<!--
 * @Author: 九阳
 * @Date: 2021-11-28 14:09:51
 * @LastEditors: 李九阳
 * @LastEditTime: 2021-11-30 16:31:05
-->
<template>
  <template v-if="isObjectEdit">
    <a-form
      ref="formRef"
      :model="dynamicValidateForm"
      :label-col="labelCol"
      layout="vertical"
    >
      <a-collapse
        style="width: 100%; margin-bottom: 10px"
        v-for="(domain, index) in dynamicValidateForm.domains"
        :key="index"
        v-model:activeKey="activeKey"
      >
        <a-collapse-panel style="width: 100%" :key="index">
          <a-row :gutter="24">
            <template
              v-for="(item, fieldIndex) in objectField"
              :key="fieldIndex"
            >
              <a-col class="gutter-row" :span="item['span']">
                <template v-if="item['disable']">
                  <template v-if="item['type'] === 'range'">
                    <vueFormSpan
                      :startValue="domain[item['startDate']]"
                      :endValue="domain[item['endDate']]"
                      :formField="item"
                    ></vueFormSpan>
                  </template>
                  <template v-else>
                    <vueFormSpan
                      :dataValue="domain[item['field']]"
                      :formField="item"
                    ></vueFormSpan>
                  </template>
                </template>
                <template v-else>
                  <!-- 多选框 -->
                  <template v-if="item['type'] === 'checkbox'">
                    <vueFormCheckbox
                      v-model:dataValue="domain[item['field']]"
                      :formField="item"
                    ></vueFormCheckbox>
                  </template>
                  <!-- 单选框 -->
                  <template v-if="item['type'] === 'radio'">
                    <vueFormRadio
                      v-model:dataValue="domain[item['field']]"
                      :formField="item"
                    ></vueFormRadio>
                  </template>
                  <!-- 文本框 -->
                  <template v-if="item['type'] === 'input'">
                    <vueFormInput
                      v-model:dataValue="domain[item['field']]"
                      :formField="item"
                    ></vueFormInput>
                  </template>
                  <!-- 选择框 -->
                  <template v-if="item['type'] === 'select'"
                    ><vueFormSelect
                      v-model:dataValue="domain[item['field']]"
                      :formField="item"
                    ></vueFormSelect>
                  </template>
                  <!-- 日期-->
                  <template v-if="item['type'] === 'date'"
                    ><vueFromDate
                      v-model:dataValue="domain[item['field']]"
                      :formField="item"
                    ></vueFromDate>
                  </template>
                  <!-- 日期范围 -->
                  <template v-if="item['type'] === 'range'"
                    ><vueFormRange
                      v-model:startValue="domain[item['startDate']]"
                      v-model:endValue="domain[item['endDate']]"
                      :formField="item"
                    ></vueFormRange>
                  </template>
                </template>
              </a-col>
            </template>
          </a-row>
          <template v-slot:header>
            <span>{{ headerTitle(domain) }}</span>
            <span
              style="float: right"
              v-if="dynamicValidateForm.domains.length > 1"
            >
              <CloseOutlined @click="removeDomain(domain)" />
            </span>
          </template>
        </a-collapse-panel>
      </a-collapse>
      <!--增行按钮 -->
      <a-form-item>
        <a-button
          type="dashed"
          style="width: 100%; text-align: center; margin-top: 10px"
          @click="addDomain"
        >
          <PlusOutlined />
          新增
        </a-button>
      </a-form-item>
    </a-form>
  </template>
  <template v-else>
    <a-form
      ref="formRef"
      :model="dataList"
      layout="vertical"
      :label-col="labelCol"
    >
      <a-collapse
        style="width: 100%; margin-bottom: 10px"
        v-for="(domain, index) in dynamicValidateForm.domains"
        :key="index"
        v-model:activeKey="activeKey"
      >
        <a-collapse-panel style="width: 100%" :key="index">
          <a-row :gutter="24">
            <template
              v-for="(item, fieldIndex) in objectField"
              :key="fieldIndex"
            >
              <a-col class="gutter-row" :span="item['span']">
                <template v-if="item['type'] === 'range'">
                  <vueFormSpan
                    :startValue="domain[item['startDate']]"
                    :endValue="domain[item['endDate']]"
                    :formField="item"
                  ></vueFormSpan>
                </template>
                <template v-else>
                  <vueFormSpan
                    :dataValue="domain[item['field']]"
                    :formField="item"
                  ></vueFormSpan>
                </template>
              </a-col>
            </template>
          </a-row>
          <template v-slot:header>
            {{ headerTitle(domain) }}
          </template>
        </a-collapse-panel>
      </a-collapse>
    </a-form>
  </template>
</template>
<script lang="ts">
import {
  MinusCircleOutlined,
  PlusOutlined,
  CloseOutlined,
} from "@ant-design/icons-vue";
import { ValidateErrorEntity } from "ant-design-vue/es/form/interface";
import {
  defineComponent,
  reactive,
  ref,
  UnwrapRef,
  PropType,
  watch,
} from "vue";
import { FormType } from "@/type/formType";
import vueFormCheckbox from "./vueCheckbox.vue";
import vueFromDate from "./vueDate.vue";
import vueFormInput from "./vueInput.vue";
import vueFormRadio from "./vueRadio.vue";
import vueFormRange from "./vueRange.vue";
import vueFormSelect from "./vueSelect.vue";
import vueFormSpan from "./vueSpan.vue";
import { checkBoolean } from "@/utils/method.ts";

function getOjbect(formField: any): any {
  const object: any = {};
  for (const key of formField) {
    if (key["type"] === "range") {
      object[key["startDate"]] = "";
      object[key["endDate"]] = "";
    } else {
      object[key["field"]] = "";
    }
  }
  return object;
}

export default defineComponent({
  name: "vueListForms",
  components: {
    vueFormCheckbox,
    vueFromDate,
    vueFormInput,
    vueFormSelect,
    vueFormRange,
    vueFormRadio,
    vueFormSpan,
    PlusOutlined,
    CloseOutlined,
  },
  props: {
    isEdit: {
      type: Boolean,
      default: true,
    },
    titleCode: {
      type: String,
      default: "",
    },
    formField: {
      type: Array as PropType<FormType[]>,
      default: () => [],
    },
    ListData: {
      type: Array as PropType<any[]>,
      default: () => [],
    },
  },
  setup(props) {
    const formRef = ref();
    const headerTitle = (value: any) => {
      if (
        checkBoolean(props.titleCode) &&
        checkBoolean(value[props.titleCode])
      ) {
        return value[props.titleCode];
      }
      return "标题";
    };
    const isObjectEdit = ref(props.isEdit);
    const objectField = ref(props.formField);
    const list = ref(props.ListData);
    if (props.ListData.length < 1) {
      list.value = [getOjbect(props.formField)];
    }
    const dynamicValidateForm: UnwrapRef<{ domains: any[] }> = reactive({
      domains: list.value,
    });
    const activeKey = ref(["0"]);
    const validateForm = () => {
      formRef.value
        .validate()
        .then(() => {
          console.log("values", dynamicValidateForm.domains);
        })
        .catch((error: ValidateErrorEntity<any>) => {
          console.log("error", error);
        });
    };
    const resetForm = () => {
      formRef.value.resetFields();
    };
    const removeDomain = (item: any) => {
      if (dynamicValidateForm.domains.length > 1) {
        let index = dynamicValidateForm.domains.indexOf(item);
        if (index !== -1) {
          dynamicValidateForm.domains.splice(index, 1);
        }
      }
    };
    const addDomain = () => {
      dynamicValidateForm.domains.push(getOjbect(props.formField));
    };
    watch(
      () => props.isEdit,
      (newValue, oldValue) => {
        isObjectEdit.value = newValue;
      },
      {
        deep: true,
        immediate: true,
      }
    );
    watch(
      () => props.ListData,
      (newValue, oldValue) => {
        const dataList: any = JSON.parse(JSON.stringify(newValue));
        if (dataList.length < 1) {
          dynamicValidateForm.domains = [getOjbect(props.formField)];
        } else {
          dynamicValidateForm.domains = dataList;
        }
      },
      {
        deep: true,
      }
    );
    watch(
      () => props.formField,
      (newValue, oldValue) => {
        objectField.value = JSON.parse(JSON.stringify(newValue));
      },
      {
        deep: true,
        immediate: true,
      }
    );

    return {
      formRef,
      headerTitle,
      objectField,
      isObjectEdit,
      dynamicValidateForm,
      validateForm,
      resetForm,
      removeDomain,
      addDomain,
      activeKey,
    };
  },
});
</script>
<style>
.dynamic-delete-button {
  cursor: pointer;
  position: relative;
  top: 4px;
  font-size: 24px;
  color: #999;
  transition: all 0.3s;
}
.dynamic-delete-button:hover {
  color: #777;
}
.dynamic-delete-button[disabled] {
  cursor: not-allowed;
  opacity: 0.5;
}
</style>
