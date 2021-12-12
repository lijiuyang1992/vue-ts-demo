/*
 * @Author: 李九阳
 * @Date: 2021-12-01 11:05:20
 * @LastEditors: 李九阳
 * @LastEditTime: 2021-12-01 12:48:22
 */
import * as d3 from "d3";

export const clock = () => {
  const width = 950;
  const height = 950;
  const radius = width / 1.67;
  const armRadius = radius / 22;
  const dotRadius = armRadius - 9;
  const color = d3.scaleSequential([0, 2 * Math.PI], d3.interpolateRainbow);
  const fields: any = [
    {
      radius: 0.2 * radius,
      interval: d3.timeYear,
      subinterval: d3.timeMonth,
      format: d3.timeFormat("%b"),
    },
    {
      radius: 0.3 * radius,
      interval: d3.timeMonth,
      subinterval: d3.timeDay,
      format: d3.timeFormat("%d"),
    },
    {
      radius: 0.4 * radius,
      interval: d3.timeWeek,
      subinterval: d3.timeDay,
      format: d3.timeFormat("%a"),
    },
    {
      radius: 0.6 * radius,
      interval: d3.timeDay,
      subinterval: d3.timeHour,
      format: d3.timeFormat("%H"),
    },
    {
      radius: 0.7 * radius,
      interval: d3.timeHour,
      subinterval: d3.timeMinute,
      format: d3.timeFormat("%M"),
    },
    {
      radius: 0.8 * radius,
      interval: d3.timeMinute,
      subinterval: d3.timeSecond,
      format: d3.timeFormat("%S"),
    },
  ];
  const arcArm = d3
    .arc()
    .startAngle((d: any) => armRadius / d.radius)
    .endAngle((d: any) => -Math.PI - armRadius / d.radius)
    .innerRadius((d: any) => d.radius - armRadius)
    .outerRadius((d: any) => d.radius + armRadius)
    .cornerRadius(armRadius);

  const update = (then: any) => {
    for (const d of fields) {
      const start = d.interval(then);
      const index = d.subinterval.count(start, then);
      d.cycle = (d.cycle || 0) + (index < d.index);
      d.index = index;
    }
    fieldCircle.attr("fill", (d: any, i) =>
      i === d.field.index ? "currentColor" : "white"
    );
    fieldFocus.attr(
      "transform",
      (d: any) => `rotate(${(d.index / d.range.length + d.cycle) * 360})`
    );
    return svg.node();
  };
  const viewBox: any = [0, 0, width, height];

  const svg = d3
    .select("#divClock")
    .append("svg")
    .attr("viewBox", viewBox)
    .attr("text-anchor", "middle")
    .style("display", "block")
    .style("font", "500 14px var(--sans-serif)");

  const field = svg
    .append("g")
    .attr("transform", `translate(${width / 2},${height / 2})`)
    .selectAll("g")
    .data(fields)
    .join("g");

  field
    .append("circle")
    .attr("fill", "none")
    .attr("stroke", "currentColor")
    .attr("stroke-width", 1.5)
    .attr("r", (d: any) => d.radius);

  const fieldTick = field
    .selectAll("g")
    .data((d: any) => {
      const date = d.interval(new Date(2000, 0, 1));
      d.range = d.subinterval.range(date, d.interval.offset(date, 1));
      return d.range.map((t: any) => ({ time: t, field: d }));
    })
    .join("g")
    .attr("class", "field-tick")
    .attr("transform", (d: any, i) => {
      const angle = (i / d.field.range.length) * 2 * Math.PI - Math.PI / 2;
      return `translate(${Math.cos(angle) * d.field.radius},${
        Math.sin(angle) * d.field.radius
      })`;
    });

  const fieldCircle = fieldTick
    .append("circle")
    .attr("r", dotRadius)
    .attr("fill", "white")
    .style("color", (d: any, i) =>
      color((i / d.field.range.length) * 2 * Math.PI)
    )
    .style("transition", "fill 750ms ease-out");

  fieldTick
    .append("text")
    .attr("dy", "0.35em")
    .attr("fill", "#222")
    .text((d: any) => d.field.format(d.time).slice(0, 2));

  const fieldFocus = field
    .append("circle")
    .attr("r", dotRadius)
    .attr("fill", "none")
    .attr("stroke", "#000")
    .attr("stroke-width", 3)
    .attr("cy", (d: any) => -d.radius)
    .style("transition", "transform 500ms ease");

  update(Math.floor((Date.now() + 1) / 1000) * 1000);

  // while (true) {
  //     const then = Math.ceil((Date.now() + 1) / 1000) * 1000;
  //     Promises.when(then, then).then(update);
  // }
  const welcomeTimer = setInterval(() => {
    const then = Math.ceil((Date.now() + 1) / 1000) * 1000;
    update(then);
  }, 1000);
};
