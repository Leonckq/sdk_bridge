/***************************************************
 * Created by nanyuantingfeng on 2019/10/23 16:36. *
 ***************************************************/
export * from '../../types'

import { withSDK } from '../common/qyweixin/withSDK'
import { withAuth } from './withAuth'
import { Bridge } from '../browser/Bridge'
import { withStaffSetting } from '../browser/withStaffSetting'

export class QYWeiXinSDK extends withStaffSetting(withAuth(withSDK(Bridge))) {
  async initialize() {
    await this.login()
    await this.fetchStaffInfo()
    return this
  }
}

export default QYWeiXinSDK
