/***************************************************
 * Created by nanyuantingfeng on 2019/10/23 18:39. *
 ***************************************************/
export * from '../../types'

import { Bridge } from './Bridge'
import { withAuth } from './withAuth'
import { withStaffSetting } from './withStaffSetting'

export class BrowserSDK extends withStaffSetting(withAuth(Bridge)) {
  async initialize() {
    await this.login()
    await this.fetchStaffInfo()
    return this
  }
}

export default BrowserSDK
