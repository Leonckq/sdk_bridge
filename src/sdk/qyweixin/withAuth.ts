/***************************************************
 * Created by nanyuantingfeng on 2019/10/18 11:34. *
 ***************************************************/
import { Bridge } from '../browser/Bridge'
import { IMixinAuth, IConstructor, IDeviceType } from '../../types'
import { Inject } from 'typedi'
import { Lib } from './lib/Lib'

export function withAuth<T extends Bridge = Bridge>(Base: IConstructor<T>) {
  const BaseClass = Base as typeof Bridge

  class WithAuth extends BaseClass implements IMixinAuth<T> {
    accessToken: string
    corpId: string
    userId: string

    @Inject('IDeviceType')
    deviceType: IDeviceType

    @Inject(() => Lib)
    lib: Lib

    async login(): Promise<void> {
      return this.lib.init()
    }
  }

  return (WithAuth as unknown) as IConstructor<IMixinAuth<T> & T>
}
