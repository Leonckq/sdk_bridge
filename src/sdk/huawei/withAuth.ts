/***************************************************
 * Created by nanyuantingfeng on 2019/10/23 16:38. *
 ***************************************************/
import { Bridge } from '../browser/Bridge'
import { IConstructor, IDeviceType, IMixinAuth } from '../../types'
import { Inject } from 'typedi'
import { session } from '@ekuaibao/session-info'
import { Fetch } from '@ekuaibao/fetch'
import { IHuaWeiSessionType } from '../../model-types/ISessionType'

export function withAuth<T extends Bridge = Bridge>(Base: IConstructor<T>) {
  const BaseClass = Base as typeof Bridge

  class WithAuth extends BaseClass implements IMixinAuth<T> {
    accessToken: string
    userId: string
    corpId: string

    @Inject('IDeviceType')
    deviceType: IDeviceType

    @Inject('ISMessageEntry')
    isMessage: boolean

    async login() {
      const user = session.get('user')
      if (user && user.corpId) {
        Fetch.ekbCorpId = user.corpId
        Fetch.accessToken = user.accessToken
      }

      if (window.isPC && !this.isMessage) {
        return undefined
      }

      return this.__init__()
    }

    private async __init__() {
      let code: string

      try {
        const result = await HWH5.getAuthCode({ clientId: 20190624101832157 })
        code = result.code
      } catch (e) {
        this.bus.emit('@@system:error', '没有获取到code')
        return
      }

      try {
        const result: IHuaWeiSessionType = await Fetch.POST('/api/huawei/rest/v1/session', null, {
          body: {
            corpId: Fetch.corpId,
            authCode: code,
            deviceType: this.deviceType
          }
        })

        const { sessionId, corporationId, userId } = result
        Fetch.accessToken = sessionId
        Fetch.ekbCorpId = corporationId
        Fetch.userId = userId

        // TODO 删除不必要的localStorage
        session.set(Fetch.corpId, {
          accessToken: sessionId,
          ekbCorpId: corporationId
        })
      } catch (e) {
        this.openLink('https://www.ekuaibao.com/forApp/info_initializing.html')
      }
    }
  }

  return (WithAuth as unknown) as IConstructor<IMixinAuth<T> & T>
}
