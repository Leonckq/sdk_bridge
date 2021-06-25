/***************************************************
 * Created by nanyuantingfeng on 2019/11/6 20:21. *
 ***************************************************/

declare var IS_HUAWEI_LOC: boolean

type ShareOption = {
  type: string //分享类型，IM分享
  pcUri: string
  title: string
  desc: string
  iconURL: string
}

type ScanCodeOption = { needResult: number }

declare namespace HWH5 {
  function appInfo(): Promise<{ language: string }>

  function getAuthCode(props: { clientId: number }): Promise<{ code: string }>

  function share(props: ShareOption): void

  function scanCode(props: ScanCodeOption): Promise<{ text: string }>

  function openWebview(props: { uri: string }): void

  function previewImage(props: { index: string; imageArray: string[] })

  function navigateBack(): Promise<void>

  function refreshStoreCard(props: { appID: string }): Promise<void>

  function setNavigationBarTitle(props: { title: string }): void
}
