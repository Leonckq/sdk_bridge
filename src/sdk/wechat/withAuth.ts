/***************************************************
 * Created by nanyuantingfeng on 2019/10/18 11:34. *
 ***************************************************/
import { Bridge } from '../browser/Bridge'
import { IMixinAuth, IConstructor, IDeviceType } from '../../types'
import { Inject } from 'typedi'
import { Fetch } from '@ekuaibao/fetch'
import Cookies from 'js-cookie'

export function withAuth<T extends Bridge = Bridge>(Base: IConstructor<T>) {
  const BaseClass = Base as typeof Bridge

  class WithAuth extends BaseClass implements IMixinAuth<T> {
    accessToken: string
    corpId: string
    userId: string

    @Inject('IDeviceType')
    deviceType: IDeviceType

    private filter(name: string = '') {
      const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)') //构造一个含有目标参数的正则表达式对象
      const r = window.location.search.substr(1).match(reg) //匹配目标参数
      if (r != null) return unescape(r[2])
      return null //返回参数值
    }

    async login(): Promise<void> {
      const params: Record<string, string> = {
        corpId: Fetch.ekbCorpId,
        code: this.filter('code')
      }

      if (Fetch.accessToken) {
        params.accessToken = Fetch.accessToken
      }

      const result = await Fetch.GET('/api/weixin/v1/auth', params)

      if (!result.success) {
        // this.bus.emit('@@system:error', '登录失败')
        return
      }

      Cookies.set('ekb-access-token', result.accessToken)
      Fetch.accessToken = result.accessToken
      Fetch.ekbCorpId = result.corpId
    }
  }

  return (WithAuth as unknown) as IConstructor<IMixinAuth<T> & T>
}
