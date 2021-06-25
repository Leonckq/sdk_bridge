/**
 *  Created by pw on 2021/5/13 下午2:31.
 */
declare namespace kk {
  function ready(cb: (args: any) => void)
  function isKK(): boolean

  interface ScanerSuccessArgs {
    code: string
  }
  interface ScanerFailArgs {
    code: ScanerFailCode
    msg: string
  }
  enum ScanerFailCode {
    USERCANCEL = -1, // 用户取消
    NO_PERMISSION = 1000, // 设备没有权限(仅限android, IOS没有提示)
    DEVICE_NO_SUPPORT = 1 //设备不支持
  }

  type ScanerSuccessCB = (res: ScanerSuccessArgs) => void
  type FailCB = (fail: ScanerFailArgs) => void

  const scaner: {
    scanBarCode: (successCb: ScanerSuccessCB, failCB: FailCB) => void // 扫描条形码
    scanTDCode: (successCb: ScanerSuccessCB, failCB: FailCB) => void // 扫描二维码
  }

  const app: {
    exit: () => void // 退出Web应用：直接关闭Webview窗口,该能力无返回值。
    showTitleBar: () => void // 显示应用容器(webview)的标题栏/导航栏,该能力无返回值。
    hideTitleBar: () => void // 隐藏应用容器(webview)的标题栏/导航栏，该能力无返回值。
    setTitle: (title: string) => void // 设置应用容器(webview)的标题栏/导航栏的标题，该能力无返回值。
  }

  type HistoryCanGoCB = (args: { canGoBack: boolean; canGoForward: boolean }) => void
  type HistoryHasPrev = (args: { hasPrev: boolean }) => void

  const history: {
    // 历史记录模块，提供操作webview历史记录的能力(前进、后退等)
    canGo: (done: HistoryCanGoCB) => void
    hasPrev: (done: HistoryHasPrev) => void
    back: (fail?: () => void) => void
    forward: (fail?: () => void) => void // 前进到下一页
  }
}
