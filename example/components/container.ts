/***************************************************
 * Created by nanyuantingfeng on 2019/11/1 15:39. *
 ***************************************************/
import { Container } from 'typedi'
import { MessageCenter } from '@ekuaibao/messagecenter'

const container = Container.of('@@system')
container.set('@@bus', new MessageCenter())
container.set('IDeviceType', 'MOBILE')
container.set('ISMessageEntry', false)
Container.set('@@container', container)

export { container }
export default container
