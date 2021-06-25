/***************************************************
 * Created by nanyuantingfeng on 2019/10/23 19:18. *
 ***************************************************/
import IBridge, {
  IGeolocationType,
  ILinkProps,
  INetworkType,
  IScanProps,
  IShareProps,
  WXInvoiceProps
} from '../../types'
import MessageCenter from '@ekuaibao/messagecenter'
import { Fetch } from '@ekuaibao/fetch'
import { Inject } from 'typedi'
import { debounce, getLinkNodeElement, triggerClick } from '../utils'
import { scan } from '../../lib/emobile'

export class Bridge implements IBridge {
  @Inject('@@bus')
  bus: MessageCenter

  async initializeSDK(): Promise<void> {}

  async scan(props?: IScanProps): Promise<string> {
    alert('Method `scan` not implemented.')
    return ''
  }

  async getInvoice(props?: WXInvoiceProps): Promise<any> {
    alert('Method `getInvoice` not implemented.')
    return
  }

  share(props: IShareProps): Promise<void> {
    alert('Method `share()` not implemented.')
    return undefined
  }

  protected prefixOrigin(url: string) {
    if (url && url.startsWith('http')) {
      return url
    }
    let { origin, pathname } = location

    let fixed = ''

    if (pathname.indexOf('/web') > -1) {
      fixed = pathname.slice(0, pathname.indexOf('/web'))
    } else if (pathname.indexOf('/applet') > -1) {
      fixed = pathname.slice(0, pathname.indexOf('/applet'))
    }

    url = (fixed + '/' + url)
      .replace(/\/\/\//g, '/')
      .replace(/\.\/\//g, '/')
      .replace(/\/\//g, '/')
      .replace(/\/\.\//g, '/')
    return origin + url
  }

  protected preOpenLink(link: string, needEncode = false, fixOrigin = true) {
    if (needEncode) {
      link = encodeURI(link)
    }
    if (fixOrigin) {
      link = this.prefixOrigin(link)
    }
    return link
  }

  async openLink(link: string, props?: ILinkProps): Promise<void> {
    if (props && props.iframe) {
      return this.openURLInIframe(link, props)
    }
    const fixOrigin = props ? props.fixOrigin : true
    link = this.preOpenLink(link, false, fixOrigin)
    const el = getLinkNodeElement()
    el.setAttribute('href', link)
    triggerClick(el)
  }

  async download(link: string, fileName?: string, downloadAttribute?: boolean) {
    /*
     ** 浏览器对图片资源下载有兼容性问题，将图片转为blob再下载解决此问题
     */
    var accessToken = encodeURIComponent(Fetch.accessToken)
    function xhrequest(url: string, callback: (res: any) => void) {
      var xhr = new XMLHttpRequest()
      xhr.open('get', url, true)
      xhr.setRequestHeader('accesstoken', accessToken)
      xhr.responseType = 'blob'
      xhr.onload = function() {
        callback(this)
      }
      xhr.send()
    }
    const el = getLinkNodeElement()
    xhrequest(link, (res: any) => {
      const url = window.URL.createObjectURL(res.response)
      el.setAttribute('href', url)
      const reg = /[^\/]*\.\w*(\?|$)/g
      const names = link.match(reg)
      let name = fileName
      if (!name && names && names.length > 0) {
        name = names[0].replace('?', '')
        name = decodeURIComponent(name)
      }

      if (!name) {
        const sCD = res.getResponseHeader('content-disposition')
        name = sCD.replace(/^(\w+;\s*)*filename=|"/g, '') || ''
      }

      try {
        name = decodeURIComponent(name)
      } catch {
        name = name.replace(/%/gi, '')
        name = decodeURIComponent(name)
      }

      // download 属性只是在页面于链接在相同域时有效.
      el.setAttribute('download', name)
      triggerClick(el)
    })
  }

  async close() {
    this.bus.emit('@@system:close:app')
  }

  async setTitle(title: string): Promise<void> {
    if (title) {
      window.document.title = title
      this.bus.emit('@@system:set:title', title)
      this.bus.emit('header:title:change', title)
    }
  }

  protected async openURLInIframe(link: string, props?: any) {
    this.bus.emit(`@@system:openURLInIframe`, link, props)
  }

  parseUrl = (url: string, fileName = '', props?: ILinkProps) => {
    const additionalParam = props && props.watermark ? '&watermark=' + encodeURIComponent(props.watermark) : ''
    const reg = /^(.*)\.(doc|docx|wps|odt|rtf|xls|xlsx|et|ods|csv|ppt|pptx|dps|odp|pdf|txt|jpg|jpeg|gif|png|bmp|tif|html|htm)$/i
    if (reg.test(fileName.toLowerCase())) {
      const previewDomain = window.PREVIEW_DOMAIN || 'https://doc.ekuaibao.com'
      const link = encodeURIComponent(url)
      const extension = fileName.substring(fileName.lastIndexOf('.'))
      let name = fileName.substring(0, fileName.lastIndexOf('.'))
      //去掉特殊字符
      name = name.replace(/[\?\%\&\@]/g, '')
      name = `${encodeURIComponent(name)}${extension}`
      return previewDomain + '/view/url?url=' + link + `&name=${name}` + additionalParam
    }
    return `${url}${additionalParam}`
  }

  async preview(url: string, fileName = '', props?: ILinkProps): Promise<void> {
    const link = this.parseUrl(url, fileName, props)
    return this.openLink(link, props)
  }

  async previewImages(urls: string[], current: string): Promise<void> {
    this.bus.emit('@@system:previewImages', urls, current)
  }

  // 当前API只在浏览器网页有效,
  // 并且在调用 navigator.geolocation.getCurrentPosition 时,浏览器会询问是否
  // 允许使用此API, 如果用户不允许使用此API, 将不会返回,
  // 此外在其他环境(dd/wx ...)时, webview  并不会询问 geolocation API的授权,
  // 此方法不会反回结果.
  async getGeolocation(): Promise<IGeolocationType> {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(position => {
        // https://developer.mozilla.org/zh-CN/docs/Web/API/Coordinates
        resolve(position.coords)
      }, reject)
    })
  }

  async getNetworkType(): Promise<INetworkType> {
    return navigator.onLine ? 'unknown' : 'none'
  }

  async setLeft(props: { title?: string }, handler?: () => void): Promise<void> {}

  async setIcon(props: { showIcon?: boolean; iconIndex?: number }, handler?: () => void): Promise<void> {}

  async setRight(props: { show?: boolean; text?: string }, handler?: () => void): Promise<void> {}

  //-----------Header Pre process -----------/
  private __TITLE_STACK__: string[] = []

  setHeaderTitle = debounce((title: string) => {
    if (this.__TITLE_STACK__.length > 0) {
      let latest = this.__TITLE_STACK__[this.__TITLE_STACK__.length - 1]
      if (latest === title) {
        return
      }
    }
    this.__TITLE_STACK__.push(title)
    this.setTitle(title)
    return
  })

  changeHeaderTitle = debounce((title: string) => {
    if (this.__TITLE_STACK__.length) {
      this.__TITLE_STACK__[this.__TITLE_STACK__.length - 1] = title
    }
    this.setTitle(title)
    return
  })

  getHeaderTitle = () => {
    let title

    if (this.__TITLE_STACK__.length) {
      title = this.__TITLE_STACK__[this.__TITLE_STACK__.length - 1]
    }
    this.setTitle(title)
    return title
  }

  async invoke(action: string, data?: any, callback?: (data?: any) => void): Promise<any> {}

  openThirdApp(url: string, props?: ILinkProps) {
    this.openLink(url, props)
  }

  setProtocol(protocol: string): void {}

  async webUseScan(): Promise<string> {
    return scan()
  }
}
