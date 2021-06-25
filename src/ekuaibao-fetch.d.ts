/***************************************************
 * Created by nanyuantingfeng on 2019/10/17 16:54. *
 ***************************************************/
import { FetchConfiguration, FetchError, FetchExtraOptions, FetchOptions } from '@ekuaibao/fetch'

declare module '@ekuaibao/fetch' {
  import { IStaffSettingType } from './model-types/IStaffSettingType'
  declare function Fetch(_url: string, params: any, _options: FetchOptions, others?: FetchExtraOptions): any
  declare namespace Fetch {
    let configure: (config: FetchConfiguration) => void
    let prefixURL: (url: string) => string
    let prefixOrigin: (url: string) => string
    let fixOrigin: (origin: string) => string
    let GET: (url: string, params?: any, options?: FetchOptions, others?: FetchError) => any
    let POST: (url: string, params?: any, options?: FetchOptions, others?: FetchError) => any
    let PUT: (url: string, params?: any, options?: FetchOptions, others?: FetchError) => any
    let DELETE: (url: string, params?: any, options?: FetchOptions, others?: FetchError) => any
    let SSE: (_url: string, params?: any) => EventSource
    let Blob: (url: string, params: any, options: FetchOptions, others?: FetchError) => any
    let corpId: string
    let ekbCorpId: string
    let accessToken: string
    let lang: string
    let defaultLanguage: string
    let reportError: (err: FetchError) => Promise<void | Response>

    // Add ...
    let staffSetting: IStaffSettingType | void
    let isAssistPlatform: boolean
    let agentId: string
    let userId: string
    let wxCorpId: string
  }
}
