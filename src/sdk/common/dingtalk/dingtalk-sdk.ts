/***************************************************
 * Created by nanyuantingfeng on 2019/10/16 16:04. *
 ***************************************************/
/***** https://ding-doc.dingtalk.com/doc#/dev/swk0bg */
import dd from 'dingtalk-jsapi'
import requestAuthCode from 'dingtalk-jsapi/api/runtime/permission/requestAuthCode'
import previewImage from 'dingtalk-jsapi/api/biz/util/previewImage'
import uploadAttachment from 'dingtalk-jsapi/api/biz/util/uploadAttachment'
import uploadImage from 'dingtalk-jsapi/api/biz/util/uploadImage'
import uploadImageFromCamera from 'dingtalk-jsapi/api/biz/util/uploadImageFromCamera'
import preview from 'dingtalk-jsapi/api/biz/cspace/preview'
import openLink from 'dingtalk-jsapi/api/biz/util/openLink'
import contactChoose from 'dingtalk-jsapi/api/biz/contact/choose'
import customContact from 'dingtalk-jsapi/api/biz/customContact/choose'
import close from 'dingtalk-jsapi/api/biz/navigation/close'
import quit from 'dingtalk-jsapi/api/biz/navigation/quit'

import setTitle from 'dingtalk-jsapi/api/biz/navigation/setTitle'
import setLeft from 'dingtalk-jsapi/api/biz/navigation/setLeft'
import setRight from 'dingtalk-jsapi/api/biz/navigation/setRight'
import setIcon from 'dingtalk-jsapi/api/biz/navigation/setIcon'

import share from 'dingtalk-jsapi/api/biz/util/share'
import scan from 'dingtalk-jsapi/api/biz/util/scan'
import webViewBounceDisable from 'dingtalk-jsapi/api/ui/webViewBounce/disable'
import getGeolocation from 'dingtalk-jsapi/api/device/geolocation/get'
import ut from 'dingtalk-jsapi/api/biz/util/ut'
import downloadFile from 'dingtalk-jsapi/api/biz/util/downloadFile'
import getNetworkType from 'dingtalk-jsapi/api/device/connection/getNetworkType'

export const jsAPICommon = [
  'runtime.permission.requestAuthCode',
  'biz.navigation.setTitle',
  'biz.navigation.setLeft',
  'biz.util.previewImage',
  'biz.util.ut',
  'biz.util.openLink',
  'biz.contact.choose',
  'biz.customContact.choose',
  'biz.cspace.preview',
  'biz.util.uploadAttachment',
  'biz.util.uploadImageFromCamera',
  'biz.util.uploadImage'
]

export const jsAPIWeb = ['biz.navigation.quit']

export const jsAPIApplet = [
  'biz.navigation.close',
  'biz.navigation.setRight',
  'biz.navigation.setIcon',
  'biz.util.share',
  'biz.util.scan',
  'ui.webViewBounce.disable',
  'device.geolocation.get',
  'biz.util.downloadFile',
  'device.connection.getNetworkType'
]

export function getJsAPI() {
  if (window.isPC) {
    return jsAPICommon.slice(0).concat(jsAPIWeb)
  } else {
    return jsAPICommon.slice(0).concat(jsAPIApplet)
  }
}

export {
  requestAuthCode,
  setTitle,
  setLeft,
  previewImage,
  openLink,
  contactChoose,
  customContact,
  close,
  setRight,
  setIcon,
  share,
  scan,
  webViewBounceDisable,
  getGeolocation,
  ut,
  downloadFile,
  getNetworkType,
  quit,
  uploadAttachment,
  uploadImageFromCamera,
  uploadImage,
  preview
}

export const API_NAMES = {
  requestAuthCode,
  setTitle,
  setLeft,
  previewImage,
  openLink,
  contactChoose,
  customContact,
  close,
  setRight,
  setIcon,
  share,
  scan,
  webViewBounceDisable,
  getGeolocation,
  ut,
  downloadFile,
  getNetworkType,
  quit,
  uploadAttachment,
  uploadImageFromCamera,
  uploadImage,
  preview
}

export default dd
