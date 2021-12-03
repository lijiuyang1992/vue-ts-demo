/*
 * @Author: 李九阳
 * @Date: 2021-12-02 20:29:08
 * @LastEditors: 李九阳
 * @LastEditTime: 2021-12-03 13:35:15
 */
import * as d3 from "d3";
import { IntervalType } from "@/type/d3Type";
import { attributes } from "js-cookie";
/**
 * 折线
 */
export const brokenLine01 = (config: IntervalType, data: any) => {
  const div: any = d3.select(config["select"]);
  const divWidth = div.node().getBoundingClientRect().width;
  const width = divWidth - config["paddingLeft"] - config["paddingRight"];
  const height = config["height"];
  const divHeight =
    config["height"] + config["paddingTop"] + config["paddingBottom"];

  const svg = d3
    .select(config["select"])
    .append("svg")
    .attr("width", divWidth)
    .attr("height", divHeight);

  // 图形颜色
  let color: any = d3.schemeCategory10;
  if (config["color"] !== undefined && config["color"] !== null) {
    color = config["color"];
  }

  // 获取x 轴数据
  const XData = data.map((d: any) => {
    return d[config["key"]];
  });

  // 获取Y轴数据
  const values = data.map((d: any) => {
    return d[config["value"]];
  });

  // 创建 x、y 轴比例
  const xScale: any = d3
    .scaleBand()
    .domain(XData)
    .rangeRound([0, width])
    .padding(1);

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
      "translate(" + config["paddingLeft"] + "," + config["paddingTop"] + ")"
    );

  // 添加折线  创建一个新的线生成器。
  const line: any = d3
    .line()
    .x(function (d: any) {
      return xScale(d[config["key"]]);
    })
    .y(function (d: any) {
      return yScale(d[config["value"]]);
    });
  // 选择线条的类型
  // .interpolate('linear');

  // y 轴刻度比例
  const axisY = d3.axisLeft(yScale);
  // x 轴刻度比例
  const axisX = d3.axisBottom(xScale);

  g.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(axisX)
    .attr("font-size", "15")
    .attr("fon-weight", "bold");

  g.append("g").call(axisY);

  g.append("path")
    // .attr("class", "line")
    .attr("d", line(data))
    .attr("stroke", "red")
    .attr("stroke-width", "2px")
    .attr("fill", "none")
    .attr("stroke-linecap", "round")
    .attr("stroke-linejoin", "round");

  // 添加点
  g.selectAll("#circle")
    .data(data)
    .enter()
    .append("circle")
    .attr("id", "circle")
    .attr("cx", function (d: any) {
      return xScale(d[config["key"]]);
    })
    .attr("cy", function (d: any) {
      return yScale(d[config["value"]]);
    })
    .attr("r", 5)
    .attr("fill", function (d: any, i) {
      return color[i];
    });
};

/**
 * 多折线
 */
