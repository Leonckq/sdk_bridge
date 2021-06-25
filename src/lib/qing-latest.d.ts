/***************************************************
 * Created by nanyuantingfeng on 2019/10/16 17:21. *
 ***************************************************/
/// https://open.yunzhijia.com/openplatform/resourceCenter/doc#/gitbook-wiki/home/
declare namespace qing {
  interface NativeSDKCallBack<T = any> {
    error: (res: { code: 500; errMsg: string }) => void
    success: (res: { code: number; data: T }) => void
    complete: () => void
  }
  const config: (props: any) => void
  function call(name: string, props?: any, callback?: NativeSDKCallBack): void
}
