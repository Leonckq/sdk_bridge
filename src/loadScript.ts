/***************************************************
 * Created by nanyuantingfeng on 2019/10/28 16:16. *
 ***************************************************/
export default loadScript

export function loadScript<T>(src: string, named?: string): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    const script = document.createElement('script')
    script.setAttribute('src', src)
    script.setAttribute('async', 'true')
    script.addEventListener('load', () => {
      const oo = window[named]
      if (typeof oo === 'undefined') {
        console.warn(`No object named '${named}' in window`)
      }
      resolve(oo)
    })
    script.addEventListener('error', reject)
    document.body.appendChild(script)
  })
}
