<!--
 * @Author: 九阳
 * @Date: 2021-11-26 11:13:05
 * @LastEditors: 九阳
 * @LastEditTime: 2021-11-26 16:45:02
-->
<template>
  <!-- 单选日期 -->
  <template v-if="dateField['subType'] === 'date'">
    <a-form-item
      :ref="dateField['field']"
      :label="dateField['label']"
      :name="dateField['field']"
      :required="dateField['required']"
      :rules="dateRules"
    >
      <a-date-picker
        format="YYYY-MM-DD"
        v-model:value="dateValue"
        @change="onChangeRange"
        placeholder="请选择日期"
      />
    </a-form-item>
  </template>
  <!-- 单选时间 -->
  <template v-if="dateField['subType'] === 'dateTime'">
    <a-form-item
      :ref="dateField['field']"
      :label="dateField['label']"
      :name="dateField['field']"
      :required="dateField['required']"
      :rules="dateRules"
    >
      <a-date-picker
        :show-time="{ format: 'HH:mm' }"
        format="YYYY-MM-DD HH:mm"
        v-model:value="dateValue"
        @ok="onOkRange"
        placeholder="请选择日期"
      />
    </a-form-item>
  </template>
  <!-- 单选年 -->
  <template v-if="dateField['subType'] === 'year'">
    <a-form-item
      :ref="dateField['field']"
      :label="dateField['label']"
      :name="dateField['field']"
      :required="dateField['required']"
      :rules="dateRules"
    >
      <a-date-picker
        format="YYYY"
        mode="year"
        v-model:value="dateValue"
        @change="onChangeRange"
        placeholder="请选择年"
      />
    </a-form-item>
  </template>
  <!-- 单选月 -->
  <template v-if="dateField['subType'] === 'month'">
    <a-form-item
      :ref="dateField['field']"
      :label="dateField['label']"
      :name="dateField['field']"
      :required="dateField['required']"
      :rules="dateRules"
    >
      <a-month-picker
        format="YYYY-MM"
        v-model:value="dateValue"
        @change="onChangeRange"
        placeholder="请选择月份"
      />
    </a-form-item>
  </template>
  <!-- 单选周 -->
  <template v-if="dateField['subType'] === 'week'">
    <a-form-item
      :ref="dateField['field']"
      :label="dateField['label']"
      :name="dateField['field']"
      :required="dateField['required']"
      :rules="dateRules"
    >
      <a-week-picker
        format="YYYY-wo"
        v-model:value="dateValue"
        @change="onChangeRange"
        placeholder="请选择周"
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
  name: "VueFromDate",
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
    const dateValue = ref(props.dataValue);
    const dateField = ref(props.formField);
    let dateRules: any = ref([]);
    if (dateField.value["required"]) {
      dateRules = ref(dateField.value["rule"]);
    }
    // 范围时间选择
    const onChangeRange = (value: any) => {
      if (dateField.value["subType"] === "date") {
        const date = value.format("YYYY-MM-DD");
        emit("update:dataValue", date);
      }
      if (dateField.value["subType"] === "week") {
        const week = value.format("YYYY-wo");
        emit("update:dataValue", week);
      }
      if (dateField.value["subType"] === "month") {
        const month = value.format("YYYY-MM");
        emit("update:dataValue", month);
      }
      if (dateField.value["subType"] === "year") {
        const year = value.format("YYYY");
        emit("update:dataValue", year);
      }
    };
    const onOkRange = (value: any, dateString: string[]) => {
      if (dateField.value["subType"] === "dateTime") {
        const dateTime = value.format("YYYY-MM-DD HH:mm");
        emit("update:dataValue", dateTime);
      }
    };

    watch(
      () => props.dataValue,
      (newValue, oldValue) => {
        dateValue.value = JSON.parse(JSON.stringify(newValue));
      },
      {
        deep: true,
        immediate: true,
      }
    );
    watch(
      () => props.formField,
      (newValue, oldValue) => {
        dateField.value = JSON.parse(JSON.stringify(newValue));
        if (dateField.value["required"]) {
          dateRules = ref(dateField.value["rule"]);
        }
      },
      {
        deep: true,
        immediate: true,
      }
    );

    return {
      dateField,
      onChangeRange,
      onOkRange,
      dateValue,
      dateRules,
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
