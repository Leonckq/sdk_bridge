/***************************************************
 * Created by nanyuantingfeng on 2019/10/8 16:33. *
 ***************************************************/
import IBridge, { IConstructor } from '../../types'
import { Bridge } from '../browser/Bridge'
import '../../lib/jweixin-1.2.0'

export function withSDK<T extends Bridge = Bridge>(Base: IConstructor<T>) {
  const BaseClass = Base as typeof Bridge

  class WeChatSDK extends BaseClass implements IBridge {
    async close(): Promise<void> {
      location.reload()
    }
  }
  return WeChatSDK as IConstructor<T>
}
