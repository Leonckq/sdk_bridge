/***************************************************
 * Created by nanyuantingfeng on 2019/10/8 16:48. *
 ***************************************************/
import IBridge, { IConstructor, ILinkProps, IShareProps } from '../../types'
import { Bridge } from '../browser/Bridge'
import { Fetch } from '@ekuaibao/fetch'
import './huawei-sdk'

export function withSDK<T extends Bridge = Bridge>(Base: IConstructor<T>) {
  const BaseClass = Base as typeof Bridge

  class HuaWeiSDK extends BaseClass implements IBridge {
    async previewImages(urls: string[], current: string): Promise<void> {
      const index = urls.findIndex(url => url === current)
      return HWH5.previewImage({ index: String(index), imageArray: urls })
    }

    async scan(): Promise<string> {
      return HWH5.scanCode({ needResult: 1 }).then(result => result.text)
    }

    async share(props: IShareProps): Promise<void> {
      return HWH5.share({
        type: String(props.type) || 'IM',
        pcUri: props.url,
        title: props.title,
        desc: props.content,
        iconURL: props.image
      })
    }

    async openLink(url: string, props?: ILinkProps) {
      if (props && props.iframe) {
        return super.openLink(url, props)
      }

      if (props.needEncode) url = encodeURI(url)

      if (props.fixOrigin === undefined || props.fixOrigin) {
        url = Fetch.prefixOrigin(url)
      }

      return HWH5.openWebview({ uri: url })
    }

    async setTitle(title: string) {
      HWH5.setNavigationBarTitle({ title })
      this.bus.emit('header:title:change', title)
    }

    async close(): Promise<void> {
      await HWH5.navigateBack()
      await HWH5.refreshStoreCard({ appID: 'com.huawei.works.h5.todo' })
    }

    openThirdApp(url: string, props?: ILinkProps) {
      this.openLink(url, { fixOrigin: false })
    }
  }

  return HuaWeiSDK as IConstructor<T>
}
