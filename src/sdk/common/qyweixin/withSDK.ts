/***************************************************
 * Created by nanyuantingfeng on 2019/10/8 16:33. *
 ***************************************************/
import IBridge, { IConstructor, IGeolocationType, ILinkProps, INetworkType } from '../../../types'
import { Bridge } from '../../browser/Bridge'
import '../../../lib/jweixin-1.2.0'

function createCallback(resolve: Function, reject: Function) {
  return {
    success: (data: any) => resolve(data),
    fail: (e: Error) => reject(e)
  }
}

function configAction(link: string) {
  if (window.isPC) return

  const params = {
    //title: 'Hi，我们都在用易快报', // 分享标题
    //desc: '最好用的移动互联网报销方式，还不快来试试', // 分享描述
    link: link, // 分享链接
    imgUrl: 'https://dn-ekb.qbox.me/qyweixin/icon.png', // 分享图标
    success: function() {
      // 用户确认分享后执行的回调函数
    },
    cancel: function() {
      // 用户取消分享后执行的回调函数
    }
  }
  wx && wx.onMenuShareAppMessage && wx.onMenuShareAppMessage({ ...params })
  wx && wx.onMenuShareWechat && wx.onMenuShareWechat({ ...params })
}

export function checkWeixinApi(name: string) {
  return new Promise((resolve, reject) => {
    wx.checkJsApi({
      jsApiList: [name],
      ...createCallback(res => (res.checkResult[name] ? resolve() : reject()), reject)
    })
  })
}

export function withSDK<T extends Bridge = Bridge>(Base: IConstructor<T>) {
  // 如果是企业微信在浏览器打开, 就直接使用浏览器 Bridge API
  // 此时 wx API 已经失去了意义
  if (window.isPC && !window.isWxWork) {
    return Base
  }

  const BaseClass = Base as typeof Bridge

  class WeiXinSDK extends BaseClass implements IBridge {
    async close(): Promise<void> {
      return wx.closeWindow()
    }

    async openLink(link: string, props: ILinkProps = {}): Promise<any> {
      const { isLocation, fixOrigin = true } = props
      if (fixOrigin) {
        link = this.preOpenLink(link)
      }

      configAction(link)

      if (isLocation) {
        window.location.href = link
      }

      return super.openLink(link, props)
    }

    async preview(link: string, fileName: string, props?: ILinkProps): Promise<void> {
      if (window.isWxWork && window.isIOS) {
        checkWeixinApi('previewFile')
          .then(() => {
            return new Promise((resolve, reject) => {
              wx.previewFile({
                url: link,
                name: fileName,
                ...createCallback(resolve, reject)
              })
            })
          })
          .catch(() => {
            super.preview(link, fileName, props)
          })

        return undefined
      }

      super.preview(link, fileName, props)
    }

    async scan(props: any = {}): Promise<string> {
      return checkWeixinApi('scanQRCode')
        .catch(() => super.scan(props))
        .then(() => {
          return new Promise((resolve, reject) => {
            wx.scanQRCode({
              desc: props.desc,
              needResult: 1, // 默认为0，扫描结果由企业微信处理，1则直接返回扫描结果，
              scanType: ['qrCode', 'barCode'], // 可以指定扫二维码还是一维码，默认二者都有
              ...createCallback((res: any) => resolve(res.resultStr), reject)
            })
          })
        })
    }

    getNetworkType(): Promise<INetworkType> {
      return new Promise((resolve, reject) => {
        wx.getNetworkType({
          ...createCallback((data: { networkType: INetworkType }) => resolve(data.networkType), reject)
        })
      })
    }

    async getGeolocation(): Promise<IGeolocationType> {
      return new Promise((resolve, reject) => {
        wx.getLocation({
          type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
          ...createCallback(resolve, reject)
        })
      })
    }

    async invoke(action: string, data?: any, callback?: (data?: any) => void): Promise<any> {
      return checkWeixinApi(action).then(() => {
        return new Promise((resolve, reject) => {
          wx.invoke(
            action,
            data,
            result => {
              callback && callback(result)
              resolve(result)
            },
            reject
          )
        })
      })
    }
  }

  return WeiXinSDK as IConstructor<T>
}
