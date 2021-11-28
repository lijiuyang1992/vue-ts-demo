/*
 * @Author: 九阳
 * @Date: 2021-11-24 15:23:42
 * @LastEditors: 九阳
 * @LastEditTime: 2021-11-25 09:36:39
 */
export interface TableType {
  title: string; // 标题
  url: string; // 查询接口
  rowSelection: boolean;
  rowExpanded: boolean;
  pageQuery: {
    total: number; // 总数
    current: number; // 当前页码
    pageSize: number; // 每页显示数量
    defaultQuery: any; // 默认查询条件
  };
  columns: Array<columns>;
  header: Array<HeaderType>;
}

export interface columns {
  title: string;
  width: any;
  dataIndex: string;
  key: string;
  fixed: string; // left 、right
  slots: object;
  vsCode: string;
}

export interface HeaderType {
  type: string; //  input select  date日期 dateTime时间 year年 month月week周
  field: string; // 字段
  label: string; // 名称
  vsCode: string; // 转换编码
  placeholder: string; // 提示信息
  startDate: string; // 日期区间选择
  endDate: string; // 日期区间选择
}
