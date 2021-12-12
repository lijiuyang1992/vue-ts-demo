/*
 * @Author: 李九阳
 * @Date: 2021-12-06 09:42:32
 * @LastEditors: 李九阳
 * @LastEditTime: 2021-12-09 09:15:31
 */
import * as d3 from "d3";
import { IntervalType } from "@/type/d3Type";
import { draw, transition } from "./3dPeiUtils";

export const simplePieChart = (config: IntervalType) => {
  const data: any = [
    { age: "<5", population: 2704659 },
    { age: "5-13", population: 4499890 },
    { age: "14-17", population: 2159981 },
    { age: "18-24", population: 3853788 },
    { age: "25-44", population: 14106543 },
    { age: "45-64", population: 8819342 },
    { age: "≥65", population: 612463 },
  ];
  const div: any = d3.select(config["select"]);
  const divWidth = div.node().getBoundingClientRect().width;
  const width = divWidth - config["paddingLeft"] - config["paddingRight"];
  const height = config["height"];
  const divHeight =
    config["height"] + config["paddingTop"] + config["paddingBottom"];
  const width1 = div.style("width"); //"120px"
  const radius = Math.min(width, height) / 2; //
  const chart = d3
    .select(config["select"])
    .append("svg")
    .attr("width", divWidth)
    .attr("height", divHeight);

  const g = chart
    .append("g")
    .attr(
      "transform",
      "translate(" +
        (width / 2 + config["paddingLeft"]) +
        "," +
        (config["paddingTop"] + radius) +
        ")"
    ); // 设最外包层在总图上的相对位置

  const colors: any = d3.scaleOrdinal().range(d3.schemeCategory10);
  // .range([
  //   "#98abc5",
  //   "#8a89a6",
  //   "#7b6888",
  //   "#6b486b",
  //   "#a05d56",
  //   "#d0743c",
  //   "#ff8c00",
  // ]);

  const arc: any = d3
    .arc() // 定义单个圆弧
    .innerRadius(200)
    .padAngle(0.03);

  const startPointArc = d3
    .arc() // 定义单个圆弧里面的线条开始点所在的弧
    .outerRadius(radius - 10)
    .innerRadius(radius - 10);

  const percentLabelArc = d3
    .arc() // 定义单个圆弧里面的percent文字
    .outerRadius(radius - 60)
    .innerRadius(radius - 60);

  const populationLabelArc = d3
    .arc() // 定义单个圆弧里面的population文字
    .outerRadius(radius + 40)
    .innerRadius(radius + 40);

  const pie: any = d3
    .pie() // 定义饼图
    .sort(null)
    .value(function (d: any) {
      return d.population;
    });

  const sumData = d3.sum(data, function (d: any) {
    return d.population;
  });
  const keys: any = d3
    .map(data, function (d: any) {
      return d.age;
    })
    .keys();
  colors.domain(keys); // 定义颜色值域
  let _currentData: any;
  g.selectAll(".arc") // 画环图
    .data(pie(data))
    .enter()
    .append("path")
    .attr("cursor", "pointer")
    .attr("class", "arc")
    .attr("id", (d: any) => {
      return "population" + d.data.population;
    })
    .attr("stroke", (d: any) => {
      return colors(d.data.age);
    })
    .style("fill", (d: any) => {
      return colors(d.data.age);
    })
    .each(function (d: any) {
      // 储存当前起始与终点的角度、并设为相等
      const tem = { ...d, endAngle: d.startAngle };
      d["outerRadius"] = radius - 10;
      _currentData = tem;
    })
    .on("mouseover", (d: any) => {
      const id = "#" + d.path[0].id;
      return arcTween(radius + 20, 0, id);
    })
    .on("mouseout", (d: any) => {
      const id = "#" + d.path[0].id;
      return arcTween(radius - 10, 150, id);
    })
    // .on("mouseover", arcTween(radius + 20, 0))
    // .on("mouseout", arcTween(radius - 10, 150))
    .transition()
    .duration(100)
    .delay(function (d, i) {
      return i * 100;
    })
    // .attrTween("d", function() {
    //   const i: any = d3.interpolate(_currentData, true)
    //   _currentData = i(0) // 重设当前角度
    //   // return d3.interpolateRgb("red", "blue");
    //   return arc(i);
    // });
    .attrTween("d", (next: any) => {
      // 动态设置d属性、生成动画
      const i: any = d3.interpolate(_currentData, next);
      _currentData = i(0); // 重设当前角度
      return function (t: any) {
        return arc(i(t));
      };
    });

  const arcs = pie(data); // 构造圆弧

  const linkLine = g.append("g"); // 创建每条连接线
  const links: any = [];
  arcs.forEach(function (d: any) {
    // 输出age文字
    const startPoint = startPointArc.centroid(d);
    const endPoint = populationLabelArc.centroid(d);
    links.push({
      source: [startPoint[0], startPoint[1]],
      target: [endPoint[0], endPoint[1]],
    });
  });

  const linkHorizontal: any = d3
    .linkHorizontal() // 创建一个新的水平链接生成器。
    .source(function (d: any) {
      return d.source;
    })
    .target(function (d: any) {
      return d.target;
    });
  linkLine
    .selectAll()
    .data(links)
    .enter()
    .append("path")
    .attr("class", "link-line")
    .style("stroke", "#999")
    .style("stroke-width", 1)
    .attr("fill", "none")
    .attr("d", linkHorizontal);

  const label = g.append("g");

  arcs.forEach(function (d: any) {
    // 输出percent文字
    const c = percentLabelArc.centroid(d);
    label
      .append("text")
      .attr("class", "age-text")
      .attr("fill", "#cddc39")
      .attr("font-weight", "700")
      .attr("font-size", "14px")
      .attr("text-anchor", "middle")
      .attr("x", c[0])
      .attr("y", c[1])
      .text(((d.data.population * 100) / sumData).toFixed(1) + "%");
  });

  arcs.forEach(function (d: any) {
    // 输出population文字
    const c = populationLabelArc.centroid(d);
    label
      .append("text")
      .attr("class", "age-text")
      .attr("fill", "#000")
      .attr("font-size", "12px")
      .attr("text-anchor", function (d) {
        return c[0] >= 0 ? "start" : "end";
      })
      .attr("x", c[0])
      .attr("y", c[1])
      .text(
        d.data.age + "岁 : " + (d.data.population / 10000).toFixed(2) + "万人"
      );
  });

  chart
    .append("g") // 输出标题
    .attr("class", "arc--title")
    .append("text")
    // .attr("fill", "none")
    .attr("font-size", "14px")
    .attr("font-weight", "700")
    .attr(
      "transform",
      "translate(" +
        (width / 2 + config["paddingLeft"]) +
        "," +
        (config["paddingTop"] + radius) +
        ")"
    )
    .attr("text-anchor", "middle")
    .attr("x", 0)
    .attr("y", 0)
    .text("XX市人口年龄结构");

  function arcTween(outerRadius: any, delay: any, selectId: string) {
    // 设置缓动函数
    return d3
      .select(selectId)
      .transition()
      .delay(delay)
      .attrTween("d", (next: any) => {
        const i: any = d3.interpolate(next.outerRadius, outerRadius);
        _currentData = i(0); // 重设当前角度
        return function (t: any) {
          next.outerRadius = i(t);
          return arc(next);
        };
      });
  }

  const animationPei = () => {
    let index = 1;
    for (const key of data) {
      setTimeout(function timer() {
        const id = "#population" + key["population"];
        arcTween(radius + 20, 0, id);
        arcTween(radius - 10, 150, id);
      }, 1000 * index);
      index++;
    }
  };
  setInterval(() => animationPei(), 8000);
};

