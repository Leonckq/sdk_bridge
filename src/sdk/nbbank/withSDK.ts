import IBridge, { IConstructor, ILinkProps, IShareProps } from '../../types'
import { Bridge } from '../browser/Bridge'
import { Client, utils } from '../../lib/nbcb-sdk'

export function withSDK<T extends Bridge = Bridge>(Base: IConstructor<T>) {
  const BaseClass = Base as typeof Bridge

  // 如果不是手机端, 就直接使用 `浏览器` API
  if (window.isPC) {
    return BaseClass
  }

  type buttonType = {
    exist?: string
    func?: string
    name: string
  }
  interface IHeaderParams {
    title?: string
    leftButton?: buttonType ;
    rightButton?: buttonType ;
  }
  const getHeaderParams = (props: IHeaderParams) => {
    const { title, leftButton, rightButton } = props
    return {
      title,
      leftButton,
      rightButton
    }
  }

  class Nbbank_SDK extends BaseClass implements IBridge {
    async scan(): Promise<string> {
      return new Promise((resolve, reject) => {
        Client.NBCB_openQRScan(rsp => {
          resolve(rsp.codeInfo)
        })
      })
    }

    async close(): Promise<void> {
      return new Promise((resolve, reject) => {
        Client.NBCB_closeWebView(rsp => {
          resolve(rsp)
        })
      })
    }

    async setTitle(title: string): Promise<any> {
      const params = getHeaderParams({
        title,
        leftButton:{
          name:'default'
        },
        rightButton: {
          name:'default'
        }
      })
      Client.NBCB_setPageTitle(params)
      this.bus.emit('header:title:change', title)
    }

    async setLeft(props: { title: string }, handler?: () => void): Promise<void> {
      window.headerLeftFunc = handler // 由于宁波的jsBridge func 中只支持string,无奈之举
      const params = getHeaderParams({
        title: 'default',
        leftButton: {
          exist: handler ? 'true' : 'false',
          func: 'headerLeftFunc()',
          name: props.title
        },
        rightButton:{
          name: 'default'
        }
      })
      Client.NBCB_setPageTitle(params)
    }

    async setRight(props: { show?: boolean; text?: string }, handler?: () => void): Promise<void> {
      window.headerRightFunc = handler // 由于宁波的jsBridge func 中只支持string,无奈之举
      const params = getHeaderParams({
        title: 'default',
        leftButton: {
          name:'default'
        },
        rightButton: {
          exist: props.show ? 'true' : 'false',
          func: 'headerRightFunc()',
          name: props.text
        }
      })
      Client.NBCB_setPageTitle(params)
    }

    async share(props: IShareProps): Promise<any> {
      const type = {
        0: 'WX,PYQ,QQ,WB,DX,YX',
        1: 'WX,PYQ,QQ,WB,DX,YX',
        2: ''
      }

      const params = {
        title: props.title,
        hrefUrl: props.url,
        content: props.cellContent,
        type: props.type ? type[props.type] : 'WX,PYQ,QQ,WB,DX,YX' //type: Number(props.type) || 0, //分享类型，0:全部组件 默认； 1:只能分享到钉钉；2:不能分享，只有刷新按钮
      }
      return new Promise((resolve, reject) => {
        Client.NBCB_openSharePage(params, rsp => {
          resolve(rsp)
        })
      })
    }

    async previewImages(urls: string[], current: string): Promise<any> {
      const params = {
        imgPath: current
      }
      return new Promise((resolve, reject) => {
        Client.NBCB_openImgPreview(params, rsp => {
          resolve(rsp)
        })
      })
    }

    async getGeolocation(): Promise<any> {
      return new Promise(resolve => {
        Client.NBCB_getLocation(rsp => {
          resolve(rsp)
        })
      })
    }

    async openLink(url: string, props?: ILinkProps): Promise<any> {
      const title = props ? {
        title: props.title
      } : {}
      return Client.NBCB_openWebUrl({ pageUrl: url, ...title })
    }

    async invoke(action: string, data?: any, callback?: (data?: any) => void): Promise<any> {
      if (!this[action]) {
        return null
      }
      return this[action](data)
        .then(data => {
          callback && callback(data)
          return data
        })
        .catch(err => console.log(err))
    }

    openThirdApp(url: string, props?: ILinkProps) {
      Client.NBCB_openByOtherApp({fileUrl:url})
    }

    async preview(url: string, fileName: string = '', props?: ILinkProps): Promise<void> {
      // 调用app版本打印预览, 回传的链接是pdf
      if (url.indexOf('.pdf') > -1 || url.indexOf('/pdf/') > -1) {
        return this.openThirdApp(url)
      }

      return super.preview(url, fileName, props)
    }
  }

  return Nbbank_SDK as IConstructor<T>
}
