/*
 * @Author: 李九阳
 * @Date: 2021-11-30 10:19:13
 * @LastEditors: 李九阳
 * @LastEditTime: 2021-12-07 16:38:51
 */
import * as d3 from "d3";
import { IntervalType } from "@/type/d3Type";
export const inTerval = (config: IntervalType, data: any) => {
  const div: any = d3.select(config["select"]);
  const divWidth = div.node().getBoundingClientRect().width;
  const width = divWidth - config["paddingLeft"] - config["paddingRight"];
  const height = config["height"];
  const divHeight =
    config["height"] + config["paddingTop"] + config["paddingBottom"];
  const width1 = div.style("width"); //"120px"
  const svg = d3
    .select(config["select"])
    .append("svg")
    .attr("width", divWidth)
    .attr("height", divHeight);

  // 图形颜色
  let color = d3.schemeCategory10;
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
      "translate(" + config["paddingLeft"] + "," + config["paddingTop"] + ")"
    );

  // g.attr("class", "headerText")
  //     .append("text")
  //     .attr(
  //         "transform",
  //         "translate(" + config["width"] / 2 + "," + -config["paddingTop"] / 2 + ")"
  //     )
  //     .attr("text-anchor", "middle")
  //     .attr("font-weight", 600)
  //     .text("图标");

  // y 轴刻度比例
  const axisY = d3.axisLeft(yScale);
  // x 轴刻度比例
  const axisX = d3.axisBottom(xScale);

  g.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(axisX)
    .attr("fon-weight", "bold");

  g.append("g").call(axisY);

  const chart = g
    .selectAll("#selectInterval")
    .data(data)
    .enter()
    .append("g")
    .attr("id", "selectInterval");

  const transition = () => {
    // 添加矩形元素
    chart
      .append("rect")
      .attr("border-radius", "6px")
      .style("fill", (d: any, i: any) => {
        return color[i];
      })
      .attr("x", (d: any) => {
        const key = d[config["key"]];
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
        const value = d[config["value"]];
        return yScale(value);
      })
      .attr("height", (d: any) => {
        const value = d[config["value"]];
        return height - yScale(value);
      })
      .attr("width", xScale.bandwidth());

    chart
      .append("text")
      .attr("font-weight", 500)
      .attr("x", (d: any) => {
        const key = d[config["key"]];
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
        const value = d[config["value"]];
        return yScale(value);
      })
      .attr("dx", xScale.bandwidth() / 2)
      .attr("dy", -10)
      .attr("text-anchor", "middle")
      .text((d: any) => {
        const value = d[config["value"]];
        return value;
      })
      .style("fill", (d: any, i: any) => {
        return color[i];
      });
  };
  transition();
};

export const interval02 = () => {
  const datax = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const datay: any = [
    [120, 200, 150, 80, 70, 110, 130],
    [100, 100, 130, 70, 10, 120, 135],
    [160, 120, 120, 90, 20, 140, 130],
  ];
  // 用来保存点击时的状态
  const legendStatus = [true, true, true];

  const width = 800,
    height = 400,
    padding = {
      top: 40,
      right: 40,
      bottom: 40,
      left: 40,
    };
  const sp = d3.schemeSet2;
  const svg = d3
    .select("#d3InTerval02")
    .append("svg")
    .attr("width", width + "px")
    .attr("height", height + "px");

  // x轴
  const xScale: any = d3
    .scaleOrdinal()
    .domain(datax)
    .range([100, 200, 300, 400, 500, 600, 700]);

  const xAxis: any = d3.axisBottom(xScale);

  svg
    .append("g")
    .call(xAxis)
    .attr("transform", "translate(0," + (height - padding.bottom) + ")")
    .selectAll("text")
    .attr("dx", "50px");

  // y轴
  const max: any = d3.max(d3.merge([datay[0], datay[1], datay[2]]));
  const yScale: any = d3
    .scaleLinear()
    .domain([0, max])
    .range([height - padding.bottom, padding.top]);
  const yAxis = d3.axisLeft(yScale);

  svg
    .append("g")
    .call(yAxis)
    .attr("transform", "translate(" + 100 + ",0)");

  // 这里使用了forEach 考虑到计算柱子偏移量可能会方便一点  也可以直接
  /**
   *
   * var container = svg.selectAll(".container")
   *                  .data(datay)
   *                  .join("g")
   *				    .attr("class", ".container");
   *
   */

  datay.forEach((item: any, index: any) => {
    const bar = svg
      .selectAll(".bar" + index)
      .data(item)
      .enter()
      .append("g")
      .attr("class", "bar" + index)
      .attr("transform", function (d, i) {
        const _d = (100 / datay.length) * index;
        return "translate(" + (xScale(i * 100) + _d) + "," + yScale(d) + ")";
      });

    // 柱
    bar
      .append("rect")
      .attr("x", 1)
      .attr("width", 100 / datay.length)
      .attr("height", function (d) {
        return height - yScale(d) - padding.bottom;
      })
      .attr("stroke", "White")
      .attr("fill", sp[index]);

    bar
      .append("text")
      .attr("dy", ".75em")
      .attr("y", 6)
      .attr("x", 100 / (datay.length * 2))
      .attr("text-anchor", "middle")
      .attr("font-size", "8px")
      .attr("fill", "White")
      .text((d: any) => {
        return d;
      });

    // 图例
    const legend = svg.append("g");
    const line = legend
      .append("line")
      .attr("x1", 0)
      .attr("y1", 2)
      .attr("x2", 15)
      .attr("y2", 2)
      .attr("stroke", sp[index])
      .attr("stroke-width", 5);
    const text = legend
      .append("text")
      .attr("class", "legend-label")
      .attr("dy", -13)
      .style("text-anchor", "start")
      .text("data" + index)
      .attr("fill", "Black")
      .attr("font-size", "13")
      .attr("transform", "translate(" + 18 + "," + 20 + ")");
    // 图例对应的点击事件
    legend
      .attr(
        "transform",
        "translate(" +
          (padding.left * 3 + index * 100) +
          "," +
          padding.top / 2 +
          ")"
      )
      .on("click", function () {
        const _this = d3.select(this);
        const _i = parseInt(_this.select("text").text().split("data")[1]);

        if (legendStatus[_i]) {
          _this.selectAll("line").attr("stroke", "#d3d3d3");
          _this.selectAll("text").attr("fill", "#d3d3d3");

          svg.selectAll(".bar" + _i).attr("display", "none");
        } else {
          _this.selectAll("line").attr("stroke", sp[_i]);
          _this.selectAll("text").attr("fill", "#Black");

          svg.selectAll(".bar" + _i).attr("display", "show");
        }

        legendStatus[_i] = !legendStatus[_i];
      });
  });
};

