/***************************************************
 * Created by nanyuantingfeng on 2019/10/8 16:33. *
 ***************************************************/
import IBridge, { IConstructor, ILinkProps, INetworkType, IShareProps, GeolocationType } from '../../../types'
import { Bridge } from '../../browser/Bridge'
import {
  scan,
  close,
  quit,
  openLink,
  setTitle,
  setLeft,
  setRight,
  setIcon,
  share,
  previewImage,
  getGeolocation,
  getNetworkType,
  API_NAMES
} from './dingtalk-sdk'
import { triggerClick, getLinkNodeElement, debounce } from '../../utils'

export function withSDK<T extends Bridge = Bridge>(Base: IConstructor<T>) {
  const BaseClass = Base as typeof Bridge

  class DD_SDK extends BaseClass implements IBridge {
    async scan(): Promise<string> {
      if (window.isPC) {
        return super.scan()
      }
      return scan({ type: 'qrCode' }).then((d: any) => d.text)
    }

    async close(): Promise<void> {
      if (window.isPC) {
        await quit({})
      } else {
        await close({})
      }
    }

    async openLink(url: string, props?: ILinkProps): Promise<any> {
      if (props && props.iframe) {
        return super.openLink(url, props)
      }
      const fixOrigin = props ? props.fixOrigin : true
      if (fixOrigin === undefined || fixOrigin) {
        url = this.prefixOrigin(url)
      }
      return openLink({ url: url })
    }

    async setTitle(title: string): Promise<any> {
      await setTitle({ title: title }).catch(err => console.log(err))
      this.bus.emit('header:title:change', title)
    }

    async share(props: IShareProps): Promise<any> {
      return share({
        type: Number(props.type) || 0, //分享类型，0:全部组件 默认； 1:只能分享到钉钉；2:不能分享，只有刷新按钮
        url: props.url,
        title: props.title,
        content: props.content,
        image: props.image
      })
    }

    async previewImages(urls: string[], current: string): Promise<any> {
      return previewImage({
        urls, //图片地址列表
        current //当前显示的图片链接
      })
    }

    async getGeolocation(obj?: GeolocationType): Promise<any> {
      if (!obj) {
        obj = {}
      }
      return getGeolocation({
        targetAccuracy: 200,
        coordinate: 0,
        withReGeocode: true,
        useCache: true,
        ...obj
      })
    }

    getNetworkType(): Promise<INetworkType> {
      if (window.isPC) {
        return super.getNetworkType()
      }

      return getNetworkType({}).then(d => d.result)
    }

    async setLeft(props: { title: string }, handler?: () => void): Promise<void> {
      const props2 = props as any
      if (handler && typeof handler === 'function') {
        props2.control = true
        props2.onSuccess = handler
        if (window.isAndroid) {
          props2.android = true
        }
      }
      await setLeft(props2)
    }

    async setRight(props: { show?: boolean; text?: string }, handler?: () => void): Promise<void> {
      const props2 = props as any
      if (handler && typeof handler === 'function') {
        props2.control = true
        props2.onSuccess = handler
      }
      await setRight(props2)
    }

    async setIcon(props: { showIcon?: boolean; iconIndex?: number }, handler?: () => void): Promise<void> {
      const props2 = props as any
      if (handler && typeof handler === 'function') {
        props2.onSuccess = handler
      }
      await setIcon(props2)
    }

    async invoke(action: string, data?: any, callback?: (data?: any) => void): Promise<any> {
      return API_NAMES[action](data)
        .then(data => {
          callback && callback(data)
          return data
        })
        .catch(err => console.log(err))
    }

    openThirdApp(url: string, props?: ILinkProps) {
      this.openLink(url, { fixOrigin: false })
    }

    async download(link: string, fileName?: string) {
      const el = getLinkNodeElement()
      el.setAttribute('href', link)
      const reg = /[^\/]*\.\w*(\?|$)/g
      const names = link.match(reg)
      let name = fileName
      if (!name && names && names.length > 0) {
        name = names[0].replace('?', '')
        name = decodeURIComponent(name)
      }
      // download 属性只是在页面于链接在相同域时有效.
      el.setAttribute('download', name)
      triggerClick(el)
    }
  }

  return DD_SDK as IConstructor<T>
}
