/***************************************************
 * Created by nanyuantingfeng on 2019/10/21 17:09. *
 ***************************************************/
import { IStaffSettingType } from './IStaffSettingType'

export interface IDingtalkSessionType {
  id: string //'0Q1rbK1U3-L9dOd1Vj_FyM'
  userId: string //'oIc9TMZsYgfY00'
  deviceType: string //'DESKTOP'
  platform: string // 'APP'
  deviceId: string //'47C3AC7A-41EF-4169-85B5-29C8F5962521'
  loginTime: number // 1570871858940
  isShortTermToken: boolean // false

  staffSetting?: IStaffSettingType
  sessionId?: string
  corporationId?: string
}

export interface IKdCloudSessionType {
  id?: string // error code
  sessionId: string
  corporationId: string
  userId: string
  staffSetting: IStaffSettingType
}

export interface IQYWeixinSessionType {
  sessionId: string //'U18QkzhqQpoIg6R3m-7vnw'
  wxCorpId: string // 'ww765915f2a8d3e2d1'
  corporationId: string //'jsw646Uwfo0400'
  userId: string //'qy01ea3a0ccc5dbf009b1a7bec92'
  staffSetting: IStaffSettingType
}

export interface IHuaWeiSessionType {
  sessionId: string
  corporationId: string
  userId: string
}
export interface IFeiShuSessionType {
  sessionId: string

  appid:string

  corporationId:string

  userId:string
}

