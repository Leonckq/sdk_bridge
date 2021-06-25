/***************************************************
 * Created by nanyuantingfeng on 2019/11/1 14:46. *
 ***************************************************/
import { Inject } from 'typedi'
import Cookies from 'js-cookie'
import { MessageCenter } from '@ekuaibao/messagecenter'
import { Fetch } from '@ekuaibao/fetch'
import { IResponseObjectData } from '../../../model-types/IResponseType'
import { IQYWeixinSessionType } from '../../../model-types/ISessionType'
import '../../../lib/jweixin-1.2.0'

export class Lib {
  @Inject('@@bus')
  bus: MessageCenter

  init(): Promise<void> {
    return this.checkSession().then(() => this.weixinJsApiReady())
  }

  protected filter(name: string = '') {
    const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)') //构造一个含有目标参数的正则表达式对象
    const r = window.location.search.substr(1).match(reg) //匹配目标参数
    if (r != null) return unescape(r[2])
    return null //返回参数值
  }

  checkSession() {
    const code = this.filter('auth_code')
    const params: any = {}
    if (Fetch.accessToken) {
      params.accessToken = Fetch.accessToken
    }

    if (Fetch.corpId) {
      params.wxCorpId = Fetch.corpId
    }

    params.corpId = Fetch.corpId

    let fetchOptions = params

    const sessionInfo = Cookies.getJSON<any>('session')

    if (!!sessionInfo) {
      const { authCode, session } = sessionInfo
      if (authCode === code) {
        console.log('checkSession::cookie')
        fetchOptions = session
      }
    }

    return Fetch.GET('/api/qyweixin/v2/session', { ...fetchOptions }).then(
      (result: IResponseObjectData<IQYWeixinSessionType>) => {
        Fetch.userId = result && result.value ? result.value.userId : Fetch.userId
        Fetch.staffSetting = result.value.staffSetting || { language: Fetch.defaultLanguage }
        return this.handleSession(result)
      },
      () => {
        Cookies.set('session', '')
        return Promise.reject({
          type: 'refresh',
          msg: '会话过期请刷新页面或将此界面关闭后重新进入'
        })
      }
    )
  }

  handleSession(result: IResponseObjectData<IQYWeixinSessionType> & { id?: any }) {
    if (result.id) {
      return Promise.reject(result)
    }

    const session = result.value

    // save session
    const code = this.filter('auth_code') || ' '
    const sessionInfo = { authCode: code, session: session }
    Cookies.set('session', sessionInfo)

    // merge to Fetch
    let { sessionId, corporationId, wxCorpId } = session
    Fetch.accessToken = sessionId
    Fetch.ekbCorpId = corporationId
    Fetch.wxCorpId = wxCorpId
    Fetch.corpId = wxCorpId

    return Promise.resolve()
  }

  async weixinJsApiReady() {
    let search = decodeURIComponent(location.search)
    if (window.isIOS) {
      search = window.isWxWork ? decodeURIComponent(location.search) : location.search
    }
    const resp = await Fetch.POST('/api/qyweixin/v2/jsconfig', null, {
      body: {
        corpId: Fetch.wxCorpId,
        url: location.pathname + search
      }
    })

    const { nonceStr, timeStamp, signature } = resp.value
    const config: any = {}
    config.nonceStr = nonceStr
    config.timestamp = timeStamp
    config.signature = signature
    config.appId = Fetch.wxCorpId
    config.beta = true
    config.jsApiList = this.getAPIList()

    if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'beta') {
      // config.debug = true
    }

    wx.config(config)

    wx.ready(() => {
      this.shareAction()
      return Promise.resolve(config)
    })

    wx.error(err => {
      return Promise.reject({
        msg: `微信api验证错误，刷新重试或关闭后重新打开：${JSON.stringify(resp)}`
      })
    })

    return Promise.resolve()
  }

  shareAction() {
    return wx.hideAllNonBaseMenuItem()
  }

  getAPIList() {
    return [
      'openAddress',
      'selectEnterpriseContact',
      'chooseInvoice',
      'getSupportSoter',
      'requireSoterBiometricAuthentication',
      'checkJsApi',
      'onMenuShareTimeline',
      'onMenuShareAppMessage',
      'onMenuShareQQ',
      'onMenuShareWeibo',
      'hideMenuItems',
      'showMenuItems',
      'chooseImage',
      'previewImage',
      'uploadImage',
      'downloadImage',
      'getNetworkType',
      'getLocation',
      'hideAllNonBaseMenuItem',
      'showOptionMenu',
      'closeWindow',
      'scanQRCode',
      'chooseWXPay',
      'openEnterpriseChat',
      'invoke'
    ]
  }
}

export default Lib
