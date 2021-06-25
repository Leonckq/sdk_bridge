/***************************************************
 * Created by nanyuantingfeng on 2019/10/29 16:23. *
 ***************************************************/
const config = require('whispered-build/webpack.simple.dev.config')

config.devtool('source-map')

config.patch.entry({
  debugger: './example/hosting/browser.ts',
  dingtalk: './example/hosting/dingtalk.ts',
  //bluemoon: './example/hosting/bluemoon.ts',
  //wx: './example/hosting/qyweixin.tsx',
  //qyweixin: './example/hosting/qyweixin.tsx',
  //wechat: './example/hosting/wechat.tsx',
  //kdcloud: './example/hosting/kdcloud.tsx',
  //fsopen: './example/hosting/fsopen.tsx',
  thirdparty: './example/hosting/emobile.ts',
  barcode: './example/hosting/cocall.ts',
  //app: './example/hosting/ekuaibao.ts',
  //huawei: './example/hosting/huawei.ts',
  cocall: './example/hosting/cocall.ts',
  feishu: './example/hosting/feishu.ts',
  //example: './example/hosting/example.tsx'
  nbbank: './example/hosting/nbbank.ts',
  dtapphybrid: './example/hosting/dtapphybirddemo.ts',
  hybrid: './example/hosting/hybrid.ts'
})

let proxyURL

// proxyURL = 'http://460mix.ekuaibao.net'
// proxyURL = 'http://kd430.qhose.com.cn:58080'
// proxyURL = 'http://wx480.qhose.com.cn'

proxyURL = 'https://app.ekuaibao.com'
// proxyURL = 'http://wx480.qhose.com.cn'
//proxyURL = 'http://460.qhose.com.cn'
// proxyURL = 'https://hybx.thunisoft.com'
// proxyURL = 'http://demo.efeecon.com/' // 钉钉
// proxyURL = 'http://a2.dev.ekuaibao.cn/' // 钉钉混合

// proxyURL = 'https://app.ekuaibao.com'
// proxyURL = 'https://wx2.ekuaibao.com'
//proxyURL = 'http://team-nc1.dev.ekuaibao.net' // 飞书项目内测地址

config.devServer
  .host('0.0.0.0')
  .port(9977)
  .watchContentBase(true)
  .disableHostCheck(true)
  .historyApiFallback(true)
  .headers({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': '*'
  })
  .proxy({
    context: ['/debug/**', '/api/**', '/static/**'],
    changeOrigin: true,
    target: proxyURL
  })

config.patch.sdks({
  ['*']: ['vconsole.js'],
  huawei: ['||../../../common/js/hwh5.js'],
  feishu: ['https://s0.pstatp.com/ee/lark/js_sdk/h5-js-sdk-1.4.5.js']
})

config.patch.files({
  'vconsole.js': './src/lib/vconsole.js'
})

config.patch.defines({
  RESOURCE_URL: JSON.stringify('https://app.ekuaibao.com'),
  API_URL: JSON.stringify('http://hw.qhose.com.cn'),
  IS_HUAWEI_LOC: JSON.stringify(!!process.env.HWLC)
})
config.patch.htmls({
  cocall: {
    template: './example/cocall.hbs'
  }
})

module.exports = config.toConfig()
