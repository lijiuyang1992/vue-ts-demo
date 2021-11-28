/*
 * @Author: 九阳
 * @Date: 2021-11-25 13:37:35
 * @LastEditors: 九阳
 * @LastEditTime: 2021-11-27 09:25:35
 */
export interface FormType {
  type: string; //  input select  date日期 dateTime时间 year年 month月week周
  /* type-date[year, month, week, dateTime, range, rangeTime]
       type-select[ select, multiple, tags]
    */
  subType: string;
  field: string; // 字段
  label: string; // 名称
  vsCode: string; // 转换编码
  placeholder: string; // 提示信息
  startDate: string; // 日期区间选择
  endDate: string; // 日期区间选择
  span: string; // 大小
  required: boolean; // 是否必输默认false disable 优先级 > required
  disable: boolean; // 是否禁用 默认false
  rule: Array<object>; // 校验规则
  autoSize: object; // 大文本  { minRows: 2, maxRows: 5 }
  styleType: string; // radio outline | solid
  fileUrl: string; // 上传附件地址
  fileListUrl: string; // 查询附件列表
  fileDelete: string; // 附件删除地址
  fileCode: string; // 附件存储编码
}
