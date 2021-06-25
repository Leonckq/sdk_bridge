/***************************************************
 * Created by nanyuantingfeng on 2019/10/8 16:48. *
 ***************************************************/
import IBridge, { IConstructor, ILinkProps, INetworkType } from '../../types'
import { Bridge } from '../browser/Bridge'
import '../../lib/fsapi-2.3.1'

function createCallback<T = any>(resolve: Function, reject: Function) {
  return {
    onSuccess: (data: T) => resolve(data),
    onFail: (e: Error) => reject(e)
  }
}

export function withSDK<T extends Bridge = Bridge>(Base: IConstructor<T>) {
  const BaseClass = Base as typeof Bridge

  class FSOpenWebSDK extends BaseClass implements IBridge {
    async download(link: string, fileName?: string, downloadAttribute?: boolean): Promise<void> {
      if (window.isPC && window.isDingtalk) {
        return super.download(link, fileName, true)
      }
      return super.download(link, fileName, downloadAttribute)
    }
  }

  if (window.isPC || !window.isFSOpen) {
    return FSOpenWebSDK as IConstructor<T>
  }

  class FSOpenSDK extends BaseClass implements IBridge {
    async previewImages(urls: string[], current: string): Promise<void> {
      const index = urls.findIndex(url => url === current)
      return new Promise((resolve, reject) => {
        FSOpen.media.image.preview({
          index: index,
          imgUrls: urls,
          ...createCallback(resolve, reject)
        })
      })
    }

    async scan(): Promise<string> {
      return new Promise((resolve, reject) => {
        FSOpen.device.scan({
          ...createCallback((data: any) => resolve(data.text), reject)
        })
      })
    }

    async preview(url: string, fileName?: string): Promise<void> {
      return new Promise((resolve, reject) => {
        FSOpen.media.file.preview({
          fileNPath: url,
          ...createCallback(resolve, reject)
        })
      })
    }

    async openLink(url: string, props?: ILinkProps) {
      if (props && props.iframe) {
        return super.openLink(url, props)
      }

      FSOpen.webview.open({ url })
    }

    async setTitle(title: string) {
      FSOpen.webview.navbar.setTitle({ title })
      this.bus.emit('header:title:change', title)
    }

    async getNetworkType(): Promise<INetworkType> {
      return new Promise((resolve, reject) => {
        FSOpen.device.getNetworkType({
          ...createCallback((data: { network: INetworkType }) => resolve(data.network), reject)
        })
      })
    }

    openThirdApp(url: string, props?: ILinkProps) {
      this.openLink(url, { fixOrigin: false })
    }

    getInvoice(config): Promise<any> {
      return new Promise((resolve, reject) => {
        FSOpen.util.chooseInvoiceFromWX({ ...config, ...createCallback(resolve, reject) })
      }).then((result: any) => {
        const data = result ? result.data : {}
        return {
          choose_invoice_info: data.cardItemList,
          err_msg: 'ok'
        }
      })
    }
  }

  return FSOpenSDK as IConstructor<T>
}
