/*
 * @Author: 李九阳
 * @Date: 2021-12-08 13:33:38
 * @LastEditors: 李九阳
 * @LastEditTime: 2021-12-09 17:01:48
 */
import * as d3 from "d3";
import { IntervalType } from "@/type/d3Type";

/**
 * 雷达图坐标
 */
export const radarChart = (config: IntervalType) => {
  // 设定一些方便计算的常量
  const radius = 260,
    // 指标的个数，即fieldNames的长度
    total = 8,
    // 需要将网轴分成几级，即网轴上从小到大有多少个正多边形
    level = 4,
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
  for (let k = level; k > 0; k--) {
    let webs = "";
    const webPoints: any = [];
    const r = (radius / level) * k;
    for (let i = 0; i < total; i++) {
      const x = r * Math.sin(i * onePiece),
        y = r * Math.cos(i * onePiece);
      webs += x + "," + y + " ";
      webPoints.push({
        x: x,
        y: y,
      });
    }
    polygons.webs.push(webs);
    polygons.webPoints.push(webPoints);
  }

  // svg
  const div: any = d3.select(config["select"]);
  const divWidth = div.node().getBoundingClientRect().width;
  const width = divWidth - config["paddingLeft"] - config["paddingRight"];
  const height = config["height"];
  const divHeight =
    config["height"] + config["paddingTop"] + config["paddingBottom"];
  const width1 = div.style("width"); //"120px"
  const color: any = d3.scaleOrdinal([
    "#4daf4a",
    "#377eb8",
    "#ff7f00",
    "#984ea3",
    "#e41a1c",
  ]);

  const svg = d3
    .select(config["select"])
    .append("svg")
    .attr("width", divWidth)
    .attr("height", divHeight);

  // 绘制网轴
  const webs = svg
    .append("g")
    .attr(
      "transform",
      "translate(" +
        (width / 2 + config["paddingLeft"]) +
        "," +
        (config["paddingTop"] + radius) +
        ")"
    )
    .classed("webs", true);
  webs
    .selectAll("polygon")
    .data(polygons.webs)
    .enter()
    .append("polygon")
    .attr("points", (d: any) => {
      return d;
    });

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
  lines
    .selectAll("line")
    .data(polygons.webPoints[0])
    .enter()
    .append("line")
    .attr("x1", 0)
    .attr("y1", 0)
    .attr("x2", function (d: any) {
      return d.x;
    })
    .attr("y2", function (d: any) {
      return d.y;
    });
};

/**
 * 雷达图
 */
