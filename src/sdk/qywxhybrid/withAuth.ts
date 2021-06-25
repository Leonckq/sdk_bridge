/***************************************************
 * Created by nanyuantingfeng on 2019/10/23 16:38. *
 ***************************************************/
import { Bridge } from '../browser/Bridge'
import { IConstructor, IDeviceType, IMixinAuth } from '../../types'
import { Inject } from 'typedi'
import { session, setCookie } from '@ekuaibao/session-info'
import { Fetch } from '@ekuaibao/fetch'
import { Lib } from './Lib'

export function withAuth<T extends Bridge = Bridge>(Base: IConstructor<T>) {
  const BaseClass = Base as typeof Bridge

  class WithAuth extends BaseClass implements IMixinAuth<T> {
    accessToken: string
    userId: string
    corpId: string

    @Inject('IDeviceType')
    deviceType: IDeviceType

    @Inject(() => Lib)
    lib: Lib

    async login() {
      const user: any = session.get('user')
      if (user && user.corpId) {
        Fetch.ekbCorpId = user.corpId
        return this.lib.init()
      } else {
        try {
          const params: Record<string, string> = {}

          if (Fetch.accessToken) {
            params.accessToken = Fetch.accessToken
          }

          const result = await Fetch.GET('/api/account/v2/session', params)

          if (!Fetch.ekbCorpId) {
            this.bus.emit('@@system:goto', '/corporations')
          }

          Fetch.accessToken = result.value && result.value.id
          Fetch.isAssistPlatform = result.value && result.value.isAssistPlatform
          Fetch.staffSetting = result.staffSetting || {
            language: Fetch.defaultLanguage
          }
          setCookie('ekb-access-token', result.value.id)
          return this.lib.init()
        } catch (e) {
          return Promise.reject()
        }
      }
    }
  }

  return (WithAuth as unknown) as IConstructor<IMixinAuth<T> & T>
}
