/***************************************************
 * Created by nanyuantingfeng on 2019/10/8 16:33. *
 ***************************************************/
import IBridge, { IConstructor, IGeolocationType, ILinkProps, INetworkType, IShareProps } from '../../types'
import { Bridge } from '../browser/Bridge'
import '../../lib/qing-latest'

function createCallback(resolve: Function, reject: Function) {
  return {
    success: (result: any) => resolve(result.data),
    error: (result: any) => reject(result.errMsg),
    complete: (result: any) => resolve()
  }
}

export function withSDK<T extends Bridge = Bridge>(Base: IConstructor<T>) {
  const BaseClass = Base as typeof Bridge
  // 如果是浏览器打开,直接使用浏览器 Bridge API
  if (window.isPC) {
    return Base
  }

  class KdCloudSDK extends BaseClass implements IBridge {
    async close(): Promise<void> {
      qing.call('closeWebView')
    }

    async previewImages(urls: string[], current: string): Promise<void> {
      return new Promise((resolve, reject) => {
        qing.call('previewImage', { current: current, urls: urls, ...createCallback(resolve, reject) })
      })
    }

    async openLink(link: string, props?: ILinkProps): Promise<any> {
      if (props && props.iframe) {
        return super.openLink(link, props)
      }
      if (props.fixOrigin === undefined || props.fixOrigin) {
        link = this.preOpenLink(link)
      }
      return new Promise((resolve, reject) => {
        qing.call('localFunction', {
          name: 'openExtBrowser',
          param: { url: link },
          ...createCallback(resolve, reject)
        })
      })
    }

    async scan(): Promise<string> {
      return new Promise((resolve, reject) => {
        qing.call('scanQRCode', {
          needResult: 1,
          ...createCallback((data: { qrcode_str: string }) => resolve(data.qrcode_str || ''), reject)
        })
      })
    }

    async setTitle(title: string): Promise<void> {
      qing.call('setWebViewTitle', { title: title }) //设置页面标题并显示
      this.bus.emit('header:title:change', title)
    }

    async share(props: IShareProps): Promise<any> {
      return new Promise((resolve, reject) => {
        qing.call('share', {
          shareType: props.type || '4',
          appId: props.appId || '10594',
          appName: props.appName,
          title: props.title,
          content: props.content,
          thumbData: props.image,
          webpageUrl: props.url,
          cellContent: props.cellContent,
          sharedObject: 'all',
          ...createCallback(() => resolve(), reject)
        })
      })
    }

    // 此接口预览有明显问题 TODO
    async preview(url: string, fileName: string = ''): Promise<void> {
      const t = url.split('/')
      fileName = fileName ? fileName : t[t.length - 1]
      const fileExt = fileName.substring(fileName.lastIndexOf('.') + 1)
      return new Promise((resolve, reject) => {
        qing.call('showFile', {
          fileDownloadUrl: url,
          fileName: fileName,
          fileExt,
          ...createCallback(resolve, reject)
        })
      })
    }

    async getNetworkType(): Promise<INetworkType> {
      return new Promise((resolve, reject) => {
        qing.call('getNetworkType', {
          ...createCallback((result: { network_type: INetworkType }) => resolve(result.network_type), reject)
        })
      })
    }

    async getGeolocation(): Promise<IGeolocationType> {
      return new Promise((resolve, reject) => {
        qing.call('getLocation', {
          ...createCallback(resolve, reject)
        })
      })
    }

    async setLeft(props: { title?: string }, handler?: () => void): Promise<void> {
      if (handler && typeof handler === 'function') {
        qing.call('defback', { success: handler })
      }
    }

    async setRight(props: { show?: boolean; text?: string }, handler?: () => void): Promise<any> {
      return new Promise((resolve, reject) => {
        if (props.show) {
          qing.call('createPop', {
            popTitle: props.text,
            popTitleCallBackId: 'String',
            ...createCallback(resp => {
              if (resp.success == true || resp.success == 'true') {
                resolve(resp.data ? resp.data.callBackId : '')
              }
            }, reject)
          })
        } else {
          qing.call('closePop')
        }
      })
    }

    openThirdApp(url: string, props?: ILinkProps) {
      this.openLink(url, { fixOrigin: false })
    }

    async invoke(action: string, data?: any, callback?: (data?: any) => void): Promise<any> {
      return new Promise((resolve, reject) => {
        qing.call(action, {
          ...data,
          ...createCallback(d => {
            resolve(d)
            callback && callback(d)
          }, reject)
        })
      })
    }
  }

  return (KdCloudSDK as unknown) as IConstructor<T>
}
