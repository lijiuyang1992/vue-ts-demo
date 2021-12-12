<!--
 * @Author: 李九阳
 * @Date: 2021-11-30 14:00:55
 * @LastEditors: 李九阳
 * @LastEditTime: 2021-12-07 16:03:30
-->
<template>
  <a-row :gutter="24">
    <a-col :span="12">
      <a-card title="单柱状图" :bordered="false" class="chart-card">
        <div ref="formRef" id="d3InTerval"></div>
      </a-card>
    </a-col>
    <a-col :span="12">
      <a-card title="柱状图01" :bordered="false" class="chart-card">
        <vueD3inTerval :data="data" :chart="config"></vueD3inTerval>
      </a-card>
    </a-col>

    <a-col :span="24">
      <a-card title="柱状图02" :bordered="false" class="chart-card">
        <div id="d3InTerval02"></div>
      </a-card>
    </a-col>

    <a-col :span="24">
      <a-card title="图04" :bordered="false" class="chart-card">
        <canvas id="d3InTerval04" width="600" height="600"></canvas>
      </a-card>
    </a-col>

    <a-col :span="24">
      <a-card title="立体05" :bordered="false" class="chart-card">
        <div id="d3InTerval05" width="600" height="600"></div>
      </a-card>
    </a-col>

    <a-col :span="24">
      <a-card title="柱形折线图" :bordered="false" class="chart-card">
        <div id="d3InTerval06" width="600" height="600"></div>
      </a-card>
    </a-col>
    <a-col :span="24">
      <a-card title="柱形折线图01" :bordered="false" class="chart-card">
        <div id="d3InTerval11" width="600" height="600"></div>
      </a-card>
    </a-col>
    <a-col :span="24">
      <a-card title="多分组柱形图" :bordered="false" class="chart-card">
        <div id="d3InTerval12" width="600" height="600"></div>
      </a-card>
    </a-col>
    <a-col :span="24">
      <a-card title="堆叠柱状图" :bordered="false" class="chart-card">
        <div id="d3InTerval200" width="600" height="600"></div>
      </a-card>
    </a-col>
  </a-row>
</template>
<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import {
  inTerval,
  interval02,
  interval04,
  interval05,
  interval06,
  inTerval11,
  inTerval12,
  inTerval200,
} from "@/chart/d3/interval.ts";
export default defineComponent({
  name: "inTerval",
  setup() {
    const formRef = ref();
    const config = {
      select: "#d3InTerval",
      key: "key",
      value: "value",
      width: 710,
      height: 400,
      paddingLeft: 20,
      paddingRight: 10,
      paddingTop: 20,
      paddingBottom: 20,
    };
    const data = [
      {
        key: "语文",
        value: "32",
      },
      {
        key: "数学",
        value: "26",
      },
      {
        key: "物理",
        value: "45",
      },
      {
        key: "英语",
        value: "38",
      },
      {
        key: "历史",
        value: "53",
      },
      {
        key: "化学",
        value: "48",
      },
      {
        key: "生物",
        value: "42",
      },
    ];

    const config11 = {
      select: "#d3InTerval11",
      key: "key",
      value: "value",
      width: 710,
      height: 400,
      paddingLeft: 20,
      paddingRight: 10,
      paddingTop: 20,
      paddingBottom: 20,
    };
    const e = document.createEvent("Event");
    e.initEvent("resize", true, true);
    window.dispatchEvent(e);
    onMounted(() => {
      console.log("11222221111");
      console.log(formRef.value.offsetWidth);
      inTerval(config, data);
      interval02();
      interval04();
      interval05();
      interval06();
      inTerval11(config11, data);
      inTerval12(config11);
      inTerval200(config11);
    });
    return {
      config,
      data,
      formRef,
    };
  },
});
</script>
<style scoped>
.selectBar {
  border: 1px solid #0b3536;
  border-radius: 6px;
  fill: #0098d8;
}
#d3BarSelect .barText {
  fill: #f5faf8;
  font-weight: 500;
}
.axisY text,
.axisX text,
.headerText text {
  fill: #0b3536;
}
#d3BarSelect svg {
  banckground-color: #f5faf8;
}

.gutter-example :deep(.ant-row > div) {
  background: transparent;
  border: 0;
}
.gutter-box {
  padding: 5px 0;
}
.chart-card {
  /* height: 400px; */
  padding: 5px 0;
}
</style>
