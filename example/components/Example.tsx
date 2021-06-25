/***************************************************
 * Created by nanyuantingfeng on 2019/10/30 12:08. *
 ***************************************************/
import React from 'react'
import './Example.less'
import PreviewImages from '../../src/patch/PreviewImages'
import { ISDK } from '../../src/types'
import OpenLinkInIframe from '../../src/patch/OpenLinkInIframe'


export default class Example extends React.Component<{ sdk: ISDK }> {
  state: any = {
    imageUrls: []
  }

  handleUploader = async () => {
    const { sdk } = this.props
    const spaceId = '3921510741'
    const result = await sdk.invoke('uploadAttachment', {
      types: ['photo', 'camera', 'file', 'space'],
      space: { corpId: '0h4aW0XsEI6E00', spaceId },
      image: { multiple: true, compression: true, quality: 50, resize: 50, spaceId },
      file: { spaceId }
    })
    console.log(result)
    alert(JSON.stringify(result))
  }

  render() {
    const { sdk } = this.props
    const { imageUrls } = this.state
    return (
      <div>
        <div id="pageTitle" title="自定义标题" data-btnLeft="true|返回|leftFunc()" data-btnRight="true|name|rightFunc()"></div>
        <div className="line">
          {imageUrls.map(line => {
            return <img key={line} style={{ width: 50, height: 50, marginRight: 5 }} src={line} />
          })}
        </div>
        <div className="line">
          <button
            onClick={() => {
              sdk.scan().then(aa => {
                this.setState({ scanResult: aa })
              })
            }}
          >
            scan
          </button>

          <pre>scanResult : {JSON.stringify(this.state.scanResult, null, 4)}</pre>
        </div>

        <div className="line">
          <button
            onClick={() => {
              sdk.openLink('https://baidu.com')
            }}
          >
            openLink
          </button>
          <p> https://baidu.com </p>
        </div>
        <div className="line">
          <button
            onClick={() => {
              sdk.openLink('https://baidu.com', { iframe: true }).then(aa => {
                console.log(aa)
              })
            }}
          >
            openLinkInIframe
          </button>

          <p> https://baidu.com </p>
        </div>
        <div className="line">
          <button
            onClick={() => {
              const urls = [
                'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1572438534479&di=c397ced00b05cee7132b17ad3d467d34&imgtype=0&src=http%3A%2F%2Fpic1.win4000.com%2Fwallpaper%2F6%2F583d386a89da4.jpg',
                'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1572439547119&di=5380a9ff04e763b28826e0527450d267&imgtype=0&src=http%3A%2F%2Fpic1.win4000.com%2Fwallpaper%2F2018-07-13%2F5b485ccd021a1.jpg',
                'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1572439547119&di=5a7e60aa54d5aac48d546013e943f5a8&imgtype=0&src=http%3A%2F%2Fpic1.win4000.com%2Fwallpaper%2F2017-10-19%2F59e80c095932c.jpg',
                'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1572439547119&di=ba0e22f6f2e1950b3d5233ad11beec69&imgtype=0&src=http%3A%2F%2Fpic1.win4000.com%2Fwallpaper%2F2018-06-01%2F5b10b79863940.jpg',
                'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1572439547119&di=57cc9ba07fbd765cef784877318a8830&imgtype=0&src=http%3A%2F%2Fpic1.win4000.com%2Fwallpaper%2F9%2F59843c59792b7.jpg'
              ]
              sdk.previewImages(urls, urls[2]).then(aa => {
                console.log(aa)
              })
            }}
          >
            previewImages
          </button>
        </div>
        <div className="line">
          <button
            onClick={() => {
              sdk.preview(
                'https://raw.githubusercontent.com/gajus/write-file-webpack-plugin/master/src/WriteFileWebpackPlugin.js'
              )
            }}
          >
            preview
          </button>
        </div>
        <div className="line">
          <button
            onClick={() => {
              sdk.getGeolocation().then(d => {
                console.log('getGeolocation', d)
                this.setState({
                  geolocation: {
                    latitude: d.latitude,
                    longitude: d.longitude
                  }
                })
              })
            }}
          >
            getGeolocation
          </button>
          <p> geolocation : {JSON.stringify(this.state.geolocation)}</p>
        </div>

        <div className="line">
          <button
            onClick={() => {
              sdk.getNetworkType().then(networkType => {
                this.setState({ networkType })
              })
            }}
          >
            getNetworkType
          </button>
          <p> networkType : {this.state.networkType}</p>
        </div>

        <div className="line">
          <button
            onClick={() => {
              sdk
                .download(
                  'https://raw.githubusercontent.com/gajus/write-file-webpack-plugin/master/src/WriteFileWebpackPlugin.js',
                  'demo.js'
                )
                .then(() => {})
            }}
          >
            download
          </button>
        </div>
        <div className="line">
          <button
            onClick={() => {
              sdk.setTitle(String(Math.random()))
            }}
          >
            setTitle
          </button>
        </div>
        <div className="line">
          <button
            onClick={() => {
              sdk.openThirdApp('alipayqr://platformapi/startapp?saId=20000021')
            }}
          >
            openAliApp
          </button>
        </div>

        <div className="line">
          <button
            onClick={() => {
              // sdk.share({
              //   title: 'Hi，我们都在用易快报',
              //   content: '最好用的移动互联网报销方式，还不快来试试看。',
              //   image: 'https://www.ekuaibao.com/img/marketing/170713_sharing/sharing_img.png',
              //   url: 'https://www.ekuaibao.com/marketing/sharing_kdcloud.html',
              //   cellContent: '最好用的移动互联网报销方式，还不快来试试看～'
              // })

              sdk.share({
                appName: '易快报专业版',
                url: 'https://ekuaibao-branding.mikecrm.com/36zzQPG',
                title: 'Hi，我们都在用易快报',
                content: '最好用的移动互联网报销方式，还不快来试试看。',
                cellContent: '最好用的移动互联网报销方式，还不快来试试看。',
                image: 'https://www.ekuaibao.com/website-static/img/marketing/sharing-170713/sharing_img.png'
              })
            }}
          >
            share
          </button>
        </div>

        <div className="line">
          <button
            onClick={() => {
              sdk.close()
            }}
          >
            close
          </button>
        </div>

        <div className="line">
          <button
            onClick={() => {
              sdk.setLeft({ title: String(Math.random()) }, () => alert('setLeft'))
            }}
          >
            setLeft
          </button>
        </div>
        <div className="line">
          <button
            onClick={() => {
              sdk.setRight({ text: '右边',show:true }, () => alert('setRight'))
            }}
          >
            setRight
          </button>
        </div>

        <div className="line">
          <button onClick={this.handleUploader}>uploadAttachment</button>
        </div>

        <div className="line">
          <pre> staffSetting === {JSON.stringify(sdk.staffSetting, null, 4)}</pre>
        </div>
        <div className="line">
          <pre> meInfo === {JSON.stringify(sdk.meInfo, null, 4)}</pre>
        </div>
        <div className="line">
          <p> navigator.userAgent === {navigator.userAgent}</p>
        </div>

        <PreviewImages />
        <OpenLinkInIframe />
      </div>
    )
  }
}
