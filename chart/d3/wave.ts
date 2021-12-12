/*
 * @Author: 李九阳
 * @Date: 2021-12-06 14:47:22
 * @LastEditors: 李九阳
 * @LastEditTime: 2021-12-09 14:15:41
 */
import * as d3 from "d3";
// 水波图
export const waveD3Chart = () => {
  const svg = d3
    .select("#waveD3Chart")
    .append("svg")
    .attr("width", 600)
    .attr("height", 550);
  svg
    .append("circle")
    .attr("fill", "#34a7f5")
    .attr("r", 100) // 半径
    .attr("cx", 200) // x轴位置
    .attr("cy", 200); // y轴位置
  svg
    .append("circle")
    .attr("fill", "#ffffff")
    .attr("r", 93) // 半径
    .attr("cx", 200) // x轴位置
    .attr("cy", 200); // y轴位置
  /* ------------动画部分------------ */
  const height = 600;
  const values = 1; // 水波图水位的多少(-100到 100)
  const dataList0: any = [
    values - 12,
    values - 18,
    values - 24,
    values - 18,
    values - 12,
    values - 6,
    values,
    values - 6,
  ];
  const dataList1: any = [
    values - 18,
    values - 24,
    values - 18,
    values - 12,
    values - 6,
    values,
    values - 6,
    values - 12,
  ];
  const dataList2: any = [
    values - 24,
    values - 18,
    values - 12,
    values - 6,
    values,
    values - 6,
    values - 12,
    values - 18,
  ];
  const dataList3: any = [
    values - 18,
    values - 12,
    values - 6,
    values,
    values - 6,
    values - 12,
    values - 18,
    values - 24,
  ];
  const dataList4: any = [
    values - 12,
    values - 6,
    values,
    values - 6,
    values - 12,
    values - 18,
    values - 24,
    values - 18,
  ];
  const dataList5: any = [
    values - 6,
    values,
    values - 6,
    values - 12,
    values - 18,
    values - 24,
    values - 18,
    values - 12,
  ];
  const dataList6: any = [
    values,
    values - 6,
    values - 12,
    values - 18,
    values - 24,
    values - 18,
    values - 12,
    values - 6,
  ];
  const dataList7: any = [
    values - 6,
    values - 12,
    values - 18,
    values - 24,
    values - 18,
    values - 12,
    values - 6,
    values,
  ];
  const dataList01: any = [
    values + 12,
    values + 18,
    values + 24,
    values + 18,
    values + 12,
    values + 6,
    values,
    values + 6,
  ];
  const dataList11: any = [
    values + 18,
    values + 24,
    values + 18,
    values + 12,
    values + 6,
    values,
    values + 6,
    values + 12,
  ];
  const dataList21: any = [
    values + 24,
    values + 18,
    values + 12,
    values + 6,
    values,
    values + 6,
    values + 12,
    values + 18,
  ];
  const dataList31: any = [
    values + 18,
    values + 12,
    values + 6,
    values,
    values + 6,
    values + 12,
    values + 18,
    values + 24,
  ];
  const dataList41: any = [
    values + 12,
    values + 6,
    values,
    values + 6,
    values + 12,
    values + 18,
    values + 24,
    values + 18,
  ];
  const dataList51: any = [
    values + 6,
    values,
    values + 6,
    values + 12,
    values + 18,
    values + 24,
    values + 18,
    values + 12,
  ];
  const dataList61: any = [
    values,
    values + 6,
    values + 12,
    values + 18,
    values + 24,
    values + 18,
    values + 12,
    values + 6,
  ];
  const dataList71: any = [
    values + 6,
    values + 12,
    values + 18,
    values + 24,
    values + 18,
    values + 12,
    values + 6,
    values,
  ];
  const areaPath: any = d3
    .area()
    .x(function (d, i) {
      return i * 50;
    })
    .y0(function (d, i) {
      return height / 2;
    })
    .y1(function (d, i) {
      return -d;
    })
    .curve(d3.curveBasis);
  svg
    .append("defs")
    .append("clipPath") // 裁剪图层
    .attr("id", "clipPath")
    .append("circle")
    .attr("r", 86) // 半径
    .attr("cx", 100) // x轴位置
    .attr("cy", 20); // y轴位置
  svg
    .append("defs")
    .append("clipPath") // 裁剪图层
    .attr("id", "clipPath1")
    .append("circle")
    .attr("r", 86) // 半径
    .attr("cx", 100) // x轴位置
    .attr("cy", -20); // y轴位置
  /* ---------------上面的裁剪层--------------- */
  svg
    .append("defs")
    .append("clipPath") // 裁剪图层
    .attr("id", "clipPath2");
  const clipPath2 = d3.select("#clipPath2");
  function run1() {
    clipPath2
      .append("path")
      .attr("class", "path1")
      .attr("width", 600)
      .attr("d", areaPath(dataList01))
      .attr("fill", "rgba(255, 255, 255, 1)")
      .attr("transform", "rotate(180, 150, 90)")
      .attr("clip-path", "url(#clipPath1)")

      .transition()
      .duration(100)
      .delay(0)
      .ease(d3.easeLinear)
      .attr("d", areaPath(dataList71))

      .transition()
      .duration(100)
      .delay(0)
      .ease(d3.easeLinear)
      .attr("d", areaPath(dataList61))

      .transition()
      .duration(100)
      .delay(0)
      .ease(d3.easeLinear)
      .attr("d", areaPath(dataList51))

      .transition()
      .duration(100)
      .delay(0)
      .ease(d3.easeLinear)
      .attr("d", areaPath(dataList41))

      .transition()
      .duration(100)
      .delay(0)
      .ease(d3.easeLinear)
      .attr("d", areaPath(dataList31))

      .transition()
      .duration(100)
      .delay(0)
      .ease(d3.easeLinear)
      .attr("d", areaPath(dataList21))

      .transition()
      .duration(100)
      .delay(0)
      .ease(d3.easeLinear)
      .attr("d", areaPath(dataList11))

      .transition()
      .duration(100)
      .delay(0)
      .ease(d3.easeLinear)
      .attr("d", areaPath(dataList01))

      .remove()
      .on("end", run1);
  }
  requestAnimationFrame(run1);
  /* -------------------波浪-------------------- */
  const qswl = svg.append("g");
  function wave() {
    qswl
      .append("path")
      .attr("class", "path")
      .attr("width", 600)
      .attr("d", areaPath(dataList0))
      .attr("fill", "rgba(52, 167, 245, 1)")
      .attr("transform", "translate(100,180)")
      .attr("clip-path", "url(#clipPath)")

      .transition()
      .duration(100)
      .delay(0)
      .ease(d3.easeLinear)
      .attr("d", areaPath(dataList1))

      .transition()
      .duration(100)
      .delay(0)
      .ease(d3.easeLinear)
      .attr("d", areaPath(dataList2))

      .transition()
      .duration(100)
      .delay(0)
      .ease(d3.easeLinear)
      .attr("d", areaPath(dataList3))

      .transition()
      .duration(100)
      .delay(0)
      .ease(d3.easeLinear)
      .attr("d", areaPath(dataList4))

      .transition()
      .duration(100)
      .delay(0)
      .ease(d3.easeLinear)
      .attr("d", areaPath(dataList5))

      .transition()
      .duration(100)
      .delay(0)
      .ease(d3.easeLinear)
      .attr("d", areaPath(dataList6))

      .transition()
      .duration(100)
      .delay(0)
      .ease(d3.easeLinear)
      .attr("d", areaPath(dataList7))

      .transition()
      .duration(100)
      .delay(0)
      .ease(d3.easeLinear)
      .attr("d", areaPath(dataList0))

      .remove()
      .on("end", wave);
  }
  requestAnimationFrame(wave);
  /* ---------------添加文字--------------- */
  svg
    .append("text")
    .attr("x", 150)
    .attr("y", 220)
    .style("fill", "#c3e2fe")
    .style("font-size", "50px")
    .style("font-weight", "bold")
    .text("55%");
  svg
    .append("text")
    .attr("x", 150)
    .attr("y", 220)
    .style("fill", "#31618e")
    .style("font-size", "50px")
    .style("font-weight", "bold")
    .text("55%")
    .attr("clip-path", "url(#clipPath2)");
  const ground = svg.append("svg");
  ground
    .append("rect")
    .attr("width", 300)
    .attr("height", 300)
    .attr("fill", "none")
    .attr("transform", "translate(50,50)");
  ground
    .append("text")
    .attr("x", 120)
    .attr("y", 85)
    .style("fill", "#000000")
    .style("font-size", "25px")
    .style("font-weight", "nomal")
    .text("Liquid Fill Gauge");
  ground
    .append("rect")
    .attr("width", 200)
    .attr("height", 200)
    .attr("fill", "none")
    .attr("transform", "translate(100,100)");
};
