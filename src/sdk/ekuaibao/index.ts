/***************************************************
 * Created by nanyuantingfeng on 2019/10/23 16:34. *
 ***************************************************/
export * from '../../types'

import { withSDK } from './withSDK'
import { Bridge } from '../browser/Bridge'
import { withAuth } from './withAuth'
import { withStaffSetting } from '../browser/withStaffSetting'

export class eKuaibaoSDK extends withStaffSetting(withAuth(withSDK(Bridge))) {
  async initialize() {
    await this.login()
    await this.fetchStaffInfo()
    return this
  }
}

export default eKuaibaoSDK
