/*! FS JSAPI v2.3.1 | (c) fxiaoke.com */
;(function() {
  'use strict'
  var a =
      ('object' == typeof self && self.self === self && self) ||
      ('object' == typeof global && global.global === global && global) ||
      this,
    b = (a.navigator || {}).userAgent || '',
    c = function() {},
    d = function(a) {
      console.error(a)
    },
    e = (a.document || {}).addEventListener,
    f = /FSBrowser\/((\d+.?)+)/.test(b) ? RegExp.$1 : '',
    g = function(a) {
      return parseFloat(f) > a
    },
    h = {},
    i = !1,
    j = c,
    k = c,
    l = function(b) {
      setTimeout(function() {
        if (b && 3e4 === b.errorCode)
          if (k !== c) k(b)
          else {
            var d = a.WebViewJavascriptBridge,
              e = g(5.3)
            d &&
              d.send({
                action: 'notification.toast',
                icon: 'success',
                text: '绾蜂韩鐗堟湰澶棫锛岄儴鍒嗗姛鑳藉彲鑳借繍琛屽紓甯革紝璇锋洿鏂板埌鏈€鏂扮増鏈€�',
                duration: e ? 3e3 : 3,
                delay: e ? 1e3 : 1
              })
          }
        else k(b)
      }, 0)
    },
    m = function(a, b, c) {
      ;(c = c || {}), (b = b || {}), delete b.action
      var d = {
        M1: 'JSAPI_Invoked',
        M2: 'FSOpen.' + a,
        M3: [JSON.stringify(b), location.href].join(','),
        M4: 'errCode:' + (c.errorCode || 0),
        M5: h.appId,
        M6: 'jsapi:v' + n.version + ',app:v' + n.appVersion
      }
      n.send({ action: 'util.traceEvent', event: d })
    },
    n = {
      ios: /iPhone|iPad|iPod/i.test(b),
      android: /Android/i.test(b),
      version: '2.3.1',
      hasBridge: g(0) || void 0 !== a._WebViewJavascriptBridge,
      log: function(a) {
        return 'function' == typeof a && (j = a), this
      },
      config: function(b) {
        return (
          b &&
            (h = {
              url: b.url,
              appId: b.appId,
              timestamp: b.timestamp,
              nonceStr: b.nonceStr,
              signature: b.signature,
              jsApiList: b.jsApiList,
              internalId: b.internalId
            }),
          null == h.url && a.location && (h.url = a.location.href),
          this
        )
      },
      error: function(a) {
        return 'function' == typeof a && (k = a), this
      },
      ready: function(b) {
        if (!n.hasBridge) return l({ errorCode: 3e4, errorMessage: 'Unsupported' }), this
        var c = function(a) {
          if (!a) return void l({ errorCode: 30002, errorMessage: 'WebViewJavascriptBridge initialized fail' })
          if (!i) {
            i = !0
            try {
              a.init(function(a, b) {})
            } catch (c) {
              console.log(c), j('WebViewJavascriptBridge maybe initialized fail')
            }
            if (!g(5.3)) return void l({ errorCode: 3e4, errorMessage: 'WebViewJavascriptBridge needs update' })
            try {
              h.appId
                ? ((h.action = 'config'),
                  a.send(h, function(c) {
                    return (
                      j('Config success for appid ' + h.appId),
                      0 !== c.errorCode ? void k({ errorCode: c.errorCode, errorMessage: c.errorMessage }) : void b(a)
                    )
                  }))
                : b(a)
            } catch (c) {
              console.log(c), j('WebViewJavascriptBridge config or callback fail')
            }
            a.send({ action: 'runtime.getVersion' }, function(a) {
              n.appVersion = a.ver
            })
          }
        }
        return (
          a.WebViewJavascriptBridge
            ? c(WebViewJavascriptBridge)
            : e &&
              e.call(
                a.document,
                'WebViewJavascriptBridgeReady',
                function() {
                  c(a.WebViewJavascriptBridge)
                },
                !1
              ),
          this
        )
      },
      init: function(a) {
        a = a || {}
        var b = a.onSuccess || c,
          d = a.onFail || c
        return n.config(a), n.ready(b).error(d)
      }
    }
  ;['send', 'callHandler', 'registerHandler'].forEach(function(b) {
    n[b] = function() {
      var c = a.WebViewJavascriptBridge,
        d = [].slice.call(arguments),
        e = d.pop()
      return c
        ? (j('Call interface ' + b, d), void c[b].apply(c, arguments))
        : void ('function' == typeof e && e({ errorCode: 30001, errorMessage: 'WebViewJavascriptBridge is undefined' }))
    }
  })
  var o = {
    cache: {},
    on: function(a, b) {
      var c = o.cache
      c[a]
        ? c[a].indexOf(b) < 0 && c[a].push(b)
        : ((c[a] = [b]),
          n.registerHandler(a, function(b) {
            j('Native callback', b),
              c[a] &&
                c[a].length &&
                c[a].forEach(function(a) {
                  try {
                    a(b)
                  } catch (c) {
                    d(c)
                  }
                })
          })),
        j(['Bind listener for ', a, ', current handlers: ', c[a].length].join(''))
    },
    off: function(a, b) {
      var c = o.cache
      return b
        ? ((c[a] || []).forEach(function(d, e, f) {
            d == b && (f.splice(e, 1), f.length <= 0 && (delete c[a], n.registerHandler(a, null)))
          }),
          void j(['Unbind listener for ', a, ', current handlers: ', (c[a] || []).length].join('')))
        : (delete c[a], n.registerHandler(a, null), void j('Unbind listener for ' + a))
    },
    one: function(a, b) {
      o.off(a), o.on(a, b)
    }
  }
  n.event = o
  var p = {},
    q = function(a, b) {
      return p.toString.call(a).toLowerCase() == '[object ' + b.toLowerCase() + ']'
    },
    r = function(a) {
      return q(a, 'function')
    },
    s = function() {
      return Math.floor(1e8 * Math.random())
    },
    t = {
      audioPlayHandler: {
        handler: function(a) {
          n.event.one('audioPlayHandler', function(b) {
            if (r(a.onStop))
              try {
                a.onStop(b)
              } catch (c) {
                d(c)
              }
          })
        }
      },
      audioRecordHandler: {
        handler: function(a) {
          n.event.one('audioRecordHandler', function(b) {
            if (r(a.onStop))
              try {
                a.onStop(b)
              } catch (c) {
                d(c)
              }
          })
        }
      },
      openWindowHandler: {
        cache: {},
        handler: function(a) {
          n.event.one('openWindowHandler', function b(c) {
            if (r(a.onClose))
              try {
                a.onClose(c)
              } catch (e) {
                d(e)
              }
            n.event.off('openWindowHandler', b)
          })
        }
      },
      backKeyPressedHandler: {
        handler: function(a) {
          n.event.one('backKeyPressedHandler', function(b) {
            if (r(a.onBack))
              try {
                a.onBack(b)
              } catch (c) {
                d(c)
              }
          })
        }
      },
      webviewCloseHandler: {
        handler: function(a) {
          n.event.one('webviewCloseHandler', function(b) {
            if (r(a.onClose))
              try {
                a.onClose(b)
              } catch (c) {
                d(c)
              }
          })
        }
      },
      pullRefreshHandler: {
        cache: {},
        handler: function(a) {
          n.event.one('pullRefreshHandler', function(b) {
            if (r(a.onPullRefresh))
              try {
                a.onPullRefresh(b)
              } catch (c) {
                d(c)
              }
          })
        }
      },
      fsMenuClickHandler: {
        cache: null,
        btnreg: /^(service|share)\:(favorite|to|via)/,
        handler: function(a, b) {
          if (!this.cache) {
            this.cache = {}
            var c = this
            n.event.one('fsMenuClickHandler', function(a) {
              if (a && c.btnreg.test(a.btnId)) {
                var b
                b = 'service' == RegExp.$1 ? 'favorite.add' : '' + a.btnId.replace(':', '.')
                var e = c.cache[b]
                if (r(e.onInvoke))
                  try {
                    e.onInvoke()
                  } catch (f) {
                    d(f)
                  }
                z('service.' + b, e)
              }
            })
          }
          return (this.cache[b] = a), !1
        }
      },
      middleBtnClickHandler: {
        handler: function(a) {
          n.event.one('middleBtnClickHandler', function(b) {
            if (r(a.onClick))
              try {
                a.onClick(b)
              } catch (c) {
                d(c)
              }
          })
        }
      },
      leftBtnClickHandler: {
        handler: function(a) {
          n.event.one('leftBtnClickHandler', function(b) {
            if (r(a.onClick))
              try {
                a.onClick(b)
              } catch (c) {
                d(c)
              }
            else n.webview.back()
          })
        }
      },
      rightBtnClickHandler: {
        cache: {},
        handler: function(a) {
          if (r(a.onClick)) {
            var b = 'fs-btn-' + s(),
              c = t.rightBtnClickHandler.cache
            return (
              a.items && a.items.length
                ? ((c[b] = { idList: [], handler: a.onClick }),
                  a.items.forEach(function(a) {
                    c[b].idList.push(a.btnId)
                  }))
                : ((a.btnId = b), (c[b] = a.onClick)),
              n.event.on('rightBtnClickHandler', function(a) {
                if (a && a.btnId) {
                  var d = c[a.btnId]
                  if (r(d)) return delete a.btnId, void d(a)
                  var e = c[b]
                  e && e.idList.indexOf(a.btnId) >= 0 && (d = e.handler)(a)
                }
              }),
              b
            )
          }
        }
      },
      popupClickHandler: {
        cache: {},
        handler: function(a) {
          r(a.onClick) &&
            n.event.one('popupMenuItemClickHandler', function(b) {
              try {
                a.onClick(b)
              } catch (c) {
                d(c)
              }
            })
        }
      },
      uploadFileHandler: {
        cache: {},
        handler: function(a) {
          if (r(a.onUpload)) {
            var b = 'fs-upl-' + Date.now(),
              e = t.uploadFileHandler.cache
            ;(e[b] = { files: {}, loaded: 0, counter: 0, handler: a.onUpload }), (a.uploadId = b)
            var f = a.onSuccess || c
            a.onSuccess = function(a) {
              if (a && !a.errorCode) {
                var c = a.selectedFiles || a.selectedImages || []
                c.forEach(function(a) {
                  var c = e[b]
                  c && ((c.files[a.id] = !1), c.counter++)
                })
              }
              f(a)
            }
            var g = a.onFail || c
            return (
              (a.onFail = function(a) {
                delete e[b], g(a)
              }),
              n.event.on('uploadFileHandler', function h(a) {
                if (a && (a.image || a.file)) {
                  var c = e[b]
                  if (!c) return
                  var f = a.image || a.file,
                    g = f.id
                  if (!c.files.hasOwnProperty(g)) return
                  var i = c.handler
                  if (a.file && void 0 !== a.file.progress) {
                    try {
                      i(a)
                    } catch (j) {
                      d(j)
                    }
                    return
                  }
                  ;(c.files[g] = !0), c.loaded++
                  try {
                    i(a, { count: a.count || c.counter, loaded: a.done || c.loaded })
                  } catch (j) {
                    d(j)
                  }
                  c.loaded >= c.counter && (delete e[b], n.event.off('uploadFileHandler', h))
                }
              }),
              b
            )
          }
        }
      },
      reuploadFileHandler: {
        handler: function(a) {
          var b = a.onFail || c,
            e = a.onSuccess || c,
            f = function(b) {
              if (r(a.onUpload))
                try {
                  a.onUpload(b)
                } catch (c) {
                  d(c)
                }
            }
          ;(a.onFail = function(a) {
            n.event.off('uploadFileHandler', f), b(a)
          }),
            (a.onSuccess = function(a) {
              n.event.off('uploadFileHandler', f), e(a)
            }),
            n.event.on('uploadFileHandler', f)
        }
      },
      downloadFileHandler: {
        handler: function(a) {
          n.event.one('downloadFileHandler', function(b) {
            if (r(a.onProgress))
              try {
                a.onProgress(b)
              } catch (c) {
                d(c)
              }
          })
        }
      },
      mailSendHandler: {
        handler: function(a) {
          n.event.one('mailSendHandler', function(b) {
            if (r(a.onSend))
              try {
                a.onSend(b)
              } catch (c) {
                d(c)
              }
          })
        }
      }
    }
  n._nativeCallbackCache = t
  var u = !0,
    v = ({ support: n.appVersion <= 5.3 }, t.uploadFileHandler),
    w = t.fsMenuClickHandler,
    x = {
      request: u,
      'runtime.getVersion': u,
      'runtime.getCurrentUser': u,
      'runtime.requestAuthCode': u,
      'runtime.showUpdate': u,
      'runtime.getPhoneInfo': u,
      'device.authenticateUser': u,
      'device.getAP': u,
      'device.getNetworkType': u,
      'device.getUUID': u,
      'device.scan': u,
      'device.vibrate': u,
      'device.selectWifi': u,
      'device.scanCard': u,
      'device.print': u,
      'device.call': u,
      'launcher.checkAppInstalled': u,
      'launcher.launchApp': u,
      'webview.snapshot': u,
      'webview.redirect': u,
      'webview.back': u,
      'webview.close': u,
      'webview.open': { before: t.openWindowHandler.handler },
      'webview.onBackWebview': { before: t.backKeyPressedHandler.handler, support: n.android },
      'webview.onCloseWebview': { before: t.webviewCloseHandler.handler },
      'webview.setOrientation': u,
      'webview.navbar.removeMiddleBtn': u,
      'webview.navbar.removeRightBtns': {
        before: function(a) {
          n.event.off('rightBtnClickHandler')
        }
      },
      'webview.navbar.hideMenu': u,
      'webview.navbar.setLeftBtn': { before: t.leftBtnClickHandler.handler },
      'webview.navbar.setRightBtns': {
        before: function(a) {
          n.event.off('rightBtnClickHandler'), t.rightBtnClickHandler.handler(a)
        }
      },
      'webview.navbar.setMiddleBtn': { before: t.middleBtnClickHandler.handler },
      'webview.navbar.createPopup': {
        before: function(a) {
          n.event.off('popupClickHandler'), t.popupClickHandler.handler(a)
        }
      },
      'webview.navbar.removePopup': {
        before: function(a) {
          n.event.off('popupClickHandler')
        }
      },
      'webview.navbar.setTitle': {
        before: function(b) {
          a.document && (a.document.title = b.title || '')
        }
      },
      'webview.navbar.showMenu': u,
      'webview.navbar.showMenuList': u,
      'webview.menu.onShareToConversation': {
        before: function(a, b) {
          return n.send({ action: b }), w.handler(a, 'share.toConversation')
        }
      },
      'webview.menu.onShareToCRMContact': {
        before: function(a, b) {
          return n.send({ action: b }), w.handler(a, 'share.toCRMContact')
        }
      },
      'webview.menu.onShareToFeed': {
        before: function(a, b) {
          return n.send({ action: b }), w.handler(a, 'share.toFeed')
        }
      },
      'webview.menu.onShareViaMail': {
        before: function(a, b) {
          return n.send({ action: b }), w.handler(a, 'share.viaMail')
        }
      },
      'webview.menu.onShareToQQFriend': {
        before: function(a, b) {
          return n.send({ action: b }), w.handler(a, 'share.toQQFriend')
        }
      },
      'webview.menu.onShareViaSMS': {
        before: function(a, b) {
          return n.send({ action: b }), w.handler(a, 'share.viaSMS')
        }
      },
      'webview.menu.onShareToWXFriend': {
        before: function(a, b) {
          return n.send({ action: b }), w.handler(a, 'share.toWXFriend')
        }
      },
      'webview.menu.onShareToWXMoments': {
        before: function(a, b) {
          return n.send({ action: b }), w.handler(a, 'share.toWXMoments')
        }
      },
      'webview.page.copyURL': u,
      'webview.page.generateQR': u,
      'webview.page.openWithBrowser': u,
      'webview.page.refresh': u,
      'webview.bounce.disable': u,
      'webview.bounce.enable': u,
      'webview.pullRefresh.disable': {
        before: function(a) {
          n.event.off('pullRefreshHandler')
        }
      },
      'webview.pullRefresh.enable': { before: t.pullRefreshHandler.handler },
      'webview.pullRefresh.stop': u,
      'widget.showActionSheet': u,
      'widget.showAlert': u,
      'widget.showConfirm': u,
      'widget.hidePreloader': u,
      'widget.showModal': u,
      'widget.showPrompt': u,
      'widget.showPreloader': u,
      'widget.showToast': u,
      'widget.showDateTimePicker': u,
      'widget.showEditor': u,
      'widget.showTextViewer': u,
      'widget.showTabbarMask': u,
      'widget.hideTabbarMask': u,
      'service.contact.setMark': u,
      'service.contact.getServiceChannelsInfo': u,
      'service.contact.getUsersInfo': u,
      'service.contact.getDepartmentsInfo': u,
      'service.contact.select': u,
      'service.contact.selectDepartment': u,
      'service.contact.selectUser': u,
      'service.contact.openDepartment': u,
      'service.contact.openUserProfile': u,
      'service.contact.openServiceProfile': u,
      'service.contact.getMembers': u,
      'service.conversation.open': u,
      'service.conversation.setupFSCall': u,
      'service.conversation.setupFSConference': u,
      'service.partner.select': u,
      'service.favorite.add': u,
      'service.favorite.manage': u,
      'service.geo.getLocation': u,
      'service.geo.selectPOI': u,
      'service.geo.openMap': u,
      'service.mail.shareToConversation': u,
      'service.mail.shareToFeed': u,
      'service.mail.write': { before: t.mailSendHandler.handler },
      'service.mail.view': u,
      'service.pay.request': u,
      'service.pay.requestForCorp': u,
      'service.pay.openWallet': u,
      'service.share.toConversation': u,
      'service.share.toCRMContact': u,
      'service.share.toFeed': u,
      'service.share.viaMail': u,
      'service.share.toQQFriend': u,
      'service.share.viaSMS': u,
      'service.share.toWXFriend': u,
      'service.share.toWXMoments': u,
      'service.share.toWXFriendWithMP': u,
      'service.calendar.open': u,
      'service.calendar.createEvent': u,
      'service.feed.open': u,
      'service.feed.create': u,
      'service.feed.createShare': u,
      'service.feed.createDiary': u,
      'service.feed.createApproval': u,
      'service.feed.createTask': u,
      'service.feed.createSchedule': u,
      'service.feed.createOrder': u,
      'service.disk.open': u,
      'service.disk.addFile': u,
      'service.disk.selectFile': u,
      'service.crm.selectCustomer': u,
      'service.crm.selectContact': u,
      'service.crm.selectOrder': u,
      'service.crm.list': u,
      'service.crm.open': u,
      'service.crm.create': u,
      'service.crm.select': u,
      'service.bi.open': u,
      'service.oauth.wx': u,
      'media.file.preview': u,
      'media.file.upload': { before: v.handler, support: n.android },
      'media.file.download': { support: n.android, before: t.downloadFileHandler.handler },
      'media.file.manage': { support: n.android },
      'media.file.reupload': { before: t.reuploadFileHandler.handler, support: n.android },
      'media.image.preview': u,
      'media.image.upload': { before: v.handler },
      'media.image.submit': u,
      'media.image.save': u,
      'media.image.reupload': { before: t.reuploadFileHandler.handler },
      'media.image.shareToWX': u,
      'media.image2.choose': u,
      'media.image2.preview': u,
      'media.image2.upload': u,
      'media.image2.download': u,
      'media.image2.getLocalData': u,
      'media.audio.startRecord': { before: t.audioRecordHandler.handler },
      'media.audio.stopRecord': u,
      'media.audio.play': { before: t.audioPlayHandler.handler },
      'media.audio.pause': u,
      'media.audio.resume': u,
      'media.audio.stop': u,
      'storage.getItem': u,
      'storage.setItem': u,
      'storage.removeItem': u,
      'storage.clearItems': u,
      'util.traceEvent': u,
      'util.open': u,
      'util.openMP': u,
      'util.sendNotification': u,
      'util.uploadLog': u,
      'util.log': u,
      'util.chooseInvoiceFromWX': u
    },
    y = function(a, b) {
      for (var c = a.split('.'), d = n, e = 0, f = c.length; e < f; ++e)
        e === f - 1 && (d[c[e]] = b), 'undefined' == typeof d[c[e]] && (d[c[e]] = {}), (d = d[c[e]])
    },
    z = function(a, b) {
      b = b || {}
      var d,
        e = !0,
        f = x[a]
      if (g(5.3)) {
        if (!n.hasBridge)
          return (d = { errorCode: 3e4, errorMessage: 'Unsupported' }), b.onFail && b.onFail(d), void m(a, b, d)
        if (f.support === !1)
          return (d = { errorCode: 40004, errorMessage: 'Unsupported' }), b.onFail && b.onFail(d), void m(a, b, d)
        if (f.parser) {
          var h = f.parser(b)
          if (h) return (d = { errorCode: 4e4, errorMessage: h }), b.onFail && b.onFail(d), void m(a, b, d)
        }
        if (f.before && ((e = f.before(b, a)), e === !1)) return m(a, b), e
        var i = b.onFail || c,
          k = b.onSuccess || c,
          l = function(c, d) {
            j('Native response', c), (c = c || {}), m(a, b, c)
            var e = null == c.errorCode ? 0 : c.errorCode
            if (0 !== e) {
              if (5e4 === e) return
              return void i({ errorCode: e, errorMessage: c.errorMessage || '' })
            }
            k(c, b)
          }
        return f === u
          ? ((b.action = a), n.send(b, l), e)
          : 'string' == typeof f
          ? ((b.action = f), n.send(b, l), e)
          : f['native']
          ? (n.callHandler(f.action, b, l), e)
          : ((b.action = b.__alias || f.action || a), n.send(b, l), e)
      }
    },
    A = function(a) {
      return function(b) {
        return z(a, b)
      }
    }
  for (var B in x) y(B, A(B))
  'object' == typeof module && module && 'object' == typeof module.exports
    ? (a.FSOpen = n, module.exports = n)
    : 'function' == typeof define && (define.amd || define.cmd)
    ? define('FSOpen', [], function(b, c, d) {
        return (a.FSOpen = n), n
      })
    : (a.FSOpen = n)
}.call(this))