export const brokenLine02 = () => {
  const data = [
    [
      { x: 1, y: 0 },
      { x: 2, y: 5 },
      { x: 3, y: 10 },
      { x: 4, y: 0 },
      { x: 5, y: 6 },
      { x: 6, y: 11 },
      { x: 7, y: 9 },
      { x: 8, y: 4 },
      { x: 9, y: 11 },
      { x: 10, y: 2 },
    ],
    [
      { x: 1, y: 1 },
      { x: 2, y: 6 },
      { x: 3, y: 11 },
      { x: 4, y: 1 },
      { x: 5, y: 7 },
      { x: 6, y: 12 },
      { x: 7, y: 8 },
      { x: 8, y: 3 },
      { x: 9, y: 13 },
      { x: 10, y: 3 },
    ],
    [
      { x: 1, y: 2 },
      { x: 2, y: 7 },
      { x: 3, y: 12 },
      { x: 4, y: 2 },
      { x: 5, y: 8 },
      { x: 6, y: 13 },
      { x: 7, y: 7 },
      { x: 8, y: 2 },
      { x: 9, y: 4 },
      { x: 10, y: 7 },
    ],
    [
      { x: 1, y: 3 },
      { x: 2, y: 8 },
      { x: 3, y: 13 },
      { x: 4, y: 3 },
      { x: 5, y: 9 },
      { x: 6, y: 14 },
      { x: 7, y: 6 },
      { x: 8, y: 1 },
      { x: 9, y: 7 },
      { x: 10, y: 9 },
    ],
    [
      { x: 1, y: 4 },
      { x: 2, y: 9 },
      { x: 3, y: 14 },
      { x: 4, y: 4 },
      { x: 5, y: 10 },
      { x: 6, y: 15 },
      { x: 7, y: 5 },
      { x: 8, y: 0 },
      { x: 9, y: 8 },
      { x: 10, y: 5 },
    ],
  ];

  const colors = ["blue", "green", "red", "purple"];

  const margin = { top: 20, right: 30, bottom: 30, left: 50 },
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

  const x = d3.scaleLinear().domain([0, 12]).range([0, width]);

  const y = d3.scaleLinear().domain([-1, 16]).range([height, 0]);

  //x轴设置
  const xAxis: any = d3
    .axisBottom(x)
    .ticks(10) //调节刻度大小
    .tickSize(-height)
    .tickPadding(10);

  //y轴设置
  const yAxis: any = d3.axisLeft(y).tickPadding(10).tickSize(-width);

  //缩放拖拽
  const zoom: any = d3
    .zoom()
    // .x(x)
    // .y(y)
    .scaleExtent([-10, 10]) //可缩放的范围
    .on("zoom", zoomed);

  const svg = d3
    .select("#d3Line11")
    .append("svg")
    .call(zoom)
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  svg
    .append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis);

  svg.append("g").attr("class", "y axis").call(yAxis);

  svg
    .append("g")
    .attr("class", "y axis")
    .append("text")
    .attr("class", "axis-label")
    .attr("transform", "rotate(-90)")
    .attr("y", -margin.left + 10)
    .attr("x", -height / 2)
    .text("Axis Label");

  svg
    .append("clipPath")
    .attr("id", "clip")
    .append("rect")
    .attr("width", width)
    .attr("height", height);

  const line: any = d3
    .line()
    .x(function (d: any) {
      return x(d.x);
    })
    .y(function (d: any) {
      return y(d.y);
    });

  svg
    .selectAll(".line")
    .data(data)
    .enter()
    .append("path")
    .attr("class", "line")
    .attr("fill", "none")
    // .attr("clip-path", "url(#clip)")
    .attr("stroke", function (d, i) {
      return colors[i % colors.length];
    })
    .attr("d", line);

  const points = svg
    .selectAll(".dots")
    .data(data)
    .enter()
    .append("g")
    .attr("class", "dots");
  // .attr("clip-path", "url(#clip)");

  points
    .selectAll(".dot")
    .data(function (d, index) {
      const a: any = [];
      d.forEach(function (point, i) {
        a.push({ index: index, point: point });
      });
      return a;
    })
    .enter()
    .append("circle")
    .attr("class", "dot")
    .attr("r", 2)
    .attr("fill", function (d: any, i) {
      return colors[d.index % colors.length];
    })
    .attr("transform", function (d: any) {
      return "translate(" + x(d.point.x) + "," + y(d.point.y) + ")";
    });

  function zoomed() {
    svg.select(".x.axis").call(xAxis);
    svg.select(".y.axis").call(yAxis);
    svg.selectAll("path.line").attr("d", line);

    points.selectAll("circle").attr("transform", function (d: any) {
      return "translate(" + x(d.point.x) + "," + y(d.point.y) + ")";
    });
  }
};

/**
 * 绘制曲线图
 * @param config
 * @param data
 */
