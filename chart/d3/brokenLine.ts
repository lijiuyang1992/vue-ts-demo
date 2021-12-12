/*
 * @Author: 李九阳
 * @Date: 2021-12-02 20:29:08
 * @LastEditors: 李九阳
 * @LastEditTime: 2021-12-07 16:53:16
 */
import * as d3 from "d3";
import { IntervalType } from "@/type/d3Type";
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

  // const chart = g
  //   .selectAll("#selectInterval")
  //   .data(line(data))
  //   .enter()
  //   .append("g")
  //   .attr("id", "selectInterval");

  g.append("path")
    // .attr("class", "line")
    .attr("d", line(data))
    .attr("stroke", "red")
    .attr("stroke-width", "2px")
    .attr("fill", "none")
    .attr("stroke-linecap", "round")
    .attr("stroke-linejoin", "round");

  // g
  //   .append('defs')
  //   .append('clipPath') // 添加长方形方块，遮罩作用
  //   .attr('id', 'clip')
  //   .append('rect')
  //   .attr('height', height)
  //   .attr('width', 0) // 用遮罩实现线动画
  //   .transition()
  //   .duration(1000)
  //   .attr('width', width)
  // 动画效果

  // const path: any = g.selectAll("#pathLine")
  //   .data(data)
  //   .append("path")
  //   .attr("id", "pathLine");

  //   path.enter()
  //   .merge(path)
  //   .transition()
  //   .duration(2000)
  //   .attr("d", d3.line()
  //   .x((d: any) => xScale(d[config["key"]]))
  //   .y((d: any) => yScale(d[config["value"]]))
  //   )

  //   .attr("fill", "none")
  //   .attr("stroke-width", 3.5);
  // .attr("stroke-linejoin", "round")
  // .attr("d", line(data));

  // path.selectAll("#pathLine").transition()
  // .delay((d: any, i: any) => {
  //   return i * 200;
  // })
  // .duration(2000)
  // .ease(d3.easePolyOut)
  // .attr("stroke", "red")
  // .attr("stroke-width", "2px");

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

  const svg: any = d3
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
    .attr("fill", function (d: any, i: any) {
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
    .attr("fill", function (d: any, i: any) {
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

export const line100 = () => {
  const div: any = d3.select("#d3Line100");
  const containerWidth = div.node().getBoundingClientRect().width;
  const data: any = [
    { date: "2009", apple: 130, banana: 40 },
    { date: "2010", apple: 137, banana: 58 },
    { date: "2011", apple: 166, banana: 97 },
    { date: "2012", apple: 154, banana: 117 },
    { date: "2013", apple: 179, banana: 98 },
    { date: "2014", apple: 187, banana: 120 },
    { date: "2015", apple: 189, banana: 84 },
    { date: "2016", apple: 210, banana: 53 },
  ];
  const margin = { top: 80, right: 80, bottom: 30, left: 60 };
  const width = containerWidth - margin.left - margin.right;
  const height = 500 - margin.top - margin.bottom;
  const labelPadding = 3;
  const chart: any = d3
    .select("#d3Line100")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom);
  const g = chart
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")"); // 设最外包层在总图上的相对位置

  const names: any = { apple: "苹果", banana: "香蕉" };

  // const series = data.map(function (d: any) {
  //   return {
  //     key: key,
  //     date: d3.timeParse('%Y')(d.date),
  //     value: d[key]
  //   }
  // });
  const series: any = [
    [
      { date: "2009", value: 130, key: "apple" },
      { date: "2010", value: 137, key: "apple" },
      { date: "2011", value: 166, key: "apple" },
      { date: "2012", value: 154, key: "apple" },
      { date: "2013", value: 179, key: "apple" },
      { date: "2014", value: 187, key: "apple" },
      { date: "2015", value: 189, key: "apple" },
      { date: "2016", value: 210, key: "apple" },
    ],
    [
      { date: "2009", key: "banana", value: 40 },
      { date: "2010", key: "banana", value: 58 },
      { date: "2011", key: "banana", value: 97 },
      { date: "2012", key: "banana", value: 117 },
      { date: "2013", key: "banana", value: 98 },
      { date: "2014", key: "banana", value: 120 },
      { date: "2015", key: "banana", value: 84 },
      { date: "2016", key: "banana", value: 53 },
    ],
  ];
  // const series = d3
  //     .map(data)
  //     .keys()
  //     .slice(1)
  //     .map(function(key: any) {
  //       // 生成两条线的数组
  //       return data.map(function(d: any) {
  //         return {
  //           key: key,
  //           date: d3.timeParse('%Y')(d.date),
  //           value: d[key]
  //         }
  //       })
  //     });

  const xDomain: any = [data[0].date, data[data.length - 1].date];
  const x = d3
    .scaleTime() // 定义x轴
    .domain(xDomain)
    .range([0, width]);
  const maxY: any = d3.max(series, function (s: any) {
    return d3.max(s, function (d: any) {
      return d.value;
    });
  });
  const y = d3
    .scaleLinear() // 定义y轴
    .domain([0, maxY])
    .range([height, 0]);

  const z = d3.scaleOrdinal(d3.schemeCategory10); // 通用线条的颜色

  const line: any = d3
    .line()
    .x(function (d: any) {
      return x(d.date);
    })
    .y(function (d: any) {
      return y(d.value);
    });

  chart
    .append("defs")
    .append("clipPath") // 添加长方形方块，遮罩作用
    .attr("id", "clip")
    .append("rect")
    .attr("height", height)
    .attr("width", 0) // 用遮罩实现线动画
    .transition()
    .duration(1000)
    .attr("width", width);
  const timeFormat: any = d3.timeFormat("%Y年");
  g.append("g") // 生成x轴
    .attr("class", "axis axis--x")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x).tickFormat(timeFormat));

  const serie = g
    .selectAll(".serie") // 生成两线条
    .data(series)
    .enter()
    .append("g")
    .attr("class", "serie");
  const labelData = () => {
    serie
      .append("path") // 绘画线条
      .transition()
      .delay(250)
      .duration(4000)
      .ease(d3.easeLinear)
      .attr("clip-path", "url(#clip)")
      .attr("class", "line")
      .style("stroke", function (d: any) {
        return z(d[0].key);
      })
      .attr("fill", "none")
      .attr("d", line);

    const label: any = serie
      .selectAll(".label") // 生成文字包层
      .data(function (d: any) {
        return d;
      })
      .enter()
      .append("g")
      .attr("class", "label")
      .attr("transform", function (d: any, i: any) {
        return "translate(" + x(d.date) + "," + y(d.value) + ")";
      });

    label
      .append("text") // 生成数值文字
      .attr("dy", ".35em")
      .attr("fill", "#000")
      .text(function (d: any) {
        return d.value + " 吨";
      })
      .filter(function (d: any, i: any) {
        return i === data.length - 1;
      })
      .append("tspan") // 生成名文字
      .attr("class", "label-key")
      .attr("fill", "#000")
      .attr("font-size", "14px")
      .text(function (d: any) {
        return " " + names[d.key];
      });

    label
      .insert("rect", "text") // 生成背景白块
      .datum(function () {
        const rect: any = d3.selectAll("rect");
        return rect.node().getBBox();
      })
      .attr("fill", "#fff")
      .attr("x", function (d: any) {
        return d.x - labelPadding;
      })
      .attr("y", function (d: any) {
        return d.y - labelPadding;
      })
      .attr("width", function (d: any) {
        return d.width + 2 * labelPadding;
      })
      .attr("height", function (d: any) {
        return d.height + 2 * labelPadding;
      });
  };
  chart
    .append("g") // 输出标题
    .attr("class", "line-title")
    .append("text")
    .attr("fill", "#000")
    .attr("font-weight", "700")
    .attr(
      "transform",
      "translate(" + (width / 2 + margin.left) + "," + 20 + ")"
    )
    .attr("text-anchor", "middle")
    .attr("x", 0)
    .attr("y", 0)
    .text("最近几年XX本地年产苹果香蕉数量");
  labelData();
  //   setInterval(() => {
  //     serie.remove("path");
  //     labelData();
  // }, 10000);
};

