/**
 *  Created by daiwenjuan on 2020/8/22 10:39.
 */
export * from '../../types'

import { withSDK } from './withSDK'
import { Bridge } from '../browser/Bridge'
import { withAuth } from './withAuth'
import { withStaffSetting } from '../browser/withStaffSetting'

export class MCEkuaibaoSDK extends withStaffSetting(withAuth(withSDK(Bridge))) {
  async initialize() {
    await this.loginMC()
    await this.fetchStaffInfo()
    return this
  }
}

export default MCEkuaibaoSDK