export const brokenLine03 = (config: IntervalType, data: any) => {
  const div: any = d3.select(config["select"]);
  const divWidth = div.node().getBoundingClientRect().width;
  const width = divWidth - config["paddingLeft"] - config["paddingRight"];
  const height = config["height"];
  const divHeight =
    config["height"] + config["paddingTop"] + config["paddingBottom"];

  const svg = d3
    .select(config["select"])
    .append("svg")
    .attr("width", divWidth)
    .attr("height", divHeight);

  // 图形颜色
  let color: any = d3.schemeCategory10;
  if (config["color"] !== undefined && config["color"] !== null) {
    color = config["color"];
  }

  // 获取x 轴数据
  const XData = data.map((d: any) => {
    return d[config["key"]];
  });

  // 获取Y轴数据
  const values = data.map((d: any) => {
    return d[config["value"]];
  });

  // 创建 x、y 轴比例
  const xScale: any = d3
    .scaleBand()
    .domain(XData)
    .rangeRound([0, width])
    .padding(1);

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
      "translate(" + config["paddingLeft"] + "," + config["paddingTop"] + ")"
    );

  // 添加折线  创建一个新的线生成器。
  // d3.curveBasis - 三次基样条，重复端点。
  // 曲线  d3.curveCardinal - 三次基数样条，每一端都有一侧差异。
  const curve = d3.curveCardinal;
  const line = d3
    .line()
    .curve(curve)
    .x(function (d: any) {
      return xScale(d[config["key"]]);
    })
    .y(function (d: any) {
      return yScale(d[config["value"]]);
    });
  // 选择线条的类型
  // .interpolate('linear');

  // y 轴刻度比例
  const axisY = d3.axisLeft(yScale).tickSize(-width);
  // x 轴刻度比例
  const axisX = d3.axisBottom(xScale);

  g.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(axisX)
    .attr("font-size", "15")
    .attr("fon-weight", "bold");

  g.append("g").call(axisY).attr("shape-rendering", "crispEdges");

  g.append("path")
    // .attr("class", "line")
    .attr("d", line(data))
    .attr("stroke", "red")
    .attr("stroke-width", "2px")
    .attr("fill", "none");

  // 添加点
  g.selectAll("#circle")
    .data(data)
    .enter()
    .append("circle")
    .attr("id", "circle")
    .attr("cx", function (d: any) {
      return xScale(d[config["key"]]);
    })
    .attr("cy", function (d: any) {
      return yScale(d[config["value"]]);
    })
    .attr("r", 5)
    .attr("fill", function (d: any, i) {
      return color[i];
    });
};

/**
 * 双曲线
 */

