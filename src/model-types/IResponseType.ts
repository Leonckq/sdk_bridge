/***************************************************
 * Created by nanyuantingfeng on 2019/10/23 11:16. *
 ***************************************************/

export type IResponseObjectData<T = any> = {
  value: T
}

export type IResponseArrayData<T = any> = {
  count: number
  items: T[]
}

export type IResponseType<T = any> = IResponseObjectData<T> | IResponseArrayData<T>