// 立体柱状图
export const stereohistogram = () => {
  const width = 500;
  const height = 500;
  const pdata = 80;
  const svg = d3
    .select("#devSelectPie")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g");

  // 画百分比
  svg
    .append("text")
    .attr("x", width / 2 - 20) //文本的起点 x坐标
    .attr("y", height / 6) // 文本起点 y坐标
    .attr("class", "percent_text")
    .text(pdata + "%");

  // 画椭圆
  svg
    .append("ellipse")
    .attr("cx", 0)
    .attr("cy", 0)
    .attr("rx", width / 2 - 20)
    .attr("ry", height / 4)
    .attr("class", "circle_line")
    .attr(
      "transform",
      "translate(" + width / 2 + "," + (height * 1.2) / 2 + ")"
    );

  svg
    .append("ellipse")
    .attr("cx", 0)
    .attr("cy", 0)
    .attr("rx", width / 8)
    .attr("ry", height / 13)
    .attr("class", "circle_line")
    .attr("transform", "translate(" + width / 2 + "," + (height / 2 + 5) + ")");

  svg
    .append("ellipse")
    .attr("cx", 0)
    .attr("cy", 0)
    .attr("rx", width / 15)
    .attr("ry", height / 22)
    .attr("class", "circle_line")
    .attr("transform", "translate(" + width / 2 + "," + (height / 2 + 5) + ")");

  svg
    .append("ellipse")
    .attr("cx", 0)
    .attr("cy", 0)
    .attr("rx", width / 25)
    .attr("ry", height / 40)
    .attr("fill", "#2D3C41")
    .attr("transform", "translate(" + width / 2 + "," + (height / 2 + 5) + ")");

  // 切分成32个小齿轮
  const baseColor = "#2D3C41"; // 暗颜色
  const color = "#5D858D"; // 亮颜色
  const colorSize = Math.round((16.0 * pdata) / 100.0); // 连颜色数量
  const dataset = [];
  let index = 1;

  while (index < colorSize * 2) {
    if (index % 2 == 0)
      dataset.push({
        label: index.toString(),
        value: 3.125,
        color: "transparent",
      });
    // 缝隙
    else dataset.push({ label: index.toString(), value: 3.125, color: color }); // 亮颜色
    index++;
  }

  while (index <= 32) {
    if (index % 2 == 0)
      dataset.push({
        label: index.toString(),
        value: 3.125,
        color: "transparent",
      });
    // 缝隙
    else
      dataset.push({ label: index.toString(), value: 3.125, color: baseColor }); // 暗颜色
    index++;
  }

  // 增加左侧面和右侧面
  // 画3D饼图
  // svg.append("g").attr("id", "salesDonut");
  // d3.draw("salesDonut", dataset, width / 2, height / 2, width / 2 - 30, height / 4, 10, 0.6);
};

/**
 * 地球图
 */
export const interval04 = () => {
  /**
   * Create spherical spiral for given turns with almost same gap distance
   * @see [Archimedean Spherical Spiral]{@link http://en.wikipedia.org/wiki/Spiral#Spherical_spiral}
   * @param {number} turns - Times of turns around z-axis
   * @param {number} [count=800] - Number of points on spiral
   * @param {number} [radius=1] - Radius of sphere
   * @returns {Point[]} - Points (r,θ,φ) of spiral in spherical coordinates
   */
  const createSphericalSpiral = (
    turns: any,
    count: any,
    radius?: any
  ): any[] => {
    "use strict";
    // Spherical coordinate system in mathematics
    // (radial distance r, azimuthal angle θ, polar angle φ)
    // @see [Spherical coordinate system]{@link http://en.wikipedia.org/wiki/Spherical_coordinate_system}
    count = count || 800;
    radius = radius || 1;
    const step = 2 / count;
    let phi, theta, point;
    const points = [];
    for (let i = -1; i <= 1; i += step) {
      phi = Math.acos(i);
      theta = (2 * turns * phi) % (2 * Math.PI);
      point = {
        radius: radius,
        theta: theta,
        phi: phi,
      };
      points.push(point);
    }
    return points;
  };

  /**
   * Convert from spherical coordinates (r,θ,φ) to Cartesian coordinates (x,y,z)
   * @see {@link http://en.wikipedia.org/wiki/Spherical_coordinate_system#Cartesian_coordinates}
   * @param {{radius:number,theta:number,phi:number}} point - Point in spherical coordinates
   * @returns {{x:number,y:number,z:number}} - Point in Cartesian coordinates
   */
  const convert2xyz = (point: any) => {
    "use strict";
    const x = point.radius * Math.sin(point.phi) * Math.sin(point.theta);
    const y = point.radius * Math.sin(point.phi) * Math.cos(point.theta);
    const z = point.radius * Math.cos(point.phi);
    return {
      x: x,
      y: y,
      z: z,
    };
  };

  // useage
  // var spiral = createSphericalSpiral(10, 1000);
  // spiralInXYZ = spiral.map(convert2xyz);
  /**
   * draw spherical spiral by d3 3.0
   * load http://d3js.org/d3.v3.min.js first
   */
  const spiral: any = createSphericalSpiral(10, 400);

  const convert2GeoProjection = (point: any) => {
    const longitude = (point.theta * 180) / Math.PI;
    const latitude = (point.phi * 180) / Math.PI - 90;
    return [longitude, latitude];
  };

  const width = 600,
    height = 600,
    speed = 0.01,
    start = Date.now();
  const canvas: any = document.querySelector("#d3InTerval04");
  const context: any = canvas.getContext("2d");
  // const canvas: any = d3
  //   .select("d3InTerval04")
  //   .append("canvas")
  //   .attr("width", width)
  //   .attr("height", height);
  // const context = canvas.node().getContext("2d");

  const projection = d3
    .geoOrthographic()
    .scale(width / 2.2)
    .clipAngle(90)
    .translate([width / 2, height / 2])
    .precision(0.5);

  const path = d3.geoPath().projection(projection).context(context);

  const sphere: any = {
    type: "Sphere",
  };
  const graticule = d3.geoGraticule();
  const grid = graticule();

  const spiralPositions = spiral.map(convert2GeoProjection);
  const spiralLine: any = {
    type: "LineString",
    coordinates: spiralPositions,
  };
  const spiralMultiPoint: any = {
    type: "MultiPoint",
    coordinates: spiralPositions,
  };

  d3.timer(() => {
    projection.rotate([speed * (Date.now() - start), -15, -10]);

    context.clearRect(0, 0, width, height);

    context.beginPath();
    path(sphere);
    context.fillStyle = "#fff";
    context.fill();

    context.beginPath();
    path(grid);
    context.lineWidth = 0.5;
    context.strokeStyle = "#999";
    context.stroke();

    context.beginPath();
    path(spiralLine);
    context.lineWidth = 1.5;
    context.strokeStyle = "#F00";
    context.stroke();

    context.beginPath();
    path(spiralMultiPoint);
    context.fillStyle = "#F00";
    context.fill();
  }, 1000);
};

