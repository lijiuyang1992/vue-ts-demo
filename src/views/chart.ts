/*
 * @Author: 九阳
 * @Date: 2021-11-28 08:58:41
 * @LastEditors: 九阳
 * @LastEditTime: 2021-11-28 09:23:57
 */
import G2 from "@antv/g2"; //引入G2
import { Chart } from "@antv/g2"; //或者只引入需要用到的G2组件，我要用Chart
const DataSet = require("@antv/data-set"); //antV中用DataSet作为数据集，可以对原始数据进行操作，比如格式转换之类的，以供图表方法使用，当然也可以不用，不管什么方法只要把数据格式转变成它需要的格式就可以了
// 条形图
export function chartLine() {
  const data = [
    { time: "周一", vs: 1234, vk: 124 },
    { time: "周二", vs: 1245, vk: 364 },
    { time: "周三", vs: 1456, vk: 428 },
    { time: "周四", vs: 1526, vk: 523 },
    { time: "周五", vs: 1548, vk: 92 },
    { time: "周六", vs: 1798, vk: 242 },
    { time: "周日", vs: 1723, vk: 131 },
  ];
  const chart = new Chart({
    // 创建一个图表
    container: "chartLineDiv", // 容器是上面那个div
    autoFit: true, // 自适应
    height: 300, // 高度
  });

  const ds = new DataSet(); // 声明数据集 附官方文档 https://g2.antv.vision/zh/docs/manual/dataset/dataset
  const dv = ds.createView().source(data); // 使用上面的数据chartDataDouble创建数据视图dv
  // fold 方式完成了行列转换，如果不想使用 DataSet 直接手工转换数据即可 --官方注释
  dv.transform({
    // 附transform API https://g2.antv.vision/zh/docs/manual/dataset/transform
    type: "fold",
    fields: ["vs", "vk"], // 展开字段集
    key: "type", // key字段
    value: "count", // value字段
  });
  // 以上的数据转换后一条转为两条，eg：
  // { time: "周一", vs: 1234, vk: 124 }, 转换后=>
  // { "time": "周一", "type": "vs", "count": 1234 },{ "time": "周一", "type": "vk", "count": 124 },

  chart.data(dv.rows); // 现在可以将dv的rows作为数据源
  chart.scale({
    // 之前的chart.source()方法已经替换为chart.data()和chart.scale()
    time: {
      range: [0, 1], // 输出数据的范围，默认[ 0, 1 ]，格式为 [ min, max ]，min 和 max 均为 0 至 1 范围的数据 --官方
    }, // 简单来说就是 这个图标的多少用于显示数据[0,1]就是数据占满横坐标宽度,[0,0.5]就是还余下半个空的横坐标
    count: {
      min: 0, // 我的纵坐标count的最小值，不设置的话自动取数据中最小数的作为y=0的起始
      nice: true, // 默认为 true，用于优化数值范围，使绘制的坐标轴刻度线均匀分布。例如原始数据的范围为 [3, 97]，如果 nice 为 true，那么就会将数值范围调整为 [0, 100] --官方
    },
  });
  chart.tooltip({
    showCrosshairs: true, // 展示 Tooltip 辅助线
    shared: true,
    // crosshairs: {
    //   type: "line",
    // },
  });
  chart.axis("count", {
    // 坐标轴
    label: {
      formatter: function formatter(val) {
        return val; // 这里可以改坐标刻度的形式
      },
    },
  });
  chart.line().position("time*count").color("type").shape("smooth"); //方法都在官方
  chart
    .point()
    .position("time*count")
    .color("type")
    .size(4)
    .shape("circle")
    .style({
      stroke: "#fff", // 描边
      lineWidth: 1, // 宽度
    });
  chart.render();
}
// 柱状图
export function chartInterval() {
  const data = [
    { type: "未知", value: 654, percent: 0.02 },
    { type: "17 岁以下", value: 654, percent: 0.02 },
    { type: "18-24 岁", value: 4400, percent: 0.2 },
    { type: "25-29 岁", value: 5300, percent: 0.24 },
    { type: "30-39 岁", value: 6200, percent: 0.28 },
    { type: "40-49 岁", value: 3300, percent: 0.14 },
    { type: "50 岁以上", value: 1500, percent: 0.06 },
  ];

  const chart = new Chart({
    container: "chartIntervalDiv",
    autoFit: true,
    height: 300,
    // padding: [50, 20, 50, 20],
  });
  chart.data(data);
  chart.scale("value", {
    alias: "销售额(万)",
  });

  chart.axis("type", {
    tickLine: {
      alignTick: false,
    },
  });
  chart.axis("value", false);

  chart.tooltip({
    showMarkers: false,
  });
  chart
    .interval()
    .position("type*value")
    .animate({
      appear: {
        delay: 1000, // 动画延迟执行时间
        duration: 8000, // 动画执行时间
        repeat: true,
      },
    });
  chart.interaction("element-active");

  // 添加文本标注
  data.forEach((item) => {
    chart
      .annotation()
      .text({
        position: [item.type, item.value],
        content: item.value,
        style: {
          textAlign: "center",
        },
        offsetY: -30,
      })
      .text({
        position: [item.type, item.value],
        content: (item.percent * 100).toFixed(0) + "%",
        style: {
          textAlign: "center",
        },
        offsetY: -12,
      });
  });
  chart.render();
}
// 条形图
export function chartStrip() {
  const data = [
    { type: "收纳", value: 340, cat: "办公用品" },
    { type: "笔", value: 20760, cat: "办公用品" },
    { type: "纸张", value: 28750, cat: "办公用品" },
    { type: "配件", value: 4090, cat: "技术" },
    { type: "电话", value: 9880, cat: "技术" },
    { type: "复印机", value: 40988, cat: "技术" },
    { type: "桌子", value: 14870, cat: "家具" },
    { type: "椅子", value: 37098, cat: "家具" },
    { type: "书架", value: 49099, cat: "家具" },
  ];
  const chart = new Chart({
    container: "chartStripDiv",
    autoFit: true,
    height: 300,
    // padding: [20, 0, 50, 100],
  });
  chart.data(data);
  chart.scale({
    value: {
      max: 55000,
      min: 0,
      alias: "金额（元）",
    },
  });
  chart.axis("type", {
    tickLine: null,
    line: null,
  });
  chart.axis("value", {
    label: null,
    title: {
      offset: 30,
      style: {
        fontWeight: 300,
      },
    },
    grid: null,
  });
  chart.legend(false);
  chart.coordinate("rect").transpose();
  chart
    .interval()
    .position("type*value")
    .color("cat", ["#face1d", "#37c461", "#2194ff"])
    .size(26)
    .label("value", {
      style: {
        fill: "#8d8d8d",
      },
      offset: 10,
      content: (originData) => {
        return (originData.value + "").replace(/(\d)(?=(?:\d{3})+$)/g, "$1,");
      },
    });

  chart.annotation().text({
    top: true,
    position: ["椅子", "min"],
    content: "家具",
    style: {
      fill: "#c0c0c0",
      fontSize: 12,
      fontWeight: 300,
      textAlign: "center",
    },
    offsetX: -70,
    rotate: Math.PI * -0.5,
  });
  chart.annotation().text({
    top: true,
    position: ["电话", "min"],
    content: "技术",
    style: {
      fill: "#c0c0c0",
      fontSize: 12,
      fontWeight: 300,
      textAlign: "center",
    },
    offsetX: -70,
    rotate: Math.PI * -0.5,
  });
  chart.annotation().text({
    top: true,
    position: ["笔", "min"],
    content: "办公用品",
    style: {
      fill: "#c0c0c0",
      fontSize: 12,
      fontWeight: 300,
      textAlign: "center",
    },
    offsetX: -70,
    rotate: Math.PI * -0.5,
  });
  chart.annotation().line({
    start: ["-20%", "33.2%"],
    end: ["100%", "33.2%"],
    style: {
      stroke: "#c0c0c0",
      lineDash: [2, 2],
    },
  });
  chart.annotation().line({
    start: ["-20%", "66.8%"],
    end: ["100%", "66.8%"],
    style: {
      stroke: "#c0c0c0",
      lineDash: [2, 2],
    },
  });
  chart.interaction("element-active");
  chart.render();
}

