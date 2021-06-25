/***************************************************
 * Created by nanyuantingfeng on 2019/10/16 16:46. *
 ***************************************************/
////   https://open.fxiaoke.com/wiki.html#artiId=15

declare namespace FSOpen {
  interface FSOpenCallBack<T = any> {
    onSuccess: (data: T) => void
    onFail: (err: Error) => void
  }

  const ios: boolean
  const android: boolean
  const version: string
  const hasBridge: boolean

  const runtime: {
    getVersion: Function
    getCurrentUser: Function
    requestAuthCode: Function
    showUpdate: Function
  }

  const device: {
    authenticateUser: Function
    getAP: Function
    getNetworkType: Function
    getUUID: Function
    scan: (props: FSOpenCallBack<string>) => Promise<string>
    vibrate: Function
  }

  const webview: {
    back: Function
    close: Function
    open: Function
    onBackWebview: Function
    onCloseWebview: Function
    setOrientation: Function
    navbar: {
      removeMiddleBtn: Function
      removeRightBtns: Function
      hideMenu: Function
      setLeftBtn: Function
      setRightBtns: Function
      setMiddleBtn: Function
      setTitle: Function
      showMenu: Function
    }
    menu: {
      onShareToConversation: Function
      onShareToCRMContact: Function
      onShareToFeed: Function
      onShareViaMail: Function
      onShareToQQFriend: Function
      onShareViaSMS: Function
      onShareToWXFriend: Function
      onShareToWXMoments: Function
    }
    page: {
      copyURL: Function
      generateQR: Function
      openWithBrowser: Function
      refresh: Function
    }
    bounce: { disable: Function; enable: Function }
    pullRefresh: { disable: Function; enable: Function; stop: Function }
  }

  const widget: {
    showActionSheet: Function
    showAlert: Function
    showConfirm: Function
    hidePreloader: Function
    showModal: Function
    showPrompt: Function
    showPreloader: Function
    showToast: Function
    showDateTimePicker: Function
    showEditor: Function
  }

  const service: {
    contact: {
      setMark: Function
      getServiceChannelsInfo: Function
      getUsersInfo: Function
      select: Function
      selectDepartment: Function
      selectUser: Function
      openDepartment: Function
      openUserProfile: Function
      openServiceProfile: Function
      getMembers: Function
    }
    conversation: {
      open: Function
      setupFSCall: Function
      setupFSConference: Function
    }
    favorite: { add: Function; manage: Function }
    geo: {
      getLocation: Function
      selectPOI: Function
      openMap: Function
    }
    mail: { shareToConversation: Function; shareToFeed: Function }
    pay: {
      request: Function
      requestForCorp: Function
      openWallet: Function
    }
    share: {
      toConversation: Function
      toCRMContact: Function
      toFeed: Function
      viaMail: Function
      toQQFriend: Function
      viaSMS: Function
      toWXFriend: Function
      toWXMoments: Function
    }
    calendar: { open: Function; createEvent: Function }
    feed: {
      open: Function
      create: Function
      createShare: Function
      createDiary: Function
      createApproval: Function
      createTask: Function
      createSchedule: Function
      createOrder: Function
    }
    disk: { open: Function; addFile: Function; selectFile: Function }
  }

  const media: {
    file: {
      preview: (props: FSOpenCallBack<string> & { fileNPath: string }) => Promise<void>
      upload: Function
      download: (
        props: FSOpenCallBack<{ fileLocalPath: string }> & {
          fileUrl: string
          fileName?: string
          onProgress?: (progress: { loaded: number; total: number }) => void
        }
      ) => Promise<void>
      manage: Function
      reupload: Function
    }
    image: {
      preview: (props: FSOpenCallBack<string> & { imgUrls: string[]; index: number }) => Promise<void>
      upload: Function
      submit: Function
      save: Function
      reupload: Function
    }
  }

  interface InvoiceParam {
    appId: string
    timeStamp: string
    nonceStr: string
    signType: string
    cardSign: string
  }

  const util: {
    chooseInvoiceFromWX: (param: FSOpenCallBack<string> & InvoiceParam) => void
  }
}
