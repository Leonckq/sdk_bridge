/***************************************************
 * Created by nanyuantingfeng on 2019/10/23 18:44. *
 ***************************************************/
import { IConstructor, IDeviceType, IMixinAuth } from '../../types'
import { Bridge } from './Bridge'
import { Fetch } from '@ekuaibao/fetch'
import { Inject } from 'typedi'
import { setCookie } from '@ekuaibao/session-info'

export function withAuth<T extends Bridge = Bridge>(Base: IConstructor<T>) {
  const BaseClass = Base as typeof Bridge

  class WithAuth extends BaseClass implements IMixinAuth<T> {
    accessToken: string
    corpId: string
    userId: string
    isAssistPlatform: boolean

    @Inject('IDeviceType')
    deviceType: IDeviceType

    async login(): Promise<void> {
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
        return undefined
      } catch (e) {
        if (e.status === 401) {
          this.bus.emit('@@system:goto', '/login')
        } else {
          this.bus.emit('@@system:error', e)
        }

        return await Promise.reject(e)
      }
    }
  }

  return WithAuth as IConstructor<IMixinAuth<T> & T>
}