export function chartPie() {
  const data = [
    { name: "狮子", type: "火象星座", value: 11 },
    { name: "白羊", type: "火象星座", value: 10 },
    { name: "射手", type: "火象星座", value: 10 },
    { name: "水瓶", type: "风向星座", value: 14 },
    { name: "双子", type: "风向星座", value: 7 },
    { name: "天平", type: "风向星座", value: 7 },
    { name: "摩羯", type: "土象星座", value: 14 },
    { name: "金牛", type: "土象星座", value: 3 },
    { name: "处女", type: "土象星座", value: 3 },
    { name: "天蝎", type: "水象星座", value: 11 },
    { name: "巨蟹", type: "水象星座", value: 5 },
    { name: "双鱼", type: "水象星座", value: 5 },
  ];
  const ds = new DataSet();
  const dv = ds.createView();
  dv.source(data).transform({
    type: "percent",
    field: "value",
    dimension: "type",
    as: "percent",
  });

  const colorMap: any = {
    火象星座: "#1890ff",
    风向星座: "#13c2c2",
    土象星座: "#ffc53d",
    水象星座: "#73d13d",
  };

  const chart = new Chart({
    container: "chartPieDiv",
    autoFit: true,
    height: 300,
  });
  chart.data(dv.rows);
  chart.legend(false);
  chart.coordinate("theta", {
    radius: 0.5,
    innerRadius: 0.3,
  });
  chart.tooltip({
    showMarkers: false,
  });
  chart
    .interval()
    .adjust("stack")
    .position("percent")
    .color("type", (val) => colorMap[val])
    .style({
      stroke: "white",
      lineWidth: 1,
    })
    .label("type", {
      offset: -5,
      style: {
        fill: "white",
        shadowBlur: 2,
        shadowColor: "rgba(0, 0, 0, .45)",
      },
    });

  const ds2 = new DataSet();
  const dv2 = ds2.createView();
  dv2.source(data).transform({
    type: "percent",
    field: "value",
    dimension: "name",
    as: "percent",
  });
  const outterView = chart.createView();
  outterView.data(dv2.rows);
  outterView.coordinate("theta", {
    innerRadius: 0.5 / 0.8,
    radius: 0.8,
  });
  outterView
    .interval()
    .adjust("stack")
    .position("percent")
    .color("type*name", (type, name) => colorMap[type])
    .style({
      stroke: "white",
      lineWidth: 1,
    })
    .label("name", {
      offset: -10,
      style: {
        fill: "white",
        shadowBlur: 2,
        shadowColor: "rgba(0, 0, 0, .45)",
      },
    });

  chart.interaction("element-active");

  chart.render();
}
// 面积图
export function chartArea() {
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
  const chart = new Chart({
    container: "chartAreaDiv",
    autoFit: true,
    height: 300,
  });

  chart.data(data);
  chart.scale("year", {
    type: "linear",
    tickInterval: 50,
  });
  chart.scale("value", {
    nice: true,
  });

  chart.tooltip({
    showCrosshairs: true,
    shared: true,
  });

  chart
    .area()
    .adjust("stack")
    .position("year*value")
    .style({
      fillOpacity: 1,
    })
    .color("country")
    .animate({
      appear: {
        delay: 1000, // 动画延迟执行时间
        duration: 8000, // 动画执行时间
        repeat: true,
      },
    });
  chart
    .line()
    .adjust("stack")
    .style({
      strokeOpacity: 1,
    })
    .position("year*value")
    .color("country")
    .animate({
      appear: {
        delay: 1000, // 动画延迟执行时间
        duration: 8000, // 动画执行时间
        repeat: true,
      },
    });

  chart.interaction("element-highlight");

  chart.render();
}
// 雷达图
export function chartRadar() {
  const data = [
    { item: "Design", a: 70, b: 30 },
    { item: "Development", a: 60, b: 70 },
    { item: "Marketing", a: 50, b: 60 },
    { item: "Users", a: 40, b: 50 },
    { item: "Test", a: 60, b: 70 },
    { item: "Language", a: 70, b: 50 },
    { item: "Technology", a: 50, b: 40 },
    { item: "Support", a: 30, b: 40 },
    { item: "Sales", a: 60, b: 40 },
    { item: "UX", a: 50, b: 60 },
  ];
  const { DataView } = DataSet;
  const dv = new DataView().source(data);
  dv.transform({
    type: "fold",
    fields: ["a", "b"], // 展开字段集
    key: "user", // key字段
    value: "score", // value字段
  });

  const chart = new Chart({
    container: "chartRadarDiv",
    autoFit: true,
    height: 300,
  });
  chart.data(dv.rows);
  chart.scale("score", {
    min: 0,
    max: 80,
  });
  chart.coordinate("polar", {
    radius: 0.8,
  });
  chart.tooltip({
    shared: true,
    showCrosshairs: true,
    crosshairs: {
      line: {
        style: {
          lineDash: [4, 4],
          stroke: "#333",
        },
      },
    },
  });
  chart.axis("item", {
    line: null,
    tickLine: null,
    grid: {
      line: {
        style: {
          lineDash: null,
        },
      },
    },
  });
  chart.axis("score", {
    line: null,
    tickLine: null,
    grid: {
      line: {
        type: "line",
        style: {
          lineDash: null,
        },
      },
    },
  });

  chart.line().position("item*score").color("user").size(2);
  chart
    .point()
    .position("item*score")
    .color("user")
    .shape("circle")
    .size(4)
    .style({
      stroke: "#fff",
      lineWidth: 1,
      fillOpacity: 1,
    });
  chart.area().position("item*score").color("user");
  chart.render();
}
