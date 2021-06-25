/***************************************************
 * Created by nanyuantingfeng on 2019/10/18 17:55. *
 ***************************************************/
import { IMixinAuth, IConstructor, IDeviceType } from '../../types'
import { Bridge } from '../browser/Bridge'
import __init__ from '../common/dingtalk/lib'
import { Inject } from 'typedi'
import { Fetch } from '@ekuaibao/fetch'

export function withAuth<T extends Bridge = Bridge>(Base: IConstructor<T>) {
  const BaseClass = Base as typeof Bridge

  class WithAuthSDK extends BaseClass implements IMixinAuth<T> {
    accessToken: string
    userId: string
    corpId: string

    @Inject('IDeviceType')
    deviceType: IDeviceType

    login() {
      if (!Fetch.corpId) {
        this.bus.emit('@@system:error', '缺少corpId参数')
        return
      }
      try {
        return __init__(this.deviceType)
      } catch (err) {
        this.bus.emit(`@@system:error`, '无法进入应用：' + err.msg || err.errorCode || err.message || err)
      }
    }
  }

  return WithAuthSDK as IConstructor<IMixinAuth<T> & T>
}