export const line102 = () => {
  const div: any = d3.select("#d3Line102");
  const containerWidth = div.node().getBoundingClientRect().width;
  const data = [
    { time: "00:00", pm25: 75 },
    { time: "01:00", pm25: 66 },
    { time: "02:00", pm25: 43 },
    { time: "03:00", pm25: 32 },
    { time: "04:00", pm25: 20 },
    { time: "05:00", pm25: 18 },
    { time: "06:00", pm25: 16 },
    { time: "07:00", pm25: 33 },
    { time: "08:00", pm25: 53 },
    { time: "09:00", pm25: 66 },
    { time: "10:00", pm25: 55 },
    { time: "11:00", pm25: 67 },
    { time: "12:00", pm25: 99 },
    { time: "13:00", pm25: 138 },
    { time: "14:00", pm25: 110 },
    { time: "15:00", pm25: 99 },
    { time: "16:00", pm25: 119 },
    { time: "17:00", pm25: 125 },
    { time: "18:00", pm25: 173 },
    { time: "19:00", pm25: 168 },
    { time: "20:00", pm25: 162 },
    { time: "21:00", pm25: 143 },
    { time: "22:00", pm25: 132 },
    { time: "23:00", pm25: 87 },
  ];
  const margin = { top: 80, right: 80, bottom: 30, left: 60 };
  const width = containerWidth - margin.left - margin.right;
  const height = 500 - margin.top - margin.bottom;
  const labelPadding = 3;
  const chart = d3
    .select("#d3Line102")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom);
  const g = chart
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")"); // 设最外包层在总图上的相对位置
  const timeParse = d3.timeParse("%H:%M");

  const key = Object.keys(data[0])[1];
  const serieArr = data.map(function (d: any) {
    return {
      key: key,
      time: timeParse(d.time),
      value: d[key],
    };
  });
  const maxValue = d3.max(serieArr, function (d) {
    return d.value;
  });
  const stepValue = 50; // 用于生成背景柱
  const rangeByStep = d3.range(0, maxValue, stepValue); // 用于生成背景柱
  const colors = [
    "#6bcd07",
    "#fbd029",
    "#fe8800",
    "#fe0000",
    "#970454",
    "#62001e",
  ]; // 用于生成背景柱
  const names = ["优", "良", "轻度污染", "中度污染", "重度污染", "严重污染"];
  const domain: any = [serieArr[0].time, serieArr[data.length - 1].time];
  const x = d3
    .scaleTime() // 定义x轴
    .domain(domain)
    .range([0, width]);

  const y = d3
    .scaleLinear() // 定义y轴
    .domain([0, maxValue])
    .range([height, 0]);

  const z = d3.scaleOrdinal(d3.schemeCategory10); // 通用线条的颜色

  const line: any = d3
    .line()
    .curve(d3.curveMonotoneX)
    .x(function (d: any) {
      return x(d.time);
    })
    .y(function (d: any) {
      return y(d.value);
    });

  // let tip = d3Tip() // 设置tip
  //   .attr('class', 'd3-tip')
  //   .offset([-10, 0])
  //   .html(function (d) {
  //     return (
  //       '<strong>时间 ' +
  //       d3.timeFormat('%H : %M')(d.time) +
  //       "<br>AQI 值:</strong> <span style='color:#ffeb3b'>" +
  //       d.value +
  //       '</span>'
  //     )
  //   })

  // chart.call(tip)

  chart
    .append("defs")
    .append("clipPath") // 添加长方形方块，遮罩作用
    .attr("id", "clip")
    .append("rect")
    .attr("height", height)
    .attr("width", 0) // 用遮罩实现线动画
    .transition()
    .duration(1000)
    .attr("width", width);

  g.append("g") // 设置y轴
    .attr("class", "axis axis--y")
    .call(d3.axisLeft(y).tickValues(d3.range(0, maxValue, stepValue)))
    .append("text")
    .attr("y", -16)
    .attr("dy", ".71em")
    .style("text-anchor", "middle")
    .style("fill", "#000")
    .text("AQI 值");

  g.append("g") // 设置背景柱
    .attr("class", "lineii--bg-bar")
    .selectAll("rect")
    .data(rangeByStep)
    .enter()
    .append("rect")
    .attr("stroke", "none")
    .attr("stroke-width", 0)
    .attr("fill", function (d, i) {
      return colors[i];
    })
    .attr("x", 1)
    .attr("width", width)
    .attr("height", function (d, i) {
      if (i !== rangeByStep.length - 1) {
        return y(maxValue - stepValue);
      } else {
        return y(rangeByStep[rangeByStep.length - 1]);
      }
    })
    .attr("y", function (d, i) {
      if (i !== rangeByStep.length - 1) {
        return y(rangeByStep[i + 1]);
      } else {
        return 0;
      }
    });

  g.append("g") // 设置背景柱文字
    .attr("class", "lineii--bg-bar-text")
    .selectAll(".ylabel") // 生成右边文字
    .data(rangeByStep)
    .enter()
    .append("text")
    .attr("class", "ylabel")
    .attr("fill", "#fff")
    .attr("font-size", "24px")
    .attr("x", width / 2)
    .attr("y", function (d, i) {
      if (i !== rangeByStep.length - 1) {
        return y(rangeByStep[i + 1]);
      } else {
        return 0;
      }
    })
    .attr("dy", function (d, i) {
      if (i !== rangeByStep.length - 1) {
        return y(maxValue - stepValue) / 2;
      } else {
        return y(rangeByStep[rangeByStep.length - 1]) / 2 + 8;
      }
    })
    .attr("text-anchor", "middle")
    .text(function (d, i) {
      return names[i];
    });

  const tickFormat: any = d3.timeFormat("%H:%M");
  g.append("g") // 生成x轴
    .attr("class", "axis axis--x")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x).ticks(24).tickFormat(tickFormat));

  g.selectAll(".axis--x .tick") // xx轴背景线
    .append("line")
    .attr("class", "bg-line")
    .attr("stroke", "rgba(255,255,255,0.5)")
    .attr("stroke-dasharray", "2,2")
    .attr("shape-rendering", "crispEdges")
    .attr("transform", "translate(" + 0 + "," + -1 * height + ")")
    .attr("y2", height);
  g.select(".bg-line").remove();

  const serie = g
    .selectAll(".serie") // 生成线条
    .data([serieArr])
    .enter()
    .append("g")
    .attr("class", "serie");

  serie
    .append("path") // 绘画线条
    .attr("clip-path", "url(#clip)")
    .attr("class", "line")
    .style("stroke", function (d) {
      return z(d[0].key);
    })
    .style("stroke-width", 2)
    .attr("fill", "none")
    .attr("d", line);

  const label = serie
    .selectAll(".label") // 生成文字包层
    .data(function (d) {
      return d;
    })
    .enter()
    .append("g")
    // .on('mouseover', tip.show)
    // .on('mouseout', tip.hide)
    .attr("cursor", "pointer")
    .attr("class", "label")
    .attr("transform", function (d: any, i) {
      return "translate(" + x(d.time) + "," + y(d.value) + ")";
    });

  label
    .append("text") // 生成数值文字
    .attr("dy", ".35em")
    .attr("fill", "#fff")
    .attr("text-anchor", "middle")
    .text(function (d) {
      return d.value;
    });

  label
    .insert("rect", "text") // 生成背景白块
    .datum(function () {
      const rect: any = d3.selectAll("rect");
      return rect.node().getBBox();
    })
    .attr("fill", "rgba(0,0,0,0.5)")
    .attr("rx", "5px")
    .attr("ry", "5px")
    .attr("x", function (d: any) {
      return d.x - labelPadding;
    })
    .attr("y", function (d: any) {
      return d.y - labelPadding;
    })
    .attr("width", function (d: any) {
      return d.width + 2 * labelPadding;
    })
    .attr("height", function (d: any) {
      return d.height + 2 * labelPadding;
    });

  chart
    .append("g") // 输出标题
    .attr("class", "line-title")
    .append("text")
    .attr("fill", "#000")
    .attr("font-weight", "700")
    .attr(
      "transform",
      "translate(" + (width / 2 + margin.left) + "," + 20 + ")"
    )
    .attr("text-anchor", "middle")
    .attr("x", 0)
    .attr("y", 0)
    .text("XX市昨天PM2.5及空气质量指数(AQI)");
};
