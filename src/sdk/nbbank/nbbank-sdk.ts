/**
 * @author viktor
 * @email wangweidong@hosecloud.com
 * @create date 2020-10-15 16:29:06
 * @modify date 2020-10-15 16:29:06
 */

import {
    Client,
    utils
  } from '../../lib/nbcb-sdk'
// import NbbankSDK from 'dingtalk-jsapi'

const scan = Client.NBCB_openQRScan;
const openLink = Client.NBCB_openWebUrl
const getGeolocation = Client.NBCB_getLocation

const close = () => {console.log('close')}
const quit = () => {console.log('quit')}
const setTitle = () => {console.log('setTitle')}
const setLeft = () => {console.log('setLeft')}
const setRight = () => {console.log('setRight')}
const setIcon = () => {console.log('setIcon')}
const share = () => {console.log('share')}
const previewImage = () => {console.log('previewImage')}


export {
    scan,
    close,
    quit,
    openLink,
    setTitle,
    setLeft,
    setRight,
    setIcon,
    share,
    previewImage,
    getGeolocation,
}

export const API_NAMES = {
    scan,
    close,
    quit,
    openLink,
    setTitle,
    setLeft,
    setRight,
    setIcon,
    share,
    previewImage,
    getGeolocation,
}