export const simplePieChart01 = (config: IntervalType) => {
  const data: any = [
    {
      browser: "Chrome",
      percent: 73.7,
    },
    {
      browser: "IE/Edge",
      percent: 4.9,
    },
    {
      browser: "Firefox",
      percent: 15.4,
    },
    {
      browser: "Safari",
      percent: 3.6,
    },
    {
      browser: "Opera",
      percent: 1.0,
    },
  ];

  const div: any = d3.select(config["select"]);
  const divWidth = div.node().getBoundingClientRect().width;
  const width = divWidth - config["paddingLeft"] - config["paddingRight"];
  const height = config["height"];
  const divHeight =
    config["height"] + config["paddingTop"] + config["paddingBottom"];
  const width1 = div.style("width"); //"120px"
  const radius = Math.min(divWidth, divHeight) / 2;
  const color: any = ["#4daf4a", "#377eb8", "#ff7f00", "#984ea3", "#e41a1c"];

  const svg = d3
    .select(config["select"])
    .append("svg")
    .attr("width", divWidth)
    .attr("height", divHeight);
  const g = svg
    .append("g")
    .attr("transform", "translate(" + divWidth / 2 + "," + divHeight / 2 + ")");
  const pie = d3.pie().value(function (d: any) {
    return d.percent;
  });
  // 普通并图
  // const arc: any = d3.arc()
  //     .outerRadius(radius)
  //     .innerRadius(0);
  // 甜甜圈
  const arc: any = d3
    .arc()
    .outerRadius(radius - 70)
    .innerRadius(100)
    .padAngle(0.03);
  const label: any = d3
    .arc()
    .outerRadius(radius - 60)
    .innerRadius(radius - 80);

  const arcs = g
    .selectAll(".arcAll")
    .data(pie(data))
    .enter()
    .append("g")
    .attr("class", "arcAll");
  arcs
    .append("path")
    .attr("d", arc)
    .attr("fill", function (d: any, i) {
      return color[i];
    });

  arcs
    .append("text")
    .attr("transform", function (d) {
      return "translate(" + label.centroid(d) + ")";
    })
    .text(function (d: any) {
      return d.data.browser;
    });

  svg
    .append("g")
    .attr("transform", "translate(" + (width / 2 - 120) + "," + 20 + ")")
    .append("text")
    .text("Browser use statistics - Jan 2017")
    .attr("class", "title");
};

