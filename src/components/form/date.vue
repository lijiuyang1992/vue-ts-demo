<!--
 * @Author: 九阳
 * @Date: 2021-11-25 14:17:25
 * @LastEditors: 九阳
 * @LastEditTime: 2021-11-25 20:28:25
-->
<template>
  <!-- 单选日期 -->
  <template v-if="dateField['subType'] === 'date'">
    <a-date-picker
      format="YYYY-MM-DD"
      v-model:value="formDate[dateField['field']]"
      @change="onChangeRange(dateField)"
      placeholder="请选择日期"
    />
  </template>
  <!-- 单选时间 -->
  <template v-if="dateField['subType'] === 'dateTime'">
    <a-date-picker
      :show-time="{ format: 'HH:mm' }"
      format="YYYY-MM-DD HH:mm"
      v-model:value="formDate[dateField['field']]"
      @ok="onOkRange(dateField)"
      placeholder="请选择日期"
    />
  </template>
  <!-- 单选年 -->
  <template v-if="dateField['subType'] === 'year'">
    <a-month-picker
      format="YYYY"
      mode="year"
      v-model:value="formDate[dateField['field']]"
      @change="onChangeRange(dateField)"
      placeholder="请选择年"
    />
  </template>
  <!-- 单选月 -->
  <template v-if="dateField['subType'] === 'month'">
    <a-month-picker
      format="YYYY-MM"
      v-model:value="formDate[dateField['field']]"
      @change="onChangeRange(dateField)"
      placeholder="请选择月份"
    />
  </template>
  <!-- 单选周 -->
  <template v-if="dateField['subType'] === 'week'">
    <a-week-picker
      format="YYYY-wo"
      v-model:value="formDate[dateField['field']]"
      @change="onChangeRange(dateField)"
      placeholder="请选择周"
    />
  </template>
  <!-- 单选日期范围-->
  <template v-if="dateField['subType'] === 'range'">
    <a-range-picker
      v-model:value="formDate[dateField['field']]"
      @change="onChangeRange(dateField)"
      :placeholder="['开始日期', '结束日期']"
    />
  </template>
  <!-- 单选日期时间范围-->
  <template v-if="dateField['subType'] === 'rangeTime'">
    <a-range-picker
      :show-time="{ format: 'HH:mm' }"
      format="YYYY-MM-DD HH:mm"
      v-model:value="formDate[dateField['field']]"
      @ok="onOkRange(dateField)"
      :placeholder="['开始时间', '结束时间']"
    />
  </template>
</template>
<script lang="ts">
import { defineComponent, ref, PropType, reactive, toRaw, toRefs } from "vue";
import moment, { Moment } from "moment";
import { FormType } from "@/type/formType";

export default defineComponent({
  name: "VueDate",
  props: {
    formData: {
      type: Object,
      default: () => ({}),
    },
    formField: {
      type: Object as PropType<FormType>,
      default: () => ({}),
    },
  },
  emits: ["update:formData"],
  setup(props, { emit }) {
    const dateField = ref(props["formField"]);
    const formObject = ref(props["formData"]);
    const formRangDate: any = {};
    const existList = (type: string) => {
      for (const key of ["range", "rangeTime"]) {
        if (type === key) {
          return true;
        }
      }
      return false;
    };
    if (existList(dateField.value["subType"])) {
      formRangDate[dateField.value["field"]] = [
        formObject.value[dateField.value["startDate"]],
        formObject.value[dateField.value["endDate"]],
      ];
    } else {
      formRangDate[dateField.value["field"]] =
        formObject.value[dateField.value["field"]];
    }

    const formDate = ref(formRangDate);
    // 范围时间选择
    const onChangeRange = (value: any, item: any) => {
      if (value["subType"] === "range") {
        const range = formDate.value[value["field"]];
        const startDate = range[0].format("YYYY-MM-DD");
        const endDate = range[1].format("YYYY-MM-DD");
        formObject.value[value["startDate"]] = startDate;
        formObject.value[value["endDate"]] = endDate;
      }
      if (value["subType"] === "date") {
        const date = formDate.value[value["field"]].format("YYYY-MM-DD");
        formObject.value[value["field"]] = date;
      }
      if (value["subType"] === "week") {
        const week = formDate.value[value["field"]].format("YYYY-wo");
        formObject.value[value["field"]] = week;
      }
      if (value["subType"] === "month") {
        const month = formDate.value[value["field"]].format("YYYY-MM");
        formObject.value[value["field"]] = month;
      }
      if (value["subType"] === "year") {
        const month = formDate.value[value["field"]].format("YYYY");
        formObject.value[value["field"]] = month;
      }
      emit("update:formData", formObject);
    };
    const onOkRange = (value: any, dateString: string[], item: any) => {
      if (value["subType"] === "dateTime") {
        const dateTime =
          formDate.value[value["field"]].format("YYYY-MM-DD HH:mm");
        formObject.value[value["field"]] = dateTime;
      }
      if (value["subType"] === "rangeTime") {
        const range = formDate.value[value["field"]];
        const startDate = range[0].format("YYYY-MM-DD HH:mm");
        const endDate = range[1].format("YYYY-MM-DD HH:mm");
        formObject.value[value["startDate"]] = startDate;
        formObject.value[value["endDate"]] = endDate;
      }
      emit("update:formData", formObject);
    };
    return {
      dateField,
      onChangeRange,
      onOkRange,
      formObject,
      formDate,
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
