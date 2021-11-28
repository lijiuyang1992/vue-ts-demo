<!--
 * @Author: 九阳
 * @Date: 2021-11-26 12:20:31
 * @LastEditors: 九阳
 * @LastEditTime: 2021-11-26 17:35:29
-->
<template>
  <!-- 单选日期范围-->
  <template v-if="rangeField['subType'] === 'range'">
    <a-form-item
      :ref="rangeField['field']"
      :label="rangeField['label']"
      :name="rangeField['field']"
      :required="rangeField['required']"
      :rules="rangeRules"
    >
      <a-range-picker
        v-model:value="rangeValue"
        @change="onChangeRange"
        :placeholder="['开始日期', '结束日期']"
      />
    </a-form-item>
  </template>
  <!-- 单选日期时间范围-->
  <template v-if="rangeField['subType'] === 'rangeTime'">
    <a-form-item
      :ref="rangeField['field']"
      :label="rangeField['label']"
      :name="rangeField['field']"
      :required="rangeField['required']"
      :rules="rangeRules"
    >
      <a-range-picker
        :show-time="{ format: 'HH:mm' }"
        format="YYYY-MM-DD HH:mm"
        v-model:value="rangeValue"
        @ok="onOkRange"
        :placeholder="['开始时间', '结束时间']"
      />
    </a-form-item>
  </template>
</template>
<script lang="ts">
import {
  defineComponent,
  ref,
  PropType,
  reactive,
  toRaw,
  toRefs,
  watch,
} from "vue";
import moment, { Moment } from "moment";
import { FormType } from "@/type/formType";

export default defineComponent({
  name: "vueFormRange",
  props: {
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
  startValue: ["update:startValue"],
  endValue: ["update:endValue"],
  emitField: ["update:formField"],
  setup(props, { emit }) {
    const rangeField = ref(props["formField"]);
    const rangeValue = ref([props["startValue"], props["endValue"]]);
    let rangeRules: any = ref([]);
    if (rangeField.value["required"]) {
      rangeRules = ref(rangeField.value["rule"]);
    }

    // 范围时间选择
    const onChangeRange = (value: any) => {
      if (rangeField.value["subType"] === "range") {
        const startDate = value[0].format("YYYY-MM-DD");
        const endDate = value[1].format("YYYY-MM-DD");
        rangeValue.value[0] = startDate;
        rangeValue.value[1] = endDate;
      }
      emit("update:startValue", rangeValue.value[0]);
      emit("update:endValue", rangeValue.value[1]);
    };
    const onOkRange = (value: any, dateString: string[]) => {
      if (rangeField.value["subType"] === "rangeTime") {
        const startDate = value[0].format("YYYY-MM-DD HH:mm");
        const endDate = value[1].format("YYYY-MM-DD HH:mm");
        rangeValue.value[0] = startDate;
        rangeValue.value[1] = endDate;
      }
      emit("update:startValue", rangeValue.value[0]);
      emit("update:endValue", rangeValue.value[1]);
    };

    watch(
      () => props.formField,
      (newValue, oldValue) => {
        rangeField.value = JSON.parse(JSON.stringify(newValue));
        if (rangeField.value["required"]) {
          rangeRules = ref(rangeField.value["rule"]);
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
        rangeValue.value[0] = JSON.parse(JSON.stringify(newValue));
      },
      {
        deep: true,
        immediate: true,
      }
    );
    watch(
      () => props.endValue,
      (newValue, oldValue) => {
        rangeValue.value[1] = JSON.parse(JSON.stringify(newValue));
      },
      {
        deep: true,
        immediate: true,
      }
    );

    return {
      rangeField,
      onChangeRange,
      onOkRange,
      rangeValue,
      rangeRules,
    };
  },
});
</script>

<style scoped>
.gutter-example :deep(.ant-row > div) {
  background: transparent;
  border: 0;
}
.gutter-box {
  background: #00a0e9;
  padding: 5px 0;
}
.ant-calendar-picker {
  width: 100% !important;
  min-width: 100% !important;
}
</style>
