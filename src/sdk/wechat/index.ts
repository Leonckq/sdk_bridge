/***************************************************
 * Created by nanyuantingfeng on 2019/11/6 17:56. *
 ***************************************************/
export * from '../../types'

import { withAuth } from './withAuth'
import { withSDK } from './withSDK'
import { Bridge } from '../browser/Bridge'
import { withStaffSetting } from '../browser/withStaffSetting'

export class WeChatSDK extends withStaffSetting(withAuth(withSDK(Bridge))) {
  async initialize() {
    await this.login()
    await this.fetchStaffInfo()
    return this
  }
}

export default WeChatSDK
