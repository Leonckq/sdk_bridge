/***************************************************
 * Created by lh on 2019/12/04 16:35. *
 ***************************************************/
export * from '../../types'

import { withSDK } from './withSDK'
import { Bridge } from '../browser/Bridge'
import { withAuth } from './withAuth'
import { withStaffSetting } from '../browser/withStaffSetting'

export class FeishuSdk extends withStaffSetting(withAuth(withSDK(Bridge))) {
  // export class FeishuSdk extends withSDK(Bridge) {

  async initialize() {
    await this.login()
    await this.fetchStaffInfo()
    return this
  }
}

export default FeishuSdk
