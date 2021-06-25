/***************************************************
 * Created by nanyuantingfeng on 2019/10/16 19:53. *
 ***************************************************/
import { MessageCenter } from '@ekuaibao/messagecenter'

export interface EventType<T = any> {
  messageType: string
  action: string
  data?: any
}

export type Fn = (data: any) => void

function sendData(data: object) {
  // RN升级后调用的方法，兼容以前没升级的用户保留以前的方法
  if (!!window.ReactNativeWebView && window.ReactNativeWebView !== 'undefined') {
    window.ReactNativeWebView.postMessage(JSON.stringify(data), '*')
  } else {
    window.postMessage(JSON.stringify(data), '*')
  }
}

export function createCallEvent(bus: MessageCenter) {
  let __CALLBACKID__ = 0

  return function callEvent(event: EventType, fn?: Fn): Promise<any> {
    __CALLBACKID__ += 1
    const data = { ...event, callbackId: __CALLBACKID__ }

    return new Promise(resolve => {
      if (!!fn) {
        bus.un(data.action).on(data.action, fn)
      } else {
        bus.once(data.action, resolve)
      }
      sendData(data)
    })
  }
}

export function initMessage(bus: MessageCenter) {
  const listener = (e: any) => {
    try {
      const event = JSON.parse(e.data)
      const messageType = event.messageType || 'event'
      // 系统级 事件
      if (messageType === 'event') {
        bus.emit(`@@event:${event.action}`, event)
        return
      }

      bus.emit(event.action, event.data)
    } catch (e) {
      bus.emit(`@@system:error`, e)
    }
  }
  // RN升级后调用的方法，兼容以前没升级的用户保留以前的方法
  if (!!window.ReactNativeWebView && window.ReactNativeWebView !== 'undefined') {
    window.addEventListener('message', listener, false)
  } else {
    window.document.addEventListener('message', listener, false)
  }
}