/**
 * 立体图
 */
export const interval05 = () => {
  const svg = d3
    .select("#d3InTerval05")
    .append("svg")
    .attr("width", 300 + "px")
    .attr("height", 300 + "px");
  const width = 20;
  const height = 60;
  const lineColor = "#1ea0d8";
  const fillColor = "#2f71b5";

  // 绘制顶面
  svg
    .append("path")
    .attr(
      "d",
      `M100 ${100 - height} l${width}
  ${-width} l ${-width} ${-width}
  l ${-width} ${width} z`
    )
    .attr("fill", fillColor)
    .attr("stroke", lineColor)
    .attr("stroke-with", 1)
    .attr("shape-rendering", "crispEdges");
  //绘制侧面
  svg
    .append("path")
    .attr(
      "d",
      `M100 100 l 0 ${-height} l 
  ${width} ${-width} l 0 ${height} l 
  ${-width} ${width} l ${-width} ${-width}
  l 0 ${-height} l ${width} ${width} z`
    )
    .attr("fill", fillColor)
    .attr("stroke", lineColor)
    .attr("stroke-with", 1)
    .attr("shape-rendering", "crispEdges");
};

/**
 * 折线 + 柱状图 柱形折线图
 */
export const interval06 = () => {
  const width = 500;
  const height = 500;
  const svg = d3
    .select("#d3InTerval06")
    .append("svg")
    .attr("width", 500 + "px")
    .attr("height", 500 + "px");
  const padding = { top: 20, bottom: 20, right: 20, left: 25 };
  const rectStep = 40;
  const rectWidth = 35;

  //比例尺
  //数据
  //定义比例尺
  const xScale = d3
    .scaleBand()
    .domain([
      "一月",
      "二月",
      "三月",
      "四月",
      "五月",
      "六月",
      "七月",
      "八月",
      "九月",
      "十月",
    ])
    .range([0, 400]);

  const y1Scale = d3.scaleLinear().domain([28000, 16000]).range([0, 300]);

  const y2Scale = d3.scaleLinear().domain([35, 0]).range([0, 300]);

  //坐标轴
  //定义坐标轴，其中使用了线性比例尺linear
  const xAxis = d3.axisBottom(xScale);
  //追加到画布上
  const gxAxis = svg
    .append("g")
    .attr("fill", "none")
    .attr("stroke", "black")
    .attr("shape-rendering", "crispEdges")
    .attr("transform", "translate(50,400)")
    .call(xAxis);

  const y1Axis = d3.axisLeft(y1Scale);

  const y2Axis = d3.axisRight(y2Scale);

  const gy1Axis = svg
    .append("g")
    .attr("fill", "none")
    .attr("stroke", "black")
    .attr("shape-rendering", "crispEdges")
    .attr("transform", "translate(50,100)")
    .call(y1Axis);

  const gy2Axis = svg
    .append("g")
    .attr("fill", "none")
    .attr("stroke", "black")
    .attr("shape-rendering", "crispEdges")
    .attr("transform", "translate(450,100)")
    .call(y2Axis);

  // 柱状图
  const dataset = [
    27506, 24399, 23120, 22053, 21221, 22848, 20178, 16927, 19808, 22450,
  ];

  y1Scale.domain([16000, 28000]);

  const rects = svg
    .selectAll("rect")
    .data(dataset)
    .enter()
    .append("rect")
    .attr("fill", "steelblue")
    .attr("transform", "translate(30,50)")
    .attr("x", (d, i) => {
      return padding.left + i * rectStep;
    })
    .attr("y", (d) => {
      return height - 150 - y1Scale(d);
      //return padding.left+rectStep
    })
    .attr("width", rectWidth)
    .attr("height", (d) => {
      return y1Scale(d);
    });

  // svg.append("g")
  //   .call(y1Axis)
  //   .append("text")
  //   .text("销售额")
  //   .attr("transform", "translate(60,50)")//text放置的位置
  //   .attr("text-anchor", "end")//字体尾部对齐
  //   .attr("dy", 40);//沿y轴平移一个字体的大小

  // svg.append("g")
  //   .call(y1Axis)
  //   .append("text")
  //   .text("增长率(%)")
  //   .attr("transform", "translate(500,50)")//text放置的位置
  //   .attr("text-anchor", "end")//字体尾部对齐
  //   .attr("dy", 40);//沿y轴平移一个字体的大小

  // svg.append("g")
  //   .call(y1Axis)
  //   .append("text")
  //   .text("时间")
  //   .attr("transform", "translate(480,380)")//text放置的位置
  //   .attr("text-anchor", "end")//字体尾部对齐
  //   .attr("dy", 40);//沿y轴平移一个字体的大小

  // 线段生成器
  const lines: any = [
    { x: 20, y: 20.8 },
    { x: 60, y: 5.4 },
    { x: 100, y: 22 },
    { x: 140, y: 0.4 },
    { x: 180, y: 3.1 },
    { x: 220, y: 8.6 },
    { x: 260, y: 28.7 },
    { x: 300, y: 5.5 },
    { x: 340, y: 13.5 },
    { x: 380, y: 3.7 },
  ];
  const line = d3
    .line()
    .x(function (d: any) {
      return d.x;
    })
    .y(function (d: any) {
      return y2Scale(d.y) - 200;
    });

  const d = line(lines);

  svg
    .append("path")
    .attr("d", line(lines))
    .attr("stroke", "red")
    .attr("stroke-width", "2px")
    .attr("fill", "none")
    .attr("transform", "translate(50,300)");

  const texts = svg
    .selectAll(".MyText")
    .data(dataset)
    .enter()
    .append("text")
    .attr("class", "MyText")
    .attr("text-anchor", "middle")
    .attr("font-size", "10")
    .attr("transform", "translate(30,10)")
    .attr("x", function (d, i) {
      return padding.left + i * rectStep;
    })
    .attr("y", function (d) {
      return height - 150 - y1Scale(d);
    })
    .attr("dx", rectWidth / 2)
    .attr("dy", (d) => {
      return 20 + 15;
    })
    .text((d) => {
      return d;
    });
};

