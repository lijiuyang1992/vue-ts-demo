/*
 * @Author: 李九阳
 * @Date: 2021-12-06 09:28:28
 * @LastEditors: 李九阳
 * @LastEditTime: 2021-12-06 12:59:42
 */
import * as d3 from "d3";
import { IntervalType } from "@/type/d3Type";

export const radialStackedBar = (config: IntervalType, data: any) => {
  const div: any = d3.select(config["select"]);
  const divWidth = div.node().getBoundingClientRect().width;
  const width = divWidth - config["paddingLeft"] - config["paddingRight"];
  const height = config["height"];
  const divHeight =
    config["height"] + config["paddingTop"] + config["paddingBottom"];
  const width1 = div.style("width"); //"120px"

  const innerRadius = 180;
  const outerRadius = Math.min(width, height) * 0.5;

  const svg = d3
    .select(config["select"])
    .append("svg")
    .attr("width", divWidth)
    .attr("height", divHeight);

  const x = d3
    .scaleBand() // 定义x轴
    .range([0, 2 * Math.PI])
    .align(0);

  // const y = scaleRadial().range([innerRadius, outerRadius]) // 定义y轴

  // function scaleRadial () {
  //     function square(x) {
  //         return x * x
  //     }
  //     function radial() {
  //         var linear = d3.scaleLinear()

  //         function scale(x) {
  //             return Math.sqrt(linear(x))
  //         }

  //         scale.domain = function (_) {
  //             return arguments.length ? (linear.domain(_), scale) : linear.domain()
  //         }

  //         scale.nice = function (count) {
  //             return linear.nice(count), scale
  //         }

  //         scale.range = function (_) {
  //             return arguments.length ?
  //                 (linear.range(_.map(square)), scale) :
  //                 linear.range().map(Math.sqrt)
  //         }

  //         scale.ticks = linear.ticks
  //         scale.tickFormat = linear.tickFormat

  //         return scale
  //     }
  //     return radial
};

export const radialStackedBar02 = () => {
  const svg = d3.select("#radialStackedBar02"),
    width = +svg.attr("width"),
    height = +svg.attr("height"),
    innerRadius = 180,
    outerRadius = Math.min(width, height) * 0.67,
    g = svg
      .append("g")
      .attr("transform", "translate(" + width / 2 + "," + height * 0.69 + ")");

  const x: any = d3
    .scaleBand()
    .range([0, 2 * Math.PI])
    .align(0);

  const y: any = d3.scaleRadial().range([innerRadius, outerRadius]);

  const z: any = d3
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

  d3.csv(
    "http://static.popodv.com/data/attr/1.csv",
    (d: any, _i: any, columns: any) => {
      for (let i = 1, t = 0; i < columns.length; ++i) {
        t += d[columns[i]] = +d[columns[i]];
        d.total = t;
        return d;
      }
    },
    function (error: any, data: any) {
      if (error) throw error;
      const max: any = d3.max(data, function (d: any) {
        return d.total;
      });
      data.sort(function (a: any, b: any) {
        return b[data.columns[6]] - a[data.columns[6]];
      });
      x.domain(
        data.map(function (d: any) {
          return d.State;
        })
      );
      y.domain([0, max]);
      z.domain(data.columns.slice(1));

      const arcData: any = d3
        .arc()
        .innerRadius(function (d: any) {
          return y(d[0]);
        })
        .outerRadius(function (d: any) {
          return x(d.data.State);
        })
        .endAngle(function (d: any) {
          return x(d.data.State) + x.bandwidth();
        })
        .padAngle(0.01)
        .padRadius(innerRadius);
      g.append("g")
        .selectAll("g")
        .data(d3.stack().keys(data.columns.slice(1))(data))
        .enter()
        .append("g")
        .attr("fill", (d, i: any) => {
          return z[i];
        })
        .selectAll("path")
        .data(function (d) {
          return d;
        })
        .enter()
        .append("path")
        .attr("d", arcData);

      const label = g
        .append("g")
        .selectAll("g")
        .data(data)
        .enter()
        .append("g")
        .attr("text-anchor", "middle")
        .attr("transform", function (d: any) {
          return (
            "rotate(" +
            (((x(d.State) + x.bandwidth() / 2) * 180) / Math.PI - 90) +
            ")translate(" +
            innerRadius +
            ",0)"
          );
        });

      label.append("line").attr("x2", -5).attr("stroke", "#000");

      label
        .append("text")
        .attr("transform", function (d: any) {
          return (x(d.State) + x.bandwidth() / 2 + Math.PI / 2) %
            (2 * Math.PI) <
            Math.PI
            ? "rotate(90)translate(0,16)"
            : "rotate(-90)translate(0,-9)";
        })
        .text(function (d: any) {
          return d.State;
        });

      const yAxis = g.append("g").attr("text-anchor", "end");

      const yTick = yAxis
        .selectAll("g")
        .data(y.ticks(10).slice(1))
        .enter()
        .append("g");

      yTick
        .append("circle")
        .attr("fill", "none")
        .attr("stroke", "#000")
        .attr("stroke-opacity", 0.5)
        .attr("r", y);

      yTick
        .append("text")
        .attr("x", -6)
        .attr("y", function (d) {
          return -y(d);
        })
        .attr("dy", "0.35em")
        .attr("fill", "none")
        .attr("stroke", "#fff")
        .attr("stroke-width", 5)
        .text(y.tickFormat(10, "s"));

      yTick
        .append("text")
        .attr("x", -6)
        .attr("y", function (d) {
          return -y(d);
        })
        .attr("dy", "0.35em")
        .text(y.tickFormat(10, "s"));

      yAxis
        .append("text")
        .attr("x", -6)
        .attr("y", function (d: any) {
          const ticks = y.ticks(10).pop();
          return -y(ticks);
        })
        .attr("dy", "-1em")
        .text("Population");

      const legend = g
        .append("g")
        .selectAll("g")
        .data(data.columns.slice(1).reverse())
        .enter()
        .append("g")
        .attr("transform", function (d, i) {
          return (
            "translate(-40," + (i - (data.columns.length - 1) / 2) * 20 + ")"
          );
        });

      legend
        .append("rect")
        .attr("width", 18)
        .attr("height", 18)
        .attr("fill", z);

      legend
        .append("text")
        .attr("x", 24)
        .attr("y", 9)
        .attr("dy", "0.35em")
        .text(function (d: any) {
          return d;
        });
    }
  );
};
