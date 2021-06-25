/***************************************************
 * Created by nanyuantingfeng on 2019/10/30 18:16. *
 ***************************************************/
import React from 'react'
import { Container, ContainerInstance } from 'typedi'
import { MessageCenter } from '@ekuaibao/messagecenter'

import '@ekuaibao/iframe-layer/style'
import { ModalIframe } from '@ekuaibao/iframe-layer'

export default class OpenLinkInIframe extends React.Component<any,any> {
  state: any = {}

  container: ContainerInstance

  componentDidMount() {
    this.container = Container.get<ContainerInstance>('@@container')
    const bus = this.container.get<MessageCenter>('@@bus')
    bus.on('@@system:openURLInIframe', (url: string) => {
      this.setState({ url, visible: true })
    })
  }

  componentWillUnmount() {
    const bus = this.container.get<MessageCenter>('@@bus')
    bus.un('@@system:openURLInIframe')
  }

  render() {
    const { url, visible } = this.state
    return <ModalIframe url={url} visible={visible} onClose={() => this.setState({ visible: false })} />
  }
}
