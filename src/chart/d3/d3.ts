/*
 * @Author: 李九阳
 * @Date: 2021-11-29 13:00:18
 * @LastEditors: 李九阳
 * @LastEditTime: 2021-12-02 09:18:33
 */
import * as d3 from "d3";

export function vueD3Circle() {
  const svg = d3.select("main").select("div").select("svg");
  const width = +svg.attr("width");
  const height = +svg.attr("height");
  const nodesData: any = [
    { name: "Lillian", sex: "F" },
    { name: "Gordon", sex: "M" },
    { name: "Sylvester", sex: "M" },
    { name: "Mary", sex: "F" },
    { name: "Helen", sex: "F" },
    { name: "Jamie", sex: "M" },
    { name: "Jessie", sex: "F" },
    { name: "Ashton", sex: "M" },
    { name: "Duncan", sex: "M" },
    { name: "Evette", sex: "F" },
    { name: "Mauer", sex: "M" },
    { name: "Fray", sex: "F" },
    { name: "Duke", sex: "M" },
    { name: "Baron", sex: "M" },
    { name: "Infante", sex: "M" },
    { name: "Percy", sex: "M" },
    { name: "Cynthia", sex: "F" },
  ];
  const simulation = d3.forceSimulation().nodes(nodesData);
  simulation
    .force("charge_force", d3.forceManyBody())
    .force("center_force", d3.forceCenter(width / 2, height / 2));
  const circleColor = (d: any) => {
    if (d.sex === "M") {
      return "blue";
    }
    return "pink";
  };

  const node = svg
    .append("g")
    .attr("class", "nodes")
    .selectAll("circle")
    .data(nodesData)
    .enter()
    .append("circle")
    .attr("r", 10)
    .attr("fill", circleColor);
  const tickAction = () => {
    node
      .attr("cx", (d: any) => {
        return d.x;
      })
      .attr("cy", (d: any) => {
        return d.y;
      });
  };
  simulation.on("tick", tickAction);
}

export function vueD3Svg() {
  const dataset = [10, 50, 20, 80, 90, 20, 40, 60, 10, 100];
  const width = 750;
  const height = 900;
  const svg = d3
    .select("main")
    .select("div")
    .append("svg")
    .attr("width", width)
    .attr("height", height);
  svg
    .append("rect")
    .attr("x", 300)
    .attr("width", 100)
    .attr("height", 100)
    .attr("fill", "red")
    .attr("stroke", "blue");
}
// 柱状图
export function vueD3Interval() {
  const datas = [
    {
      key: "html",
      value: "34",
    },
    {
      key: "css",
      value: "54",
    },
    {
      key: "javascript",
      value: "64",
    },
    {
      key: "java",
      value: "85",
    },
    {
      key: "python",
      value: "25",
    },
    {
      key: "C++",
      value: "49",
    },
  ];
  const width = 600,
    height = 400,
    padding = 40;

  const svg = d3
    .select("#d3Selector")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

  const xScale: any = d3
    .scaleBand()
    .domain(datas.map((d) => d.key))
    .range([padding, width - 2 * padding])
    .padding(0.5);
  const max: any = d3.max(datas, (d) => d.value);
  const yScale: any = d3
    .scaleLinear()
    .domain([0, max])
    .range([height - padding * 2, 0]);

  const xAxis = d3.axisBottom(xScale);
  const yAxis = d3.axisLeft(yScale);
  const color = d3.schemeCategory10;
  // 绘制坐标轴
  svg
    .append("g")
    .attr("class", "axis")
    .attr("transform", "translate(0," + (height - padding) + ")")
    .call(xAxis);

  svg
    .append("g")
    .attr("class", "axis")
    .attr("transform", "translate(" + padding + "," + padding + ")")
    .call(yAxis);

  svg
    .selectAll("rect")
    .data(datas)
    .enter()
    .append("rect")
    .attr("x", (d) => xScale(d.key))
    .attr("y", (d) => yScale(d.value) + padding)
    .attr("width", xScale.bandwidth())
    .attr("height", (d) => height - padding * 2 - yScale(d.value))
    .style("fill", (d: any, i: any) => {
      return color[i];
    });
}

