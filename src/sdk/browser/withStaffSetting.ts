/***************************************************
 * Created by nanyuantingfeng on 2019/10/23 19:04. *
 ***************************************************/
import { session } from '@ekuaibao/session-info'
import { Bridge } from './Bridge'
import { IConstructor, IDeviceType, IMixinStaffSetting } from '../../types'
import { IStaffSettingType } from '../../model-types/IStaffSettingType'
import { IMeInfoType } from '../../model-types/IMeInfoType'
import { getStaffSetting } from './getStaffSetting'
import { getMeInfo } from './getMeInfo'
import { Inject } from 'typedi'
import { Fetch } from '@ekuaibao/fetch'

export function withStaffSetting<T extends Bridge>(Base: IConstructor<T>) {
  const BaseClass = Base as typeof Bridge

  class WithStaffSetting extends BaseClass implements IMixinStaffSetting<T> {
    meInfo: IMeInfoType
    staffSetting: IStaffSettingType

    @Inject('IDeviceType')
    deviceType: IDeviceType

    async fetchStaffInfo(): Promise<void> {
      const [staffSetting, meInfo] = await Promise.all([getStaffSetting(this.deviceType), getMeInfo()])
      session.__initUserStore(meInfo.staff.userId)
      session.user.set('staff', meInfo.staff)
      this.staffSetting = staffSetting
      this.meInfo = meInfo
    }

    async fetchStaffSetting(): Promise<IStaffSettingType> {
      this.staffSetting = await getStaffSetting(this.deviceType)
      Fetch.staffSetting = this.staffSetting
      return this.staffSetting
    }
  }

  return WithStaffSetting as IConstructor<IMixinStaffSetting<T> & T>
}