export const radarChart01 = (config: IntervalType) => {
  // 设定一些方便计算的常量
  const radius = 260, // 雷达图半径
    // 指标的个数，即fieldNames的长度
    total = 8,
    // 需要将网轴分成几级，即网轴上从小到大有多少个正多边形
    level = 4,
    // 网轴的范围，类似坐标轴
    rangeMin = 0,
    rangeMax = 260,
    arc = 2 * Math.PI;
  // 每项指标所在的角度
  const onePiece = arc / total;
  // 计算网轴的正多边形的坐标
  const polygons: any = {
    webs: [],
    webPoints: [],
  };
  for (let k = level; k > 0; k--) {
    let webs = "";
    const webPoints: any = [];
    const r = (radius / level) * k;
    for (let i = 0; i < total; i++) {
      const x = r * Math.sin(i * onePiece),
        y = r * Math.cos(i * onePiece);
      webs += x + "," + y + " ";
      webPoints.push({
        x: x,
        y: y,
      });
    }
    polygons.webs.push(webs);
    polygons.webPoints.push(webPoints);
  }

  // svg
  const div: any = d3.select(config["select"]);
  const divWidth = div.node().getBoundingClientRect().width;
  const width = divWidth - config["paddingLeft"] - config["paddingRight"];
  const height = config["height"];
  const divHeight =
    config["height"] + config["paddingTop"] + config["paddingBottom"];
  const width1 = div.style("width"); //"120px"
  const color: any = d3.scaleOrdinal().range(d3.schemeCategory10);

  const svg = d3
    .select(config["select"])
    .append("svg")
    .attr("width", divWidth)
    .attr("height", divHeight);

  // 绘制网轴
  const webs = svg
    .append("g")
    .attr(
      "transform",
      "translate(" +
        (width / 2 + config["paddingLeft"]) +
        "," +
        (config["paddingTop"] + radius) +
        ")"
    )
    .classed("webs", true);
  webs
    .selectAll("polygon")
    .data(polygons.webs)
    .enter()
    .append("polygon")
    .attr("points", (d: any) => {
      return d;
    });

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
  lines
    .selectAll("line")
    .data(polygons.webPoints[0])
    .enter()
    .append("line")
    .attr("x1", 0)
    .attr("y1", 0)
    .attr("x2", function (d: any) {
      return d.x;
    })
    .attr("y2", function (d: any) {
      return d.y;
    });

  const data: any = {
    fieldNames: [
      "语文",
      "数学",
      "外语",
      "物理",
      "化学",
      "生物",
      "政治",
      "历史",
    ],
    values: [
      [10, 20, 30, 40, 50, 60, 70, 80],
      [80, 70, 60, 50, 40, 30, 20, 10],
    ],
  };

  // 计算雷达图表的坐标
  const areasData: any = [];
  const values = data.values;
  for (let i = 0; i < values.length; i++) {
    const value = values[i];
    let area = "";
    const points = [];
    for (let k = 0; k < total; k++) {
      const r = (radius * (value[k] - rangeMin)) / (rangeMax - rangeMin);
      const x = r * Math.sin(k * onePiece) * 2.6,
        y = r * Math.cos(k * onePiece) * 2.6;
      area += x + "," + y + " ";
      points.push({
        x: x,
        y: y,
      });
    }
    areasData.push({
      polygon: area,
      points: points,
    });
  }

  const areas = svg
    .append("g")
    .attr(
      "transform",
      "translate(" +
        (width / 2 + config["paddingLeft"]) +
        "," +
        (config["paddingTop"] + radius) +
        ")"
    )
    .classed("areas", true);
  // 添加g分组用来包含一个雷达图区域下的多边形以及圆点
  areas
    .selectAll("g")
    .data(areasData)
    .enter()
    .append("g")
    .attr("class", function (d, i) {
      return "area" + (i + 1);
    });
  for (let i = 0; i < areasData.length; i++) {
    // 依次循环每个雷达图区域
    const area = areas.select(".area" + (i + 1)),
      areaData = areasData[i];
    // 绘制雷达图区域下的多边形
    area
      .append("polygon")
      .attr("points", areaData.polygon)
      .attr("stroke", function (d, index) {
        return color(i);
      })
      .attr("fill", function (d, index) {
        return color(i);
      });
    // 绘制雷达图区域下的点
    const circles = area.append("g").classed("circles", true);
    circles
      .selectAll("circle")
      .data(areaData.points)
      .enter()
      .append("circle")
      .attr("cx", function (d: any) {
        return d.x;
      })
      .attr("cy", function (d: any) {
        return d.y;
      })
      .attr("r", 3)
      .attr("stroke", function (d, index) {
        return color(index);
      });
  }

  // 计算文字标签坐标
  const textPoints: any = [];
  const textRadius = radius + 20;
  for (let i = 0; i < total; i++) {
    const x = textRadius * Math.sin(i * onePiece),
      y = textRadius * Math.cos(i * onePiece);
    textPoints.push({
      x: x,
      y: y,
    });
  }
  // 绘制文字标签
  const texts = svg
    .append("g")
    .attr(
      "transform",
      "translate(" +
        (width / 2 + config["paddingLeft"]) +
        "," +
        (config["paddingTop"] + radius) +
        ")"
    )
    .classed("texts", true);
  texts
    .selectAll("#textId")
    .data(textPoints)
    .enter()
    .append("text")
    .attr("id", "textId")
    .attr("x", function (d: any) {
      return d.x;
    })
    .attr("y", function (d: any) {
      return d.y;
    })
    .text(function (d, i) {
      return data.fieldNames[i];
    });

  texts
    .selectAll("#textId01")
    .data([0, 1, 2, 3, 4])
    .enter()
    .append("text")
    .attr("id", "textId01")
    .attr("x", function (d: any) {
      return textPoints[4].x;
    })
    .attr("y", function (d: any) {
      return -70 * d + d * 5;
    })
    .text(function (d, i) {
      return [0, 25, 50, 75, 100][i];
    });
};

