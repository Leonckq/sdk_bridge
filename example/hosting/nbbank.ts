/***************************************************
 * Created by nanyuantingfeng on 2019/11/18 19:42. *
 ***************************************************/
import '@ekuaibao/polyfill'

import 'reflect-metadata'
import SDK from '../../src/sdk/nbbank'
import { entry } from '../components/entry'
import container from '../components/container'
const sdk = container.get(SDK)
sdk.initialize().then(data => {
    entry(sdk)
}).catch(() => {
    entry(sdk)
})
