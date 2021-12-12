/*
 * @Author: 九阳
 * @Date: 2021-11-19 10:37:59
 * @LastEditors: 九阳
 * @LastEditTime: 2021-11-25 16:08:29
 */
const tableColumns = [
  {
    title: "姓名",
    width: 100,
    dataIndex: "name",
    key: "name",
    // fixed: "left",
  },
  {
    title: "性别",
    width: 100,
    dataIndex: "name2",
    key: "name2",
    // fixed: "left",

    slots: { customRender: "name2" },
    vsCode: "vueSelectSex", // 小代码编码
  },
  {
    title: "标题3",
    width: 100,
    dataIndex: "name3",
    key: "name3",
    // fixed: "left",
  },
  {
    title: "标题4",
    width: 100,
    dataIndex: "name4",
    key: "name4",
    // fixed: "left",
  },
  {
    title: "标题5",
    width: 100,
    dataIndex: "name5",
    key: "name5",
    // fixed: "left",
  },
  {
    title: "操作",
    width: "120px",
    key: "operation",
    fixed: "right",
    slots: { customRender: "operation" },
    button: [
      {
        name: "编辑",
        icon: "",
        pms: "",
        isPop: false, // 是否需要气泡确认框
        // event: (row: any, index: string) => {},
        // // 按钮是否显示
        // showButton: (row: any, index: string) => {},
        // showButton: ({ text: any, record: any, index: string }, callback: (...rest) => any) => any
      },
      {
        name: "删除",
        icon: "",
        pms: "",
        isPop: true, // 是否需要气泡确认框
        title: "确定要删除这条数据?",
        // event: (row: any, index: string) => {},
        // // 按钮是否显示
        // showButton: (row: any, index: string) => {},
      },
    ],
  },
];
export default tableColumns;
