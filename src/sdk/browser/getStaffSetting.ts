/***************************************************
 * Created by nanyuantingfeng on 2019/10/21 16:40. *
 ***************************************************/
import { Fetch } from '@ekuaibao/fetch'
import { IStaffSettingType } from '../../model-types/IStaffSettingType'
import { IResponseObjectData } from '../../model-types/IResponseType'
import { IDeviceType } from '../../types'

export async function getStaffSetting(deviceType: IDeviceType): Promise<IStaffSettingType> {
  const locale = localStorage.getItem('customLanguage') ? localStorage.getItem('customLanguage') : Fetch.defaultLanguage
  const staffSettingO: IResponseObjectData<IStaffSettingType> = await Fetch.GET(
    `/api/v1/organization/staffs/staffSetting/$${deviceType}?locale=${locale}`
  )

  // 如果接口挂了怎么处理呢？
  Fetch.staffSetting = staffSettingO.value || Fetch.staffSetting || { language: Fetch.defaultLanguage }
  // @ts-ignore
  // i18n.changeLanguage(Fetch.staffSetting.language)
  return staffSettingO.value
}
