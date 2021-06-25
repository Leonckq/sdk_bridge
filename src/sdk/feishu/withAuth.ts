/***************************************************
 * Created by lh on 2019/10/18 17:55. *
 ***************************************************/
import { IMixinAuth, IConstructor, IDeviceType } from '../../types'
import { Bridge } from '../browser/Bridge'
import { Inject } from 'typedi'
import { Fetch } from '@ekuaibao/fetch'
import { IFeiShuSessionType } from '../../model-types/ISessionType'
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

    private filter(name: string = '') {
      const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)') //构造一个含有目标参数的正则表达式对象
      const r = window.location.search.substr(1).match(reg) //匹配目标参数
      if (r != null) return unescape(r[2])
      return '' //返回参数值
    }

    private async __init__(): Promise<void> {
      let code: string
      let appid:string = this.filter('appid')
      let attr:string = this.filter('attr')
      try{
        code = this.filter('code')
      }catch(e){
        this.bus.emit('@@system:error', '没有获取到code')
        return
      }
      try {
        const params: Record<string, string> = {
              authCode: code,
              deviceType: this.deviceType,
              appid:appid,
              attr:attr // 私有化标识 private app
        }

        // code 登录只使用一次 所以存储了code and cookie
        if(Fetch.accessToken){
          params.accessToken = Fetch.accessToken
        }else if(!getCookie('code')){
          params.accessToken  = null;
        }else if(getCookie('code') && getCookie('code') !== code){
          params.accessToken  = null;
        }else{
          params.accessToken  = getCookie('fs-token');
        }
       
        const result: IFeiShuSessionType = await Fetch.POST('/api/feishu/v2/session', null, {
          body:  params
        })
        
        const { sessionId, corporationId, userId } = result
        Fetch.accessToken = sessionId
        Fetch.userId = userId
        Fetch.ekbCorpId = corporationId
        Fetch.corpId = corporationId
        if (!this.filter('accessToken')) {
          location.search = `${location.search}&accessToken=${sessionId}`
        }

        session.set(Fetch.corpId, {
          accessToken: sessionId,
          ekbCorpId: corporationId,
          userId:userId
        })

        setCookie('ekb-access-token', sessionId) 
        setCookie('fs-token', sessionId) // ekb-access-token 取不到值 又存储了fs token
        setCookie('code', params.authCode) // 存储code 用于对于是否使用cookie 还是重新登录

        if(!window.isPC && h5sdk){
          return new Promise(resolve => {
            h5sdk.ready(() => {
              resolve()
              return Promise.resolve()
            })
          })
        }else if(!window.isPC){
          console.log("移动端未注入h5sdk")
        }
      } catch (e) {
        this.openLink('https://www.ekuaibao.com/forApp/info_initializing.html')
      }
    }
  }

  return (WithAuthSDK as unknown) as IConstructor<IMixinAuth<T> & T>
}