export const radarChart02 = () => {
  const data = [
    {
      className: "甲班",
      chinese: 88,
      math: 92,
      physics: 90,
      chemistry: 88,
      english: 95,
    },
    {
      className: "乙班",
      chinese: 67,
      math: 78,
      physics: 80,
      chemistry: 72,
      english: 74,
    },
    {
      className: "丙班",
      chinese: 77,
      math: 83,
      physics: 68,
      chemistry: 69,
      english: 65,
    },
    {
      className: "丁班",
      chinese: 72,
      math: 67,
      physics: 62,
      chemistry: 67,
      english: 68,
    },
  ];
  const containerWidth = 900;
  const margin = { top: 80, right: 80, bottom: 60, left: 60 };
  const width = containerWidth - margin.left - margin.right;
  const height = 700 - margin.top - margin.bottom;
  const outerRadius = Math.min(width, height) * 0.5;

  const chart = d3
    .select("#radarChart02")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom);

  const g = chart
    .append("g")
    .attr(
      "transform",
      "translate(" +
        containerWidth / 2 +
        "," +
        (height + margin.top + margin.bottom) / 2 +
        ")"
    );

  const names: any = {
    chinese: "语文",
    math: "数学",
    physics: "物理",
    chemistry: "化学",
    english: "英语",
  };

  const keys = Object.keys(data[0]).slice(1);
  const series = data.map((d: any) => {
    return keys.map((key) => {
      return {
        key: key,
        className: d.className,
        value: d[key],
      };
    });
  });

  const x: any = d3
    .scaleBand() // 定义x轴
    .range([0, 2 * Math.PI])
    .align(0);

  const y: any = d3.scaleLinear().range([0, outerRadius]); // 定义y轴

  const z = d3.scaleOrdinal(d3.schemeCategory10); // 通用线条的颜色

  const maxSerieValue = d3.max(series, function (s) {
    return d3.max(s, function (d) {
      return d.value;
    });
  });

  x.domain(keys); // x与y轴的值域
  y.domain([0, maxSerieValue + 10]);

  const defs = chart.append("defs"); // 添加圆形遮罩

  defs
    .selectAll("clipPath")
    .data(d3.range(data.length))
    .enter()
    .append("clipPath")
    .attr("id", function (d, i) {
      return "clip_" + i;
    })
    .append("circle")
    .attr("r", 0)
    .transition()
    .duration(500)
    .delay(function (d, i) {
      return i * 500;
    })
    .attr("r", outerRadius);

  const yAxis = g
    .append("g") // 画y轴圈圈及文字
    .attr("text-anchor", "start");
  const reverse: any = y.ticks(10).reverse();
  const yTick = yAxis
    .selectAll("g")
    .data(reverse)
    // .data(Array.reverse(y.ticks(10)))
    .enter()
    .append("g");

  yTick
    .append("circle")
    .attr("fill", "#ddd")
    .attr("stroke", "#999")
    .attr("fill-opacity", 0.3)
    .attr("r", y);

  yTick
    .append("text")
    .attr("x", 6)
    .attr("y", function (d) {
      return -y(d);
    })
    .attr("dy", "0.35em")
    .attr("fill", "none")
    .attr("stroke", "#fff")
    .attr("stroke-width", 5)
    .text(y.tickFormat(10, "r"));

  yTick
    .append("text")
    .attr("x", 6)
    .attr("y", function (d) {
      return -y(d);
    })
    .attr("dy", "0.35em")
    .text(y.tickFormat(10, "r"));

  const tick = g
    .selectAll(".tick") // 绘画所有轴线条
    .data(
      keys.map((key) => {
        return [
          { angle: 0, radius: 0 },
          { angle: x(key), radius: y(maxSerieValue + 10) },
        ];
      })
    )
    .enter()
    .append("g")
    .attr("class", "tick");

  const lineRadial: any = d3
    .lineRadial()
    .angle(function (d: any) {
      return d.angle;
    })
    .radius(function (d: any) {
      return d.radius;
    })
    .curve(d3.curveLinearClosed);
  tick
    .append("path") // 开始绘画所有的轴线条
    .attr("class", "tick-line")
    .style("stroke", "#fff")
    .style("stroke-width", 2)
    .attr("fill", "none")
    .attr("d", lineRadial);

  g.selectAll(".tick-type") // 绘所有轴添加类型名
    .data(keys)
    .enter()
    .append("text")
    .attr("class", "tick-type")
    .attr("text-anchor", function (d: any) {
      return x(d) > Math.PI ? "end" : "start";
    })
    .attr("x", function (d) {
      return Math.sin(x(d)) * (outerRadius + 10);
    })
    .attr("y", function (d) {
      return -1 * Math.cos(x(d)) * (outerRadius + 10);
    })
    .text(function (d) {
      return names[d];
    });

  // 绘制雷达图数据区域 ************
  // const serie = g
  //     .selectAll('.serie') // 绘画雷达线条
  //     .data(series)
  //     .enter()
  //     .append('g')
  //     .attr('class', 'serie')
  //     .attr('clip-path', function (d, i) {
  //         return 'url(#clip_' + i + ')'
  //     });

  // const linearClosed: any = d3
  // .lineRadial()
  // .angle(function (d: any) {
  //     return x(d.key)
  // })
  // .radius(function (d: any) {
  //     return y(d.value)
  // })
  // .curve(d3.curveLinearClosed);
  // serie
  //     .append('path') // 开始绘画雷达线条
  //     .attr('class', 'radar-line')
  //     .style('stroke', function (d) {
  //         return z(d[0].className)
  //     })
  //     .attr('fill', function (d) {
  //         return z(d[0].className)
  //     })
  //     .attr('fill-opacity', 0.2)
  //     .attr(
  //         'd',
  //         linearClosed
  //     )
  //     .append('title') // 输出Title，mouseover显示
  //     .text(function (d) {
  //         const str = d
  //             .map(t => {
  //                 return names[t.key] + ': ' + t.value + '分'
  //             })
  //             .join('\n')
  //         return d[0].className + '\n' + str
  //     });
  // *************8end**********
};

