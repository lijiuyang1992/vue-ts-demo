/*
 * @Author: 李九阳
 * @Date: 2021-11-30 10:20:55
 * @LastEditors: 李九阳
 * @LastEditTime: 2021-11-30 14:05:24
 */
export interface IntervalType {
  select: string; // d3 选择 (id="select") #select (class="select") .select
  key: string;
  value: string;
  width: number;
  height: number;
  paddingLeft: number;
  paddingRight: number;
  paddingTop: number;
  paddingBottom: number;
  color?: Array<any> | undefined;
}
