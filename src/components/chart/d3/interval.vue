<!--
 * @Author: 李九阳
 * @Date: 2021-11-30 16:40:24
 * @LastEditors: 李九阳
 * @LastEditTime: 2021-11-30 17:25:26
-->
<template>
  <div id="d3InTervalChart"></div>
</template>
<script lang="ts">
import { defineComponent, ref, onMounted, PropType } from "vue";
import * as d3 from "d3";
import { IntervalType } from "@/type/d3Type";
export default defineComponent({
  name: "vueD3inTerval",
  props: {
    data: {
      type: Array,
      default: () => [],
    },
    chart: {
      type: Object as PropType<IntervalType>,
      default: () => ({}),
    },
  },
  setup(props) {
    const config = ref(props.chart);
    const chartData = ref(props.data);
    onMounted(() => {
      const div: any = d3.select("#d3InTervalChart");
      const divWidth = div.node().getBoundingClientRect().width;
      const width =
        divWidth - config.value["paddingLeft"] - config.value["paddingRight"];
      const height = config.value["height"];
      const divHeight =
        config.value["height"] +
        config.value["paddingTop"] +
        config.value["paddingBottom"];
      const width1 = div.style("width"); //"120px"
      const svg = d3
        .select("#d3InTervalChart")
        .append("svg")
        .attr("width", divWidth)
        .attr("height", divHeight);

      // 图形颜色
      let color = d3.schemeCategory10;
      if (
        config.value["color"] !== undefined &&
        config.value["color"] !== null
      ) {
        color = config.value["color"];
      }

      // 获取x 轴数据
      const XData = chartData.value.map((d: any) => {
        return d[config.value["key"]];
      });

      // 获取Y轴数据
      const values = chartData.value.map((d: any) => {
        return d[config.value["value"]];
      });

      // 创建 x、y 轴比例
      const xScale: any = d3
        .scaleBand()
        .domain(XData)
        .rangeRound([0, width])
        .padding(0.5);
      const maxY: any = d3.max(values);
      const yScale: any = d3
        .scaleLinear()
        .domain([0, maxY])
        .rangeRound([height, 0]);

      const g = svg
        .append("g")
        .attr("class", "selectInterval")
        .attr(
          "transform",
          "translate(" +
            config.value["paddingLeft"] +
            "," +
            config.value["paddingTop"] +
            ")"
        );

      g.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(xScale))
        .attr("fon-weight", "bold");

      g.append("g").call(d3.axisLeft(yScale).ticks(10));

      const chart = g
        .selectAll(".selectInterval")
        .data(chartData.value)
        .enter()
        .append("g");

      // 添加矩形元素
      chart
        .append("rect")
        .attr("border-radius", "6px")
        .style("fill", (d: any, i: any) => {
          return color[i];
        })
        .attr("x", (d: any) => {
          const key = d[config.value["key"]];
          return xScale(key);
        })
        // 动画开始
        .attr("y", (d) => {
          const min = yScale.domain()[0];
          return yScale(min);
        })
        .attr("height", (d) => {
          return 0;
        })
        .transition()
        .delay((d, i) => {
          return i * 200;
        })
        .duration(2000)
        .ease(d3.easeBounceIn)
        // 动画结束
        .attr("y", (d: any) => {
          const value = d[config.value["value"]];
          return yScale(value);
        })
        .attr("height", (d: any) => {
          const value = d[config.value["value"]];
          return height - yScale(value);
        })
        .attr("width", xScale.bandwidth());

      chart
        .append("text")
        .attr("font-weight", 500)
        .attr("x", (d: any) => {
          const key = d[config.value["key"]];
          return xScale(key);
        })
        // 开始动画
        .attr("y", (d) => {
          const min = yScale.domain()[0];
          return yScale(min);
        })
        .attr("height", (d) => {
          return 0;
        })
        .transition()
        .delay((d, i) => {
          return i * 200;
        })
        .duration(2000)
        .ease(d3.easeBounceIn)
        // 动画结束
        .attr("y", (d: any) => {
          const value = d[config.value["value"]];
          return yScale(value);
        })
        .attr("dx", xScale.bandwidth() / 2)
        .attr("dy", -10)
        .attr("text-anchor", "middle")
        .text((d: any) => {
          const value = d[config.value["value"]];
          return value;
        })
        .style("fill", (d: any, i: any) => {
          return color[i];
        });
    });
    return {};
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
</style>
