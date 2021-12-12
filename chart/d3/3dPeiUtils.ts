/*
 * @Author: 李九阳
 * @Date: 2021-12-08 16:33:13
 * @LastEditors: 李九阳
 * @LastEditTime: 2021-12-08 17:25:40
 */
import * as d3 from "d3";

let _current: any;
export const draw = (
  id: string,
  data: any,
  x: any /* center x */,
  y: any /* center y */,
  rx: any /* radius x */,
  ry: any /* radius y */,
  h: any /* height */,
  ir: any /* inner radius */
) => {
  const dataset = d3
    .pie()
    .sort(null)
    .value(function (d: any) {
      return d.value;
    })(data);
  const slices = d3
    .select(`#${id}`)
    .append("g")
    .attr("transform", `translate(${x},${y})`)
    .attr("class", "slices");
  // 环形内曲面

  slices
    .selectAll(".innerSlice")
    .data(dataset)
    .enter()
    .append("path")
    .attr("class", "innerSlice")
    .style("fill", function (d: any) {
      const fill: any = d3.hsl(d.data.color).darker(0.7);
      return fill;
    })
    .attr("d", function (d) {
      return pieInner(d, rx + 0.5, ry + 0.5, h, ir);
    })
    .each(function (d: any) {
      _current = d;
    });
  // 上层2d平面
  slices
    .selectAll(".topSlice")
    .data(dataset)
    .enter()
    .append("path")
    .attr("class", "topSlice")
    .style("fill", function (d: any) {
      return d.data.color;
    })
    .style("stroke", function (d: any) {
      return d.data.color;
    })
    .attr("d", function (d) {
      return pieTop(d, rx, ry, ir);
    })
    .each(function (d) {
      _current = d;
    });
  // 侧面曲面
  slices
    .selectAll(".outerSlice")
    .data(dataset)
    .enter()
    .append("path")
    .attr("class", "outerSlice")
    .style("fill", function (d: any) {
      const fill: any = d3.hsl(d.data.color).darker(0.7);
      return fill;
    })
    .attr("d", function (d) {
      return pieOuter(d, rx - 0.5, ry - 0.5, h);
    })
    .each(function (d) {
      _current = d;
    });

  slices
    .selectAll(".percent")
    .data(dataset)
    .enter()
    .append("text")
    .attr("class", "percent")
    .attr("x", function (d: any) {
      return 0.6 * rx * Math.cos(0.5 * (d.startAngle + d.endAngle));
    })
    .attr("y", function (d: any) {
      return 0.6 * ry * Math.sin(0.5 * (d.startAngle + d.endAngle));
    })
    .text(getPercent)
    .each(function (d) {
      _current = d;
    });
};
// 内曲面
function pieInner(d: any, rx: any, ry: any, h: any, ir: any) {
  const startAngle = d.startAngle < Math.PI ? Math.PI : d.startAngle;
  const endAngle = d.endAngle < Math.PI ? Math.PI : d.endAngle;

  const sx = ir * rx * Math.cos(startAngle);
  const sy = ir * ry * Math.sin(startAngle);
  const ex = ir * rx * Math.cos(endAngle);
  const ey = ir * ry * Math.sin(endAngle);

  const ret = [];
  ret.push(
    "M",
    sx,
    sy,
    "A",
    ir * rx,
    ir * ry,
    "0 0 1",
    ex,
    ey,
    "L",
    ex,
    h + ey,
    "A",
    ir * rx,
    ir * ry,
    "0 0 0",
    sx,
    h + sy,
    "z"
  );
  return ret.join(" ");
}
// 顶部面
function pieTop(d: any, rx: any, ry: any, ir: any) {
  if (d.endAngle - d.startAngle === 0) return "M 0 0";
  const sx = rx * Math.cos(d.startAngle);
  const sy = ry * Math.sin(d.startAngle);
  const ex = rx * Math.cos(d.endAngle);
  const ey = ry * Math.sin(d.endAngle);

  const ret = [];
  ret.push(
    "M",
    sx,
    sy,
    "A",
    rx,
    ry,
    "0",
    d.endAngle - d.startAngle > Math.PI ? 1 : 0,
    "1",
    ex,
    ey,
    "L",
    ir * ex,
    ir * ey
  );
  ret.push(
    "A",
    ir * rx,
    ir * ry,
    "0",
    d.endAngle - d.startAngle > Math.PI ? 1 : 0,
    "0",
    ir * sx,
    ir * sy,
    "z"
  );
  return ret.join(" ");
}
// 外曲面算法
function pieOuter(d: any, rx: any, ry: any, h: any) {
  const startAngle = d.startAngle > Math.PI ? Math.PI : d.startAngle;
  const endAngle = d.endAngle > Math.PI ? Math.PI : d.endAngle;

  const sx = rx * Math.cos(startAngle);
  const sy = ry * Math.sin(startAngle);
  const ex = rx * Math.cos(endAngle);
  const ey = ry * Math.sin(endAngle);

  const ret = [];
  ret.push(
    "M",
    sx,
    h + sy,
    "A",
    rx,
    ry,
    "0 0 1",
    ex,
    h + ey,
    "L",
    ex,
    ey,
    "A",
    rx,
    ry,
    "0 0 0",
    sx,
    sy,
    "z"
  );
  return ret.join(" ");
}

