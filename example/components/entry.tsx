/***************************************************
 * Created by nanyuantingfeng on 2019/10/30 12:14. *
 ***************************************************/
import { ISDK } from '../../src/types'
import React from 'react'
import ReactDOM from 'react-dom'
import Example from './Example'

export function entry(sdk: ISDK) {
  ReactDOM.render(<Example sdk={sdk} />, document.getElementById('root'))
}
