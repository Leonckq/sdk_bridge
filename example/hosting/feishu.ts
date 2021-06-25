/***************************************************
 * Created by liuhong on 2019/12/05 16:12. *
 ***************************************************/
import '@ekuaibao/polyfill'
import 'reflect-metadata'

import VConsole from 'vconsole'
const vConsole = new VConsole()

import SDK from '../../src/sdk/feishu'
import { entry } from '../components/entry'
import container from '../components/container'
const sdk = container.get(SDK)
sdk.initialize().then(data => entry(sdk))
