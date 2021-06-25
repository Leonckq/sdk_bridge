/**
 *  Created by pw on 2021/5/14 下午1:31.
 */
// @ts-ignore
import { ready, app, scaner, history } from '../../lib/kk-1.3.4.min'

class KKSDK {
  scan() {
    return new Promise((resolve, reject) => {
      ready(() => {
        scaner.scanTDCode(
          (res: any) => {
            resolve(res.code)
          },
          (err: any) => {
            reject(err)
          }
        )
      })
    })
  }

  close() {
    ready(() => {
      history.hasPrev(res => {
        if (res.hasPrev) {
          history.back()
        } else {
          app.exit()
        }
      })
    })
  }

  async showTitleBar() {
    ready(args => {
      console.log(args)
      app.showTitleBar()
    })
  }

  setTitle(title: string) {
    ready(() => {
      app.setTitle(title)
    })
  }

  back() {
    ready(() => {
      history.back(() => {
        console.log('back error')
      })
    })
  }
}

const sdk = new KKSDK()
export { sdk }
