/**
 * @author viktor
 * @email wangweidong@hosecloud.com
 * @create date 2020-10-15 16:12:16
 * @modify date 2020-10-15 16:12:16
 */

export * from '../../types'
import { withAuth } from './withAuth'
import { withSDK } from './withSDK'
import { Bridge } from '../browser/Bridge'
import { withStaffSetting } from '../browser/withStaffSetting'

export class NbbankSDK extends withStaffSetting(withAuth(withSDK(Bridge))) {
  async initialize() {
    await this.login()
    await this.fetchStaffInfo()
    return this
  }
}

export default NbbankSDK