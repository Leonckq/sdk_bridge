/**
 *  Created by pw on 2021/5/14 上午11:32.
 */
import IBridge, { IConstructor, ILinkProps, IScanProps, IShareProps } from '../../types'
import { Bridge } from '../browser/Bridge'
import qs from 'qs'

export function withSDK<T extends Bridge = Bridge>(Base: IConstructor<T>) {
  const BaseClass = Base as typeof Bridge

  // 如果不是手机端, 就直接使用 `浏览器` API
  if (window.isPC) {
    return BaseClass
  }

  class HybridSDK extends BaseClass implements IBridge {
    hybridSDK: any = {}

    async initializeSDK(): Promise<void> {
      const { sdkName } = qs.parse(window.location.search.slice(1))
      if (sdkName === 'kk') {
        const { sdk } = await import('./withKKSDK')
        this.hybridSDK = sdk
        this.showTitleBar()
      }
    }

    async close(): Promise<void> {
      this.hybridSDK.close()
    }

    scan(props: IScanProps = {}): Promise<string> {
      if (this.hybridSDK.scan) {
        return this.hybridSDK.scan(props)
      }
      return super.scan(props)
    }

    setTitle(title: string): Promise<void> {
      if (this.hybridSDK.setTilte) {
        return this.hybridSDK.setTilte(title)
      }
      return super.setTitle(title)
    }

    async openLink(link: string, props: ILinkProps = {}): Promise<void> {
      if (props.iframe) {
        return super.openURLInIframe(link, props)
      }
      if (this.hybridSDK.openLink) {
        return this.hybridSDK.openLink(link, props)
      }
      return super.openLink(link, props)
    }

    async share(props: IShareProps): Promise<void> {
      if (this.hybridSDK.share) {
        return this.hybridSDK.share(props)
      }
      return super.share(props)
    }

    async preview(url: string, fileName: string = ''): Promise<any> {
      if (this.hybridSDK.preview) {
        return this.hybridSDK.preview(url, fileName)
      }
      return super.preview(url, fileName)
    }

    async showTitleBar() {
      if (this.hybridSDK.showTitleBar) {
        this.hybridSDK.showTitleBar()
      }
    }
  }

  return (HybridSDK as unknown) as IConstructor<T>
}
