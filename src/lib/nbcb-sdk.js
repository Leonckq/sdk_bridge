"use strict";
/**
 *
 * @FileName: client.js
 * @demo: index.html
 * @Desc: 客户端交互方法定义（ios与android相同）
 * @author: LW
 * @date: 2020.10.14
 *
 * 名称 方法名 交互编号|类型 客户端方法名
 *
 * 1. 信息提示框 NBCB_alertInfo 
 * 2. 获取定位 NBCB_getLocation
 * 3.二维码扫一扫 NBCB_openQRScan 
 * 4.跳转第三方页面 NBCB_openWebUrl 
 * 5.分享 NBCB_openSharePage
 * 6.ocr识别 NBCB_openQRScan
 * 7.图片预览 NBCB_openImgPreview
 * 8.关闭webView NBCB_closeWebView
 * 9.设置header  NBCB_setPageTitle
 * 10.拍照  NBCB_getPhotos
 * 
 * 带下划线内内部方法，不支持外围直接调用，如： _callHandler
 *
 */
var _callHandler = function JsBridgeAPI(type, params) {
    window.WebViewJavascriptBridge.callHandler(type, params);
};

!(function () {
    /**
     * @private
     * @description 初始化webview jsbridge
     */
    var _connectWebViewJavascriptBridge = function _connectWebViewJavascriptBridge(callback) {
        if (window.WebViewJavascriptBridge) {
            callback(window.WebViewJavascriptBridge);
        } else {
            document.addEventListener('WebViewJavascriptBridgeReady', function () {
                callback(window.WebViewJavascriptBridge);
            }, false);
        }
    };
    /**
     * @private
     * @description 调用原生插件
     */

    var _nativeCall = function _nativeCall(bridge) {
        bridge.init(function (message, responseCallback) {
            responseCallback && responseCallback();
        });
    };
    /**
     * @private
     * @description 开启jsbridge监听
     */

    _connectWebViewJavascriptBridge(_nativeCall);
}());
export var Client = {
    /**
     * @description 获取定位<br>
     *              接口名称：NBCB_getLocation <br>
     * @param {function}
     *            callback 回调函数名称
     */
    NBCB_getLocation: function NBCB_getLocation(callback) {
        try {
            callback = (0, getFunctionName)(callback);
            var cfg = {
                'callback': callback
            };

            _callHandler('NBCB_getLocation', JSON.stringify(cfg));
        } catch (e) {
            Client.NBCB_alertInfo('获取定位异常', 'NBCB_getLocation:' + e);
        }
    },
    // 弹窗
    NBCB_alertInfo: function NBCB_alertInfo(msg, title, okAct, okName, isH5, local) {
        try {
            okAct = (0, getFunctionName)(okAct);
            if (okAct && okAct.substr(okAct.length - 1) != ')') {
                okAct = okAct + '()';
            }
            title = title || '温馨提示';
            okName = okName || '确定';
            isH5 = isH5 || 'N';
            var cfg = {
                title: title,
                msg: msg,
                ok_text: okName,
                ok_func: okAct || '',
                type: 'ALERT',
                h5_flag: isH5,
                location: local || ''
            };

            _callHandler('NBCB_alertInfo', JSON.stringify(cfg));
        } catch (e) {
            document.getElementById("error").innerHTML = e;
        }
    },
    /**
   * @description 二维码扫一扫<br>
   *              接口名称： NBCB_openQRScan <br>
   * @param {function}
   *            callback 回调函数名称
   */
    NBCB_openQRScan: function NBCB_openQRScan(callback) {
        try {
            // 获取回调函数方法名
            callback = (0, getFunctionName)(callback);
            var cfg = {
                callback: callback
            };

            _callHandler('NBCB_openQRScan', JSON.stringify(cfg));
        } catch (e) {
            Client.NBCB_alertInfo('二维码扫一扫异常', 'NBCB_openQRScan:' + e);
        }
    },
    /**
         * 跳转三方页面
         * 
         * @param data
         */
    NBCB_openWebUrl: function (data) {
        try {
            var cfg = {
                data: data,
            };
            _callHandler("NBCB_openWebUrl", JSON.stringify(cfg));
        } catch (e) {
            Client.NBCB_alertInfo('NBCB_openWebUrl=' + e);
        }
    },

    /**
       * @description 调起其他APP<br>
       *              接口名称： NBCB_openAddressBook <br>
       * @param {function}
       *            callback 回调函数名称
       */
    NBCB_openByOtherApp: function NBCB_openByOtherApp(fileUrl) {
		try {
			_callHandler('NBCB_openByOtherApp', JSON.stringify(fileUrl));
		} catch (e) {
			Client.NBCB_openByOtherApp('打开其他软件', 'NBCB_openByOtherApp:' + e);
		}
	},

    /**
   * @description 分享<br>
   *              接口名称： NBCB_openSharePage <br>
   * @param {function}
   *            callback 回调函数名称
   */
    NBCB_openSharePage: function NBCB_openSharePage(data, callback) {
        try {
            // 获取回调函数方法名
            callback = (0, getFunctionName)(callback);
            var cfg = {
                data: data,
                callback: callback
            };

            _callHandler('NBCB_openSharePage', JSON.stringify(cfg));
        } catch (e) {
            Client.NBCB_alertInfo('分享', 'NBCB_openSharePage:' + e);
        }
    },
    /**
   * @description ocr识别<br>
   *              接口名称： NBCB_getIdInformationByOcr <br>
   * @param {function}
   *            callback 回调函数名称
   */
    NBCB_getIdInformationByOcr: function NBCB_getIdInformationByOcr(data, callback) {
        try {
            // 获取回调函数方法名
            callback = (0, getFunctionName)(callback);
            var cfg = {
                data: data,
                callback: callback
            };

            _callHandler('NBCB_getIdInformationByOcr', JSON.stringify(cfg));
        } catch (e) {
            Client.NBCB_alertInfo('ocr', 'NBCB_getIdInformationByOcr:' + e);
        }
    },
    /**
   * @description 打开图片预览<br>
   *              接口名称： NBCB_openImgPreview <br>
   * @param {function}
   *            callback 回调函数名称
   */
    NBCB_openImgPreview: function NBCB_openImgPreview(data, callback) {
        try {
            // 获取回调函数方法名
            callback = (0, getFunctionName)(callback);
            var cfg = {
                data: data,
                callback: callback
            };

            _callHandler('NBCB_openImgPreview', JSON.stringify(cfg));
        } catch (e) {
            Client.NBCB_alertInfo('打开图片预览', 'NBCB_openImgPreview:' + e);
        }
    },


    /**
   * @description 关闭webView <br>
   *              接口名称： NBCB_closeWebView <br>
   * @param {function}
   *            callback 回调函数名称
   */
    NBCB_closeWebView: function NBCB_closeWebView(callback) {
        try {
            // 获取回调函数方法名
            callback = (0, getFunctionName)(callback);
            var cfg = {
                callback: callback
            };

            _callHandler('NBCB_closeWebView', JSON.stringify(cfg));
        } catch (e) {
            Client.NBCB_alertInfo('关闭webView', 'NBCB_closeWebView:' + e);
        }
    },


    /**
   * @description 设置标题<br>
   *              接口名称： NBCB_setPageTitle <br>
   * @param {function}
   *            pageId 标题id
   */
    NBCB_setPageTitle: function NBCB_setPageTitle(json) {
        try {
            _callHandler('NBCB_setPageTitle', JSON.stringify(json));
        } catch (e) {
            Client.NBCB_alertInfo('设置标题', 'NBCB_setPageTitle:' + e);
        }
    },
    /**
       * @description 拍照<br>
       *              接口名称： NBCB_getPhotos <br>
       * @param {function}
       *            callback 回调函数名称
       */
    NBCB_getPhotos: function NBCB_getPhotos(callback) {
        try {
            // 获取回调函数方法名
            callback = (0, getFunctionName)(callback);
            var cfg = {
                callback: callback
            };

            _callHandler('NBCB_getPhotos', JSON.stringify(cfg));
        } catch (e) {
            Client.NBCB_getPhotos('拍照', 'NBCB_getPhotos:' + e);
        }
    },



};
export var utils = {
    /**
     * @description: 函数名的初始id
     */
    idSeed: 10000,
    /**
     * @description: 获取临时函数名
     */
    id: function id() {
        return 'nbcb_gen_' + ++utils.idSeed;
    },

    /**
     * @description: 判断参数是否为数组
     * @param {*} v 
     */
    isArray: function isArray(v) {
        return utils.toString(v) === '[object Array]';
    },

    /**
     * @description: 是否为boolean
     * @param {*} v 
     */
    isBoolean: function isBoolean(v) {
        return typeof v === 'boolean';
    },

    /**
     * @description: 判断是否已定义
     * @param {*} v 
     */
    isDefined: function isDefined(v) {
        return typeof v !== 'undefined';
    },

    /**
     * @description: 判断参数是否无值
     * @param {*} v 
     * @param {boolean} allowBlank 
     */
    isEmpty: function isEmpty(v, allowBlank) {
        return v === null || v === undefined || String(v).toUpperCase() === 'NULL' || utils.isArray(v) && !v.length || (!allowBlank ? v === '' : false);
    },

    /**
    * @description 是否是函数
    * @param {*}
    *            v 值
    * @returns {*|boolean} 是否为函数
    * @example var func = function(){}; var isFunction = YT.isFunction(func);
    */
    isFunction: function isFunction(v) {
        return utils.toString(v) === '[object Function]';
    },

    /**
     * @是否为number
     * @param {*} v 
     */
    isNumber: function isNumber(v) {
        return typeof v === 'number' && isFinite(v);
    },

    /**
     * @description: 是否可迭代
     * @param {*} v 
     */
    isIterable: function isIterable(v) {
        return v && typeof v !== 'string' ? utils.isDefined(v.length) : false;
    },

    /**
     * @description 判断是否为object
     * @param {*} v 
     */
    isObject: function isObject(v) {
        return !!v && utils.toString(v) === '[object Object]';
    },

    /**
     * @description: 是否是原始类型
     * @param {*} v 
     */
    isPrimitive: function isPrimitive(v) {
        return utils.isString(v) || utils.isNumber(v) || utils.isBoolean(v);
    },

    /**
     *@description: 是否为String
     * @param {*} v 
     */
    isString: function isString(v) {
        return typeof v === 'string';
    },

    /**
     * @description: 遍历
     * @param {*} value 
     * @param {Function} fn 
     * @param {scope} scope 
     */
    each: function each(value, fn, scope) {
        if (utils.isEmpty(value)) {
            return;
        }

        if (!utils.isDefined(scope)) {
            scope = value;
        }

        if (utils.isObject(value)) {
            var i = 0;

            for (var prop in value) {
                if (value.hasOwnProperty(prop)) {
                    if (fn.call(scope || value, value[prop], i++, value) === false) {
                        return;
                    }
                }
            }
        } else {
            if (!utils.isIterable(value) || utils.isPrimitive(value)) {
                value = [value];
            }

            for (var i = 0, len = value.length; i < len; i++) {
                if (fn.call(scope || value[i], value[i], i, value) === false) {
                    return i;
                }
            }
        }
    },

    /**
     * @description: String转换为JSON
     * @param {String} str 
     */
    JsonEval: function JsonEval(str) {
        try {
            return JSON.parse(str);
        } catch (e) {
            console.log(e);
            return eval("(" + str + ")");
        }
    },

    /**
     * 转换为字符
     * @param v {object}
     * @returns {string}
     */
    toString: function toString(v) {
        return Object.prototype.toString.apply(v);
    },

    /**
     * @description 金额去格式化
     * @param {*|string}
     *            b 格式化后的数字
     * @returns {string} 格式后的字符
     * @example 1.JS中直接调用:<br>
     */
    unfmtAmt: function unfmtAmt(s) {
        if (utils.isEmpty(s)) {
            return "";
        }

        return s.replace(/,/g, "");
    }
};
/**
 * @description: 获取方法名称
 * @param {Function} func 
 * @param {Boolean} decodeURL 
 */

