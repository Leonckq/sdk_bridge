/**
 *  Created by pw on 2020/12/2 12:39 下午.
 */
import { IMixinAuth, IConstructor, IDeviceType } from '../../types'
import { Bridge } from '../browser/Bridge'
import { __init__withnot_login } from '../common/dingtalk/lib'
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
        return __init__withnot_login(this.deviceType)
      } catch (err) {
        this.bus.emit(`@@system:error`, '无法进入应用：' + err.msg || err.errorCode || err.message || err)
      }
    }
  }

  return WithAuthSDK as IConstructor<IMixinAuth<T> & T>
}
