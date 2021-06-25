/***************************************************
 * Created by nanyuantingfeng on 2019/10/29 16:12. *
 ***************************************************/
import '@ekuaibao/polyfill'
import 'reflect-metadata'

import SDK from '../../src/sdk/huawei'
import { entry } from '../components/entry'
import container from '../components/container'

// @ts-ignore
console.log('API_URL', API_URL)
// @ts-ignore
window.API_URL = API_URL

const sdk = container.get(SDK)
sdk.initialize().then(data => entry(sdk))
