/***************************************************
 * Created by nanyuantingfeng on 2019/10/16 16:34. *
 ***************************************************/

// https://work.weixin.qq.com/api/doc#90001/90144/90425
// version : 1.2.0

declare namespace wx {
  function config(options: any): any
  function ready(fn: () => Promise<void>): void
  function error(fn: (err?: Error) => Promise<void> | void): void

  interface NativeSDKCallBack<T = any> {
    success: (data: T) => void
    fail?: (err: Error) => void
    error?: (err: Error) => void
  }

  const scanQRCode: (
    props: NativeSDKCallBack<{ resultStr: string }> & { desc: string; needResult: number; scanType: string[] }
  ) => Promise<string>

  const openLink: (props: NativeSDKCallBack & { url: string }) => void

  const setTitle: (props: NativeSDKCallBack & { title: string }) => void

  const closeWindow: () => void

  const previewImage: (props: NativeSDKCallBack & { current: string; urls: string[] }) => void

  const onMenuShareAppMessage: (props: any) => void

  const onMenuShareWechat: (props: any) => void

  const checkJsApi: (props: any) => Promise<void>

  const previewFile: (props: NativeSDKCallBack & { url: string; name: string }) => Promise<void>

  function onNetworkStatusChange(
    fn: (data: { isConnected: boolean; networkType: '2g' | '3g' | '4g' | 'wifi' | 'unknown' | 'none' }) => void
  ): void

  function getNetworkType(props: NativeSDKCallBack<{ networkType: string }>): void

  function hideOptionMenu(): any
  function hideAllNonBaseMenuItem(): any

  function getLocation(props: any): any

  function invoke(action: string, data: any, callback: (data: any) => void, error?: (e) => void)
}