//  极地坐标图
export const polarChart = () => {
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

  // const y = _.map(data, _.last);
  // let max = Math.max.apply(null, y);
  // max = Math.ceil(max * 10) / 10;

  // const angle = d3.scale.linear()
  //   .domain([0, 24])
  //   .range([0, 2 * Math.PI]);

  // const r = d3.scale.linear()
  //   .domain([0, max])
  //   .range([0, radius]);
};

/**
 * 3d立体柱状图
 */
export const interval10 = () => {
  const data = [
    {
      letter: "白皮鸡蛋",
      child: {
        category: "0",
        value: "459.00",
      },
    },
    {
      letter: "红皮鸡蛋",
      child: {
        category: "0",
        value: "389.00",
      },
    },
    {
      letter: "鸡蛋",
      child: {
        category: "0",
        value: "336.00",
      },
    },
    {
      letter: "牛肉",
      child: {
        category: "0",
        value: "282.00",
      },
    },
    {
      letter: "羊肉",
      child: {
        category: "0",
        value: "249.00",
      },
    },
    {
      letter: "鸭蛋",
      child: {
        category: "0",
        value: "242.00",
      },
    },
    {
      letter: "红薯",
      child: {
        category: "0",
        value: "222.00",
      },
    },
    {
      letter: "白菜",
      child: {
        category: "0",
        value: "182.00",
      },
    },
    {
      letter: "鸡肉",
      child: {
        category: "0",
        value: "102.00",
      },
    },
  ];

  const margin = {
    top: 20,
    right: 50,
    bottom: 50,
    left: 90,
  };

  const svgWidth = 1000;
  const svgHeight = 500;

  //创建各个面的颜色数组
  const mainColorList = [
    "#f6e242",
    "#ebec5b",
    "#d2ef5f",
    "#b1d894",
    "#97d5ad",
    "#82d1c0",
    "#70cfd2",
    "#63c8ce",
    "#50bab8",
    "#38a99d",
  ];
  const topColorList = [
    "#e9d748",
    "#d1d252",
    "#c0d75f",
    "#a2d37d",
    "#83d09e",
    "#68ccb6",
    "#5bc8cb",
    "#59c0c6",
    "#3aadab",
    "#2da094",
  ];
  const rightColorList = [
    "#dfce51",
    "#d9db59",
    "#b9d54a",
    "#9ece7c",
    "#8ac69f",
    "#70c3b1",
    "#65c5c8",
    "#57bac0",
    "#42aba9",
    "#2c9b8f",
  ];

  const svg = d3
    .select("#d3Interval10")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight)
    .attr("id", "svg-column");

  //核心算法思路是Big boss教的,我借花献佛
  const dataProcessing = (xLinearScale: any) => {
    const angle = Math.PI / 2.3;
    for (let i = 0; i < data.length; i++) {
      const d: any = data[i];
      const depth = 10;
      d.ow = xLinearScale.bandwidth() * 0.7;
      d.ox = xLinearScale(d.letter);
      d.oh = 1;
      d.p1 = {
        x: Math.cos(angle) * d.ow,
        y: -Math.sin(angle) - depth,
      };
      d.p2 = {
        x: d.p1.x + d.ow,
        y: d.p1.y,
      };
      d.p3 = {
        x: d.p2.x,
        y: d.p2.y + d.oh,
      };
    }
  };

  let xLinearScale: any;
  // 创建X轴序数比例尺
  const addXAxis = () => {
    // 定义自定义几何变换。
    const transform = d3.geoTransform({
      point: function (x, y) {
        this.stream.point(x, y);
      },
    });
    //定义几何路径
    // 创建一个新的地理路径生成器。
    // projection 设置地理投影。
    const path: any = d3.geoPath().projection(transform);

    // scaleBand 创建一个有序的波段比例。
    xLinearScale = d3
      .scaleBand()
      .domain(
        data.map(function (d) {
          return d.letter;
        })
      )
      .range([0, svgWidth - margin.right - margin.left]);

    //ticks 自定义刻度的生成和格式。
    const xAxis = d3.axisBottom(xLinearScale).ticks(data.length);
    //绘制X轴
    const xAxisG = svg
      .append("g")
      .call(xAxis)
      .attr(
        "transform",
        "translate(" + margin.left + "," + (svgHeight - margin.bottom) + ")"
      );

    //删除原X轴
    xAxisG.select("path").remove();
    xAxisG.selectAll("line").remove();
    //绘制新的立体X轴
    // datum 获取或设置元素数据（不连接）
    xAxisG
      .append("path")
      .datum({
        type: "Polygon",
        coordinates: [
          [
            [20, 0],
            [0, 15],
            [svgWidth - margin.right - margin.left, 15],
            [svgWidth + 20 - margin.right - margin.left, 0],
            [20, 0],
          ],
        ],
      })
      .attr("d", path)
      .attr("fill", "rgb(187,187,187)");
    xAxisG
      .selectAll("text")
      .attr("font-size", "18px")
      .attr("fill", "#646464")
      .attr("transform", "translate(0,20)");

    dataProcessing(xLinearScale); //核心算法
  };

  let yLinearScale: any;
  //创建y轴的比例尺渲染y轴
  const addYScale = () => {
    const max: any = d3.max(data, function (d: any, i) {
      return d.child.value * 1;
    });
    yLinearScale = d3
      .scaleLinear()
      .domain([0, max * 1.2])
      .range([svgHeight - margin.top - margin.bottom, 0]);

    //定义Y轴比例尺以及刻度
    const yAxis = d3.axisLeft(yLinearScale).ticks(6);

    //绘制Y轴
    const yAxisG = svg
      .append("g")
      .call(yAxis)
      .attr(
        "transform",
        "translate(" + (margin.left + 10) + "," + margin.top + ")"
      );
    yAxisG.selectAll("text").attr("font-size", "18px").attr("fill", "#636363");
    //删除原Y轴路径和tick
    yAxisG.select("path").remove();
    yAxisG.selectAll("line").remove();
  };

  addXAxis();
  addYScale();

  const initChart = () => {
    svg.selectAll(".g").remove();
    const g = svg
      .selectAll(".g")
      .data(data)
      .enter()
      .append("g")
      // .on("mouseover", clumnMouseover)
      // .on("mouseout", clumnMouseout)
      .attr("transform", function (d: any) {
        return (
          "translate(" +
          (d.ox + margin.left + 20) +
          "," +
          (svgHeight - margin.bottom + 15) +
          ")"
        );
      });

    g.transition()
      .duration(2500)
      .attr("transform", function (d: any) {
        return (
          "translate(" +
          (d.ox + margin.left + 20) +
          ", " +
          (yLinearScale(d.child.value) + margin.bottom - 15) +
          ")"
        );
      });

    g.append("rect")
      .attr("x", 0)
      .attr("y", 0)
      .attr("class", "transparentPath")
      .attr("width", function (d: any, i) {
        return d.ow;
      })
      .attr("height", function (d: any) {
        return d.oh;
      })
      .style("fill", function (d, i) {
        return mainColorList[i];
      })
      .transition()
      .duration(2500)
      .attr("height", function (d: any, i) {
        return (
          svgHeight - margin.bottom - margin.top - yLinearScale(d.child.value)
        );
      });

    g.append("path")
      .attr("class", "transparentPath")
      .attr("d", function (d: any) {
        return (
          "M0,0 L" +
          d.p1.x +
          "," +
          d.p1.y +
          " L" +
          d.p2.x +
          "," +
          d.p2.y +
          " L" +
          d.ow +
          ",0 L0,0"
        );
      })
      .style("fill", function (d, i) {
        return topColorList[i];
      });

    g.append("path")
      .attr("class", "transparentPath")
      .attr("d", function (d: any) {
        return (
          "M" +
          d.ow +
          ",0 L" +
          d.p2.x +
          "," +
          d.p2.y +
          " L" +
          d.p3.x +
          "," +
          d.p3.y +
          " L" +
          d.ow +
          "," +
          d.oh +
          " L" +
          d.ow +
          ",0"
        );
      })
      .style("fill", function (d, i) {
        return rightColorList[i];
      })
      .transition()
      .duration(2500)
      .attr("d", function (d: any, i) {
        return (
          "M" +
          d.ow +
          ",0 L" +
          d.p2.x +
          "," +
          d.p2.y +
          " L" +
          d.p3.x +
          "," +
          (d.p3.y +
            svgHeight -
            margin.top -
            margin.bottom -
            yLinearScale(d.child.value)) +
          " L" +
          d.ow +
          "," +
          (svgHeight -
            margin.top -
            margin.bottom -
            yLinearScale(d.child.value)) +
          " L" +
          d.ow +
          ",0"
        );
      });
  };
  initChart();
  // const t = d3.timer(() => {
  //   initChart();
  // }, 15000);
};

