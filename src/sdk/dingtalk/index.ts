/***************************************************
 * Created by nanyuantingfeng on 2019/10/8 16:33. *
 ***************************************************/
export * from '../../types'
import { withAuth } from './withAuth'
import { withSDK } from '../common/dingtalk/withSDK'
import { Bridge } from '../browser/Bridge'
import { withStaffSetting } from '../browser/withStaffSetting'

export class DingtalkSDK extends withStaffSetting(withAuth(withSDK(Bridge))) {
  async initialize() {
    await this.login()
    await this.fetchStaffInfo()
    return this
  }
}

export default DingtalkSDK
