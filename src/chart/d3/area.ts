/*
 * @Author: 李九阳
 * @Date: 2021-12-03 13:31:39
 * @LastEditors: 李九阳
 * @LastEditTime: 2021-12-03 19:20:44
 */
import * as d3 from "d3";
import { IntervalType } from "@/type/d3Type";
export const d3Area = () => {
  const width = 500,
    height = 250,
    margin = { left: 50, top: 30, right: 20, bottom: 20 },
    g_width = width - margin.left - margin.right,
    g_height = height - margin.top - margin.bottom;

  //获取div，向里面添加svg
  const svg = d3
    .select("#d3Area01")
    .append("svg") //在“container”中插入svg
    .attr("id", "svgArea01") //设置svg的宽度
    .attr("width", width) //设置svg的宽度
    .attr("height", height); //设置svg的高度

  //添加g元素
  const g = svg
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  const data: any = [0, 1, 3, 5, 9, 4, 2, 3, 6, 8]; //定义一个数组，里面放置了一些任意数字
  const scale_x = d3
    .scaleLinear() //把曲线沿x轴按比例放大
    .domain([0, data.length - 1])
    .range([0, g_width]);

  const max: any = d3.max(data);
  const scale_y = d3
    .scaleLinear() //把曲线沿y轴按比例放大
    .domain([0, max])
    .range([g_height, 0]); //使y轴按照数学中的方式显示，而不是浏览器的格式

  const curve = d3.curveCardinal;
  const area_generator = d3
    .area() //d3中绘制面积的函数
    .x(function (d: any, i) {
      return scale_x(i);
    }) //曲线中x的值
    .y0(g_height) //相当于x坐标
    .y1(function (d: any) {
      return scale_y(d);
    }) //曲线中y的值
    .curve(curve); //把曲线设置光滑

  d3.select("g")
    .append("path")
    .attr("d", area_generator(data))
    .style("fill", "cornflowerblue");

  const x_axis = d3.axisBottom(scale_x),
    y_axis = d3.axisLeft(scale_y);

  g.append("g")
    .call(x_axis)
    .attr("transform", "translate(0," + g_height + ")");

  g.append("g")
    .call(y_axis)
    .append("text")
    .text("price(￥)")
    .attr("transform", "rotate(-90)") //text旋转-90°
    .attr("text-anchor", "end") //字体尾部对齐
    .attr("dy", "1em"); //沿y轴平移一个字体的大小
};

/**
 * 堆叠面积图
 */
export const d3Area02 = (config: IntervalType) => {
  const data = [
    { country: "Asia", year: "1750", value: 502 },
    { country: "Asia", year: "1800", value: 635 },
    { country: "Asia", year: "1850", value: 809 },
    { country: "Asia", year: "1900", value: 5268 },
    { country: "Asia", year: "1950", value: 4400 },
    { country: "Asia", year: "1999", value: 3634 },
    { country: "Asia", year: "2050", value: 947 },
    { country: "Africa", year: "1750", value: 106 },
    { country: "Africa", year: "1800", value: 107 },
    { country: "Africa", year: "1850", value: 111 },
    { country: "Africa", year: "1900", value: 1766 },
    { country: "Africa", year: "1950", value: 221 },
    { country: "Africa", year: "1999", value: 767 },
    { country: "Africa", year: "2050", value: 133 },
    { country: "Europe", year: "1750", value: 163 },
    { country: "Europe", year: "1800", value: 203 },
    { country: "Europe", year: "1850", value: 276 },
    { country: "Europe", year: "1900", value: 628 },
    { country: "Europe", year: "1950", value: 547 },
    { country: "Europe", year: "1999", value: 729 },
    { country: "Europe", year: "2050", value: 408 },
    { country: "Oceania", year: "1750", value: 200 },
    { country: "Oceania", year: "1800", value: 200 },
    { country: "Oceania", year: "1850", value: 200 },
    { country: "Oceania", year: "1900", value: 460 },
    { country: "Oceania", year: "1950", value: 230 },
    { country: "Oceania", year: "1999", value: 300 },
    { country: "Oceania", year: "2050", value: 300 },
  ];
  const legendData: any = [];
  const objectData: any = {};
  data.forEach((key: any) => {
    if (
      !legendData.some((legend: string) => {
        return legend === key["country"];
      })
    ) {
      legendData.push(key["country"]);
      objectData[key["country"]] = [];
      objectData[key["country"]].push(key["value"]);
    } else {
      objectData[key["country"]].push(key["value"]);
    }
  });

  const div: any = d3.select("#d3Area02");
  const divWidth = 600; //div.node().getBoundingClientRect().width;
  const width = divWidth - config["paddingLeft"] - config["paddingRight"];
  const height = config["height"];
  const divHeight =
    config["height"] + config["paddingTop"] + config["paddingBottom"];

  const svg = d3
    .select("#d3Area02")
    .append("svg")
    .attr("width", divWidth)
    .attr("height", divHeight);

  // 图形颜色
  const color: any = d3.schemeCategory10;

  // 获取x 轴数据
  let XData: any = data.map((d: any) => {
    return d["year"];
  });
  XData = Array.from(new Set(XData));

  // 获取Y轴数据
  let values: any = data.map((d: any) => {
    return d["value"];
  });
  values = Array.from(new Set(values));
  // 创建 x、y 轴比例
  const xScale: any = d3.scaleBand().domain(XData).rangeRound([0, width]);
  const xScale1: any = d3
    .scaleUtc()
    .domain([0, XData.length])
    .range([config["paddingLeft"], divWidth - config["paddingRight"]]);
  // const xScale1 = d3
  //     .scaleLinear() //把曲线沿x轴按比例放大
  //     .domain([0, XData.length])
  //     .range([config["paddingLeft"], divWidth]);

  const maxY: any = d3.max(values);
  const yScale: any = d3
    .scaleLinear()
    .domain([0, maxY])
    .rangeRound([height, 0]);

  // y 轴刻度比例
  const axisY = d3.axisLeft(yScale);
  // x 轴刻度比例
  const axisX = d3
    .axisBottom(xScale)
    .ticks(width / 80)
    .tickSizeOuter(0);

  const g = svg
    .append("g")
    .attr("id", "selectArea")
    .attr(
      "transform",
      "translate(" + config["paddingLeft"] + "," + config["paddingTop"] + ")"
    );

  const curve = d3.curveCardinal;
  const area_generator = d3
    .area() //d3中绘制面积的函数
    .x(function (d: any, i) {
      return xScale1(i);
    }) //曲线中x的值
    .y0(height) //相当于x坐标
    .y1(function (d: any) {
      return yScale(d);
    }) //曲线中y的值
    .curve(curve); //把曲线设置光滑
  // console.log(objectData["Asia"]);
  // d3.select("#selectArea").append("path")
  //     .attr("d", area_generator(objectData["Asia"]))
  //     .style("fill", "currentColor");
  let index = 0;
  for (const key in objectData) {
    d3.select("#selectArea")
      .append("path")
      .attr("d", area_generator(objectData[key]))
      .style("fill", color[index]);
    index++;
  }

  g.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(axisX)
    .attr("font-size", "15")
    .attr("fon-weight", "bold");

  g.append("g")
    .call(axisY)
    .attr("shape-rendering", "crispEdges")
    .attr("width", 50);
};
