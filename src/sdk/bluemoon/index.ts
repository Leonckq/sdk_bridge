/***************************************************
 * Created by nanyuantingfeng on 2019/10/23 16:33. *
 ***************************************************/
export * from '../../types'
import { withSDK } from './withSDK'
import { Bridge } from '../browser/Bridge'
import { withAuth } from '../browser/withAuth'
import { withStaffSetting } from '../browser/withStaffSetting'

export class BlueMoonSDK extends withStaffSetting(withAuth(withSDK(Bridge))) {
  async initialize() {
    await this.login()
    await this.fetchStaffInfo()
    return this
  }
}

export default BlueMoonSDK
