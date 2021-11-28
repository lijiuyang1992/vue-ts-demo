/*
 * @Author: 九阳
 * @Date: 2021-11-19 10:37:59
 * @LastEditors: 九阳
 * @LastEditTime: 2021-11-28 14:39:20
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
];
export default menuItems;