// 饼图
export function vueD3Pie() {
  const dataset = [10, 50, 20, 80, 90, 20, 40, 60, 10, 100];
  const width = 750;
  const height = 900;
  const svg = d3
    .select(".d3Selector")
    .append("svg")
    .attr("width", width)
    .attr("height", height);
  const rectHeight = 25;
  const g = svg.append("g").attr("transform", "translate(400,300)");
  const color = d3.schemeCategory10;

  const pie = d3.pie();
  const pieData = pie(dataset);
  const arc: any = d3
    .arc()
    .innerRadius(60) // 圆环起始半径
    .outerRadius(100); //圆环结束半径

  g.selectAll("path")
    .data(pieData)
    .enter()
    .append("path")
    .attr("d", arc)
    .style("fill", (d: any, i: any) => {
      return color[i];
    });
}

// 折线图
export function vueD3Line() {
  const dataset: any = [10, 50, 20, 80, 90, 20, 40, 60, 10, 100];
  const width = 750;
  const height = 900;
  const svg = d3
    .select("main")
    .select("div")
    .append("svg")
    .attr("width", width)
    .attr("height", height);
  const rectHeight = 25;

  const color = d3.schemeCategory10;
  // 单折线图开始
  const widthLine = 500;
  const heightLine = 250;
  const margin = { left: 40, top: 60, right: 20, bottom: 20 };
  const g_w = widthLine - margin.left - margin.right;
  const g_h = heightLine - margin.top - margin.bottom;

  // 定义比例尺
  const xscale = d3
    .scaleLinear() // 定义一个类型（Linear）比例尺
    .domain([0, dataset.length - 1]) // 定义域，数据的域
    .range([0, g_w])
    .nice(); // 映射域，画布区域
  const max: any = d3.max(dataset);

  const yscale = d3.scaleLinear().domain([max, 0]).range([0, g_h]).nice();

  // 定义线
  const line = d3
    .line()
    .x((d: any, i: any) => {
      return xscale(i);
    })
    .y((d: any, i: any) => {
      return yscale(i);
    });

  // 定义坐标轴
  const xAxis = d3.axisBottom(xscale);
  const yAxis = d3.axisLeft(yscale);

  // 添加y轴
  const g = svg.append("g").attr("transform", "translate(100,500)").call(yAxis);

  g.append("path")
    .attr("stroke-width", 2)
    .attr("d", line(dataset))
    .attr("stroke", "blue")
    .attr("fill", "none");

  // 添加x轴
  svg.append("g").attr("transform", "translate(100,670)").call(xAxis);
}

export function vueD3viewBox() {
  const width = 500;
  const height = 500;
  const viewBox: any = [0, 0, width, height];
  const radius = 6;
  const step = 12; // radius*2
  const theta = Math.PI * (3 - Math.sqrt(5));
  const data = Array.from({ length: 2000 }, (_, i) => {
    const r = step * Math.sqrt((i += 0.5)),
      a = theta * i;
    return [width / 2 + r * Math.cos(a), height / 2 + r * Math.sin(a)];
  });

  const svg = d3
    .select("main")
    .select("div")
    .append("svg")
    .attr("viewBox", viewBox);

  let currentTransform: any = [width / 2, height / 2, height];

  const g = svg.append("g");

  g.selectAll("circle")
    .data(data)
    .join("circle")
    .attr("cx", ([x]) => x)
    .attr("cy", ([, y]) => y)
    .attr("r", radius)
    .attr("fill", (d, i) => d3.interpolateRainbow(i / 360));

  const transform = ([x, y, r]: any) => {
    return `
            translate(${width / 2}, ${height / 2})
            scale(${height / r})
            translate(${-x}, ${-y})
          `;
  };
  const transition = () => {
    const d = data[Math.floor(Math.random() * data.length)];
    const dataRadius: any = [...d, radius * 2 + 1];
    const i = d3.interpolateZoom(currentTransform, dataRadius);

    g.transition()
      .delay(250)
      .duration(i.duration)
      .attrTween(
        "transform",
        () => (t) => transform((currentTransform = i(t)))
      );
  };
  transition();
}

