/**
 *  Created by pw on 2020/12/2 12:37 下午.
 */

export * from '../../types'
import { withSDK } from '../common/dingtalk/withSDK'
import { Bridge } from '../browser/Bridge'
import { withStaffSetting } from '../browser/withStaffSetting'
import { withAuth } from './withAuth'

export class DTAppHybridSDK extends withStaffSetting(withAuth(withSDK(Bridge))) {
  async initialize() {
    debugger
    await this.login()
    await this.fetchStaffInfo()
    return this
  }
}

export default DTAppHybridSDK
