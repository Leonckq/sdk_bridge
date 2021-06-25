/***************************************************
 * Created by nanyuantingfeng on 2019/10/17 17:43. *
 ***************************************************/

/**
 * 打开一个webView
 * @param {Object} param0 webView的链接和标题
 */
export function webview({ url, title, isNav }): void

/**
 * app页面调起桥接
 * @param {*} param0 调起app一些特定功能或页面的桥接，将调起事件以字符串、传参以json对象格式传给app，app做相应处理
 */
export function publicLink({ event, data, callback }): void

/**
 * 关闭webView
 */
export function closeWebView(): void

/**
 * callback接收 json字符串参数，为这个扫描的结果{data,isSuccess,responesMsg}
 * @param {Object} param0 回调函数和扫描的标题，是否连续扫描，是否为扫描仪开启
 */
export function scan({ callback, title, isContinue, isScanner }): void

/**
 * 调起资产标签识别
 */
export function assetIdentify({ callback }): void

/**
 * 连续扫描附属接口
 * @param {*Object} param0 扫描是否成功，是否关闭，以及回调
 */
export function scanFeedback({ isSuccess, isClose, callback }): void

/**
 * 打开分享
 * @param {Obejct} param0 分享的参数，包括标题、内容、图片链接、分享链接
 */
export function share({ topic, content, picUrl, url, callback, shareType = 'link' }): void

/**
 * 置当前头部导航条的title文案
 * @param {Obejct} title 头部的标题文本
 */
export function setTitle({ title, callback }): void

/**
 * callback接收一个json字符串，这个json的属性有：source，token，deviceToken，client，cuid，version
 * @param {Object} param0 回调函数和web的当前版本号
 */
export function setAppInfo({ callback, version, account, token }): void

export function pay({ callback, orderCode, paymentTransaction, total }): void
/**
 * 获取当前定位信息经纬度,callback接收一个json字符串,这个json的属性有
 * gpsType,gpsHeight,gpsLatitude,gpsLongitude,gpsAddress
 * @param {Function} callback 回调函数
 */
export function getLocation(callback): void

/**
 * 显示有导航的地图界面
 * @param {*} param0
 */
export function mapNavigation({ gpsLongitude, gpsLatitude, placeName, address, callback }): void

/**
 * 检查当前app是否有打开相机的权限，若无则弹出提醒（有前往设置按钮）
 * callback接收参数'true'、'false'的字符串
 * @param {Function} callback 回调函数
 */
export function checkCameraAuthority(callback): void

/**
 * 打开通讯录，选择通讯人后，返回通讯人信息对象
 * callback接收一个json字符串,这个json的属性有：name，phone
 * @param {Function} callback 回调函数
 */
export function getPhoneBook(callback): void

/**
 * 拨打某个电话号码
 * @param {String} number 电话号码
 */
export function call({ number, callback }): void

/**
 * 将内容复制到粘贴板
 * @param {String} text 电话号码
 */
export function copyToClipboard({ text, callback }): void

/**
 * 通过文档链接，打开word、pdf、excel类型的文档
 * @param {Object} url 文档链接
 */
export function openDocument({ url, fileName, fileExt, callback }): void

// 注销
export function logout(callback): void

// 下载文件链接
export function downloadAttachment({ url, fileName, fileExt, callback }): void
/**
 * 打开wechat
 */
export function openWechat(callback): void
/**
 * android物理返回键触发
 */
export function setBack({ backFunName, callback }): void
/**
 * 登陆的token传递给app
 */
export function setToken({ token, callback }): void

/**
 * 语音提醒
 */
export function voiceReminder({ content, callback }): void

/**
 * 调起语音识别
 * @param {*} callback
 */
export function speechRecognition({ callback }): void

/**
 * toast弹框提醒
 */
export function appToast({ content, milliSec, callback }): void

/**
 * 开始LBS轨道记录
 */
export function startLBSTrack({ entityId, callback }): void

/**
 * 结束LBS轨道记录
 */
export function closeLBSTrack({ entityId, callback }): void

/**
 * 调起身份证识别
 */
export function IDCardIdentify({ callback, identifySide }): void

/**
 * 调起银行卡识别
 */
export function bankCardIdentify({ callback }): void

/**
 * 调起获取工单截图
 */
export function getScreenshot({ callback }): void

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
}): void

/**
 * 获取发票卡券包
 */
export function getInvoice({ config, callback })

/**
 * 生成一个简单（假）的uuid
 * @returns {string}
 */
export function generateUUID(): string

/**
 * 拿到一个callbackName
 */
export function getCallbackName(): string

export function setProtocol(protocol: string): void
