/**
 *  Created by pw on 2021/5/20 下午4:00.
 */
import '@ekuaibao/polyfill'

import 'reflect-metadata'
import SDK from '../../src/sdk/hybrid'
import { entry } from '../components/entry'
import container from '../components/container'
const sdk = container.get(SDK)
sdk.initialize().then(data => entry(sdk))
