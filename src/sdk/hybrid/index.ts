/**
 *  Created by pw on 2021/5/14 上午11:32.
 */
export * from '../../types'
import { withSDK } from './withSDK'
import { Bridge } from '../browser/Bridge'
import { withAuth } from '../browser/withAuth'
import { withStaffSetting } from '../browser/withStaffSetting'

export class HybridSDK extends withStaffSetting(withAuth(withSDK(Bridge))) {
  async initialize() {
    await this.initializeSDK()
    await this.login()
    await this.fetchStaffInfo()
    return this
  }
}

export default HybridSDK
