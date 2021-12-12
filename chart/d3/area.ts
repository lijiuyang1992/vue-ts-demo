/*
 * @Author: 李九阳
 * @Date: 2021-12-03 13:31:39
 * @LastEditors: 李九阳
 * @LastEditTime: 2021-12-09 10:42:16
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
    .curve(d3.curveMonotoneX)
    .x(function (d: any, i) {
      return scale_x(i);
    }) //曲线中x的值
    .y0(g_height) //相当于x坐标
    .y1(function (d: any) {
      return scale_y(d);
    }); //曲线中y的值
  // .curve(curve); //把曲线设置光滑

  d3.select("g")
    .append("path")
    .datum(data)
    .attr("d", area_generator)
    .attr("stroke", "none")
    .attr("stroke-width", 1)
    .attr("clip-path", "url(#clip)")
    .attr("fill", "steelblue");
  // .attr("d", area_generator(data))
  // .style("fill", "cornflowerblue");

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
  // const extent: any = d3.extent(XData, (d: any) => {
  //   return d;
  // });
  // const xScale: any =d3.scaleTime()
  // .range([0, width])
  // .domain(extent);

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
  // const timeFormat: any =d3.timeFormat('%Y年');
  // const axisX = d3.axisBottom(xScale).tickFormat(timeFormat);

  const g = svg
    .append("g")
    .attr("id", "selectArea")
    .attr(
      "transform",
      "translate(" + config["paddingLeft"] + "," + config["paddingTop"] + ")"
    );

  // const curve = d3.curveCardinal;
  // const curveMonotoneX = d3.curveMonotoneX;
  const area_generator = d3
    .area() //d3中绘制面积的函数
    .curve(d3.curveMonotoneX)
    .x(function (d: any, i) {
      return xScale1(i);
    }) //曲线中x的值
    .y0(height) //相当于x坐标
    .y1(function (d: any) {
      return yScale(d);
    }); //曲线中y的值
  // console.log(objectData["Asia"]);
  // d3.select("#selectArea").append("path")
  //     .attr("d", area_generator(objectData["Asia"]))
  //     .style("fill", "currentColor");
  let index = 0;
  for (const key in objectData) {
    // d3.select("#selectArea")
    //   .append("path")
    //   .attr("d", area_generator(objectData[key]))
    //   .style("fill", color[index]);
    d3.select("g")
      .append("path")
      .datum(objectData[key])
      .attr("d", area_generator)
      .attr("stroke", "none")
      .attr("stroke-width", 1)
      .attr("clip-path", "url(#clip)")
      .attr("fill", "steelblue");
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

export const d3Area04 = (config: IntervalType) => {
  const rawData = [
    { day: "2015-01", quantity: 1240 },
    { day: "2015-02", quantity: 1905 },
    { day: "2015-03", quantity: 6232 },
    { day: "2015-04", quantity: 7545 },
    { day: "2015-05", quantity: 543 },
    { day: "2015-06", quantity: 443 },
    { day: "2015-07", quantity: 246 },
    { day: "2015-08", quantity: 5445 },
    { day: "2015-09", quantity: 1154 },
    { day: "2015-10", quantity: 448 },
    { day: "2015-11", quantity: 1545 },
    { day: "2015-12", quantity: 4585 },
    { day: "2016-01", quantity: 1520 },
    { day: "2016-02", quantity: 9015 },
    { day: "2016-03", quantity: 632 },
    { day: "2016-04", quantity: 745 },
    { day: "2016-05", quantity: 343 },
    { day: "2016-06", quantity: 6443 },
    { day: "2016-07", quantity: 546 },
    { day: "2016-08", quantity: 1545 },
    { day: "2016-09", quantity: 1354 },
    { day: "2016-10", quantity: 848 },
    { day: "2016-11", quantity: 2155 },
    { day: "2016-12", quantity: 4585 },
    { day: "2017-01", quantity: 1540 },
    { day: "2017-02", quantity: 905 },
    { day: "2017-03", quantity: 632 },
    { day: "2017-04", quantity: 745 },
    { day: "2017-05", quantity: 3543 },
    { day: "2017-06", quantity: 4443 },
    { day: "2017-07", quantity: 2546 },
    { day: "2017-08", quantity: 545 },
    { day: "2017-09", quantity: 154 },
    { day: "2017-10", quantity: 4848 },
    { day: "2017-11", quantity: 155 },
    { day: "2017-12", quantity: 4585 },
  ];

  const div: any = d3.select("#d3Area04");
  const divWidth = div.node().getBoundingClientRect().width;
  const width = divWidth - config["paddingLeft"] - config["paddingRight"];
  const height = config["height"];
  const divHeight =
    config["height"] + config["paddingTop"] + config["paddingBottom"];

  const margin = { top: 80, right: 40, bottom: 130, left: 40 };
  const margin2 = { top: 410, right: 40, bottom: 60, left: 40 };
  // const width = containerWidth - margin.left - margin.right
  // const height = 500 - margin.top - margin.bottom
  const height2 = 500 - margin2.top - margin2.bottom;

  const chart = d3
    .select("#d3Area04")
    .append("svg")
    .attr("width", divWidth)
    .attr("height", divHeight);

  const parseDate = d3.timeParse("%Y-%m");

  const data = rawData.map((item) => {
    // 把原始数据转为d3可接受的数据
    return { ...item, day: parseDate(item.day) };
  });

  const extent: any = d3.extent(data, function (d) {
    return d.day;
  });
  const x = d3
    .scaleTime() // 创建时间的线性刻度。
    .range([0, width])
    .domain(extent); // 设置 x轴

  const x2 = d3.scaleTime().range([0, width]).domain(x.domain()); // 设置subChart x轴

  const max: any = d3.max(data, function (d) {
    return d.quantity;
  });
  const y = d3.scaleLinear().rangeRound([height, 0]).domain([0, max]); // 设置 y轴

  const y2 = d3.scaleLinear().range([height2, 0]).domain(y.domain()); // 设置subChart y轴

  const brush: any = d3
    .brushX() // 设置brush
    .extent([
      [0, 0],
      [width, height2],
    ]);
  // .on('brush end', brushed)

  const zoom: any = d3
    .zoom() // 设置zoom
    .scaleExtent([1, Infinity])
    .translateExtent([
      [0, 0],
      [width, height],
    ])
    .extent([
      [0, 0],
      [width, height],
    ]);
  // .on('zoom', zoomed)

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

  /***  mainChart部分  ***/
  const mainAreaPath: any = d3
    .area() // 设置mainChart面积图路径
    .curve(d3.curveMonotoneX)
    .x(function (d: any, i) {
      return x(d.day);
    })
    .y1(function (d: any, i) {
      return y(d.quantity);
    })
    .y0(y(0));

  const tickForm: any = d3.timeFormat("%Y年%m月");
  const xAxis: any = d3.axisBottom(x).tickFormat(tickForm);

  const mainChart = chart
    .append("g")
    .attr("class", "main-chart")
    .attr(
      "transform",
      "translate(" + config["paddingLeft"] + "," + config["paddingTop"] + ")"
    ); // 设mainChart在最外包层在总图上的相对位置

  mainChart
    .append("g") // 设置x轴
    .attr("class", "axis axis--x")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis);

  mainChart
    .append("g") // 设置y轴
    .attr("class", "axis axis--y")
    .call(d3.axisLeft(y).ticks(10))
    .append("text")
    .attr("y", -16)
    .attr("dy", ".71em")
    .style("text-anchor", "middle")
    .style("fill", "#000")
    .text("顾客人数 (人)");

  mainChart
    .selectAll(".axis--y .tick") // 画背景线
    .append("line")
    .attr("class", "bg-line")
    .attr("stroke", "#fff1c9")
    .attr("shape-rendering", "crispEdges")
    .attr("x2", width);
  mainChart.select(".axis--y .bg-line:last-of-type").remove();

  mainChart
    .append("path") // 画面积图
    .attr("class", "area")
    .datum(data)
    .attr("d", mainAreaPath)
    .attr("stroke", "none")
    .attr("stroke-width", 1)
    .attr("clip-path", "url(#clip)")
    .attr("fill", "steelblue");

  const circles = mainChart.append("g"); // 输出点

  const values = mainChart
    .append("g") // 输出图上的数值
    .attr("class", "area--text");

  /***  subChart部分  ***/
  // const subAreaPath: any = d3
  //   .area() // 设置subChart面积图路径
  //   .curve(d3.curveMonotoneX)
  //   .x(function (d: any) {
  //     return x2(d.day)
  //   })
  //   .y0(height2)
  //   .y1(function (d: any) {
  //     return y2(d.quantity)
  //   })
  // const subChart = chart
  //   .append('g')
  //   .attr('class', 'sub-chart')
  //   .attr('transform', 'translate(' + margin2.left + ',' + margin2.top + ')') // 设subChart在最外包层在总图上的相对位置

  // const timeFormat02: any = d3.timeFormat('%Y年%m月');
  // subChart
  //   .append('g') // 设置x轴
  //   .attr('class', 'axis axis--x')
  //   .attr('transform', 'translate(0,' + height2 + ')')
  //   .call(d3.axisBottom(x2).tickFormat(timeFormat02))

  // subChart
  //   .append('path') // 画面积图
  //   .attr('class', 'area')
  //   .datum(data)
  //   .attr('d', subAreaPath)
  //   .attr('stroke', 'none')
  //   .attr('stroke-width', 1)
  //   .attr('fill', 'steelblue')

  // subChart
  //   .append('g') // 添加画刷
  //   .attr('class', 'brush')
  //   // .call(brush)
  //   // .call(brush.move, [(width * 2) / 3, width])

  /***  其他部分  ***/
  chart
    .append("rect") // 添加刷放方块
    .attr("class", "zoom")
    .attr("width", width)
    .attr("height", height)
    .attr("cursor", "move")
    .attr("pointer-events", "all")
    .attr("fill", "none")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
  // .call(zoom)

  chart
    .append("g") // 输出标题
    .attr("class", "chart--title")
    .append("text")
    .attr("fill", "#000")
    .attr("font-size", "16px")
    .attr("font-weight", "700")
    .attr("transform", "translate(" + 0 + "," + 20 + ")")
    .attr("text-anchor", "middle")
    .attr("x", width / 2)
    .attr("y", 0)
    .text("2017年饭店每月接待顾客人数");

  // 函数部分
  function brushed() {
    // if (d3.brush().sourceEvent && d3.event.sourceEvent.type === 'zoom') return // ignore brush-by-zoom
    const s: any = d3.selection() || x2.range();
    x.domain(s.map(x2.invert, x2));
    mainChart.select(".area").attr("d", mainAreaPath);
    mainChart.select(".axis--x").call(xAxis);
    addPointsAndValues();
    chart
      .select(".zoom")
      .call(
        zoom.transform,
        d3.zoomIdentity.scale(width / (s[1] - s[0])).translate(-s[0], 0)
      );
  }

  function zoomed() {
    // if (d3.zoom().sourceEvent && d3.zoom().sourceEvent.type === 'brush') return // ignore zoom-by-brush
    const t = d3.zoomIdentity; // 身份转换。zoomTransform()获取给定元素的缩放变换。
    x.domain(t.rescaleX(x2).domain());
    mainChart.select(".area").attr("d", mainAreaPath);
    mainChart.select(".axis--x").call(xAxis);
    addPointsAndValues();
    //  subChart.select('.brush').call(brush.move, x.range().map(t.invertX, t))
  }

  function addPointsAndValues() {
    // 动态修改添加的点和值
    circles.selectAll("circle").remove();
    circles
      .selectAll("circle")
      .attr("class", "points")
      .data(data)
      .enter()
      .append("circle")
      .attr("fill", function (d: any) {
        const cx = x(d.day);
        if (cx >= 0 && cx <= width) {
          return "orange";
        } else {
          return "none";
        }
      })
      .attr("cx", function (d: any) {
        return x(d.day);
      })
      .attr("cy", function (d) {
        return y(d.quantity);
      })
      .attr("r", 5);

    values.selectAll("text").remove();
    values
      .selectAll("text")
      .data(data)
      .enter()
      .append("text")
      .attr("fill", function (d: any) {
        const cx = x(d.day);
        if (cx >= 0 && cx <= width) {
          return "#000";
        } else {
          return "none";
        }
      })
      .attr("font-size", "12px")
      .attr("text-anchor", "middle")
      .attr("x", function (d: any, i) {
        return x(d.day);
      })
      .attr("y", function (d) {
        return y(d.quantity);
      })
      .attr("dx", "1.5em")
      .attr("dy", "0.1em")
      .text(function (d) {
        return d.quantity;
      });
  }

  /******** 结束 *******/
};
