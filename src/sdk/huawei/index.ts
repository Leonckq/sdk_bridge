/***************************************************
 * Created by nanyuantingfeng on 2019/11/6 20:31. *
 ***************************************************/

export * from '../../types'

import { withSDK } from './withSDK'
import { Bridge } from '../browser/Bridge'
import { withAuth } from './withAuth'
import { withStaffSetting } from '../browser/withStaffSetting'

export class HuaWeiSDK extends withStaffSetting(withAuth(withSDK(Bridge))) {
  async initialize() {
    await this.login()
    await this.fetchStaffInfo()
    return this
  }
}

export default HuaWeiSDK
