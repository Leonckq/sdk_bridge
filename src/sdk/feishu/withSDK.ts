import IBridge, { IConstructor, ILinkProps, IShareProps } from '../../types'
import { Bridge } from '../browser/Bridge'

function createCallback(resolve: Function) {
  return {
    onSuccess: (result: any) => resolve(result.text)
  }
}
export function withSDK<T extends Bridge = Bridge>(Base: IConstructor<T>) {
  const BaseClass = Base as typeof Bridge

  class Feishu_WebSDK extends BaseClass implements IBridge {
    async download(link: string, fileName?: string, downloadAttribute?: boolean): Promise<void> {
      return super.download(link, fileName, true)
    }
  }
  // 如果不是手机端, 就直接使用 `浏览器` API
  if (window.isPC) {
    return Feishu_WebSDK as IConstructor<T>
  }

  class Feishu_SDK extends BaseClass implements IBridge {
    async close(): Promise<void> {
      return h5sdk.biz.navigation.close({
        onSuccess: (result: any) => result
      })
    }
    async setTitle(title: string): Promise<any> {
      h5sdk.biz.navigation.setTitle({ title })
      this.bus.emit('header:title:change', title)
    }

    async scan(): Promise<string> {
      return new Promise((resolve, reject) => {
        h5sdk.biz.util.scan({
          type: 'qrCode',
          ...createCallback(resolve)
        })
      })
    }

    async share(props: IShareProps): Promise<any> {
      return h5sdk.biz.util.share({
        url: props.url,
        title: props.title,
        content: props.content,
        image: props.image
      })
    }

    async openLink(url: string, props?: ILinkProps): Promise<any> {
      if (props && props.iframe) {
        return super.openLink(url, props)
      }
      if (props.fixOrigin === undefined || props.fixOrigin) {
        url = this.prefixOrigin(url)
      }
      if (window.h5sdk) {
        return h5sdk.biz.util.openLink({
          url: url
        })
      }
      return super.openLink(url, props)
    }

    async previewImages(urls: string[], current: string): Promise<any> {
      if (window.h5sdk) {
        return h5sdk.biz.util.previewImage({
          urls, //图片地址列表
          current //当前显示的图片链接
        })
      }
      return super.previewImages(urls, current)
    }

    preview(url: string, fileName?: string, props: ILinkProps = { fixOrigin: false }): Promise<any> {
      // return Bridge.prototype.preview.prototype.call(Bridge, url, fileName, props)
      // return super.preview.prototype.call(Bridge, url, fileName, props)
      return super.preview(url, fileName, props)
    }

    async setLeft(props: { title: string; isShowIcon: boolean }, handler?: () => void): Promise<void> {
      const props2 = props as any
      if (handler && typeof handler === 'function') {
        props2.control = true
        props2.onSuccess = handler
        if (window.isAndroid) {
          props2.android = true
        }
      }
      await h5sdk.biz.navigation.setLeft(props2)
    }

    async setRight(props: { show?: boolean }, handler?: () => void): Promise<void> {
      const props2 = props as any
      await h5sdk.biz.navigation.setRight(props2)
    }

    openThirdApp(url: string, props?: ILinkProps) {
      this.openLink(url, { fixOrigin: false })
    }

    async download(link: string, fileName?: string, downloadAttribute?: boolean): Promise<void> {
      super.download(link, fileName, true)
    }
  }

  return Feishu_SDK as IConstructor<T>
}
