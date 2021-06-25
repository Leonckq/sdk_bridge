/***************************************************
 * Created by nanyuantingfeng on 2019/10/16 11:38. *
 ***************************************************/
import IBridge, {IConstructor, ILinkProps, IScanProps, IShareProps} from '../../types'
import {Bridge} from '../browser/Bridge'
import {closeWebView} from '../../lib/bluemoon-sdk'

declare const app: any
declare const mobile: any

function createCallback(resolve: Function, reject: Function) {
    return (result: string) => {
        const resultArray = result[app.qRCodeScanResultArray]
        if (resultArray && resultArray.length > 0) {
            resolve(resultArray[0])
        } else {
            reject('扫描出错')
        }
    }
}

export function withSDK<T extends Bridge = Bridge>(Base: IConstructor<T>) {
    const BaseClass = Base as typeof Bridge

    // 如果不是手机端, 就直接使用 `浏览器` API
    if (window.isPC) {
        return BaseClass
    }

    class CoCallSDK extends BaseClass implements IBridge {
        async close(): Promise<void> {
            return mobile.nativeDoBrowserFinish()
        }

        scan(): Promise<string> {
            return new Promise((resolve, reject) => {
                mobile.qRCodeScan({
                    scanType: app.qRCodeScanType.SCANTYPE_SINGLE, //扫描模式，单一扫描
                    jsCallback: createCallback(resolve, reject), //扫描完成后回调方法名，回调参数是扫描结果组装的json字符串
                    resultArray: app.qRCodeScanResultArray
                })
            })
        }

        // setTitle(title: string): Promise<void> {
        //   return new Promise((resolve, reject) => {
        //     setTitle({
        //       title: title,
        //       callback: createCallback(resolve, reject)
        //     })
        //   })
        // }
        //
        // async openLink(link: string, props: ILinkProps = {}): Promise<void> {
        //   if (props.iframe) {
        //     return super.openURLInIframe(link, props)
        //   }
        //
        //   webview({
        //     isNav: true,
        //     url: link,
        //     title: props.title || ''
        //   })
        // }
        //
        // async share(props: IShareProps): Promise<void> {
        //   return new Promise((resolve, reject) => {
        //     share({
        //       topic: props.title,
        //       content: props.content,
        //       picUrl: props.image,
        //       url: props.url,
        //       callback: createCallback(resolve, reject)
        //     })
        //   })
        // }
        //
        // async preview(url: string, fileName: string = ''): Promise<any> {
        //   return new Promise((resolve, reject) => {
        //     openDocument({
        //       url,
        //       fileName,
        //       fileExt: fileName.slice(fileName.lastIndexOf('.') + 1),
        //       callback: createCallback(resolve, reject)
        //     })
        //   })
        // }
    }

    return CoCallSDK as IConstructor<T>
}
