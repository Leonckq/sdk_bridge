/***************************************************
 * Created by nanyuantingfeng on 2019/10/23 16:38. *
 ***************************************************/
import { Bridge } from '../browser/Bridge'
import { IConstructor, IDeviceType, IMixinAuth } from '../../types'
import { Inject } from 'typedi'
import { session, setCookie } from '@ekuaibao/session-info'
import { Fetch } from '@ekuaibao/fetch'
import qs from 'qs'

export function withAuth<T extends Bridge = Bridge>(Base: IConstructor<T>) {
  const BaseClass = Base as typeof Bridge

  class WithAuth extends BaseClass implements IMixinAuth<T> {
    accessToken: string
    userId: string
    corpId: string

    @Inject('IDeviceType')
    deviceType: IDeviceType

    async login() {
      const user: any = session.get('user')
      if (user && user.corpId) {
        Fetch.ekbCorpId = user.corpId
        return Promise.resolve()
      } else {
        this.bus.emit('@@system:goto', '/login')
        return Promise.reject()
      }
    }

    async loginMC() {
      const {corpId,accessToken,userId,deviceType,platform}=qs.parse(window.location.search.slice(1))
      Fetch.accessToken = accessToken
      Fetch.ekbCorpId=corpId
      Fetch.userId=userId
      session.set('user', {
        accessToken: Fetch.accessToken,
        corpId: Fetch.ekbCorpId,
        deviceType,
        platform
      })
      setCookie('ekb-access-token', accessToken)
    }
  }

  return WithAuth as IConstructor<IMixinAuth<T> & T>
}
