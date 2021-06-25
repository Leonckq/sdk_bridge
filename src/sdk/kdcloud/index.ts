/***************************************************
 * Created by nanyuantingfeng on 2019/10/23 16:35. *
 ***************************************************/
export * from '../../types'

import { withSDK } from './withSDK'
import { withAuth } from './withAuth'
import { Bridge } from '../browser/Bridge'
import { withStaffSetting } from '../browser/withStaffSetting'

export class KDCloudSDK extends withStaffSetting(withAuth(withSDK(Bridge))) {
  async initialize() {
    await this.login()
    await this.fetchStaffInfo()
    return this
  }
}

export default KDCloudSDK
