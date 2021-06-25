/***************************************************
 * Created by nanyuantingfeng on 2019/11/5 11:17. *
 ***************************************************/
import '@ekuaibao/polyfill'

import 'reflect-metadata'
import SDK from '../../src/sdk/bluemoon'
import { entry } from '../components/entry'
import container from '../components/container'
const sdk = container.get(SDK)
sdk.initialize().then(data => entry(sdk))
