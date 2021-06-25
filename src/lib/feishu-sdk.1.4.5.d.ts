/***************************************************
 * Created by liuhong on 2019/12/02 16:34. *
 ***************************************************/

// https://open.feishu.cn/document/uYjL24iN/uITO4IjLykDOy4iM5gjM
// version : 1.4.5

declare namespace h5sdk {
  function ready(fn: () => Promise<void>): void

  const biz: {
    navigation: {
      setTitle: Function
      setLeft: Function
      setRight: Function
      setMenu: Function
      goBack: Function
      close: Function
    }
    util: {
      previewImage: Function
      openLink: Function
      copyText: Function
      share: Function
      scan: Function
      showPaymentDialog: Function
    }
  }
}
const device: {
  notification: {
    showPreloader: Function
    hidePreloader: Function
    confirm: Function
    alert: Function
    toast: Function
    prompt: Function
    vibrate: Function
  }
  base: {
    onUserCaptureScreen: Function
    offUserCaptureScreen: Function
  }
  screen: {
    lockViewOrientation: Function
    unlockViewOrientation: Function
  }
}