// 折线、柱状图
export const inTerval11 = (config: IntervalType, data: any) => {
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
  // 柱状图x轴
  const xScale1: any = d3
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
      "translate(" + config["paddingLeft"] + "," + config["paddingTop"] + ")"
    );

  // 添加折线  创建一个新的线生成器。
  const line = d3
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
    .attr("class", "line")
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

  const chart = g
    .selectAll("#selectInterval1")
    .data(data)
    .enter()
    .append("g")
    .attr("id", "selectInterval1");

  const transition = () => {
    // 添加矩形元素
    chart
      .append("rect")
      .attr("border-radius", "6px")
      .style("fill", (d: any, i: any) => {
        return color[i];
      })
      .attr("x", (d: any) => {
        const key = d[config["key"]];
        return xScale(key) - xScale1.bandwidth() / 2;
      })
      .attr("y", (d: any) => {
        const value = d[config["value"]];
        return yScale(value);
      })
      .attr("height", (d: any) => {
        const value = d[config["value"]];
        return height - yScale(value);
      })
      .attr("width", xScale1.bandwidth());

    chart
      .append("text")
      .attr("font-weight", 500)
      .attr("x", (d: any) => {
        const key = d[config["key"]];
        return xScale(key);
      })
      .attr("y", (d: any) => {
        const value = d[config["value"]];
        return yScale(value);
      })
      .attr("dx", xScale.bandwidth() / 2)
      .attr("dy", -10)
      .attr("text-anchor", "middle")
      .text((d: any) => {
        const value = d[config["value"]];
        return value;
      })
      .style("fill", (d: any, i: any) => {
        return color[i];
      });
  };
  transition();
};

