/*
 * @Author: 李九阳
 * @Date: 2021-12-07 16:52:01
 * @LastEditors: 李九阳
 * @LastEditTime: 2021-12-07 18:01:31
 */
import * as d3 from "d3";
import { IntervalType } from "@/type/d3Type";
// 极地坐标

export const d3Polar = () => {
  const width = 960,
    height = 500,
    radius = Math.min(width, height) / 2 - 30;

  const data = [
    [0, 0.4],
    [6, 0.2],
    [Math.random() * 24, Math.random()],
    [Math.random() * 24, Math.random()],
    [Math.random() * 24, Math.random()],
    [Math.random() * 24, Math.random()],
    [Math.random() * 24, Math.random()],
    [Math.random() * 24, Math.random()],
    [Math.random() * 24, Math.random()],
    [Math.random() * 24, Math.random()],
    [Math.random() * 24, Math.random()],
    [Math.random() * 24, Math.random()],
  ];

  let max: any = Math.max.apply(null, [0, 1]);
  max = Math.ceil(max * 10) / 10;

  const angle = d3
    .scaleLinear()
    .domain([0, 24])
    .range([0, 2 * Math.PI]);

  const r = d3.scaleLinear().domain([0, max]).range([0, radius]);

  const svg = d3
    .select("#d3Polar10")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("fill", "#fff")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

  const gr = svg
    .append("g")
    .attr("class", "r axis")
    .selectAll("g")
    .data(r.ticks(max * 10).slice(1))
    .enter()
    .append("g")
    .attr("fill", "none")
    .attr("stroke", "steelblue")
    .attr("stroke-dasharray", 4);

  gr.append("circle").attr("r", r);
  // .attr("fill", "none")
  // .attr("stroke", "steelblue")
  // .attr("stroke-dasharray", 4);

  gr.append("text")
    .attr("y", function (d) {
      return -r(d) - 4;
    })
    .attr("transform", "rotate(20)")
    .style("text-anchor", "middle")
    .text(function (d) {
      return d;
    });

  const ga = svg
    .append("g")
    .attr("class", "a axis")
    .selectAll("g")
    .data(d3.range(-90, 270, 45))
    .enter()
    .append("g")
    .attr("transform", function (d) {
      return "rotate(" + d + ")";
    })
    .attr("fill", "none")
    .attr("stroke", "steelblue")
    .attr("stroke-dasharray", 4);

  ga.append("line")
    .attr("x2", radius)
    // .attr("fill", "none")
    .attr("stroke", "orange")
    .attr("stroke-width", 3);

  ga.append("text")
    .attr("x", radius + 6)
    .attr("dy", ".35em")
    .attr("font-weight", 500)
    .style("text-anchor", function (d) {
      return d < 270 && d > 90 ? "end" : null;
    })
    .attr("transform", function (d) {
      return d < 270 && d > 90 ? "rotate(180 " + (radius + 6) + ",0)" : null;
    })
    .text(function (d, i) {
      return i * 3 + ":00";
    });

  const color: any = d3.schemeCategory10;

  const line = d3
    .lineRadial()
    .angle(function (d) {
      return angle(d[0]);
    })
    .radius(function (d) {
      return r(d[1]);
    });

  svg
    .selectAll("point")
    .data(data)
    .enter()
    .append("circle")
    .attr("class", "point")
    .attr("transform", function (d: any) {
      const lined: any = line([d]);
      const coors = lined.slice(1).slice(0, -1);
      return "translate(" + coors + ")";
    })
    .attr("r", 8)
    .attr("fill", function (d, i) {
      return color[i];
    });

  // 参考： https://www.cnblogs.com/rinka/p/d3js_polar_plot.html
};
