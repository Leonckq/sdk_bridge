import Base64 from './Base64'
import 'simple-local-db'

function getProtocol() {
  return simpleLocalDb.getItem('protocol') || 'angel'
}
export function setProtocol(value) {
  simpleLocalDb.setItem('protocol', value)
}

function getBridgePrefix() {
  return getProtocol() + '://moonMall'
}

function getCallbackPrefix() {
  return getProtocol() + '_callback_'
}

/**
 * 打开一个webView
 * @param {Object} param0 webView的链接和标题
 */
export function webview({ url, title, isNav }) {
  bridgeExecute(getBridgePrefix(), {
    method: 'webview',
    url,
    title,
    isNav: isNav ? 'true' : 'false'
  })
}

/**
 * app页面调起桥接
 * @param {*} param0 调起app一些特定功能或页面的桥接，将调起事件以字符串、传参以json对象格式传给app，app做相应处理
 */
export function publicLink({ event, data, callback }) {
  const callbackName = getCallbackName()
  global[callbackName] = callback
  bridgeExecute(getBridgePrefix(), {
    method: 'publicLink',
    callback: callbackName,
    data: JSON.stringify(data || {}),
    event
  })
}

/**
 * 关闭webView
 */
export function closeWebView() {
  bridgeExecute(getBridgePrefix(), {
    method: 'closeWebView'
  })
}

/**
 * callback接收 json字符串参数，为这个扫描的结果{data,isSuccess,responesMsg}
 * @param {Object} param0 回调函数和扫描的标题，是否连续扫描，是否为扫描仪开启
 *    btnText: 选填；默认未空字符串。显示为扫描框下面的按钮文本，如穿空字符串则不显示按钮；
 */
export function scan({ callback, title, isContinue, isScanner, btnText }) {
  const callbackName = getCallbackName()
  console.log('scan === ', callbackName)
  global[callbackName] = (data = '') => {
    if (data.indexOf('isSuccess') === -1 && data.indexOf('responesMsg') === -1) {
      const temp = {
        data,
        isSuccess: data.toLowerCase() !== 'canceled',
        responesMsg: ''
      }
      callback(JSON.stringify(temp))
    } else {
      callback(data)
    }
  }
  bridgeExecute(getBridgePrefix(), {
    method: 'scan',
    callback: callbackName,
    title,
    isContinue: isContinue ? 'true' : 'false',
    isScanner: isScanner ? 'true' : 'false',
    btnText: btnText || ''
  })
}

/**
 * 调起资产标签识别
 */
export function assetIdentify({ callback }) {
  const callbackName = getCallbackName()
  global[callbackName] = callback
  bridgeExecute(getBridgePrefix(), {
    method: 'assetIdentify',
    callback: callbackName
  })
}

/**
 * 连续扫描附属接口
 * @param {*Object} param0 扫描是否成功，是否关闭，以及回调
 */
export function scanFeedback({ isSuccess, isClose, callback }) {
  const callbackName = getCallbackName()
  global[callbackName] = callback
  bridgeExecute(getBridgePrefix(), {
    method: 'scanFeedback',
    callback: callbackName,
    isSuccess: isSuccess ? 'true' : 'false',
    isClose: isClose ? 'true' : 'false'
  })
}

/**
 * 打开分享
 * @param {Obejct} param0 分享的参数，包括标题、内容、图片链接、分享链接
 */
export function share({ topic, content, picUrl, url, callback, shareType = 'link' }) {
  const callbackName = getCallbackName()
  global[callbackName] = callback
  bridgeExecute(getBridgePrefix(), {
    method: 'share',
    topic,
    content,
    picUrl,
    url,
    callback: callbackName,
    shareType
  })
}

/**
 * 置当前头部导航条的title文案
 * @param {String} title 头部的标题文本
 */
export function setTitle({ title, callback }) {
  const callbackName = getCallbackName()
  global[callbackName] = callback
  bridgeExecute(getBridgePrefix(), {
    method: 'setTitle',
    title,
    callback: callbackName
  })
}

/**
 * callback接收一个json字符串，这个json的属性有：source，token，deviceToken，client，cuid，version
 * @param {Object} param0 回调函数和web的当前版本号
 */
export function setAppInfo({ callback, version, account, token }) {
  const callbackName = getCallbackName()
  global[callbackName] = callback
  bridgeExecute(getBridgePrefix(), {
    method: 'setAppInfo',
    callback: callbackName,
    version,
    token,
    account
  })
}

