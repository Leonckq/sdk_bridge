/***************************************************
 * Created by nanyuantingfeng on 2019/11/6 13:32. *
 ***************************************************/

declare module 'js-cookie' {
  export function set(name: string, value: string, options?: any): void
  export function set(name: string, value: object, options?: any): void
  export function get(name: string): string | void
  export function getJSON<T = object>(name?: string): T
  export function remove(name: string): void
}
