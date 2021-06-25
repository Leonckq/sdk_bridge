export function triggerClick(node: HTMLElement) {
    try {
      if (document.createEvent) {
        const evt = document.createEvent('MouseEvents')
        evt.initEvent('click', true, false)
        node.dispatchEvent(evt)
  
        // @ts-ignore
      } else if ((document as any).createEventObject) {
        // @ts-ignore
        ;(node as any).fireEvent('onclick')
        // @ts-ignore
      }
    } catch (e) {
      node.click()
    } finally {
      if (node && node.hasAttribute('download')) {
        node.removeAttribute('download')
      }
    }
}
  
export function getLinkNodeElement() {
    const id = 'ekb-node-openlink'
    let el = document.getElementById(id)
  
    if (!el) {
      el = document.createElement('a')
      el.setAttribute('id', id)
      // TODO：元素触发click事件后做数据请求，然后dispatch a标签的click事件。如果a标签的target被设置成_blank，ios是不允许打开的。先暂时把_blank干掉，已有更有方案。等新方案实现再开放_blank。TMC客户比较着急使用中行易购订票功能。
      // el.setAttribute('target', '_blank')
      el.setAttribute('rel', 'noopener')
      document.body.appendChild(el)
    }
  
    return el
}
  
export function debounce<T extends Function>(fn: T, wait?: number, immediate?: boolean) {
    let timeout, args, context, timestamp, result
  
    let later = () => {
      let last = Date.now() - timestamp
      if (last < wait && last >= 0) {
        timeout = setTimeout(later, wait - last)
      } else {
        timeout = null
        if (!immediate) {
          result = fn.apply(context, args)
          if (!timeout) context = args = null
        }
      }
    }
  
    return (function() {
      context = this
      args = arguments
      timestamp = Date.now()
      let callNow = immediate && !timeout
      if (!timeout) timeout = setTimeout(later, wait)
  
      if (callNow) {
        result = fn.apply(context, args)
        context = args = null
      }
  
      return result
    } as unknown) as T
}