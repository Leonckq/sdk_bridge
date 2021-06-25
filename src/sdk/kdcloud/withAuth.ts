/***************************************************
 * Created by nanyuantingfeng on 2019/10/18 11:34. *
 ***************************************************/
import { Bridge } from '../browser/Bridge'
import { IMixinAuth, IConstructor, IDeviceType } from '../../types'
import { Fetch } from '@ekuaibao/fetch'
import { IKdCloudSessionType } from '../../model-types/ISessionType'
import { Inject } from 'typedi'

export function withAuth<T extends Bridge = Bridge>(Base: IConstructor<T>) {
  const BaseClass = Base as typeof Bridge

  class WithAuth extends BaseClass implements IMixinAuth<T> {
    accessToken: string
    corpId: string
    userId: string

    @Inject('IDeviceType')
    deviceType: IDeviceType

    async login(): Promise<any> {
      const ticketValue = (() => {
        let name = 'ticket'
        const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)') //构造一个含有目标参数的正则表达式对象
        const r = window.location.search.substr(1).match(reg) //匹配目标参数
        if (r != null) return unescape(r[2])
        return null //返回参数值
      })()

      if (!ticketValue) {
        this.bus.emit('@@showModal.info', {
          title: '提示',
          content: '您的登录身份已过期，请退出应用后重新进入',
          okText: '确定'
        })

        return Promise.reject()
      }

      try {
        const result: IKdCloudSessionType = await Fetch.POST('/api/kdcloud/v2/session', null, {
          body: {
            authCode: ticketValue,
            deviceType: 'DESKTOP'
          }
        })

        if (result.id) {
          // id为抛错信息
          this.bus.emit('@@showModal.info', {
            title: '提示',
            content: result.id,
            okText: '重试',
            onOk: () => {
              window.location.reload()
            }
          })
          return Promise.reject(result)
        }

        Fetch.userId = result.userId
        Fetch.accessToken = result.sessionId
        Fetch.ekbCorpId = result.corporationId
        return undefined
      } catch (error) {
        if (error.msg) {
          this.bus.emit('@@showModal.error', { title: '错误', content: error.msg })
        }

        return await Promise.reject(error)
      }
    }
  }

  return WithAuth as IConstructor<IMixinAuth<T> & T>
}