export function pay({ callback, orderCode, paymentTransaction, total }) {
  const callbackName = getCallbackName()
  global[callbackName] = callback
  bridgeExecute(getBridgePrefix(), {
    method: 'pay',
    callback: callbackName,
    orderCode,
    paymentTransaction,
    total
  })
}
/**
 * 获取当前定位信息经纬度,callback接收一个json字符串,这个json的属性有
 * gpsType,gpsHeight,gpsLatitude,gpsLongitude,gpsAddress
 * @param {Function} callback 回调函数
 */
export function getLocation(callback) {
  const callbackName = getCallbackName()
  global[callbackName] = callback
  bridgeExecute(getBridgePrefix(), {
    method: 'getLocation',
    callback: callbackName
  })
}

/**
 * 显示有导航的地图界面
 * @param {*} param0
 */
export function mapNavigation({ gpsLongitude, gpsLatitude, placeName, address, callback }) {
  const callbackName = getCallbackName()
  global[callbackName] = callback
  bridgeExecute(getBridgePrefix(), {
    method: 'mapNavigation',
    callback: callbackName,
    gpsLongitude,
    gpsLatitude,
    placeName,
    address
  })
}

/**
 * 检查当前app是否有打开相机的权限，若无则弹出提醒（有前往设置按钮）
 * callback接收参数'true'、'false'的字符串
 * @param {Function} callback 回调函数
 */
export function checkCameraAuthority(callback) {
  const callbackName = getCallbackName()
  global[callbackName] = callback

  bridgeExecute(getBridgePrefix(), {
    method: 'checkCameraAuthority',
    callback: callbackName
  })
}

/**
 * 打开通讯录，选择通讯人后，返回通讯人信息对象
 * callback接收一个json字符串,这个json的属性有：name，phone
 * @param {Function} callback 回调函数
 */
export function getPhoneBook(callback) {
  const callbackName = getCallbackName()
  global[callbackName] = callback

  bridgeExecute(getBridgePrefix(), {
    method: 'getPhoneBook',
    callback: callbackName
  })
}

/**
 * 拨打某个电话号码
 * @param {String} number 电话号码
 */
export function call({ number, callback }) {
  const callbackName = getCallbackName()
  global[callbackName] = callback
  bridgeExecute(getBridgePrefix(), {
    method: 'call',
    number,
    callback: callbackName
  })
}

/**
 * 将内容复制到粘贴板
 * @param {String} text 电话号码
 */
export function copyToClipboard({ text, callback }) {
  const callbackName = getCallbackName()
  global[callbackName] = callback
  bridgeExecute(getBridgePrefix(), {
    method: 'copyToClipboard',
    text,
    callback: callbackName
  })
}

/**
 * 通过文档链接，打开word、pdf、excel类型的文档
 * @param {String} url 文档链接
 */
export function openDocument({ url, fileName, fileExt, callback }) {
  const callbackName = getCallbackName()
  global[callbackName] = callback
  bridgeExecute(getBridgePrefix(), {
    method: 'openDocument',
    url,
    fileName: fileName || '',
    fileExt: fileExt || '',
    callback: callbackName
  })
}

// 注销
export function logout(callback) {
  const callbackName = getCallbackName()
  global[callbackName] = callback
  bridgeExecute(getBridgePrefix(), {
    method: 'logout',
    callback: callbackName
  })
}

// 下载文件链接
export function downloadAttachment({ url, fileName, fileExt, callback }) {
  const callbackName = getCallbackName()
  global[callbackName] = callback
  bridgeExecute(getBridgePrefix(), {
    method: 'downloadAttachment',
    url,
    fileName: fileName || '',
    fileExt: fileExt || '',
    callback: callbackName
  })
}
/**
 * 打开wechat
 */
export function openWechat(callback) {
  const callbackName = getCallbackName()
  global[callbackName] = callback
  bridgeExecute(getBridgePrefix(), {
    method: 'openWeChat',
    callback: callbackName
  })
}
/**
 * android物理返回键触发
 */
export function setBack({ backFunName, callback }) {
  const callbackName = getCallbackName()
  global[callbackName] = callback
  bridgeExecute(getBridgePrefix(), {
    method: 'setBack',
    backFunName,
    callback: callbackName
  })
}
/**
 * 登陆的token传递给app
 */
export function setToken({ token, callback }) {
  const callbackName = getCallbackName()
  global[callbackName] = callback
  bridgeExecute(getBridgePrefix(), {
    method: 'setToken',
    token,
    callback: callbackName
  })
}

/**
 * 语音提醒
 */
export function voiceReminder({ content, callback }) {
  const callbackName = getCallbackName()
  global[callbackName] = callback
  bridgeExecute(getBridgePrefix(), {
    method: 'voiceReminder',
    content,
    callback: callbackName
  })
}

/**
 * 调起语音识别
 * @param {*} callback
 */
