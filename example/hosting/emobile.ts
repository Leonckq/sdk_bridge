/***************************************************
 * Created by nanyuantingfeng on 2019/10/29 16:12. *
 ***************************************************/
import '@ekuaibao/polyfill'

import VConsole from 'vconsole'
const vConsole = new VConsole()

import 'reflect-metadata'
import SDK from '../../src/sdk/emobile'
import { entry } from '../components/entry'
import container from '../components/container'
const sdk = container.get(SDK)
sdk.initialize().then(data => entry(sdk))
