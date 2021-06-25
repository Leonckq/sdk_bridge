/***************************************************
 * Created by nanyuantingfeng on 2019/10/8 16:48. *
 ***************************************************/
import IBridge, { IConstructor } from '../../types'
import { Bridge } from '../browser/Bridge'
import { scan } from '../../lib/emobile'

export function withSDK<T extends Bridge = Bridge>(Base: IConstructor<T>) {
  const BaseClass = Base as typeof Bridge

  if (window.isPC || !window.isEMobile) {
    return BaseClass
  }

  class EMobileSDK extends BaseClass implements IBridge {
    async scan(): Promise<string> {
      return scan()
    }
  }

  return EMobileSDK as IConstructor<T>
}
