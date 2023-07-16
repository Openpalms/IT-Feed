import type { ReactElement } from 'react'
import { useEffect } from 'react'
import ReactDOM from 'react-dom'

type PortalProps = {
  children: ReactElement
  element?: HTMLElement
}

export const Portal = ({ children, element = document.body }: PortalProps) => {
  //   const mount = document.getElementById('portal-root')
  //   const el = element || document.createElement('div')

  //   useEffect(() => {
  //     if (mount && el) {
  //       mount.appendChild(el)
  //     }

  //     return () => {
  //       if (mount && el) {
  //         mount.removeChild(el)
  //       }
  //     }
  //   }, [el, mount])

  //   if (!el) {
  //     return null
  //   }

  return ReactDOM.createPortal(children, element)
}