export function speechRecognition({ callback }) {
  const callbackName = getCallbackName()
  global[callbackName] = callback
  bridgeExecute(getBridgePrefix(), {
    method: 'speechRecognition',
    callback: callbackName
  })
}

/**
 * toast弹框提醒
 */
export function appToast({ content, milliSec, callback }) {
  const callbackName = getCallbackName()
  global[callbackName] = callback
  bridgeExecute(getBridgePrefix(), {
    method: 'toast',
    content,
    milliSec,
    callback: callbackName
  })
}

/**
 * 开始LBS轨道记录
 */
export function startLBSTrack({ entityId, callback }) {
  const callbackName = getCallbackName()
  global[callbackName] = callback
  bridgeExecute(getBridgePrefix(), {
    method: 'startLBSTrack',
    entityId,
    callback: callbackName
  })
}

/**
 * 结束LBS轨道记录
 */
export function closeLBSTrack({ entityId, callback }) {
  const callbackName = getCallbackName()
  global[callbackName] = callback
  bridgeExecute(getBridgePrefix(), {
    method: 'closeLBSTrack',
    entityId,
    callback: callbackName
  })
}

/**
 * 调起身份证识别
 */
export function IDCardIdentify({ callback, identifySide }) {
  const callbackName = getCallbackName()
  global[callbackName] = callback
  bridgeExecute(getBridgePrefix(), {
    method: 'IDCardIdentify',
    callback: callbackName,
    identifySide: identifySide || 0
  })
}

/**
 * 调起银行卡识别
 */
export function bankCardIdentify({ callback }) {
  const callbackName = getCallbackName()
  global[callbackName] = callback
  bridgeExecute(getBridgePrefix(), {
    method: 'bankCardIdentify',
    callback: callbackName
  })
}

/**
 * 获取发票卡券包
 */
export function getInvoice({ config, callback }) {
  const callbackName = getCallbackName()
  global[callbackName] = callback
  bridgeExecute(getBridgePrefix(), {
    method: 'getInvoice',
    config: JSON.stringify(config || {}),
    callback: callbackName
  })
}

/**
 * 调起获取工单截图
 */
export function getScreenshot({ callback }) {
  const callbackName = getCallbackName()
  global[callbackName] = callback
  bridgeExecute(getBridgePrefix(), {
    method: 'getScreenshot',
    callback: callbackName
  })
}

/**
 * 打开或分享微信小程序
 * type: open || share
 * 打开小程序相关配置
 * miniprogramType: 正式版:0，测试版:1，体验版:2
 * userName: 小程序原始id
 * path: 小程序页面路径
 * 分享小程序相关配置
 * webpageUrl: 兼容低版本的网页链接
 * title: 小程序消息title
 * description: 小程序消息desc
 * thumbUrl: 小程序消息封面图片对应的路径
 */
export function miniProgram({
  callback,
  type = 'open',
  miniprogramType,
  userName,
  path,
  webpageUrl = '',
  title,
  description,
  thumbUrl
}) {
  const callbackName = getCallbackName()
  global[callbackName] = callback
  const options =
    type === 'open'
      ? {
          miniprogramType,
          userName,
          path
        }
      : {
          miniprogramType,
          userName,
          path,
          webpageUrl,
          title,
          description,
          thumbUrl
        }
  bridgeExecute(
    getBridgePrefix(),
    Object.assign(
      {
        type,
        method: 'miniProgram',
        callback: callbackName
      },
      options
    )
  )
}

/**
 * 拿到一个callbackName
 */
export const nativeStorage = ({ type, data, callback }) => {
  const callbackName = getCallbackName()
  global[callbackName] = callback
  bridgeExecute(getBridgePrefix(), {
    method: 'nativeStorage',
    type,
    data: JSON.stringify(data || {}),
    callback: callbackName
  })
}

/**
 * 构建桥接的url
 * @param {*基础url} url
 * @param {*需要拼接的参数} query
 */
const bridgeExecute = (url, query = {}) => {
  let href =
    url +
    '?' +
    Object.keys(query)
      .map(key => {
        if (query[key] === undefined || query[key] === null) {
          return ''
        } else {
          return key + ':' + Base64.encode(query[key] + '')
        }
      })
      .join('&')

  // window.location.href = href
  let iframe = document.createElement('iframe')
  iframe.style.display = 'none'
  iframe.src = href
  document.body.appendChild(iframe)
  document.body.removeChild(iframe)
}

/**
 * 生成一个简单（假）的uuid
 * @returns {string}
 */
export const generateUUID = () => {
  return 'xxxxxxxx_xxxx_4xxx_yxxx_xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    let r = (Math.random() * 16) | 0
    let v = c === 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

/**
 * 拿到一个callbackName
 */
export const getCallbackName = () => {
  return getCallbackPrefix() + generateUUID()
}
