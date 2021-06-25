/***************************************************
 * Created by nanyuantingfeng on 2019/10/30 18:16. *
 ***************************************************/
import React from 'react'
import { Container, ContainerInstance } from 'typedi'
import { MessageCenter } from '@ekuaibao/messagecenter'
import ImagePlayer from '@ekuaibao/image-player'
import { ISDK } from '../types'
import { PortalToDOM } from '@ekuaibao/react-modal'

export default class PreviewImages extends React.Component<any, any> {
  state: any = {}

  container: ContainerInstance

  componentDidMount() {
    this.container = Container.get<ContainerInstance>('@@container')
    const bus = this.container.get<MessageCenter>('@@bus')
    bus.on('@@system:previewImages', (urls: string[], current: string) => {
      this.setState({ urls, current, index: urls.indexOf(current), visible: true })
    })
  }

  componentWillUnmount() {
    const bus = this.container.get<MessageCenter>('@@bus')
    bus.un('@@system:previewImages')
  }

  handleOnDownload = (url: string) => {
    const app = this.container.get<{ sdk: ISDK }>('@@app')
    app.sdk.download(url)
  }

  render() {
    if (this.state.visible !== true) {
      return null
    }

    return (
      <PortalToDOM>
        <ImagePlayer
          index={this.state.index}
          visible={this.state.visible}
          onClose={() => this.setState({ visible: false })}
          urls={this.state.urls}
          onDownload={this.handleOnDownload}
        />
      </PortalToDOM>
    )
  }
}