export function getFunctionName(func, decodeURL) {
    if (func == null || func == "") {
        return "";
    }

    if (Object.prototype.toString.apply(func) !== '[object Function]') {
        return func;
    }

    var funcName = utils.id(); // 创建可被调用的临时方法

    window[funcName] = function () {
        var args = [];
        utils.each(arguments, function (arg) {
            if (true == decodeURL) {
                arg = decodeURIComponent(arg);
            }

            if ('string' == typeof arg && '{' == arg.charAt(0) && '}' == arg.charAt(arg.length - 1)) {
                arg = utils.JsonEval(arg.replace(/<\/?[^>]*>/g, '').replace(/[\r\n]/g, '<br>'));
            }

            args.push(arg);
        }, this);
        func.apply(this, args);
        delete window[funcName]; // 删除临时方法
    };

    return funcName;
}
//JsBridgeAPI
(function () {
    if (window.WebViewJavascriptBridge) {
        return;
    }
    var messagingIframe;
    var sendMessageQueue = [];
    var receiveMessageQueue = [];
    var messageHandlers = {};
    var CUSTOM_PROTOCOL_SCHEME = 'ytscheme';
    var QUEUE_HAS_MESSAGE = '__YTBASE_QUEUE_MESSAGE__/';
    var uniqueId = 1;
    var queueId = 1;
    var iframeId = 1;
    function isAndroid() {
        var ua = navigator.userAgent.toLowerCase();
        var isA = ua.indexOf('android') > -1;
        if (isA) {
            return true;
        }
        return false;
    }

    function isIpad() {
        var ua = navigator.userAgent.toLowerCase();
        var isIpa = ua.indexOf('ipad') > -1;
        if (isIpa) {
            return true;
        }
        return false;
    }

    function isIphone() {
        var ua = navigator.userAgent.toLowerCase();
        var isIph = ua.indexOf('iphone') > -1;
        if (isIph) {
            return true;
        }
        return false;
    }
    // set default messageHandler 初始化默认的消息线程
    function init(messageHandler) {
        if (WebViewJavascriptBridge._messageHandler) {
            return; //throw new Error('WebViewJavascriptBridge.init called twice')
        }
        WebViewJavascriptBridge._messageHandler = messageHandler;
        var receivedMessages = receiveMessageQueue;
        receiveMessageQueue = null;
        for (var i = 0; i < receivedMessages.length; i++) {
            _dispatchMessageFromNative(receivedMessages[i]);
        }
    }

    // 发送
    function send(data) {
        _doSend({
            data: data
        });
    }

    // 注册线程 往数组里面添加值
    function registerHandler(handlerName, handler) {
        messageHandlers[handlerName] = handler;
    }

    // 调用线程
    function callHandler(handlerName, data) {
        if (typeof data === 'string') {
            data = eval('(' + data + ')');
        }
        _doSend({
            handlerName: handlerName,
            data: data
        });
    }

    var iframeQueue = []; // sendMessage add message, 触发native处理 sendMessage
    function _doSend(message) {
        sendMessageQueue.push(message);
        var id = buildIframe();
        iframeQueue.push(id);
        var iframe = document.getElementById(id); /// $('#' + id);
        var list = [];
        list.push(message);
        var listStr = JSON.stringify(list);
        var key = '_' + id + '_' + message.handlerName;
        iframe.src = CUSTOM_PROTOCOL_SCHEME + '://' + QUEUE_HAS_MESSAGE + key;
        iframe.dataMessage = encodeURIComponent(listStr);
        iframe.dataKey = key;
    }

    function buildIframe() {
        var id = 'iframe_' + iframeId++ + '_Id';
        messagingIframe = document.createElement('iframe');
        messagingIframe.style.display = 'none';
        messagingIframe.style.opacity = '0';
        messagingIframe.style.border = '0';
        messagingIframe.style.heigth = '0';
        messagingIframe.id = id;
        document.documentElement.appendChild(messagingIframe);
        return id;
    }
    /**
    * 客户端获取原生插件执行信息后，调用的回调函数，删除相关的配置信息
    */
    function _removeIframe(_id) {
        _id = 'iframe_' + _id + '_Id';
        var iframe = document.getElementById(_id); // $('#' + _id);

        if (iframe) {
            iframe.remove();
        }
    }

    // end by heyi 调用客户端多并发时致使回调未及时调用就被删除，致使无法正常调用原生插件
    // 提供给native调用,该函数作用:获取sendMessageQueue返回给native,由于android不能直接获取返回的内容,所以使用url
    // shouldOverrideUrlLoading 的方式返回内容
    function _fetchQueue() {
        var messageQueueString = JSON.stringify(sendMessageQueue);
        sendMessageQueue = [];
        var id = iframeQueue.shift();
        if (isIphone() || isIpad()) {

            console.log(messageQueueString);
            try {
                return messageQueueString;

            } catch (e) {
                console.log(e);
            }

            // android can't read directly the return data, so we can reload
            // iframe src to communicate with java
        } else if (isAndroid()) {
            console.log('andrord');
            try {
                var iframe = document.getElementById(id); // $('#' + id);
                // var msg = iframe.attr('data-message');
                var msg = iframe.dataMessage; // iframe.attr('data-message', '');
                iframe.dataMessage = ''; // var key = iframe.attr('data-key');
                var key = iframe.dataKey; // iframe.attr('src', CUSTOM_PROTOCOL_SCHEME + '://return/' + key + '/' + msg);
                iframe.src = CUSTOM_PROTOCOL_SCHEME + '://return/' + key + '/' + msg;
                // begin by heyi 调用客户端多并发时致使回调未及时调用就被删除，致使无法正常调用原生插件
                // encodeURIComponent(messageQueueString);
            } catch (e) {
                console.log(e);
            }

        }
    }
    // 提供给native使用,
    function _dispatchMessageFromNative(messageJSON) { }
    // 提供给native调用,receiveMessageQueue 在会在页面加载完后赋值为null,所以
    function _handleMessageFromNative(messageJSON) {
        if (receiveMessageQueue) {
            receiveMessageQueue.push(messageJSON);
        }
        _dispatchMessageFromNative(messageJSON);
    }
    var WebViewJavascriptBridge = window.WebViewJavascriptBridge = {
        init: init,
        send: send,
        registerHandler: registerHandler,
        callHandler: callHandler,
        _fetchQueue: _fetchQueue,
        _removeIframe: _removeIframe,
        _handleMessageFromNative: _handleMessageFromNative
    };
    var doc = document;
    var readyEvent = doc.createEvent('Events');
    readyEvent.initEvent('WebViewJavascriptBridgeReady');
    readyEvent.bridge = WebViewJavascriptBridge;
    doc.dispatchEvent(readyEvent);
})();
