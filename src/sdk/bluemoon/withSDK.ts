/***************************************************
 * Created by nanyuantingfeng on 2019/10/16 11:38. *
 ***************************************************/
import IBridge, { IConstructor, ILinkProps, IScanProps, IShareProps } from '../../types'
import {
  closeWebView,
  webview,
  openDocument,
  scan,
  setTitle,
  share,
  getInvoice,
  setProtocol
} from '../../lib/bluemoon-sdk'
import { Bridge } from '../browser/Bridge'

function createCallback(resolve: Function, reject: Function) {
  return (result: string) => {
    const oo = JSON.parse(result)
    const { isSuccess, data, responesMsg } = oo
    isSuccess ? resolve(data) : reject(responesMsg)
  }
}

export function withSDK<T extends Bridge = Bridge>(Base: IConstructor<T>) {
  const BaseClass = Base as typeof Bridge

  // 如果不是手机端, 就直接使用 `浏览器` API
  if (window.isPC) {
    return BaseClass
  }

  class BlueMoonSDK extends BaseClass implements IBridge {
    async close(): Promise<void> {
      closeWebView()
    }

    scan(props: IScanProps = {}): Promise<string> {
      return new Promise((resolve, reject) => {
        scan({
          title: props.desc || '',
          isContinue: false,
          isScanner: true,
          callback: createCallback(resolve, reject)
        })
      })
    }

    setTitle(title: string): Promise<void> {
      return new Promise((resolve, reject) => {
        setTitle({
          title: title,
          callback: createCallback(resolve, reject)
        })
      })
    }

    async openLink(link: string, props: ILinkProps = {}): Promise<void> {
      if (props.iframe) {
        return super.openURLInIframe(link, props)
      }

      webview({
        isNav: true,
        url: link,
        title: props.title || ''
      })
    }

    async share(props: IShareProps): Promise<void> {
      return new Promise((resolve, reject) => {
        share({
          topic: props.title,
          content: props.content,
          picUrl: props.image,
          url: props.url,
          callback: createCallback(resolve, reject)
        })
      })
    }

    async preview(url: string, fileName: string = ''): Promise<any> {
      return new Promise((resolve, reject) => {
        openDocument({
          url,
          fileName,
          fileExt: fileName.slice(fileName.lastIndexOf('.') + 1),
          callback: createCallback(resolve, reject)
        })
      })
    }

    getInvoice(config): Promise<any> {
      return new Promise((resolve, reject) => {
        getInvoice({
          config,
          callback: createCallback(resolve, reject)
        })
      }).then((result: any) => {
        const data = result || {}
        return {
          choose_invoice_info: JSON.stringify(data.cardItemList),
          err_msg: 'ok'
        }
      })
    }

    setProtocol(protocol: string): void {
      setProtocol(protocol)
    }
  }

  return BlueMoonSDK as IConstructor<T>
}
