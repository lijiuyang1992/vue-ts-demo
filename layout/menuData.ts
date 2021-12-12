/*
 * @Author: 九阳
 * @Date: 2021-11-19 10:37:59
 * @LastEditors: 李九阳
 * @LastEditTime: 2021-12-10 10:56:21
 */
const menuItems = [
  {
    path: "/home",
    name: "Home",
    node: true,
    meta: {
      title: "首页",
      icon: "home-4-line",
      keepAlive: true,
    },
  },
  {
    path: "/about",
    name: "About",
    node: false,
    meta: {
      title: "测试页面",
      icon: "icon-zhuxingtu",
      keepAlive: true,
    },
    children: [
      // {
      //   path: "/about",
      //   name: "about",
      //   node: true,
      //   meta: {
      //     title: "测试01",
      //     icon: "home-4-line",
      //     keepAlive: true,
      //   },
      // },
      // {
      //   path: "/test",
      //   name: "Test",
      //   node: true,
      //   meta: {
      //     title: "测试02",
      //     icon: "",
      //     keepAlive: true,
      //   },
      // },
      {
        path: "/table",
        name: "Table",
        node: true,
        meta: {
          title: "表格",
          icon: "",
          keepAlive: true,
        },
      },
      {
        path: "/tableTest",
        name: "TableTest",
        node: true,
        meta: {
          title: "表格01",
          icon: "",
          keepAlive: true,
        },
      },
      {
        path: "/testTable",
        name: "TestTable",
        node: true,
        meta: {
          title: "表格02",
          icon: "",
          keepAlive: true,
        },
      },
    ],
  },
  {
    path: "/form1",
    name: "form11",
    node: false,
    meta: {
      title: "表单",
      icon: "icon-BUG",
      keepAlive: true,
    },
    children: [
      {
        path: "/form",
        name: "Form",
        node: true,
        meta: {
          title: "表单",
          icon: "home-4-line",
          keepAlive: true,
        },
      },
      {
        path: "/testForm",
        name: "TestForm",
        node: true,
        meta: {
          title: "测试表单",
          icon: "home-4-line",
          keepAlive: true,
        },
      },
      {
        path: "/infoForm",
        name: "InfoForm",
        node: true,
        meta: {
          title: "详情表单",
          icon: "home-4-line",
          keepAlive: true,
        },
      },
    ],
  },
  {
    path: "/listForm1",
    name: "listForm",
    node: false,
    meta: {
      title: "动态表单",
      icon: "icon-zhuomian",
      keepAlive: true,
    },
    children: [
      {
        path: "/listForm",
        name: "ListForm",
        node: true,
        meta: {
          title: "动态增减表单项",
          icon: "home-4-line",
          keepAlive: true,
        },
      },
    ],
  },

  {
    path: "/ds",
    name: "ds",
    node: false,
    meta: {
      title: "数据驱动文档",
      icon: "icon-zujianshiyong",
      keepAlive: true,
    },
    children: [
      {
        path: "/d3Test",
        name: "d3Test",
        node: true,
        meta: {
          title: "D3图表",
          icon: "home-4-line",
          keepAlive: true,
        },
      },
      {
        path: "/d3Interval",
        name: "d3Interval",
        node: true,
        meta: {
          title: "d3柱状图",
          icon: "home-4-line",
          keepAlive: true,
        },
      },
      {
        path: "/d3Pie",
        name: "d3Pie",
        node: true,
        meta: {
          title: "d3饼图",
          icon: "home-4-line",
          keepAlive: true,
        },
      },
      {
        path: "/d3Smooth",
        name: "d3Smooth",
        node: true,
        meta: {
          title: "平滑缩放",
          icon: "home-4-line",
          keepAlive: true,
        },
      },
      {
        path: "/d3Canvas",
        name: "d3Canvas",
        node: true,
        meta: {
          title: "正交到等矩形",
          icon: "home-4-line",
          keepAlive: true,
        },
      },

      {
        path: "/d3Bar",
        name: "d3Bar",
        node: true,
        meta: {
          title: "柱状图",
          icon: "home-4-line",
          keepAlive: true,
        },
      },

      {
        path: "/d3Clock",
        name: "d3Clock",
        node: true,
        meta: {
          title: "时钟",
          icon: "home-4-line",
          keepAlive: true,
        },
      },
    ],
  },

  {
    path: "/d3",
    name: "d3",
    node: false,
    meta: {
      title: "D3图表",
      icon: "icon-ziyuan",
      keepAlive: true,
    },
    children: [
      {
        path: "/inTerval",
        name: "inTerval",
        node: true,
        meta: {
          title: "柱状图",
          icon: "home-4-line",
          keepAlive: true,
        },
      },
      {
        path: "/3dChart",
        name: "3dChart",
        node: true,
        meta: {
          title: "3D立体",
          icon: "home-4-line",
          keepAlive: true,
        },
      },

      {
        path: "/brokenLine",
        name: "brokenLine",
        node: true,
        meta: {
          title: "折线图",
          icon: "home-4-line",
          keepAlive: true,
        },
      },

      {
        path: "/area",
        name: "area",
        node: true,
        meta: {
          title: "面积",
          icon: "home-4-line",
          keepAlive: true,
        },
      },

      {
        path: "/pie",
        name: "pie",
        node: true,
        meta: {
          title: "饼状图",
          icon: "home-4-line",
          keepAlive: true,
        },
      },

      {
        path: "/polar",
        name: "polar",
        node: true,
        meta: {
          title: "极地图",
          icon: "home-4-line",
          keepAlive: true,
        },
      },

      {
        path: "/radar",
        name: "radar",
        node: true,
        meta: {
          title: "雷达图",
          icon: "home-4-line",
          keepAlive: true,
        },
      },

      {
        path: "/wave",
        name: "wave",
        node: true,
        meta: {
          title: "水波图",
          icon: "home-4-line",
          keepAlive: true,
        },
      },
    ],
  },

  {
    path: "/dataV01",
    name: "dataV01",
    node: true,
    meta: {
      title: "数据可视化",
      icon: "icon-qingbaojiankong",
      keepAlive: true,
      open: true,
    },
  },
];
export default menuItems;
