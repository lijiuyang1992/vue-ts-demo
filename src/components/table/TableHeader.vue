<!--
 * @Author: 九阳
 * @Date: 2021-11-24 15:04:15
 * @LastEditors: 九阳
 * @LastEditTime: 2021-11-26 09:17:01
-->
<template>
  <a-form
    class="gutter-example"
    :model="formObject"
    ref="formRef"
    :label-col="labelCol"
  >
    <a-row :gutter="16">
      <template v-for="(item, index) in tableHeader" :key="index">
        <a-col class="gutter-row" :span="6">
          <a-config-provider :locale="zhCN">
            <a-form-item :label="item['label']">
              <template v-if="item['type'] === 'input'">
                <a-input
                  v-model:value="formObject[item['field']]"
                  :placeholder="item['placeholder']"
                  allowClear
                />
              </template>
              <template v-if="item['type'] === 'select'">
                <a-select
                  v-model:value="formDate[item['field']]"
                  :placeholder="item['placeholder']"
                  allowClear
                >
                  <template
                    v-for="(options, index) in selectOptions(item['vsCode'])"
                    :key="index"
                  >
                    <a-select-option :value="options['value']">{{
                      options["label"]
                    }}</a-select-option>
                  </template>
                </a-select>
              </template>
              <!-- 单选日期 -->
              <template v-if="item['type'] === 'date'">
                <a-date-picker
                  format="YYYY-MM-DD"
                  v-model:value="formDate[item['field']]"
                  @change="onChangeRange(item)"
                  placeholder="请选择日期"
                />
              </template>
              <!-- 单选时间 -->
              <template v-if="item['type'] === 'dateTime'">
                <a-date-picker
                  :show-time="{ format: 'HH:mm' }"
                  format="YYYY-MM-DD HH:mm"
                  v-model:value="formDate[item['field']]"
                  @ok="onOkRange(item)"
                  placeholder="请选择日期"
                />
              </template>
              <!-- 单选年 -->
              <template v-if="item['type'] === 'year'">
                <a-month-picker
                  format="YYYY"
                  mode="year"
                  v-model:value="formDate[item['field']]"
                  @change="onChangeRange(item)"
                  placeholder="请选择年"
                />
              </template>
              <!-- 单选月 -->
              <template v-if="item['type'] === 'month'">
                <a-month-picker
                  format="YYYY-MM"
                  v-model:value="formDate[item['field']]"
                  @change="onChangeRange(item)"
                  placeholder="请选择月份"
                />
              </template>
              <!-- 单选周 -->
              <template v-if="item['type'] === 'week'">
                <a-week-picker
                  format="YYYY-wo"
                  v-model:value="formDate[item['field']]"
                  @change="onChangeRange(item)"
                  placeholder="请选择周"
                />
              </template>
              <!-- 单选日期范围-->
              <template v-if="item['type'] === 'range'">
                <a-range-picker
                  v-model:value="formDate[item['field']]"
                  @change="onChangeRange(item)"
                  :placeholder="['开始日期', '结束日期']"
                />
              </template>
              <!-- 单选日期时间范围-->
              <template v-if="item['type'] === 'rangeTime'">
                <a-range-picker
                  :show-time="{ format: 'HH:mm' }"
                  format="YYYY-MM-DD HH:mm"
                  v-model:value="formDate[item['field']]"
                  @ok="onOkRange(item)"
                  :placeholder="['开始时间', '结束时间']"
                />
              </template>
            </a-form-item>
          </a-config-provider>
        </a-col>
      </template>
    </a-row>
  </a-form>
</template>
<script lang="ts">
import { defineComponent, ref, PropType, reactive, toRaw } from "vue";
import { HeaderType } from "@/type/tableType";
import { Storage } from "@/store/storage";
import { SelectTypes } from "ant-design-vue/es/select";
import moment, { Moment } from "moment";
import zhCN from "ant-design-vue/es/locale/zh_CN";

export default defineComponent({
  name: "tableHeader",
  props: {
    field: {
      type: Array as PropType<HeaderType[]>,
      default: () => [],
    },
    dataVule: {
      type: String,
      default: "",
    },
  },
  setup(props) {
    const formRef = ref();
    const tableHeader = ref(props["field"]);
    let formState: any = {};
    let formRangDate: any = {};
    const existList = (type: string) => {
      for (const key of ["range", "rangeTime"]) {
        if (type === key) {
          return true;
        }
      }
      return false;
    };

    for (let index = 0; index < tableHeader.value.length; index++) {
      const object = tableHeader.value[index];
      if (existList(object["type"])) {
        formState[object["startDate"]] = "";
        formState[object["endDate"]] = "";
        formRangDate[object["field"]] = undefined;
      } else {
        formState[object["field"]] = "";
      }
      formRangDate[object["field"]] = "";
    }
    const formObject = reactive(formState);
    const formDate = reactive(formRangDate);
    const onSubmit = () => {
      console.log("submit!", toRaw(formState));
      return toRaw(formState);
    };
    // 选择数据
    const selectOptions = (vsCode: string) => {
      const options = [].concat(Storage.get(vsCode));
      return options;
    };
    // 范围时间选择
    const onChangeRange = (value: any, item: any) => {
      if (value["type"] === "range") {
        const range = formDate[value["field"]];
        const startDate = range[0].format("YYYY-MM-DD");
        const endDate = range[1].format("YYYY-MM-DD");
        formObject[value["startDate"]] = startDate;
        formObject[value["endDate"]] = endDate;
      }
      if (value["type"] === "date") {
        const date = formDate[value["field"]].format("YYYY-MM-DD");
        formObject[value["field"]] = date;
      }
      if (value["type"] === "week") {
        const week = formDate[value["field"]].format("YYYY-wo");
        formObject[value["field"]] = week;
      }
      if (value["type"] === "month") {
        const month = formDate[value["field"]].format("YYYY-MM");
        formObject[value["field"]] = month;
      }
      if (value["type"] === "year") {
        const month = formDate[value["field"]].format("YYYY");
        formObject[value["field"]] = month;
      }
    };
    const onOkRange = (value: any, dateString: string[], item: any) => {
      if (value["type"] === "dateTime") {
        const dateTime = formDate[value["field"]].format("YYYY-MM-DD HH:mm");
        formObject[value["field"]] = dateTime;
      }
      if (value["type"] === "rangeTime") {
        const range = formDate[value["field"]];
        const startDate = range[0].format("YYYY-MM-DD HH:mm");
        const endDate = range[1].format("YYYY-MM-DD HH:mm");
        formObject[value["startDate"]] = startDate;
        formObject[value["endDate"]] = endDate;
      }
    };
    return {
      formObject,
      tableHeader,
      formRef,
      selectOptions,
      onChangeRange,
      onOkRange,
      formDate,
      zhCN,
      labelCol: { style: { width: "100px" } },
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
:deep(.ant-select-selection-placeholder) {
  text-align: left;
}
:deep(.ant-select-selection-search) {
  text-align: left;
}
:deep(.ant-select-selection-item) {
  text-align: left;
}
</style>