export const brokenLine04 = (config: IntervalType) => {
  const data: any = [
    { month: "Jan", city: "上海", temperature: 7 },
    { month: "Jan", city: "北京", temperature: 3.9 },
    { month: "Feb", city: "上海", temperature: 6.9 },
    { month: "Feb", city: "北京", temperature: 4.2 },
    { month: "Mar", city: "上海", temperature: 9.5 },
    { month: "Mar", city: "北京", temperature: 5.7 },
    { month: "Apr", city: "上海", temperature: 14.5 },
    { month: "Apr", city: "北京", temperature: 8.5 },
    { month: "May", city: "上海", temperature: 18.4 },
    { month: "May", city: "北京", temperature: 11.9 },
    { month: "Jun", city: "上海", temperature: 21.5 },
    { month: "Jun", city: "北京", temperature: 15.2 },
    { month: "Jul", city: "上海", temperature: 25.2 },
    { month: "Jul", city: "北京", temperature: 17 },
    { month: "Aug", city: "上海", temperature: 26.5 },
    { month: "Aug", city: "北京", temperature: 16.6 },
    { month: "Sep", city: "上海", temperature: 23.3 },
    { month: "Sep", city: "北京", temperature: 14.2 },
    { month: "Oct", city: "上海", temperature: 18.3 },
    { month: "Oct", city: "北京", temperature: 10.3 },
    { month: "Nov", city: "上海", temperature: 13.9 },
    { month: "Nov", city: "北京", temperature: 6.6 },
    { month: "Dec", city: "上海", temperature: 9.6 },
    { month: "Dec", city: "北京", temperature: 4.8 },
  ];

  const data1: any = [];
  const data2: any = [];
  data.forEach((key: any) => {
    if (key["city"] === "上海") {
      const object1 = {
        month: key["month"],
        temperature: key["temperature"],
      };
      data1.push(object1);
    }
    if (key["city"] === "北京") {
      const object2 = {
        month: key["month"],
        temperature: key["temperature"],
      };
      data2.push(object2);
    }
  });

  const div: any = d3.select("#d3BrokenLine04");
  const divWidth = div.node().getBoundingClientRect().width;
  const width = divWidth - config["paddingLeft"] - config["paddingRight"];
  const height = config["height"];
  const divHeight =
    config["height"] + config["paddingTop"] + config["paddingBottom"];

  const svg = d3
    .select("#d3BrokenLine04")
    .append("svg")
    .attr("width", divWidth)
    .attr("height", divHeight);

  // 图形颜色
  let color: any = d3.schemeCategory10;
  if (config["color"] !== undefined && config["color"] !== null) {
    color = config["color"];
  }

  // 获取x 轴数据
  let XData: any = data.map((d: any) => {
    return d["month"];
  });
  XData = Array.from(new Set(XData));

  // 获取Y轴数据
  let values: any = data.map((d: any) => {
    return d["temperature"];
  });
  values = Array.from(new Set(values));

  // 创建 x、y 轴比例
  const xScale: any = d3
    .scaleBand()
    .domain(XData)
    .rangeRound([0, width])
    .padding(1);

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
      "translate(" + config["paddingLeft"] + "," + config["paddingTop"] + ")"
    );

  // 添加折线  创建一个新的线生成器。
  // d3.curveBasis - 三次基样条，重复端点。
  // 曲线  d3.curveCardinal - 三次基数样条，每一端都有一侧差异。
  const curve = d3.curveCardinal;
  const line = d3
    .line()
    .curve(curve)
    .x(function (d: any) {
      return xScale(d["month"]);
    })
    .y(function (d: any) {
      return yScale(d["temperature"]);
    });

  // y 轴刻度比例
  const axisY = d3.axisLeft(yScale).ticks(width / 100);
  // x 轴刻度比例
  const axisX = d3.axisBottom(xScale);

  g.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(axisX)
    .attr("font-size", "15")
    .attr("fon-weight", "bold");

  g.append("g").call(axisY).attr("shape-rendering", "crispEdges");
  // 画第一条曲线
  g.append("path")
    .data(data1)
    .attr("d", line(data1))
    .attr("stroke", color[1])
    .attr("stroke-width", "2px")
    .attr("fill", "none");
  // 画第二条曲线
  g.append("path")
    // .attr("class", "line")
    .attr("d", line(data2))
    .attr("stroke", color[2])
    .attr("stroke-width", "2px")
    .attr("fill", "none");

  // 添加点
  g.selectAll("#circle")
    .data(data1)
    .enter()
    .append("circle")
    .attr("id", "circle")
    .attr("cx", function (d: any) {
      return xScale(d["month"]);
    })
    .attr("cy", function (d: any) {
      return yScale(d["temperature"]);
    })
    .attr("r", 5)
    .attr("fill", function (d: any, i) {
      return color[1];
    });

  g.selectAll("#circle1")
    .data(data2)
    .enter()
    .append("circle")
    .attr("id", "circle1")
    .attr("cx", function (d: any) {
      return xScale(d["month"]);
    })
    .attr("cy", function (d: any) {
      return yScale(d["temperature"]);
    })
    .attr("r", 5)
    .attr("fill", function (d: any, i) {
      return color[2];
    });

  const legendData = ["上海", "北京"];
  legendData.map((key: any, index: any) => {
    const legend = svg.append("g");
    legend
      .append("line")
      .attr("x1", 0)
      .attr("y1", 2)
      .attr("x2", 15)
      .attr("y2", 2)
      .attr("stroke", color[index + 1])
      .attr("stroke-width", 5)
      .attr("stroke-linecap", "round");
    legend
      .append("text")
      .attr("class", "legend-label")
      .attr("dy", -13)
      .style("text-anchor", "start")
      .text(key)
      .attr("fill", "Black")
      .attr("font-size", "13")
      .attr("transform", "translate(" + 18 + "," + 20 + ")");
    legend
      .attr("id", "legend01")
      .attr(
        "transform",
        "translate(" +
          (config["paddingLeft"] * 3 + 55 * (index + 1)) +
          "," +
          config["paddingTop"] / 2 +
          ")"
      );
  });
};