/**
 * 甜甜圈动态饼图
 * @param config
 */
export const simplePieChart10 = (config: IntervalType) => {
  const data: any = [
    { age: "<5", population: 2704659 },
    { age: "5-13", population: 4499890 },
    { age: "14-17", population: 2159981 },
    { age: "18-24", population: 3853788 },
    { age: "25-44", population: 14106543 },
    { age: "45-64", population: 8819342 },
    { age: "≥65", population: 612463 },
  ];
  const div: any = d3.select(config["select"]);
  const divWidth = div.node().getBoundingClientRect().width;
  const width = divWidth - config["paddingLeft"] - config["paddingRight"];
  const height = config["height"];
  const divHeight =
    config["height"] + config["paddingTop"] + config["paddingBottom"];
  const width1 = div.style("width"); //"120px"
  const radius = Math.min(width, height) / 2; //
  const chart = d3
    .select(config["select"])
    .append("svg")
    .attr("width", divWidth)
    .attr("height", divHeight);

  const g = chart
    .append("g")
    .attr(
      "transform",
      "translate(" +
        (width / 2 + config["paddingLeft"]) +
        "," +
        (config["paddingTop"] + radius) +
        ")"
    ); // 设最外包层在总图上的相对位置

  const colors: any = d3
    .scaleOrdinal()
    .range([
      "#98abc5",
      "#8a89a6",
      "#7b6888",
      "#6b486b",
      "#a05d56",
      "#d0743c",
      "#ff8c00",
    ]);

  const arc: any = d3
    .arc() // 定义单个圆弧
    .innerRadius(200)
    .padAngle(0);

  const startPointArc = d3
    .arc() // 定义单个圆弧里面的线条开始点所在的弧
    .outerRadius(radius - 10)
    .innerRadius(radius - 10);

  const percentLabelArc = d3
    .arc() // 定义单个圆弧里面的percent文字
    .outerRadius(radius - 60)
    .innerRadius(radius - 60);

  const populationLabelArc = d3
    .arc() // 定义单个圆弧里面的population文字
    .outerRadius(radius + 40)
    .innerRadius(radius + 40);

  const pie: any = d3
    .pie() // 定义饼图
    .sort(null)
    .value(function (d: any) {
      return d.population;
    });

  const sumData = d3.sum(data, function (d: any) {
    return d.population;
  });
  const keys: any = d3
    .map(data, function (d: any) {
      return d.age;
    })
    .keys();
  colors.domain(keys); // 定义颜色值域
  let _currentData: any;
  g.selectAll(".arc") // 画环图
    .data(pie(data))
    .enter()
    .append("path")
    .attr("cursor", "pointer")
    .attr("class", "arc")
    .attr("id", (d: any) => {
      return "population10" + d.data.population;
    })
    .attr("stroke", (d: any) => {
      return colors(d.data.age);
    })
    .style("fill", (d: any) => {
      return colors(d.data.age);
    })
    .each(function (d: any) {
      // 储存当前起始与终点的角度、并设为相等
      const tem = { ...d, endAngle: d.startAngle };
      d["outerRadius"] = radius - 10;
      _currentData = tem;
    })
    .on("mouseover", (d: any) => {
      console.log(d.path[0].id);
      const id = "#" + d.path[0].id;
      return arcTween(radius + 20, 0, id);
    })
    .on("mouseout", (d: any) => {
      console.log(d.path[0].id);
      const id = "#" + d.path[0].id;
      return arcTween(radius - 10, 150, id);
    })
    // .on("mouseover", arcTween(radius + 20, 0))
    // .on("mouseout", arcTween(radius - 10, 150))
    .transition()
    .duration(100)
    .delay(function (d, i) {
      return i * 100;
    })
    // .attrTween("d", function() {
    //   const i: any = d3.interpolate(_currentData, true)
    //   _currentData = i(0) // 重设当前角度
    //   // return d3.interpolateRgb("red", "blue");
    //   return arc(i);
    // });
    .attrTween("d", (next: any) => {
      // 动态设置d属性、生成动画
      const i: any = d3.interpolate(_currentData, next);
      _currentData = i(0); // 重设当前角度
      return function (t: any) {
        return arc(i(t));
      };
    });

  const arcs = pie(data); // 构造圆弧

  const linkLine = g.append("g"); // 创建每条连接线
  const links: any = [];
  arcs.forEach(function (d: any) {
    // 输出age文字
    const startPoint = startPointArc.centroid(d);
    const endPoint = populationLabelArc.centroid(d);
    links.push({
      source: [startPoint[0], startPoint[1]],
      target: [endPoint[0], endPoint[1]],
    });
  });

  const linkHorizontal: any = d3
    .linkHorizontal() // 创建一个新的水平链接生成器。
    .source(function (d: any) {
      return d.source;
    })
    .target(function (d: any) {
      return d.target;
    });
  linkLine
    .selectAll()
    .data(links)
    .enter()
    .append("path")
    .attr("class", "link-line")
    .style("stroke", "#999")
    .style("stroke-width", 1)
    .attr("fill", "none")
    .attr("d", linkHorizontal);

  const label = g.append("g");

  arcs.forEach(function (d: any) {
    // 输出percent文字
    const c = percentLabelArc.centroid(d);
    label
      .append("text")
      .attr("class", "age-text")
      .attr("fill", "#cddc39")
      .attr("font-weight", "700")
      .attr("font-size", "14px")
      .attr("text-anchor", "middle")
      .attr("x", c[0])
      .attr("y", c[1])
      .text(((d.data.population * 100) / sumData).toFixed(1) + "%");
  });

  arcs.forEach(function (d: any) {
    // 输出population文字
    const c = populationLabelArc.centroid(d);
    label
      .append("text")
      .attr("class", "age-text")
      .attr("fill", "#000")
      .attr("font-size", "12px")
      .attr("text-anchor", function (d) {
        return c[0] >= 0 ? "start" : "end";
      })
      .attr("x", c[0])
      .attr("y", c[1])
      .text(
        d.data.age + "岁 : " + (d.data.population / 10000).toFixed(2) + "万人"
      );
  });

  chart
    .append("g") // 输出标题
    .attr("class", "arc--title")
    .append("text")
    .attr("fill", "none")
    .attr("font-size", "14px")
    .attr("font-weight", "700")
    .attr(
      "transform",
      "translate(" +
        (width / 2 + config["paddingLeft"]) +
        "," +
        (config["paddingTop"] + radius) +
        ")"
    )
    .attr("text-anchor", "middle")
    .attr("x", 0)
    .attr("y", 0)
    .text("XX市人口年龄结构");

  function arcTween(outerRadius: any, delay: any, selectId: string) {
    // 设置缓动函数
    return d3
      .select(selectId)
      .transition()
      .delay(delay)
      .attrTween("d", (next: any) => {
        console.log(next);
        const i: any = d3.interpolate(next.outerRadius, outerRadius);
        _currentData = i(0); // 重设当前角度
        console.log(i);
        return function (t: any) {
          next.outerRadius = i(t);
          return arc(next);
        };
      });
  }
};

