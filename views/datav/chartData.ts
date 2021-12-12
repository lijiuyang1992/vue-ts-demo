/*
 * @Author: 李九阳
 * @Date: 2021-12-10 15:40:33
 * @LastEditors: 李九阳
 * @LastEditTime: 2021-12-10 17:05:13
 */
import * as d3 from "d3";
/**
 * 齿轮饼图
 */
export const linePie = () => {
  // 设定一些方便计算的常量
  const radius = 90,
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
  const config = {
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 10,
  };
  // svg
  const divWidth = 432;
  const width = divWidth - config["paddingLeft"] - config["paddingRight"];
  const divHeight = 250;

  const svg = d3
    .select("#d3PieChart01")
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
        (width / 3) +
        "," +
        (divHeight/ 2) +
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
        (width / 3) +
        "," +
        (divHeight / 2) +
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
      "translate("+ config["paddingLeft"] + "," + (config["paddingTop"] + radius) / 2 + ")"
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

export const simplePieChart = () => {
  const data: any = [
    { age: "<5", population: 2704659 },
    { age: "5-13", population: 4499890 },
    { age: "14-17", population: 2159981 },
    { age: "18-24", population: 3853788 },
    { age: "25-44", population: 14106543 },
    { age: "45-64", population: 8819342 },
    { age: "≥65", population: 612463 },
  ];
  const config = {
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 10,
  };
  const divWidth = 432;
  const width = divWidth - config["paddingLeft"] - config["paddingRight"];
  const divHeight = 250;
  const radius = 80; //
  const chart = d3
    .select("#d3PieChart02")
    .attr("width", divWidth)
    .attr("height", divHeight);

  const g = chart
    .append("g")
    .attr(
      "transform",
      "translate(" +
        (width / 2 ) +
        "," +
        (divHeight / 2) +
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
    .innerRadius(50)
    .padAngle(0.03);

  const startPointArc = d3
    .arc() // 定义单个圆弧里面的线条开始点所在的弧
    .outerRadius(radius - 10)
    .innerRadius(radius - 10);

  const percentLabelArc = d3
    .arc() // 定义单个圆弧里面的percent文字
    .outerRadius(radius - 20)
    .innerRadius(radius - 20);

  const populationLabelArc = d3
    .arc() // 定义单个圆弧里面的population文字
    .outerRadius(radius + 30)
    .innerRadius(radius + 30);

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
      return arcTween(radius + 10, 0, id);
    })
    .on("mouseout", (d: any) => {
      const id = "#" + d.path[0].id;
      return arcTween(radius - 10, 150, id);
    })
    .transition()
    .duration(100)
    .delay(function (d, i) {
      return i * 100;
    })
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
        (width / 2) +
        "," +
        (divHeight / 2) +
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
        arcTween(radius + 10, 0, id);
        arcTween(radius - 10, 150, id);
      }, 1000 * index);
      index++;
    }
  };
  setInterval(() => animationPei(), 8000);
};


// 水波图
export const waveD3Chart = () => {
  const svg = d3
    .select("#waveD3Chart")
    .attr("width", 432)
    .attr("height", 250);
  svg
    .append("circle")
    .attr("fill", "#34a7f5")
    .attr("r", 100) // 半径
    .attr("cx", 216) // x轴位置
    .attr("cy", 125); // y轴位置
  svg
    .append("circle")
    .attr("fill", "#ffffff")
    .attr("r", 85) // 半径
    .attr("cx", 216) // x轴位置
    .attr("cy", 125); // y轴位置
  /* ------------动画部分------------ */
  const height = 250;
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
    .attr("r", 80) // 半径
    .attr("cx", 100) // x轴位置
    .attr("cy", 20); // y轴位置
  svg
    .append("defs")
    .append("clipPath") // 裁剪图层
    .attr("id", "clipPath1")
    .append("circle")
    .attr("r", 80) // 半径
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
      .attr("width", 400)
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
      .attr("width", 400)
      .attr("d", areaPath(dataList0))
      .attr("fill", "rgba(52, 167, 245, 1)")
      .attr("transform", "translate(115,100)")
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
    .attr("x", 160)
    .attr("y", 130)
    .style("fill", "#c3e2fe")
    .style("font-size", "50px")
    .style("font-weight", "bold")
    .text("55%");
  svg
    .append("text")
    .attr("x", 160)
    .attr("y", 130)
    .style("fill", "#31618e")
    .style("font-size", "50px")
    .style("font-weight", "bold")
    .text("55%")
    .attr("clip-path", "url(#clipPath2)");
  
  
  // const ground = svg.append("svg");
  // ground
  //   .append("rect")
  //   .attr("width", 216)
  //   .attr("height", 125)
  //   .attr("fill", "none")
  //   .attr("transform", "translate(50,50)");
  // ground
  //   .append("text")
  //   .attr("x", 120)
  //   .attr("y", 85)
  //   .style("fill", "#000000")
  //   .style("font-size", "25px")
  //   .style("font-weight", "nomal")
  //   .text("Liquid Fill Gauge");
  // ground
  //   .append("rect")
  //   .attr("width", 200)
  //   .attr("height", 200)
  //   .attr("fill", "none")
  //   .attr("transform", "translate(100,100)");
};
