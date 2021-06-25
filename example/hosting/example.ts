/**
 *  Created by pw on 2019-11-25 11:31.
 */
import '@ekuaibao/polyfill'

import 'reflect-metadata'
import SDK from '../../src/sdk/browser'
import { entry } from '../components/entry'
import container from '../components/container'
const sdk = container.get(SDK)
container.set('@@app', { sdk })

entry(sdk)
