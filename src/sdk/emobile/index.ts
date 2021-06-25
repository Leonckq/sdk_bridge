/***************************************************
 * Created by nanyuantingfeng on 2019/10/23 16:35. *
 ***************************************************/
export * from '../../types'

import { withSDK } from './withSDK'
import { Bridge } from '../browser/Bridge'
import { withAuth } from '../browser/withAuth'
import { withStaffSetting } from '../browser/withStaffSetting'

// 泛微接口

export class EMobileSDK extends withStaffSetting(withAuth(withSDK(Bridge))) {
  async initialize() {
    await this.login()
    await this.fetchStaffInfo()
    return this
  }
}

export default EMobileSDK
