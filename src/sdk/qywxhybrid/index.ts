/**
 *  Created by pw on 2020/9/4 8:50 下午.
 */
export * from '../../types'

import { withSDK } from '../common/qyweixin/withSDK'
import { Bridge } from '../browser/Bridge'
import { withAuth } from './withAuth'
import { withStaffSetting } from '../browser/withStaffSetting'

export class QYWXHybridSDK extends withStaffSetting(withAuth(withSDK(Bridge))) {
  async initialize() {
    await this.login()
    await this.fetchStaffInfo()
    return this
  }
}

export default QYWXHybridSDK
