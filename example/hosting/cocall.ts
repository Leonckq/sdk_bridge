/***************************************************
 * Created by nanyuantingfeng on 2019/11/5 11:17. *
 ***************************************************/
import '@ekuaibao/polyfill'
import VConsole from 'vconsole'
const vConsole = new VConsole()
import 'reflect-metadata'
import SDK from '../../src/sdk/cocall'
import { entry } from '../components/entry'
import container from '../components/container'

const sdk = container.get(SDK)
sdk.initialize().then(data => entry(sdk))
