# API 设计

```typescript
interface IShareProps {
  url: string
  title: string
  content: string
  image: string
  type?: number
  appName?: string
  cellContent?: string
}

interface IScanProps {
  desc?: string
  needResult?: number
}

interface ILinkProps {
  title?: string
  isLocation?: boolean
  needScroll?: boolean
  needEncode?: boolean
  iframe?: boolean
}

export type INetworkType = '2g' | '3g' | '4g' | 'wifi' | 'unknown' | 'none'

export interface IGeolocationType {
  longitude: number
  latitude: number
  accuracy: number

  altitude?: number
  altitudeAccuracy?: number
  heading?: number
  speed?: number
}

abstract class IBridge {
  /**
   * 退出应用
   */
  abstract close(): Promise<void>

  /**
   * 扫描二维码
   * @param
   * props  :
   *     desc?: string  // 描述
   *     needResult?: number  //是否返回结果
   *
   */
  abstract scan(props?: IScanProps): Promise<string>

  /**
   *  预览文件
   * @param url
   * @param fileName
   */
  abstract preview(url: string, fileName?: string): Promise<void>

  /**
   * 预览图片
   * @param urls  : 图片地址
   * @param current : 打开预览的首张地址
   */
  abstract previewImages(urls: string[], current: string): Promise<void>

  /**
   * 打开链接
   * @param url
   * @param props :
   *        title?: string
   */
  abstract openLink(url: string, props?: ILinkProps): Promise<void>

  /**
   * 设置`NavBar`上面的title
   * @param title
   */
  abstract setTitle(title: string): Promise<void>

  /**
   * 接管`NavBar`左侧 `返回` 按钮的控制权
   * @param title
   * @param defBackClick
   */
  abstract setLeft(title: string, defBackClick?: () => void): void

  /**
   * 分享链接
   * @param props
   *        url: string    链接地址
   *        title: string   标题
   *        content: string  内容
   *        image: string    图片链接
   */
  abstract share(props: IShareProps): Promise<void>

  /**
   * 下载文件
   * @param url
   * @param fileName
   */
  abstract download(url: string, fileName?: string): Promise<void>

  /**
   * 获取当前定位
   * 
   * @return  IGeolocationType
   * 
   *     longitude: number
   *     latitude: number
   *     accuracy: number

   *     altitude?: number
   *     altitudeAccuracy?: number
   *     heading?: number
   *     speed?: number
   * 
   */
  abstract getGeolocation(): Promise<IGeolocationType>

  /**
   * 获取当前的网络状态
   * @return INetworkType : string
   *        `2g` | `3g` | `4g` | `wifi` | `unknown` | `none`
   *       * `none`表示离线。
   */
  abstract getNetworkType(): Promise<INetworkType>
}
```