export function vueD3Canvas() {
  const width = 1152;
  const height = 640;
  const rotate: any = d3.interpolate([10, -20], [0, 0]);
  const scale = d3.interpolate(width / 4, (width - 2) / (2 * Math.PI));
  const equator: any = {
    type: "LineString",
    coordinates: [
      [-180, 0],
      [-90, 0],
      [0, 0],
      [90, 0],
      [180, 0],
    ],
  };
  const sphere: any = { type: "Sphere" };
  const graticule = d3.geoGraticule10();
  const canvas: any = document.querySelector("#myCanvas");
  const context: any = canvas.getContext("2d");
  // const context: any = d3.select("main").select("div").append("canvas");

  const interpolateProjection = (raw0: any, raw1: any): any => {
    const mutate: any = d3.geoProjectionMutator((t: any) => (x, y) => {
      const [x0, y0] = raw0(x, y),
        [x1, y1] = raw1(x, y);
      return [x0 + t * (x1 - x0), y0 + t * (y1 - y0)];
    });
    let t: any = 0;
    return Object.assign(mutate(t), {
      alpha(_: any): any {
        return arguments.length ? mutate((t = +_)) : t;
      },
    });
  };

  const projection = interpolateProjection(
    d3.geoOrthographicRaw,
    d3.geoEquirectangularRaw
  )
    .scale(scale(0))
    .translate([width / 2, height / 2])
    .rotate(rotate(0))
    .precision(0.1);
  // const context = DOM.context2d(width, height);
  const path = d3.geoPath(projection, context);

  for (let i = 0, n = 480; i < n; ++i) {
    const t = d3.easeCubic(2 * i > n ? 2 - (2 * i) / n : (2 * i) / n);
    projection.alpha(t).rotate(rotate(t)).scale(scale(t));
    context.clearRect(0, 0, width, height);
    context.beginPath();
    path(graticule);
    context.lineWidth = 1;
    context.strokeStyle = "#aaa";
    context.stroke();
    context.beginPath();
    path(sphere);
    context.lineWidth = 1.5;
    context.strokeStyle = "#000";
    context.stroke();
    context.beginPath();
    path(equator);
    context.lineWidth = 1.5;
    context.strokeStyle = "#f00";
    context.stroke();
    context.canvas;
  }
}

export function vueBar(config: any, data: any) {
  const color = d3.schemeCategory10;
  // 获取x 轴数据
  const Xdatas = data.map((d: any) => {
    return d[config["key"]];
  });
  // 获取Y轴数据
  const values = data.map((d: any) => {
    return d[config["value"]];
  });

  // 创建 x、y 轴比例
  const xScale: any = d3
    .scaleBand()
    .domain(Xdatas)
    .rangeRound([0, config["width"]])
    .padding(0.5);
  const maxY: any = d3.max(values);
  const yScale: any = d3
    .scaleLinear()
    .domain([0, maxY])
    .rangeRound([config["height"], 0]);

  const svg = d3
    .select(config["select"])
    .append("svg")
    .attr(
      "width",
      config["width"] + config["paddingLeft"] + config["paddingRight"]
    )
    .attr(
      "height",
      config["height"] + config["paddingTop"] + config["paddingBottom"]
    );
  const g = svg
    .append("g")
    .attr("class", "selectBar")
    .attr(
      "transform",
      "translate(" + config["paddingLeft"] + "," + config["paddingTop"] + ")"
    );

  g.attr("class", "headerText")
    .append("text")
    .attr(
      "transform",
      "translate(" + config["width"] / 2 + "," + -config["paddingTop"] / 2 + ")"
    )
    .attr("text-anchor", "middle")
    .attr("font-weight", 600)
    .text("图标");

  g.append("g")
    .attr("class", "axisX")
    .attr("transform", "translate(0," + config["height"] + ")")
    .call(d3.axisBottom(xScale))
    .attr("fon-weight", "bold");

  g.append("g").attr("class", "axisY").call(d3.axisLeft(yScale).ticks(10));

  const chart = g.selectAll(".selectBar").data(data).enter().append("g");
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
      return config["height"] - yScale(value);
    })
    .attr("width", xScale.bandwidth());

  chart
    .append("text")
    .attr("class", "barText")
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
    .attr("dy", 20)
    .attr("text-anchor", "middle")
    .text((d: any) => {
      const value = d[config["value"]];
      return value;
    });

  chart
    .on("mouseover", (d: any) => {
      svg.attr("opacity", 0.7);
    })
    .on("mouseout", (d: any) => {
      svg.transition().duration(500).attr("opacity", 1);
    });
  // https://blog.csdn.net/dk2290/article/details/83415266/
}