function getPercent(d: any) {
  return d.endAngle - d.startAngle > 0.2
    ? `${
        Math.round((1000 * (d.endAngle - d.startAngle)) / (Math.PI * 2)) / 10
      }%`
    : "";
}
export const transition = (
  id: string,
  data: any,
  rx: any,
  ry: any,
  h: any,
  ir: any
) => {
  class arcTweenInner {
    constructor(a: any) {
      const i = d3.interpolate(_current, a);
      _current = i(0);
      return function (t: any) {
        return pieInner(i(t), rx + 0.5, ry + 0.5, h, ir);
      };
    }
  }
  class arcTweenTop {
    constructor(a: any) {
      const i = d3.interpolate(_current, a);
      _current = i(0);
      return function (t: any) {
        return pieTop(i(t), rx, ry, ir);
      };
    }
  }
  class arcTweenOuter {
    constructor(a: any) {
      const i = d3.interpolate(_current, a);
      _current = i(0);
      return function (t: any) {
        return pieOuter(i(t), rx - 0.5, ry - 0.5, h);
      };
    }
  }
  class textTweenX {
    constructor(a: any) {
      const i = d3.interpolate(_current, a);
      _current = i(0);
      return function (t: any) {
        return 0.6 * rx * Math.cos(0.5 * (i(t).startAngle + i(t).endAngle));
      };
    }
  }
  class textTweenY {
    constructor(a: any) {
      const i = d3.interpolate(_current, a);
      _current = i(0);
      return function (t: any) {
        return 0.6 * rx * Math.sin(0.5 * (i(t).startAngle + i(t).endAngle));
      };
    }
  }

  const _data = d3
    .pie()
    .sort(null)
    .value(function (d: any) {
      return d.value;
    })(data);

  d3.select(`#${id}`)
    .selectAll(".innerSlice")
    .data(_data)
    .transition()
    .duration(750)
    // .attrTween('d', arcTweenInner);
    .attrTween("d", (d: any) => {
      const text: any = new arcTweenInner(d);
      return text;
    });

  d3.select(`#${id}`)
    .selectAll(".topSlice")
    .data(_data)
    .transition()
    .duration(750)
    // .attrTween('d', arcTweenTop);
    .attrTween("d", (d: any) => {
      const text: any = new arcTweenTop(d);
      return text;
    });

  d3.select(`#${id}`)
    .selectAll(".outerSlice")
    .data(_data)
    .transition()
    .duration(750)
    .attrTween("d", (d: any) => {
      const text: any = new arcTweenOuter(d);
      return text;
    });
  // .attrTween('d', arcTweenOuter);

  d3.select(`#${id}`)
    .selectAll(".percent")
    .data(_data)
    .transition()
    .duration(750)
    // .attrTween('x', new textTweenX())
    .attrTween("x", (d: any) => {
      const text: any = new textTweenX(d);
      return text;
    })
    .attrTween("y", (d: any) => {
      const text: any = new textTweenY(d);
      return text;
    })
    .text(getPercent);
};
