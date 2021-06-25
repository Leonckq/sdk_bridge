/***************************************************
 * Created by nanyuantingfeng on 2019/10/18 17:55. *
 ***************************************************/
import { IMixinAuth, IConstructor, IDeviceType } from '../../types'
import { Bridge } from '../browser/Bridge'
import { Inject } from 'typedi'
import { Fetch } from '@ekuaibao/fetch'
import { setCookie,getCookie } from '@ekuaibao/session-info'


export function withAuth<T extends Bridge = Bridge>(Base: IConstructor<T>) {
  const BaseClass = Base as typeof Bridge
  class WithAuthSDK extends BaseClass implements IMixinAuth<T> {
    accessToken: string
    userId: string
    corpId: string

    @Inject('IDeviceType')
    deviceType: IDeviceType

    async login() {
      try {
        return this.__init__().then(()=>{
          
        })
      } catch (err) {
        this.bus.emit(`@@system:error`, '无法进入应用：' + err.msg || err.errorCode || err.message || err)
        return undefined
      }
    }

    private async __init__(): Promise<void> {
      try {
        const params: Record<string, string> = {}
        if(Fetch.accessToken){
          params.accessToken = Fetch.accessToken
        }else{
          params.accessToken  = getCookie('nbbank-token');
        }
        if(Fetch.accessToken){
          params.accessToken = Fetch.accessToken
        }
       
        const result = await Fetch.POST(`/api/nbbank/v1/session?accessToken=${params.accessToken}`, null, {
          body:  params
        })
        
        const { sessionId, corporationId, userId } = result
        Fetch.accessToken = sessionId
        Fetch.userId = userId
        Fetch.ekbCorpId = corporationId
        Fetch.corpId = corporationId

        session.set(Fetch.corpId, {
          accessToken: sessionId,
          ekbCorpId: corporationId,
          corpId:corporationId,
          userId:userId
        })
        session.set('user', {
          accessToken: sessionId,
          ekbCorpId: corporationId,
          corpId:corporationId,
          userId:userId
        })

        setCookie('ekb-access-token', sessionId) 
        setCookie('nbbank-token', sessionId) // ekb-access-token 取不到值 又存储了fs token

        return Promise.resolve()
      } catch (e) {
        alert('登录失败');
        return Promise.reject() 
      }
    }
  }

  return (WithAuthSDK as unknown) as IConstructor<IMixinAuth<T> & T>
}
