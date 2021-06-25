/***************************************************
 * Created by nanyuantingfeng on 2019/11/1 14:46. *
 ***************************************************/
import { Inject } from 'typedi'
import { MessageCenter } from '@ekuaibao/messagecenter'
import { Fetch } from '@ekuaibao/fetch'
import { session } from '@ekuaibao/session-info'
import '../../lib/jweixin-1.2.0'

export class Lib {
  @Inject('@@bus')
  bus: MessageCenter

  init(): Promise<void> {
    return this.weixinJsApiReady()
  }

  protected filter(search: string = '', name: string = '') {
    const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)') //构造一个含有目标参数的正则表达式对象
    const r = search.substr(1).match(reg) //匹配目标参数
    if (r != null) return unescape(r[2])
    return null //返回参数值
  }

  async weixinJsApiReady() {
    const locationSearch = location.search
    let search = decodeURIComponent(locationSearch)
    if (window.isIOS) {
      search = window.isWxWork ? decodeURIComponent(locationSearch) : locationSearch
    }
    const wxCorpId = this.filter(locationSearch, 'corpId') || Fetch.ekbCorpId
    const body = {
      corpId: wxCorpId,
      url: location.pathname + search
    }
    const resp = await Fetch.POST('/api/qyweixin/v2/jsconfig', null, {
      body
    })

    const { nonceStr, timeStamp, signature } = resp.value
    const config: any = {}
    config.nonceStr = nonceStr
    config.timestamp = timeStamp
    config.signature = signature
    config.appId = wxCorpId
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
