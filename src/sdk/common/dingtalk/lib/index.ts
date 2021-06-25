/***************************************************
 * Created by nanyuantingfeng on 2019/10/23 13:00. *
 ***************************************************/
import { IDeviceType } from '../../../../types'
import { Fetch } from '@ekuaibao/fetch'
import { session } from '@ekuaibao/session-info'

import dd, { getJsAPI, requestAuthCode } from '../dingtalk-sdk'
import { IResponseObjectData } from '../../../../model-types/IResponseType'
import { IDingtalkSessionType } from '../../../../model-types/ISessionType'

// 初始化钉钉配置信息
async function configReady(apiList) {
  // 权限验证配置
  const resp = await fetchJSConfig()
  const config = resp.value
  if (config.expiredDate) {
    config.remainTime = new Date().getTime() + config.expiredDate * 1000
  }

  config.corpId = Fetch.corpId
  config.jsApiList = apiList
  dd.config(config)

  return new Promise(resolve => dd.ready(() => resolve(config)))
}

function fetchJSConfig(): Promise<any> {
  return Fetch.POST('/api/dingtalk/v2/jsconfig', null, {
    body: {
      corpId: Fetch.corpId,
      url: location.pathname + decodeURIComponent(location.search)
    }
  })
}

async function updateLogin(deviceType: IDeviceType) {
  const params: any = { dtCorpId: Fetch.corpId }

  if (Fetch.accessToken) {
    params.accessToken = Fetch.accessToken
  }

  return Fetch.GET('/api/dingtalk/v2/session', params)
    .catch(err => {
      if (err.status === 401) {
        // 未登录
        return login(deviceType)
      } else {
        return Promise.reject(err)
      }
    })
    .then((d: any) => (d && d.value ? dealResult(d.value) : login(deviceType).then(dealResult)))
}

async function dealResult(result: IDingtalkSessionType) {
  let { sessionId, corporationId, userId } = result || {}
  Fetch.accessToken = sessionId
  Fetch.ekbCorpId = corporationId
  Fetch.userId = userId
  session.set(Fetch.corpId, {
    accessToken: sessionId,
    ekbCorpId: corporationId
  })
}

async function login(deviceType: IDeviceType): Promise<IDingtalkSessionType> {
  const result = await requestAuthCode({ corpId: Fetch.corpId })
  const oo: IResponseObjectData<IDingtalkSessionType> = await Fetch.POST('/api/dingtalk/v2/session', null, {
    body: {
      corpId: Fetch.corpId,
      authCode: result.code,
      deviceType
    }
  })

  return oo.value
}

export async function baseInit(deviceType: IDeviceType) {
  // 初始化钉钉jsapi和会话
  dd.error(err => {
    console.warn('出错啦: ', err)
    Fetch.reportError({
      category: 'JSAPI',
      code: '001',
      message: 'jsapi报错',
      data: err
    } as any)
  })

  const apiList = getJsAPI()
  // 初始化钉钉jsapi和会话
  return await configReady(apiList).catch(err => {
    console.log(err)
  })
}

async function init(deviceType: IDeviceType) {
  const config: any = await baseInit(deviceType)
  // 登录
  Fetch.agentId = config.agentId
  await updateLogin(deviceType).catch(err => {
    console.warn(err)
  })

  return config
}

// exports
let initPromise = null

export const __init__ = (deviceType: IDeviceType) => initPromise || (initPromise = init(deviceType))

export const __init__withnot_login = (deviceType: IDeviceType) => initPromise || (initPromise = baseInit(deviceType))

export default __init__