// 多柱状图
export const inTerval12 = (config: IntervalType) => {
  const data = [
    { name: "London", 月份: "Jan.", 月均降雨量: 18.9 },
    { name: "London", 月份: "Feb.", 月均降雨量: 28.8 },
    { name: "London", 月份: "Mar.", 月均降雨量: 39.3 },
    { name: "London", 月份: "Apr.", 月均降雨量: 81.4 },
    { name: "London", 月份: "May", 月均降雨量: 47 },
    { name: "London", 月份: "Jun.", 月均降雨量: 20.3 },
    { name: "London", 月份: "Jul.", 月均降雨量: 24 },
    { name: "London", 月份: "Aug.", 月均降雨量: 35.6 },
    { name: "Berlin", 月份: "Jan.", 月均降雨量: 12.4 },
    { name: "Berlin", 月份: "Feb.", 月均降雨量: 23.2 },
    { name: "Berlin", 月份: "Mar.", 月均降雨量: 34.5 },
    { name: "Berlin", 月份: "Apr.", 月均降雨量: 99.7 },
    { name: "Berlin", 月份: "May", 月均降雨量: 52.6 },
    { name: "Berlin", 月份: "Jun.", 月均降雨量: 35.5 },
    { name: "Berlin", 月份: "Jul.", 月均降雨量: 37.4 },
    { name: "Berlin", 月份: "Aug.", 月均降雨量: 42.4 },
  ];
  const data1: any = [];
  const data2: any = [];
  data.forEach((key: any) => {
    if (key["name"] === "London") {
      const object1 = {
        月份: key["月份"],
        月均降雨量: key["月均降雨量"],
      };
      data1.push(object1);
    }
    if (key["name"] === "Berlin") {
      const object2 = {
        月份: key["月份"],
        月均降雨量: key["月均降雨量"],
      };
      data2.push(object2);
    }
  });
  const div: any = d3.select("#d3InTerval12");
  const divWidth = div.node().getBoundingClientRect().width;
  const width = divWidth - config["paddingLeft"] - config["paddingRight"];
  const height = config["height"];
  const divHeight =
    config["height"] + config["paddingTop"] + config["paddingBottom"];

  const svg = d3
    .select("#d3InTerval12")
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
    return d["月份"];
  });
  XData = Array.from(new Set(XData));

  // 获取Y轴数据
  let values: any = data.map((d: any) => {
    return d["月均降雨量"];
  });
  values = Array.from(new Set(values));

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
      "translate(" + config["paddingLeft"] + "," + config["paddingTop"] + ")"
    );

  // y 轴刻度比例
  const axisY = d3.axisLeft(yScale);
  // x 轴刻度比例
  const axisX = d3.axisBottom(xScale);
  // const axisX1 = d3.axisBottom(xScale1);

  g.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(axisX)
    .attr("font-size", "15")
    .attr("fon-weight", "bold");

  g.append("g").call(axisY);

  const chart = g
    .selectAll("#selectInterval22")
    .data(data2)
    .enter()
    .append("g")
    .attr("id", "selectInterval22");

  const transition = () => {
    // 添加矩形元素
    chart
      .append("rect")
      .attr("border-radius", "6px")
      .style("fill", (d: any, i: any) => {
        return color[0];
      })
      .attr("x", (d: any) => {
        const key = d["月份"];
        return xScale(key) - xScale.bandwidth() / 2 + 10;
      })
      // .attr("y", (d: any) => {
      //   const value = d["月均降雨量"];
      //   return yScale(value);
      // })
      // .attr("height", (d: any) => {
      //   const value = d["月均降雨量"];
      //   return height - yScale(value);
      // })
      .attr("width", xScale.bandwidth() - 15)
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
      .attr("y", (d: any) => {
        const value = d["月均降雨量"];
        return yScale(value);
      })
      .attr("height", (d: any) => {
        const value = d["月均降雨量"];
        return height - yScale(value);
      });

    chart
      .append("text")
      .attr("font-weight", 500)
      .attr("x", (d: any) => {
        const key = d["月份"];
        return xScale(key) - 27;
      })
      .attr("y", (d: any) => {
        const value = d["月均降雨量"];
        return yScale(value);
      })
      .attr("dx", xScale.bandwidth() / 2)
      .attr("dy", -10)
      .attr("text-anchor", "middle")
      .text((d: any) => {
        const value = d["月均降雨量"];
        return value;
      })
      .style("fill", color[0]);
  };

  const chart1 = g
    .selectAll("#selectInterval221")
    .data(data1)
    .enter()
    .append("g")
    .attr("id", "selectInterval221");

  const transition1 = () => {
    // 添加矩形元素
    chart1
      .append("rect")
      .attr("border-radius", "6px")
      .style("fill", (d: any, i: any) => {
        return color[1];
      })
      .attr("x", (d: any) => {
        const key = d["月份"];
        return xScale(key) - xScale.bandwidth() / 2 + 65;
      })
      // .attr("y", (d: any) => {
      //   const value = d["月均降雨量"];
      //   return yScale(value);
      // })
      // .attr("height", (d: any) => {
      //   const value = d["月均降雨量"];
      //   return height - yScale(value);
      // })
      .attr("width", xScale.bandwidth() - 15)
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
      .attr("y", (d: any) => {
        const value = d["月均降雨量"];
        return yScale(value);
      })
      .attr("height", (d: any) => {
        const value = d["月均降雨量"];
        return height - yScale(value);
      });

    chart1
      .append("text")
      .attr("font-weight", 500)
      .attr("x", (d: any) => {
        const key = d["月份"];
        console.log(xScale(key));
        return xScale(key) + 30;
      })
      .attr("y", (d: any) => {
        const value = d["月均降雨量"];
        return yScale(value);
      })
      .attr("dx", xScale.bandwidth() / 2)
      .attr("dy", -10)
      .attr("text-anchor", "middle")
      .text((d: any) => {
        const value = d["月均降雨量"];
        return value;
      })
      .style("fill", color[1]);
  };

  transition();
  transition1();
  const legendStatus = [true, true];
  // if (legendStatus[0]) {
  //   transition();
  // } else {
  //   chart.selectAll("rect").remove();
  //   chart.selectAll("text").remove();
  // }
  // if (legendStatus[1]) {
  //   transition1();
  // } else {
  //   chart1.selectAll("rect").remove();
  //   chart1.selectAll("text").remove();
  // }

  // 图例
  const sp = d3.schemeSet2;
  const legend = svg.append("g");
  const line = legend
    .append("line")
    .attr("x1", 0)
    .attr("y1", 2)
    .attr("x2", 15)
    .attr("y2", 2)
    .attr("stroke", color[0])
    .attr("stroke-width", 5)
    .attr("stroke-linecap", "round");
  const text = legend
    .append("text")
    .attr("class", "legend-label")
    .attr("dy", -13)
    .style("text-anchor", "start")
    .text("上海")
    .attr("fill", "Black")
    .attr("font-size", "13")
    .attr("transform", "translate(" + 18 + "," + 20 + ")");
  // 图例对应的点击事件
  legend
    .attr("id", "legend01")
    .attr(
      "transform",
      "translate(" +
        (config["paddingLeft"] * 3 + 100) +
        "," +
        config["paddingTop"] / 2 +
        ")"
    )
    .on("click", function () {
      const _this = d3.select(this);
      const _i = 0;

      if (legendStatus[_i]) {
        _this.selectAll("line").attr("stroke", "#d3d3d3");
        _this.selectAll("text").attr("fill", "#d3d3d3");

        svg.selectAll(".bar" + _i).attr("display", "none");
      } else {
        _this.selectAll("line").attr("stroke", color[_i]);
        _this.selectAll("text").attr("fill", "#Black");

        svg.selectAll(".bar" + _i).attr("display", "show");
      }

      legendStatus[_i] = !legendStatus[_i];
    });

  const legend1 = svg.append("g");
  const line1 = legend1
    .append("line")
    .attr("x1", 0)
    .attr("y1", 2)
    .attr("x2", 15)
    .attr("y2", 2)
    .attr("stroke", color[1])
    .attr("stroke-width", 5)
    .attr("stroke-linecap", "round");
  const text1 = legend1
    .append("text")
    .attr("class", "legend-label")
    .attr("dy", -13)
    .style("text-anchor", "start")
    .text("宝山")
    .attr("fill", "Black")
    .attr("font-size", "13")
    .attr("transform", "translate(" + 18 + "," + 20 + ")");
  // 图例对应的点击事件
  legend1
    .attr("id", "legend02")
    .attr(
      "transform",
      "translate(" +
        (config["paddingLeft"] * 3 + 160) +
        "," +
        config["paddingTop"] / 2 +
        ")"
    )
    .on("click", function () {
      const _this = d3.select(this);
      const _i = 1; //parseInt(_this.select("text").text().split("data")[1]);

      if (legendStatus[_i]) {
        _this.selectAll("line").attr("stroke", "#d3d3d3");
        _this.selectAll("text").attr("fill", "#d3d3d3");

        svg.selectAll(".bar" + _i).attr("display", "none");
      } else {
        _this.selectAll("line").attr("stroke", color[_i]);
        _this.selectAll("text").attr("fill", "#Black");

        svg.selectAll(".bar" + _i).attr("display", "show");
      }
      legendStatus[_i] = !legendStatus[_i];
    });
};

