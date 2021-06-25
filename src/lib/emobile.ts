/***************************************************
 * Created by nanyuantingfeng on 2019/11/25 15:38. *
 ***************************************************/

function createCallbackName(name: string) {
  return `callback__${name}`
}

const bridgeExecute = url => {
  const iframe = document.createElement('iframe')
  iframe.style.display = 'none'
  iframe.src = url
  document.body.appendChild(iframe)
  document.body.removeChild(iframe)
}

function __scan(callback: (result: string) => void) {
  console.log('........3')
  const callbackName = createCallbackName('QRCode')
  bridgeExecute(`emobile:QRCode:${callbackName}`)
  // @ts-ignore
  window[callbackName] = callback
}

export function scan(): Promise<string> {
  return new Promise(resolve => __scan(result => resolve(result)))
}