// 3D饼图
export const simplePieChart12 = () => {
  const salesData: any = [
    { label: "Basic", color: "#3366CC" },
    { label: "Plus", color: "#DC3912" },
    { label: "Lite", color: "#FF9900" },
    { label: "Elite", color: "#109618" },
    { label: "Delux", color: "#990099" },
  ];

  const svg = d3
    .select("#simplePieChart12")
    .append("svg")
    .attr("width", 700)
    .attr("height", 300);

  svg.append("g").attr("id", "salesDonut");
  // .attr(
  //   "transform",
  //   "translate(" +
  //   (350) +
  //   "," +
  //   (300) +
  //   ")"
  // );
  svg.append("g").attr("id", "quotesDonut");

  const randomData = () => {
    return salesData.map(function (d: any) {
      return { label: d.label, value: 1000 * Math.random(), color: d.color };
    });
  };

  draw("salesDonut", randomData(), 150, 150, 130, 100, 30, 0.4);
  draw("quotesDonut", randomData(), 450, 150, 130, 100, 30, 0);

  const changeData = () => {
    transition("salesDonut", randomData(), 130, 100, 30, 0.4);
    transition("quotesDonut", randomData(), 130, 100, 30, 0);
  };
};

export const linePie = (config: IntervalType) => {
  // 设定一些方便计算的常量
  const radius = 200,
    // 指标的个数，即fieldNames的长度
    total = 64,
    // 需要将网轴分成几级，即网轴上从小到大有多少个正多边形
    level = 1,
    // 网轴的范围，类似坐标轴
    rangeMin = 0,
    rangeMax = 100,
    arc = 2 * Math.PI;
  // 每项指标所在的角度
  const onePiece = arc / total;
  // 计算网轴的正多边形的坐标
  const polygons: any = {
    webs: [],
    webPoints: [],
  };

  const color: any = [
    {
      name: "蓝色",
      color: "#3366CC",
    },
    {
      name: "红色",
      color: "#DC3912",
    },
    {
      name: "黄色",
      color: "#FF9900",
    },
    {
      name: "绿色",
      color: "#109618",
    },
    {
      name: "紫色",
      color: "#990099",
    },
  ];

  const getColor = (index: number) => {
    let color = "gray";
    switch (true) {
      case index < 10:
        color = "#3366CC";
        break;
      case index < 25:
        color = "#DC3912";
        break;
      case index < 40:
        color = "#FF9900";
        break;
      case index < 49:
        color = "#109618";
        break;
      case index < 55:
        color = "#990099";
        break;
    }
    return color;
  };

  const webLine = () => {
    let webs = "";
    const webPoints: any = [];
    const r = radius / level;
    for (let i = 0; i < total; i++) {
      const x = r * Math.sin(i * onePiece),
        y = r * Math.cos(i * onePiece);
      webs += x + "," + y + " ";
      webPoints.push({
        x: x,
        y: y,
        color: getColor(i),
      });
    }
    polygons.webs.push(webs);
    polygons.webPoints.push(webPoints);
  };
  webLine();

  // svg
  const div: any = d3.select(config["select"]);
  const divWidth = div.node().getBoundingClientRect().width;
  const width = divWidth - config["paddingLeft"] - config["paddingRight"];
  const height = config["height"];
  const divHeight =
    config["height"] + config["paddingTop"] + config["paddingBottom"];
  const width1 = div.style("width"); //"120px"

  const svg = d3
    .select("#d3LinePie")
    .append("svg")
    .attr("width", divWidth)
    .attr("height", divHeight);

  // 标题
  svg
    .append("g") // 输出标题
    .attr("class", "arc--title")
    .append("text")
    // .attr("fill", "none")
    .attr("font-size", "14px")
    .attr("font-weight", "700")
    .attr(
      "transform",
      "translate(" +
        (width / 2 + config["paddingLeft"]) +
        "," +
        (config["paddingTop"] + radius) +
        ")"
    )
    .attr("text-anchor", "middle")
    .attr("x", 0)
    .attr("y", 0)
    .text("颜色统计");

  // 添加纵轴

  const lines = svg
    .append("g")
    .attr(
      "transform",
      "translate(" +
        (width / 2 + config["paddingLeft"]) +
        "," +
        (config["paddingTop"] + radius) +
        ")"
    )
    .classed("lines", true);
  const lineAnimation = () => {
    lines
      .selectAll("line")
      .data(polygons.webPoints[0])
      .enter()
      .append("line")
      // .attr("x1", 0)
      // .attr("y1", 0)
      .attr("x1", function (d: any) {
        return d.x / 1.5;
      })
      .attr("y1", function (d: any) {
        return d.y / 1.5;
      })
      .attr("x2", function (d: any) {
        return d.x;
      })
      .attr("y2", function (d: any) {
        return d.y;
      })
      .transition()
      .delay((d, i) => {
        return i * 200;
      })
      .duration(2000)
      .ease(d3.easeCircleOut)
      .attr("stroke", function (d: any) {
        return d.color;
      });
  };
  lineAnimation();
  setInterval(() => {
    lines.selectAll("line").remove();
    lineAnimation();
  }, 14000);

  const legend = svg
    .append("g") // 画legend
    .attr("font-family", "sans-serif")
    .attr("font-size", 10)
    .attr(
      "transform",
      "translate(0," + (config["paddingTop"] + radius) / 2 + ")"
    )
    .attr("text-anchor", "end")
    .selectAll("g")
    .data([1, 2, 3, 4, 5])
    .enter()
    .append("g")
    .attr("transform", function (d, i) {
      return "translate(0," + i * 30 + ")";
    });

  legend
    .append("rect")
    .attr("x", width - 100)
    .attr("width", 19)
    .attr("height", 19)
    .attr("fill", function (d, i) {
      return color[i].color;
    });

  legend
    .append("text")
    .attr("x", width - 50)
    .attr("y", 9.5)
    .attr("dy", "0.32em")
    .text(function (d, i) {
      return color[i].name;
    });
};
