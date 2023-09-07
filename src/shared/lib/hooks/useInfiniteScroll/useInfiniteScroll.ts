import { MutableRefObject, useEffect, useRef } from 'react'

export interface useInfiniteScrollProps {
  callback: () => void
  triggerRef: MutableRefObject<HTMLElement>
  wrapperRef: MutableRefObject<HTMLElement>
}
export function useInfiniteScroll({ callback, triggerRef, wrapperRef }: useInfiniteScrollProps) {
  useEffect(() => {
    const wrapperEl = wrapperRef.current
    const triggererEl = triggerRef.current
    let observer: IntersectionObserver | null = null
    if (callback) {
      const options = {
        root: wrapperEl,
        rootMargin: '0px',
        threshold: 1.0,
      }
      observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          callback()
        }
      }, options)

      observer.observe(triggererEl)
    }
    return () => {
      if (observer && triggererEl) {
        observer.unobserve(triggererEl)
      }
    }
  }, [triggerRef, wrapperRef, callback])
}