// 堆叠柱状图

export const inTerval200 = (config: IntervalType) => {
  const data = [
    { name: "London", 月份: "Jan.", 月均降雨量: 18.9 },
    { name: "London", 月份: "Feb.", 月均降雨量: 28.8 },
    { name: "London", 月份: "Mar.", 月均降雨量: 39.3 },
    { name: "London", 月份: "Apr.", 月均降雨量: 81.4 },
    { name: "London", 月份: "May", 月均降雨量: 47 },
    { name: "London", 月份: "Jun.", 月均降雨量: 20.3 },
    { name: "London", 月份: "Jul.", 月均降雨量: 24 },
    { name: "London", 月份: "Aug.", 月均降雨量: 35.6 },
    { name: "Berlin", 月份: "Jan.", 月均降雨量: 12.4 },
    { name: "Berlin", 月份: "Feb.", 月均降雨量: 23.2 },
    { name: "Berlin", 月份: "Mar.", 月均降雨量: 34.5 },
    { name: "Berlin", 月份: "Apr.", 月均降雨量: 99.7 },
    { name: "Berlin", 月份: "May", 月均降雨量: 52.6 },
    { name: "Berlin", 月份: "Jun.", 月均降雨量: 35.5 },
    { name: "Berlin", 月份: "Jul.", 月均降雨量: 37.4 },
    { name: "Berlin", 月份: "Aug.", 月均降雨量: 42.4 },
  ];
  const data1: any = [];
  const data2: any = [];
  data.forEach((key: any) => {
    if (key["name"] === "London") {
      const object1 = {
        月份: key["月份"],
        月均降雨量: key["月均降雨量"],
      };
      data1.push(object1);
    }
    if (key["name"] === "Berlin") {
      const object2 = {
        月份: key["月份"],
        月均降雨量: key["月均降雨量"],
      };
      data2.push(object2);
    }
  });

  const div: any = d3.select("#d3InTerval200");
  const divWidth = div.node().getBoundingClientRect().width;
  const width = divWidth - config["paddingLeft"] - config["paddingRight"];
  const height = config["height"];
  const divHeight =
    config["height"] + config["paddingTop"] + config["paddingBottom"];

  const svg = d3
    .select("#d3InTerval200")
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
    return d["月份"];
  });
  XData = Array.from(new Set(XData));

  // 获取Y轴数据
  let values: any = data.map((d: any) => {
    return d["月均降雨量"];
  });
  values = Array.from(new Set(values));

  // 创建 x、y 轴比例
  const xScale: any = d3
    .scaleBand()
    .domain(XData)
    .rangeRound([0, width])
    .padding(0.5);

  const maxY: any = d3.max(values);
  const yScale: any = d3
    .scaleLinear()
    .domain([0, maxY * 2])
    .rangeRound([height, 0]);

  const g = svg
    .append("g")
    .attr("class", "selectInterval")
    .attr(
      "transform",
      "translate(" +
        (config["paddingLeft"] + 30) +
        "," +
        config["paddingTop"] +
        ")"
    );

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

  // 以上是绘制坐标轴

  // 绘制柱状图 第一个柱状图
  const chart = g
    .selectAll("#selectInterval20")
    .data(data1)
    .enter()
    .append("g")
    .attr("id", "selectInterval20");

  // 添加矩形元素
  chart
    .append("rect")
    .attr("border-radius", "6px")
    .style("fill", (d: any, i: any) => {
      return color[0];
    })
    .attr("x", (d: any) => {
      const key = d["月份"];
      return xScale(key);
    })
    .attr("y", (d: any) => {
      const value = d["月均降雨量"];
      return yScale(value);
    })
    .attr("height", (d: any) => {
      const value = d["月均降雨量"];
      return height - yScale(value);
    })
    .attr("width", xScale.bandwidth());

  // chart
  //   .append("text")
  //   .attr("font-weight", 500)
  //   .attr("x", (d: any) => {
  //     const key = d["year"];
  //     return xScale(key);
  //   })
  //   .attr("y", (d: any) => {
  //     const value = d["月均降雨量"];
  //     return yScale(value);
  //   })
  //   .attr("dx", xScale.bandwidth() / 2)
  //   .attr("dy", -10)
  //   .attr("text-anchor", "middle")
  //   .text((d: any) => {
  //     const value = d["月均降雨量"];
  //     return value;
  //   })
  //   .style("fill", (d: any, i: any) => {
  //     return color[i];
  //   });

  // 绘制柱状图 第二个柱状图
  const chart1 = g
    .selectAll("#selectInterval30")
    .data(data2)
    .enter()
    .append("g")
    .attr("id", "selectInterval30");

  // 添加矩形元素
  chart1
    .append("rect")
    .attr("border-radius", "6px")
    .style("fill", (d: any, i: any) => {
      return color[1];
    })
    .attr("x", (d: any) => {
      const key = d["月份"];
      return xScale(key);
    })
    .attr("y", (d: any, i: any) => {
      const value = data1[i]["月均降雨量"];
      const value1 = d["月均降雨量"];
      return yScale(value) - height + yScale(value1);
    })
    .attr("height", (d: any) => {
      const value = d["月均降雨量"];
      return height - yScale(value);
    })
    .attr("width", xScale.bandwidth());

  // 图例
  const legendStatus = [true, true];
  const sp = d3.schemeSet2;
  const legend = svg.append("g");
  const line = legend
    .append("line")
    .attr("x1", 0)
    .attr("y1", 2)
    .attr("x2", 15)
    .attr("y2", 2)
    .attr("stroke", color[0])
    .attr("stroke-width", 5)
    .attr("stroke-linecap", "round");
  const text = legend
    .append("text")
    .attr("class", "legend-label")
    .attr("dy", -13)
    .style("text-anchor", "start")
    .text("上海")
    .attr("fill", "Black")
    .attr("font-size", "13")
    .attr("transform", "translate(" + 18 + "," + 20 + ")");
  // 图例对应的点击事件
  legend
    .attr("id", "legend01")
    .attr(
      "transform",
      "translate(" +
        (config["paddingLeft"] * 3 + 100) +
        "," +
        config["paddingTop"] / 2 +
        ")"
    )
    .on("click", function () {
      const _this = d3.select(this);
      const _i = 0;

      if (legendStatus[_i]) {
        _this.selectAll("line").attr("stroke", "#d3d3d3");
        _this.selectAll("text").attr("fill", "#d3d3d3");

        svg.selectAll(".bar" + _i).attr("display", "none");
      } else {
        _this.selectAll("line").attr("stroke", color[_i]);
        _this.selectAll("text").attr("fill", "#Black");

        svg.selectAll(".bar" + _i).attr("display", "show");
      }

      legendStatus[_i] = !legendStatus[_i];
    });

  const legend1 = svg.append("g");
  const line1 = legend1
    .append("line")
    .attr("x1", 0)
    .attr("y1", 2)
    .attr("x2", 15)
    .attr("y2", 2)
    .attr("stroke", color[1])
    .attr("stroke-width", 5)
    .attr("stroke-linecap", "round");
  const text1 = legend1
    .append("text")
    .attr("class", "legend-label")
    .attr("dy", -13)
    .style("text-anchor", "start")
    .text("宝山")
    .attr("fill", "Black")
    .attr("font-size", "13")
    .attr("transform", "translate(" + 18 + "," + 20 + ")");
  // 图例对应的点击事件
  legend1
    .attr("id", "legend02")
    .attr(
      "transform",
      "translate(" +
        (config["paddingLeft"] * 3 + 160) +
        "," +
        config["paddingTop"] / 2 +
        ")"
    )
    .on("click", function () {
      const _this = d3.select(this);
      const _i = 1; //parseInt(_this.select("text").text().split("data")[1]);

      if (legendStatus[_i]) {
        _this.selectAll("line").attr("stroke", "#d3d3d3");
        _this.selectAll("text").attr("fill", "#d3d3d3");

        svg.selectAll(".bar" + _i).attr("display", "none");
      } else {
        _this.selectAll("line").attr("stroke", color[_i]);
        _this.selectAll("text").attr("fill", "#Black");

        svg.selectAll(".bar" + _i).attr("display", "show");
      }
      legendStatus[_i] = !legendStatus[_i];
    });
};