export const radarChart04 = () => {
  const data = [
    {
      className: "甲班",
      chinese: 88,
      math: 92,
      physics: 90,
      chemistry: 88,
      english: 95,
    },
    {
      className: "乙班",
      chinese: 67,
      math: 78,
      physics: 80,
      chemistry: 72,
      english: 74,
    },
    {
      className: "丙班",
      chinese: 77,
      math: 83,
      physics: 68,
      chemistry: 69,
      english: 65,
    },
    {
      className: "丁班",
      chinese: 72,
      math: 67,
      physics: 62,
      chemistry: 67,
      english: 68,
    },
  ];
  const containerWidth = 900;
  const margin = { top: 80, right: 80, bottom: 60, left: 60 };
  const width = containerWidth - margin.left - margin.right;
  const height = 700 - margin.top - margin.bottom;
  const outerRadius = Math.min(width, height) * 0.5;

  const chart = d3
    .select("#radarChart04")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom);

  const g = chart
    .append("g")
    .attr(
      "transform",
      "translate(" +
        containerWidth / 2 +
        "," +
        (height + margin.top + margin.bottom) / 2 +
        ")"
    );

  const names: any = {
    chinese: "语文",
    math: "数学",
    physics: "物理",
    chemistry: "化学",
    english: "英语",
  };

  const keys = Object.keys(data[0]).slice(1);
  const series = data.map((d: any) => {
    return keys.map((key) => {
      return {
        key: key,
        className: d.className,
        value: d[key],
      };
    });
  });

  const x: any = d3
    .scaleBand() // 定义x轴
    .range([0, 2 * Math.PI])
    .align(0);

  const y: any = d3.scaleLinear().range([0, outerRadius]); // 定义y轴

  const z = d3.scaleOrdinal(d3.schemeCategory10); // 通用线条的颜色

  const maxSerieValue = d3.max(series, function (s) {
    return d3.max(s, function (d) {
      return d.value;
    });
  });

  x.domain(keys); // x与y轴的值域
  y.domain([0, maxSerieValue + 10]);

  const defs = chart.append("defs"); // 添加圆形遮罩

  defs
    .selectAll("clipPath")
    .data(d3.range(data.length))
    .enter()
    .append("clipPath")
    .attr("id", function (d, i) {
      return "clip_" + i;
    })
    .append("circle")
    .attr("r", 0)
    .transition()
    .duration(500)
    .delay(function (d, i) {
      return i * 500;
    })
    .attr("r", outerRadius);

  const yAxis = g
    .append("g") // 画y轴圈圈及文字
    .attr("text-anchor", "start");
  const reverse: any = y.ticks(10).reverse();
  const yTick = yAxis
    .selectAll("g")
    .data(reverse)
    // .data(Array.reverse(y.ticks(10)))
    .enter()
    .append("g");

  yTick
    .append("circle")
    .attr("fill", "#ddd")
    .attr("stroke", "#999")
    .attr("fill-opacity", 0.3)
    .attr("r", y);

  yTick
    .append("text")
    .attr("x", 6)
    .attr("y", function (d) {
      return -y(d);
    })
    .attr("dy", "0.35em")
    .attr("fill", "none")
    .attr("stroke", "#fff")
    .attr("stroke-width", 5)
    .text(y.tickFormat(10, "r"));

  yTick
    .append("text")
    .attr("x", 6)
    .attr("y", function (d) {
      return -y(d);
    })
    .attr("dy", "0.35em")
    .text(y.tickFormat(10, "r"));

  const tick = g
    .selectAll(".tick") // 绘画所有轴线条
    .data(
      keys.map((key) => {
        return [
          { angle: 0, radius: 0 },
          { angle: x(key), radius: y(maxSerieValue + 10) },
        ];
      })
    )
    .enter()
    .append("g")
    .attr("class", "tick");

  const lineRadial: any = d3
    .lineRadial()
    .angle(function (d: any) {
      return d.angle;
    })
    .radius(function (d: any) {
      return d.radius;
    })
    .curve(d3.curveLinearClosed);
  tick
    .append("path") // 开始绘画所有的轴线条
    .attr("class", "tick-line")
    .style("stroke", "#fff")
    .style("stroke-width", 2)
    .attr("fill", "none")
    .attr("d", lineRadial);

  g.selectAll(".tick-type") // 绘所有轴添加类型名
    .data(keys)
    .enter()
    .append("text")
    .attr("class", "tick-type")
    .attr("text-anchor", function (d: any) {
      return x(d) > Math.PI ? "end" : "start";
    })
    .attr("x", function (d) {
      return Math.sin(x(d)) * (outerRadius + 10);
    })
    .attr("y", function (d) {
      return -1 * Math.cos(x(d)) * (outerRadius + 10);
    })
    .text(function (d) {
      return names[d];
    });

  const serie = g
    .selectAll(".serie") // 绘画雷达线条
    .data(series)
    .enter()
    .append("g")
    .attr("class", "serie")
    .attr("clip-path", function (d, i) {
      return "url(#clip_" + i + ")";
    });

  const linearClosed: any = d3
    .lineRadial()
    .angle(function (d: any) {
      return x(d.key);
    })
    .radius(function (d: any) {
      return y(d.value);
    })
    .curve(d3.curveLinearClosed);
  serie
    .append("path") // 开始绘画雷达线条
    .attr("class", "radar-line")
    .attr("id", (d, i) => {
      return "radar-line" + i;
    })
    .style("stroke", function (d) {
      return z(d[0].className);
    })
    .attr("fill", function (d) {
      return z(d[0].className);
    })
    .attr("fill-opacity", 0.2)
    .attr("d", linearClosed)
    .on("mouseover", (d: any) => {
      const id = "#" + d.path[0].id;
      return d3.select(id).transition().delay(100).attr("fill-opacity", 0.6);
    })
    .on("mouseout", (d: any) => {
      const id = "#" + d.path[0].id;
      return d3.select(id).transition().delay(100).attr("fill-opacity", 0.2);
    })
    .append("title") // 输出Title，mouseover显示
    .text(function (d) {
      const str = d
        .map((t) => {
          return names[t.key] + ": " + t.value + "分";
        })
        .join("\n");
      return d[0].className + "\n" + str;
    });

  // 绘制图例
  const legend = chart
    .append("g") // 画legend
    .attr("font-family", "sans-serif")
    .attr("font-size", 10)
    .attr("transform", "translate(-65,65)")
    .attr("text-anchor", "end")
    .selectAll("g")
    .data(data)
    .enter()
    .append("g")
    .attr("transform", function (d, i) {
      return "translate(0," + i * 20 + ")";
    });

  legend
    .append("rect")
    .attr("x", width - 19)
    .attr("width", 19)
    .attr("height", 19)
    .attr("fill", function (d) {
      return z(d.className);
    });

  legend
    .append("text")
    .attr("x", width - 24)
    .attr("y", 9.5)
    .attr("dy", "0.32em")
    .text(function (d) {
      return d.className;
    });

  chart
    .append("g") // 输出标题
    .attr("class", "radar-chart--title")
    .append("text")
    .attr("fill", "#000")
    .attr("font-size", "16px")
    .attr("font-weight", "700")
    .attr("text-anchor", "middle")
    .attr("x", containerWidth / 2)
    .attr("y", 20)
    .text("XX年级期中考试平均成绩(分), 满分100分");
};
