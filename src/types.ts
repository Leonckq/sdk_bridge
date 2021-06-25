/***************************************************
 * Created by nanyuantingfeng on 2019/10/8 17:09. *
 ***************************************************/
import '@ekuaibao/platform.is'
import { IStaffSettingType } from './model-types/IStaffSettingType'
import { IMeInfoType } from './model-types/IMeInfoType'

export interface IShareProps {
  type?: number | string
  appId?: string
  appName?: string
  url: string
  title: string
  content: string
  image: string
  cellContent?: string
}

export interface IScanProps {
  desc?: string
  needResult?: number
}

export interface WXInvoiceProps {
  appId: string
  timeStamp: string
  nonceStr: string
  signType: string
  cardSign: string
}

export interface ILinkProps {
  title?: string
  isLocation?: boolean
  needScroll?: boolean
  needEncode?: boolean
  iframe?: boolean
  dev?: boolean
  fixOrigin?: boolean
  watermark?: string
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

export default abstract class IBridge {
  /**
   * 初始化SDK
   */
  abstract initializeSDK(): Promise<void>

  /**
   * 退出应用
   */
  abstract close(): Promise<void>

  /**
   * 扫描二维码
   * @param props  :
   *     desc?: string  // 描述
   *     needResult?: number  //是否返回结果
   *
   */
  abstract scan(props?: IScanProps): Promise<string>

  /**
   *  预览文件
   * @param url
   * @param fileName
   * @param props
   */
  abstract preview(url: string, fileName?: string, props?: ILinkProps): Promise<void>

  /**
   * 预览图片
   * @param urls
   *        : 图片地址
   * @param current
   *        : 打开预览的首张地址
   */
  abstract previewImages(urls: string[], current: string): Promise<void>

  /**
   * 打开链接
   * @param url
   * @param props
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
   * @param downloadAttribute 是否需要download这个标签
   */
  abstract download(url: string, fileName?: string, downloadAttribute?: boolean): Promise<void>

  /**
   * 获取当前定位
   *
   * @return  IGeolocationType
   *
   *   longitude: number
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

  /**
   * 接管`NavBar`左侧 `返回` 按钮的控制权
   * @param props
   * @param handler
   */
  abstract setLeft(props: { title?: string }, handler?: () => void): Promise<void>

  /**
   * 接管`NavBar` Title ICON 的控制
   * @param props
   * @param handler
   */
  abstract setIcon(props: { showIcon?: boolean; iconIndex?: number }, handler?: () => void): Promise<void>

  /**
   * 接管`NavBar` Right `...` 的控制
   * @param props
   * @param handler
   */
  abstract setRight(props: { show?: boolean; text?: string }, handler?: () => void): Promise<void>

  /**
   * 打开第三方APP
   * @param url
   * @param props
   */
  abstract openThirdApp(url: string, props?: ILinkProps)

  //-----------Header Pre process -----------/
  abstract setHeaderTitle(title: string): void

  abstract changeHeaderTitle(title: string): void

  abstract getHeaderTitle(): string

  abstract invoke(action: string, data?: any, callback?: (data?: any) => void): Promise<any>

  abstract setProtocol(protocol: string): void
}

export interface IConstructor<T> {
  new (): T
}

// 设备类型, `MOBILE` or `DESKTOP`
export type IDeviceType = 'MOBILE' | 'DESKTOP'

export interface IMixinAuth<T extends IBridge> {
  accessToken: string
  userId: string
  corpId: string
  isAssistPlatform?: boolean
  deviceType: IDeviceType
  login(): Promise<void>
  loginMC?(): Promise<void>
}

export interface IMixinStaffSetting<T extends IBridge> {
  staffSetting: IStaffSettingType
  meInfo: IMeInfoType

  deviceType: IDeviceType
  fetchStaffInfo(): Promise<void>
  fetchStaffSetting(): Promise<IStaffSettingType>
}
export interface GeolocationType {
  [propsName: string]: any
}
export type ISDK = IBridge & IMixinAuth<IBridge> & IMixinStaffSetting<IBridge>
