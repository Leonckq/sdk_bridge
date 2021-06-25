/***************************************************
 * Created by nanyuantingfeng on 2019/10/8 16:33. *
 ***************************************************/
import IBridge, { IConstructor, ILinkProps, IShareProps } from '../../types'
import { Bridge } from '../browser/Bridge'
import { createCallEvent, EventType, initMessage, Fn } from './ekuaibao-sdk'

export function withSDK<T extends Bridge = Bridge>(Base: IConstructor<T>) {
  const BaseClass = Base as typeof Bridge

  // 如果是企业微信在浏览器打开, 就直接使用浏览器 Bridge API
  // 此时 ekuaibao API 已经失去了意义
  if (window.isPC && !window.isEKBNative) {
    return BaseClass
  }

  class EKB_SDK extends BaseClass implements IBridge {
    private callEvent: (event: EventType, fn?: Fn) => Promise<any>

    constructor() {
      super()
      // Must Be setTimeout
      setTimeout(() => {
        initMessage(this.bus)
        this.callEvent = createCallEvent(this.bus)
      })
    }

    async close(): Promise<void> {}

    async previewImages(urls: string[], current: string): Promise<void> {
      const index = urls.findIndex(url => url === current)

      const event = {
        messageType: 'call',
        action: 'call:previewImage',
        data: { urls, current, index }
      }

      return this.callEvent(event)
    }

    async openLink(url: string, props: ILinkProps = {}): Promise<any> {
      if (props && props.dev) {
        return super.openLink(url, props)
      }
      if (props && props.iframe) {
        return super.openLink(url, props)
      }

      const { title } = props
      const event = {
        messageType: 'call',
        action: 'call:openView',
        data: { url, title }
      }

      return this.callEvent(event)
    }

    async preview(url: string, fileName: string = '', props?: ILinkProps): Promise<void> {
      // 调用app版本打印预览, 回传的链接是pdf
      if (url.indexOf('.pdf') > -1 || url.indexOf('/pdf/') > -1) {
        const link = this.parseUrl(url, fileName, props)
        return this.callEvent({
          messageType: 'call',
          action: 'call:openPdf',
          data: { url:link, title: fileName }
        })
      }

      return super.preview(url, fileName, props)
    }

    async scan(): Promise<string> {
      const event = { messageType: 'call', action: 'call:qrCode' }
      return this.callEvent(event).then(d => d.text)
    }

    async share(props: IShareProps) {
      const event = {
        messageType: 'call',
        action: 'call:share',
        data: {
          url: props.url,
          title: props.title,
          content: props.content,
          image: props.image
        }
      }
      return this.callEvent(event)
    }

    openThirdApp(url: string, props?: ILinkProps) {
      return this.callEvent({
        messageType: 'call',
        action: 'call:openPdf', // 其实是打开了一个浏览器，名字起得不好！！！
        data: { url }
      })
    }

    async invoke<T>(action: string, data?: any, callback?: (data?: T) => void): Promise<T> {
      return this.callEvent({ messageType: 'call', action, data }, callback)
    }
  }

  return (EKB_SDK as unknown) as IConstructor<T>
}
